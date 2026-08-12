import { NextResponse } from 'next/server';
import { getRegistrations, saveRegistrations } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const state = searchParams.get('state') || '';
        const status = searchParams.get('status') || '';
        const paymentStatus = searchParams.get('paymentStatus') || '';

        let list = getRegistrations();

        // Sort by latest created
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Apply search filter (Registration ID, Name, Phone, Email)
        if (search) {
            const q = search.toLowerCase();
            list = list.filter(r =>
                (r.registrationId && r.registrationId.toLowerCase().includes(q)) ||
                (r.id && r.id.toLowerCase().includes(q)) ||
                (r.name && r.name.toLowerCase().includes(q)) ||
                (r.fullName && r.fullName.toLowerCase().includes(q)) ||
                (r.email && r.email.toLowerCase().includes(q)) ||
                (r.phone && r.phone.toLowerCase().includes(q))
            );
        }

        // Apply state filter
        if (state) {
            list = list.filter(r => r.state && r.state.toLowerCase() === state.toLowerCase());
        }

        // Apply application status filter
        if (status) {
            list = list.filter(r => r.applicationStatus && r.applicationStatus.toLowerCase() === status.toLowerCase());
        }

        // Apply payment status filter (PAID, PENDING, FAILED)
        if (paymentStatus) {
            list = list.filter(r => r.paymentStatus && r.paymentStatus.toUpperCase() === paymentStatus.toUpperCase());
        }

        return NextResponse.json({ success: true, registrations: list });
    } catch (error) {
        console.error('API Admin GET error:', error);
        return NextResponse.json({ error: 'An error occurred during retrieving data.' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { id, action, applicationStatus, adminNotes } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });
        }

        const registrations = getRegistrations();
        const index = registrations.findIndex(r => r.id === id || r.registrationId === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
        }

        if (action === 'updateStatus') {
            registrations[index].applicationStatus = applicationStatus;
        }

        if (adminNotes !== undefined) {
            registrations[index].adminNotes = adminNotes;
        }

        saveRegistrations(registrations);
        return NextResponse.json({ success: true, registration: registrations[index] });
    } catch (error) {
        console.error('API Admin POST error:', error);
        return NextResponse.json({ error: 'An error occurred during updating applicant data.' }, { status: 500 });
    }
}
