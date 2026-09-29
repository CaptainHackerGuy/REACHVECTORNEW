import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory queue / log for submitted inquiries
interface InquiryRecord {
  id: string;
  timestamp: string;
  fullName: string;
  email: string;
  country: string;
  inquiryType: string;
  message: string;
  status: 'sent' | 'queued' | 'failed';
  errorDetails?: string;
}

const inquiries: InquiryRecord[] = [];

// Helper function to create nodemailer transporter
function createMailTransporter(useFallbackPort = false) {
  const host = process.env.SMTP_HOST || 'mail.reachvector.in';
  const port = useFallbackPort ? 587 : (Number(process.env.SMTP_PORT) || 465);
  const secure = !useFallbackPort && port === 465;
  const user = process.env.SMTP_USER || 'contact@reachvector.in';
  const pass = process.env.SMTP_PASS || 'geYLyeO$4$boHNG';

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false, // allow self-signed or domain mismatched certs if any
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

// Contact Form API Endpoint
app.post('/api/contact', async (req, res) => {
  const { fullName, email, country, inquiryType, message, code } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({
      success: false,
      error: 'Full name and email are required.',
    });
  }

  const referenceCode = code || `RV-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`;
  const timestamp = new Date().toISOString();

  const record: InquiryRecord = {
    id: referenceCode,
    timestamp,
    fullName,
    email,
    country: country || 'Not Specified',
    inquiryType: inquiryType || 'General Inquiry',
    message: message || '(No message content provided)',
    status: 'queued',
  };

  inquiries.push(record);

  // Email payload for ReachVector Team
  const adminSubject = `[Inquiry ${referenceCode}] ${record.inquiryType} - ${fullName}`;
  const adminText = `
New inquiry received on ReachVector Intelligence portal:
--------------------------------------------------
Reference ID : ${referenceCode}
Time         : ${timestamp}
Full Name    : ${fullName}
Email        : ${email}
Country      : ${record.country}
Inquiry Type : ${record.inquiryType}

Message:
${record.message}
--------------------------------------------------
ReachVector Intelligence LLP · Corporate Portal
`;

  const adminHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
  <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 700;">ReachVector Intelligence — New Inquiry</h2>
    <span style="font-family: monospace; font-size: 12px; color: #64748b;">Reference: ${referenceCode}</span>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
    <tr>
      <td style="padding: 8px 0; color: #64748b; width: 130px;"><strong>Sender Name:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;">${fullName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Sender Email:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Country / Territory:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;">${record.country}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Inquiry Type:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;"><span style="display: inline-block; background-color: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-weight: 600;">${record.inquiryType}</span></td>
    </tr>
  </table>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;">Message / Kit Details:</h4>
    <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b;">${record.message}</p>
  </div>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; font-family: monospace;">
    ReachVector Intelligence LLP · LLPIN ADC-7323<br />
    #38 Bellandur, Bengaluru, Karnataka, India - 560103
  </div>
</div>
`;

  let emailSent = false;
  let attemptError = '';

  // Attempt 1: Port 465 (SSL)
  try {
    const transporter = createMailTransporter(false);
    await transporter.sendMail({
      from: `"ReachVector Portal" <contact@reachvector.in>`,
      to: process.env.CONTACT_TO || 'contact@reachvector.in',
      replyTo: `"${fullName}" <${email}>`,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });
    emailSent = true;
    record.status = 'sent';
  } catch (err: any) {
    attemptError = err?.message || String(err);
    console.warn(`[SMTP Port 465] Error dispatching mail: ${attemptError}`);

    // Attempt 2: Fallback to Port 587 (STARTTLS)
    try {
      console.log('[SMTP] Attempting fallback on Port 587...');
      const fallbackTransporter = createMailTransporter(true);
      await fallbackTransporter.sendMail({
        from: `"ReachVector Portal" <contact@reachvector.in>`,
        to: process.env.CONTACT_TO || 'contact@reachvector.in',
        replyTo: `"${fullName}" <${email}>`,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
      });
      emailSent = true;
      record.status = 'sent';
    } catch (fallbackErr: any) {
      const fbMsg = fallbackErr?.message || String(fallbackErr);
      console.warn(`[SMTP Port 587] Fallback also failed: ${fbMsg}`);
      record.status = 'queued';
      record.errorDetails = fbMsg;
    }
  }

  // Also send user confirmation email if first email succeeded
  if (emailSent) {
    try {
      const userTransporter = createMailTransporter(false);
      await userTransporter.sendMail({
        from: `"ReachVector Intelligence" <contact@reachvector.in>`,
        to: email,
        subject: `Inquiry Received [${referenceCode}] — ReachVector Intelligence`,
        text: `Hello ${fullName},\n\nThank you for reaching out to ReachVector Intelligence LLP regarding "${record.inquiryType}".\n\nYour inquiry reference number is: ${referenceCode}\n\nOur team has received your communication and will review your notes promptly.\n\nBest regards,\nReachVector Intelligence LLP\ncontact@reachvector.in`,
      });
    } catch (uErr) {
      console.warn('[SMTP] Could not send receipt email to user:', uErr);
    }
  }

  // Always return success with referenceCode to the user
  return res.status(200).json({
    success: true,
    referenceCode,
    emailSent,
    message: emailSent
      ? 'Inquiry received and transmitted to ReachVector team.'
      : 'Inquiry registered and queued for the ReachVector team.',
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'reachvector-backend',
    smtpHost: process.env.SMTP_HOST || 'mail.reachvector.in',
    time: new Date().toISOString(),
  });
});

// Inquiries status check endpoint (for diagnostics)
app.get('/api/inquiries/count', (req, res) => {
  res.json({
    total: inquiries.length,
    sent: inquiries.filter((i) => i.status === 'sent').length,
    queued: inquiries.filter((i) => i.status === 'queued').length,
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] ReachVector Intelligence portal listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
