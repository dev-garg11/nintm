import { NextResponse } from 'next/server';
import { addRegistration, getRegistrations } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
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

        // Validation: Required Text Fields
        if (!name || !instagramUsername || !dateOfBirth || !email || !phone || !whatsapp || !height || !state || !city || !pincode) {
            return NextResponse.json({ error: 'Missing required text fields. Please complete all fields.' }, { status: 400 });
        }

        // Validation: Duplicate Registration Check
        const registrations = getRegistrations();
        const duplicate = registrations.find(r =>
            (r.email?.toLowerCase() === email.toLowerCase() || r.phone === phone) &&
            r.paymentStatus === 'PAID'
        );
        if (duplicate) {
            return NextResponse.json({ error: 'This email address or phone number is already registered and database status is PAID.' }, { status: 400 });
        }

        // Validation: Required Photo Fields
        if (!fullLengthPhoto || !closeUpPhoto || typeof fullLengthPhoto === 'string' || typeof closeUpPhoto === 'string') {
            return NextResponse.json({ error: 'Both photos (Full Length and Close-up) are required.' }, { status: 400 });
        }

        // Validation: File types and sizes
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        const validatePhoto = (file, label) => {
            if (!allowedTypes.includes(file.type)) {
                // Also check file name extension just in case MIME type is empty
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

        // Generate Registration ID: NINTM-XXXXXX (6 digit number)
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const registrationId = `NINTM-${randomNum}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        // Save Full Length Photo
        const fullLengthExt = path.extname(fullLengthPhoto.name).toLowerCase() || '.jpg';
        const fullLengthFileName = `${registrationId}-fullLength${fullLengthExt}`;
        const fullLengthBuffer = Buffer.from(await fullLengthPhoto.arrayBuffer());
        await writeFile(path.join(uploadDir, fullLengthFileName), fullLengthBuffer);

        // Save Close-Up Photo
        const closeUpExt = path.extname(closeUpPhoto.name).toLowerCase() || '.jpg';
        const closeUpFileName = `${registrationId}-closeUp${closeUpExt}`;
        const closeUpBuffer = Buffer.from(await closeUpPhoto.arrayBuffer());
        await writeFile(path.join(uploadDir, closeUpFileName), closeUpBuffer);

        // Add to database
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
            fullLengthPhoto: `/uploads/${fullLengthFileName}`,
            closeUpPhoto: `/uploads/${closeUpFileName}`,
            paymentStatus: 'PENDING',
            paymentAmount: 0 // To be updated during order creation
        };

        const registration = addRegistration(registrationData);

        return NextResponse.json({ success: true, registration }, { status: 201 });
    } catch (error) {
        console.error('API Register error:', error);
        return NextResponse.json({ error: 'An error occurred during registration creation.' }, { status: 500 });
    }
}
