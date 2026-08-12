import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getRegistrations, updateRegistration } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: 'Missing signature verification tokens.' }, { status: 400 });
        }

        // Fetch candidate registration connected with the Order ID
        const registrations = getRegistrations();
        const candidate = registrations.find(r => r.razorpayOrderId === razorpay_order_id);

        if (!candidate) {
            return NextResponse.json({ error: 'Matching candidate registration not found.' }, { status: 404 });
        }

        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        // Perform HMAC signature generation
        const hmac = crypto.createHmac('sha256', keySecret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        // Timing safe signature verification
        let isSignatureValid = false;
        try {
            isSignatureValid = crypto.timingSafeEqual(
                Buffer.from(generatedSignature, 'utf-8'),
                Buffer.from(razorpay_signature, 'utf-8')
            );
        } catch (err) {
            isSignatureValid = false;
        }

        if (isSignatureValid) {
            // Update registration status to PAID
            const updatedCandidate = updateRegistration(candidate.registrationId, {
                paymentStatus: 'PAID',
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                paymentDate: new Date().toISOString(),
                applicationStatus: 'Payment Successful'
            });

            // Dispatch Confirmation Email
            await sendConfirmationEmail(updatedCandidate);

            return NextResponse.json({
                success: true,
                message: 'Payment verified and registration confirmed.',
                registration: updatedCandidate
            });
        } else {
            // Update registration status to FAILED
            const updatedCandidate = updateRegistration(candidate.registrationId, {
                paymentStatus: 'FAILED',
                applicationStatus: 'Payment Failed'
            });

            return NextResponse.json({
                success: false,
                error: 'Payment signature mismatch. Transaction verification failed.',
                registration: updatedCandidate
            }, { status: 400 });
        }

    } catch (error) {
        console.error('API Verify Payment error:', error);
        return NextResponse.json({ error: 'An error occurred during payment verification.' }, { status: 500 });
    }
}
