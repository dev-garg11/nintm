import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getRegistrations, updateRegistration } from '@/lib/db';

const REGISTRATION_FEE = 6999;
const GST_RATE = process.env.GST_RATE ? parseFloat(process.env.GST_RATE) : 18; // Default 18% official GST rate

export async function POST(request) {
    try {
        const { registrationId } = await request.json();

        if (!registrationId) {
            return NextResponse.json({ error: 'Registration ID is required.' }, { status: 400 });
        }

        // Fetch registration from database
        const registrations = getRegistrations();
        const candidate = registrations.find(r => r.registrationId === registrationId || r.id === registrationId);

        if (!candidate) {
            return NextResponse.json({ error: 'Candidate registration not found.' }, { status: 404 });
        }

        // Do not allow re-payment if already PAID
        if (candidate.paymentStatus === 'PAID') {
            return NextResponse.json({ error: 'This registration has already been verified and paid.' }, { status: 400 });
        }

        // Calculate payment amount server-side (Base + GST)
        const gstAmount = parseFloat((REGISTRATION_FEE * GST_RATE / 100).toFixed(2));
        const totalAmount = parseFloat((REGISTRATION_FEE + gstAmount).toFixed(2));
        const amountInPaise = Math.round(totalAmount * 100);

        // Check if environment variables are configured
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret || keyId === 'YOUR_KEY_ID' || keySecret === 'YOUR_KEY_SECRET') {
            console.error('Razorpay credentials missing or set to placeholders.');
            return NextResponse.json({ error: 'Razorpay payment gateway is not configured.' }, { status: 500 });
        }

        // Initialize Razorpay SDK
        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        // Create Razorpay Order
        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: registrationId,
            notes: {
                registrationId: registrationId,
                candidateName: candidate.name,
                candidateEmail: candidate.email
            }
        };

        const order = await razorpay.orders.create(options);

        // Update database record with Razorpay Order ID & Stated amount
        updateRegistration(candidate.registrationId, {
            razorpayOrderId: order.id,
            paymentAmount: totalAmount,
            paymentStatus: 'PENDING' // Ensure status is PENDING during checkout
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: keyId,
            totalAmount: totalAmount,
            gstAmount: gstAmount,
            baseAmount: REGISTRATION_FEE,
            gstRate: GST_RATE,
            candidate: {
                name: candidate.name,
                email: candidate.email,
                phone: candidate.phone,
            }
        });

    } catch (error) {
        console.error('API Create Order error:', error);
        let errorMessage = 'Failed to create payment order.';
        if (error && error.error && error.error.description) {
            errorMessage = error.error.description;
        } else if (error && error.message) {
            errorMessage = error.message;
        } else if (error) {
            try {
                errorMessage = typeof error === 'object' ? JSON.stringify(error) : String(error);
            } catch (e) {
                errorMessage = 'Failed to parse payment gateway error details.';
            }
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
