import { NextResponse } from 'next/server';
import { addRegistration } from '@/lib/db';

export async function POST(request) {
    try {
        const body = await request.json();

        // Server-side validation helpers
        if (!body.fullName || !body.email || !body.phone) {
            return NextResponse.json({ error: 'Missing required parameters: Name, Email, Phone.' }, { status: 400 });
        }

        // Add to DB (sets default status to 'Payment Pending')
        const registration = addRegistration(body);

        return NextResponse.json({ success: true, registration }, { status: 201 });
    } catch (error) {
        console.error('API Register error:', error);
        return NextResponse.json({ error: 'An error occurred during registration creation.' }, { status: 500 });
    }
}
