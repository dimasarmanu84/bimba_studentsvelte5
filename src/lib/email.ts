import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from '$env/static/private';
import nodemailer from 'nodemailer';


// Create transporter
let transporter: nodemailer.Transporter | null = null;

if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: SMTP_USER || '',
      pass: SMTP_PASS || ''
    },
    tls: {
      ciphers: 'SSLv3'
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000 // 10 seconds
  });
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!transporter) {
      console.error('SMTP configuration not complete. Please set SMTP_USER and SMTP_PASS environment variables.');
      return false;
    }

    const mailOptions = {
      from: options.from || 'noreply@darunnajah.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

export function generateQRCodeEmailTemplate(qrCodeDataUrl: string, userEmail: string, appName: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Setup Your Authenticator</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          max-width: 120px;
          margin-bottom: 20px;
        }
        .qr-container {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .qr-code {
          max-width: 200px;
          height: auto;
          margin: 20px 0;
        }
        .instructions {
          background-color: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .step {
          margin: 10px 0;
          padding-left: 20px;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Setup Your Authenticator</h1>
          <p>Welcome to ${appName}</p>
        </div>
        
        <p>Hello,</p>
        <p>You've requested to set up two-factor authentication for your account: <strong>${userEmail}</strong></p>
        
        <div class="qr-container">
          <h3>Scan this QR Code</h3>
          <img src="${qrCodeDataUrl}" alt="QR Code for Authenticator Setup" class="qr-code" />
        </div>
        
        <div class="instructions">
          <h3>Setup Instructions:</h3>
          <div class="step">1. Download Google Authenticator or any compatible TOTP app</div>
          <div class="step">2. Open the app and tap "Add Account" or "+"</div>
          <div class="step">3. Scan the QR code above with your phone's camera</div>
          <div class="step">4. Enter the 6-digit code from your authenticator app to complete login</div>
        </div>
        
        <div class="warning">
          <strong>Security Notice:</strong> This QR code is unique to your account. Do not share it with anyone. If you didn't request this setup, please contact support immediately.
        </div>
        
        <p>If you're having trouble scanning the QR code, you can manually enter the setup key in your authenticator app.</p>
        
        <div class="footer">
          <p>This email was sent from ${appName}</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
