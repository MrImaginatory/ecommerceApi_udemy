// emailTemplates/verificationEmail.js

import authBaseUrl from "../constants/baseUrls.constant.js";

export default function generateVerificationEmail(jwtToken) {
  const verificationLink = `${authBaseUrl}verify?token=${jwtToken}`;

  return {
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Email Verification</h2>
        <p>Thank you for signing up! Please click the button below to verify your email address:</p>
        <p>
          <a href="${verificationLink}" 
            style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
        </p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <br>
        <p>If you did not request this, you can safely ignore this email.</p>
      </div>
    `
  };
}
