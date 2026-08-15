import { NextResponse } from 'next/server';
import { addRegistration, getRegistrations } from '@/lib/db';
import { put } from '@vercel/blob';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();

        const name = formData.get('name');
        const instagramUsername = formData.get('instagramUsername');
        const dateOfBirth = formData.get('dateOfBirth');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const whatsapp = formData.get('whatsapp');
        const height = formData.get('height');
        const state = formData.get('state');
        const city = formData.get('city');
        const pincode = formData.get('pincode');

        const fullLengthPhoto = formData.get('fullLengthPhoto');
        const closeUpPhoto = formData.get('closeUpPhoto');

        if (!name || !instagramUsername || !dateOfBirth || !email || !phone || !whatsapp || !height || !state || !city || !pincode) {
            return NextResponse.json({ error: 'Missing required text fields. Please complete all fields.' }, { status: 400 });
        }

        const registrations = await getRegistrations();
        const duplicate = registrations.find(r =>
            (r.email?.toLowerCase() === email.toLowerCase() || r.phone === phone) &&
            r.paymentStatus === 'PAID'
        );
        if (duplicate) {
            return NextResponse.json({ error: 'This email address or phone number is already registered and database status is PAID.' }, { status: 400 });
        }

        if (!fullLengthPhoto || !closeUpPhoto || typeof fullLengthPhoto === 'string' || typeof closeUpPhoto === 'string') {
            return NextResponse.json({ error: 'Both photos (Full Length and Close-up) are required.' }, { status: 400 });
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        const validatePhoto = (file, label) => {
            if (!allowedTypes.includes(file.type)) {
                const ext = path.extname(file.name).toLowerCase();
                if (!allowedExtensions.includes(ext)) {
                    throw new Error(`${label}: Invalid file type. Allowed formats: JPG, JPEG, PNG, WEBP.`);
                }
            }
            if (file.size > 5 * 1024 * 1024) {
                throw new Error(`${label}: File size exceeds 5 MB limit.`);
            }
        };

        try {
            validatePhoto(fullLengthPhoto, 'Full Length Photo');
            validatePhoto(closeUpPhoto, 'Close-Up Photo');
        } catch (validationErr) {
            return NextResponse.json({ error: validationErr.message }, { status: 400 });
        }

        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const registrationId = `NINTM-${randomNum}`;

        // Upload Full Length Photo to Vercel Blob
        const fullLengthExt = path.extname(fullLengthPhoto.name).toLowerCase() || '.jpg';
        const fullLengthFileName = `${registrationId}-fullLength${fullLengthExt}`;
        const fullLengthBlob = await put(fullLengthFileName, fullLengthPhoto, {
            access: 'public',
        });

        // Upload Close-Up Photo to Vercel Blob
        const closeUpExt = path.extname(closeUpPhoto.name).toLowerCase() || '.jpg';
        const closeUpFileName = `${registrationId}-closeUp${closeUpExt}`;
        const closeUpBlob = await put(closeUpFileName, closeUpPhoto, {
            access: 'public',
        });

        const registrationData = {
            registrationId,
            id: registrationId,
            name,
            fullName: name,
            instagramUsername,
            dateOfBirth,
            dob: dateOfBirth,
            email,
            phone,
            whatsapp,
            height,
            state,
            city,
            pincode,
            fullLengthPhoto: fullLengthBlob.url,
            closeUpPhoto: closeUpBlob.url,
            paymentStatus: 'PENDING',
            paymentAmount: 0
        };

        const registration = await addRegistration(registrationData);

        return NextResponse.json({ success: true, registration }, { status: 201 });
    } catch (error) {
        console.error('API Register error:', error);
        return NextResponse.json({ error: 'An error occurred during registration creation.' }, { status: 500 });
    }
}