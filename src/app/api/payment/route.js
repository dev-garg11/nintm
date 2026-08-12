import { NextResponse } from 'next/server';
import { updateRegistrationStatus } from '@/lib/db';

export async function POST(request) {
    try {
        const { registrationId, paymentStatus, paymentDetails } = await request.json();

        if (!registrationId || !paymentStatus) {
            return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
        }

        const appStatus = paymentStatus === 'Successful' ? 'Payment Successful' : 'Payment Failed';

        // Update db
        const updated = updateRegistrationStatus(
            registrationId,
            paymentStatus, // Successful, Failed
            appStatus,
            paymentDetails // { paymentId, gateway, amount, date }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Registration record not found.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, registration: updated });
    } catch (error) {
        console.error('API Payment error:', error);
        return NextResponse.json({ error: 'An error occurred during payment updating.' }, { status: 500 });
    }
}
