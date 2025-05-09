import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAIL_HOST,
    port: process.env.NODEMAIL_PORT,
    secure: process.env.NODEMAIL_SECURE === 'true',  // Ensure this is a boolean
    auth: {
        user: process.env.NODEMAIL_USERNAME,
        pass: process.env.NODEMAIL_PASSWORD,
    }
});

export default transporter;