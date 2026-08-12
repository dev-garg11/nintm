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

    // Generate high-end Registration ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `NINTM-2026-${randomNum}`;

    const newRegistration = {
        id: registrationId,
        ...data,
        paymentStatus: 'Pending', // Pending, Successful, Failed
        applicationStatus: 'Payment Successful', // Payment Pending -> Payment Successful -> Under Review -> Shortlisted -> Selected
        createdAt: new Date().toISOString(),
        paymentDetails: null
    };

    registrations.push(newRegistration);
    saveRegistrations(registrations);
    return newRegistration;
}

export function updateRegistrationStatus(id, paymentStatus, applicationStatus, paymentDetails = null) {
    const registrations = getRegistrations();
    const index = registrations.findIndex(r => r.id === id);
    if (index !== -1) {
        if (paymentStatus) registrations[index].paymentStatus = paymentStatus;
        if (applicationStatus) registrations[index].applicationStatus = applicationStatus;
        if (paymentDetails) registrations[index].paymentDetails = paymentDetails;
        saveRegistrations(registrations);
        return registrations[index];
    }
    return null;
}
