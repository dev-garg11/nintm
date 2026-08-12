import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(candidate) {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || 'NINTM – The Comeback 2026 <nintmofficial@gmail.com>';

    const formattedDate = new Date(candidate.paymentDate || new Date().toISOString()).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const emailSubject = `NINTM – THE COMEBACK 2026: Registration Successful (${candidate.registrationId})`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; background-color: #081C3A; color: #ffffff; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #D4AF37; margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">NINTM</h1>
                <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 11px; letter-spacing: 4px; text-transform: uppercase;">THE COMEBACK 2026</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; text-transform: uppercase; margin-top: 0;">Registration Successful</h2>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    Hello ${candidate.name},
                </p>
                <p style="color: #D9E1EC; font-size: 14px; line-height: 1.6;">
                    Your registration for <strong>NINTM &ndash; THE COMEBACK 2026</strong> has been successfully completed and confirmed.
                </p>
            </div>

            <div style="background-color: #0B2347; border: 1px solid #D4AF37; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #D4AF37; text-transform: uppercase; font-size: 12px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 8px;">Dossier Credentials</h3>
                <table style="width: 100%; font-size: 13px; color: #D9E1EC; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold; width: 40%;">Registration ID:</td>
                        <td style="padding: 6px 0; color: #D4AF37; font-family: monospace; font-weight: bold;">${candidate.registrationId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Name:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${candidate.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Registration Fee:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">₹${candidate.paymentAmount}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Gateway Payment ID:</td>
                        <td style="padding: 6px 0; color: #ffffff; font-family: monospace;">${candidate.razorpayPaymentId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Payment Date:</td>
                        <td style="padding: 6px 0; color: #ffffff;">${formattedDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: bold;">Payment Status:</td>
                        <td style="padding: 6px 0; color: #22c55e; font-weight: bold;">PAID</td>
                    </tr>
                </table>
            </div>

            <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 20px; text-align: center;">
                <p style="color: #D4AF37; font-size: 13px; font-weight: bold; margin-bottom: 8px;">
                    Please keep your Registration ID for future communication.
                </p>
                <p style="color: #D9E1EC; font-size: 11px; line-height: 1.6; margin: 0;">
                    Our modeling review board will begin evaluating your profile submissions. Selected candidates will be notified for physical auditions.
                </p>
            </div>
        </div>
    `;

    const textBody = `
NINTM – THE COMEBACK 2026

Registration Successful!

Registration ID: ${candidate.registrationId}
Name: ${candidate.name}
Amount Paid: ₹${candidate.paymentAmount}
Payment ID: ${candidate.razorpayPaymentId}
Payment Date: ${formattedDate}
Payment Status: PAID

Please keep your Registration ID for future communication.
    `;

    if (!smtpUser || !smtpPass) {
        console.log(`
=========================================
[SIMULATED EMAIL DISPATCH]
To: ${candidate.email}
Subject: ${emailSubject}
-----------------------------------------
${textBody}
=========================================
        `);
        return true;
    }

    try {
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        await transporter.sendMail({
            from: smtpFrom,
            to: candidate.email,
            subject: emailSubject,
            text: textBody,
            html: htmlBody
        });

        console.log(`Confirmation email sent successfully to ${candidate.email}`);
        return true;
    } catch (error) {
        console.error('Error sending confirmation email via SMTP. Falling back to log print.', error);
        console.log(`
=========================================
[EMAIL DISPATCH FAILURE FALLBACK LOG]
To: ${candidate.email}
Subject: ${emailSubject}
-----------------------------------------
${textBody}
=========================================
        `);
        return false;
    }
}
