import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure database directory and file exist
function initializeDB() {
    if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ registrations: [] }, null, 2), 'utf-8');
    }
}

export function getRegistrations() {
    try {
        initializeDB();
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data).registrations || [];
    } catch (error) {
        console.error('Error reading registration DB:', error);
        return [];
    }
}

export function saveRegistrations(registrations) {
    try {
        initializeDB();
        fs.writeFileSync(DB_FILE, JSON.stringify({ registrations }, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing to registration DB:', error);
        return false;
    }
}

export function addRegistration(data) {
    const registrations = getRegistrations();

    // Generate unique Registration ID if not provided
    const registrationId = data.registrationId || data.id || `NINTM-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRegistration = {
        registrationId,
        id: registrationId, // Alias for backward compatibility
        name: data.name || data.fullName || '',
        fullName: data.name || data.fullName || '', // Alias for backward compatibility
        instagramUsername: data.instagramUsername || '',
        dateOfBirth: data.dateOfBirth || data.dob || '',
        dob: data.dateOfBirth || data.dob || '', // Alias for backward compatibility
        email: data.email || '',
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        height: data.height || '',
        state: data.state || '',
        city: data.city || '',
        pincode: data.pincode || '',
        fullLengthPhoto: data.fullLengthPhoto || '',
        closeUpPhoto: data.closeUpPhoto || '',
        paymentStatus: data.paymentStatus || 'PENDING', // PENDING, PAID, FAILED
        paymentAmount: data.paymentAmount || 0,
        razorpayOrderId: data.razorpayOrderId || '',
        razorpayPaymentId: data.razorpayPaymentId || '',
        razorpaySignature: data.razorpaySignature || '',
        paymentDate: data.paymentDate || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        applicationStatus: data.applicationStatus || 'Payment Pending', // Admin review status alias
    };

    registrations.push(newRegistration);
    saveRegistrations(registrations);
    return newRegistration;
}

export function updateRegistration(id, updates) {
    const registrations = getRegistrations();
    const index = registrations.findIndex(r => r.id === id || r.registrationId === id);
    if (index !== -1) {
        registrations[index] = {
            ...registrations[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        // Keep ID aliases synchronized
        if (updates.registrationId) registrations[index].id = updates.registrationId;
        if (updates.name) registrations[index].fullName = updates.name;
        if (updates.dateOfBirth) registrations[index].dob = updates.dateOfBirth;

        saveRegistrations(registrations);
        return registrations[index];
    }
    return null;
}

export function updateRegistrationStatus(id, paymentStatus, applicationStatus, paymentDetails = null) {
    const updates = {};
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (applicationStatus) updates.applicationStatus = applicationStatus;
    if (paymentDetails) {
        updates.razorpayPaymentId = paymentDetails.paymentId || '';
        updates.razorpayOrderId = paymentDetails.orderId || '';
        updates.razorpaySignature = paymentDetails.signature || '';
        updates.paymentDate = paymentDetails.date || new Date().toISOString();
        if (paymentDetails.amount) updates.paymentAmount = paymentDetails.amount;
    }
    return updateRegistration(id, updates);
}

