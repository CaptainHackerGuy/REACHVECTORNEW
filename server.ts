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
  customerEmailSent: boolean;
  teamEmailSent: boolean;
  errorDetails?: string;
}

const inquiries: InquiryRecord[] = [];

// Helper function to create nodemailer transporter with optimized timeout
function createMailTransporter(port = 465, secure = true) {
  const host = process.env.SMTP_HOST || 'mail.reachvector.in';
  const user = process.env.SMTP_USER || 'contact@reachvector.in';
  const pass = process.env.SMTP_PASS || 'geYLyeO$4$boHNG';

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 4000,
    greetingTimeout: 4000,
    socketTimeout: 6000,
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
    customerEmailSent: false,
    teamEmailSent: false,
  };

  inquiries.push(record);

  // 1. Email Payload for Customer Confirmation
  const customerSubject = `We've received your inquiry — ReachVector Intelligence [Ref: ${referenceCode}]`;
  const customerText = `Hello ${fullName},

Thank you for reaching out to ReachVector Intelligence regarding "${record.inquiryType}".

This email confirms that your message has been received by our engineering and product team. We will review your inquiry and get back to you promptly.

Your Inquiry Details:
--------------------------------------------------
Reference ID : ${referenceCode}
Time         : ${timestamp}
Inquiry Type : ${record.inquiryType}
Message      :
${record.message}
--------------------------------------------------

If you have any further notes to add, simply reply to this email or write to contact@reachvector.in with reference code ${referenceCode}.

Warm regards,
ReachVector Intelligence Team
https://reachvector.in
contact@reachvector.in
`;

  const customerHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
  <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 700;">ReachVector Intelligence</h2>
    <span style="font-family: monospace; font-size: 12px; color: #64748b;">Inquiry Reference: ${referenceCode}</span>
  </div>

  <p style="font-size: 15px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">
    Hello <strong>${fullName}</strong>,
  </p>

  <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px;">
    Thank you for reaching out to ReachVector Intelligence. This is a confirmation that your inquiry regarding <strong>"${record.inquiryType}"</strong> has been received by our team and will be looked into promptly.
  </p>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Summary of Your Submission</h4>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr>
        <td style="padding: 4px 0; color: #64748b; width: 120px;"><strong>Reference ID:</strong></td>
        <td style="padding: 4px 0; color: #0f172a; font-family: monospace;">${referenceCode}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #64748b;"><strong>Topic / Issue:</strong></td>
        <td style="padding: 4px 0; color: #0f172a;">${record.inquiryType}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td>
        <td style="padding: 4px 0; color: #0f172a; white-space: pre-wrap;">${record.message}</td>
      </tr>
    </table>
  </div>

  <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">
    If you have any further details or materials to share, you can reply directly to this email or reach us at <a href="mailto:contact@reachvector.in" style="color: #0284c7; text-decoration: none;">contact@reachvector.in</a>.
  </p>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8;">
    ReachVector Intelligence · Bengaluru, Karnataka, India<br />
    <a href="https://reachvector.in" style="color: #64748b; text-decoration: none;">reachvector.in</a> · <a href="mailto:contact@reachvector.in" style="color: #64748b; text-decoration: none;">contact@reachvector.in</a>
  </div>
</div>
`;

  // 2. Email Payload for Internal Notification (to contact@reachvector.in)
  const teamSubject = `[Inquiry ${referenceCode}] ${record.inquiryType} from ${fullName}`;
  const teamText = `
New Contact Submission on ReachVector Intelligence:
--------------------------------------------------
Reference ID : ${referenceCode}
Time         : ${timestamp}
Full Name    : ${fullName}
Email        : ${email}
Country      : ${record.country}
Issue/Topic  : ${record.inquiryType}

Message:
${record.message}
--------------------------------------------------
ReachVector Intelligence Corporate Portal
`;

  const teamHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
  <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 700;">ReachVector Intelligence — New Inquiry</h2>
    <span style="font-family: monospace; font-size: 12px; color: #64748b;">Reference: ${referenceCode}</span>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
    <tr>
      <td style="padding: 8px 0; color: #64748b; width: 130px;"><strong>Full Name:</strong></td>
      <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${fullName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Country / Region:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;">${record.country}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Issue / Topic:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;"><span style="display: inline-block; background-color: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-weight: 600;">${record.inquiryType}</span></td>
    </tr>
  </table>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;">Message:</h4>
    <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b;">${record.message}</p>
  </div>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; font-family: monospace;">
    ReachVector Intelligence Portal · Internal Dispatch
  </div>
</div>
`;

  // Function to dispatch emails via SMTP
  async function dispatchSmtp() {
    // Try port 465 (SSL) first, then port 587 (STARTTLS)
    const configs = [
      { port: 465, secure: true },
      { port: 587, secure: false },
    ];

    for (const cfg of configs) {
      try {
        const transporter = createMailTransporter(cfg.port, cfg.secure);

        // Step 1: Send confirmation email to customer
        await transporter.sendMail({
          from: `"ReachVector Intelligence" <contact@reachvector.in>`,
          to: email,
          subject: customerSubject,
          text: customerText,
          html: customerHtml,
        });
        record.customerEmailSent = true;

        // Step 2: Send detailed notification to contact@reachvector.in
        await transporter.sendMail({
          from: `"ReachVector Inquiries" <contact@reachvector.in>`,
          to: 'contact@reachvector.in',
          replyTo: `"${fullName}" <${email}>`,
          subject: teamSubject,
          text: teamText,
          html: teamHtml,
        });
        record.teamEmailSent = true;
        record.status = 'sent';
        console.log(`[SMTP] Successfully dispatched both emails via port ${cfg.port}`);
        return true;
      } catch (err: any) {
        console.warn(`[SMTP Port ${cfg.port}] Dispatch attempt failed: ${err.message}`);
        record.errorDetails = err.message;
      }
    }
    return false;
  }

  // Attempt SMTP dispatch with timeout protection
  try {
    const success = await Promise.race([
      dispatchSmtp(),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 5000)),
    ]);

    if (!success) {
      console.log(`[Server] Inquiry registered and queued: ${referenceCode}`);
    }
  } catch (err: any) {
    console.warn(`[Server] Error during mail dispatch:`, err);
  }

  // Return success response with reference code to the user
  return res.status(200).json({
    success: true,
    referenceCode,
    emailSent: record.status === 'sent',
    customerEmailSent: record.customerEmailSent,
    teamEmailSent: record.teamEmailSent,
    message: record.status === 'sent'
      ? 'Your inquiry has been received and confirmed. An acknowledgment email has been sent.'
      : 'Your inquiry has been registered with the ReachVector team.',
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

// Diagnostic inquiry review endpoint
app.get('/api/inquiries', (req, res) => {
  res.json({
    total: inquiries.length,
    inquiries: inquiries.map(i => ({
      id: i.id,
      timestamp: i.timestamp,
      fullName: i.fullName,
      email: i.email,
      inquiryType: i.inquiryType,
      status: i.status,
      customerEmailSent: i.customerEmailSent,
      teamEmailSent: i.teamEmailSent,
    })),
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
