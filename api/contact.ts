import nodemailer from 'nodemailer';

// Helper to create mail transporter with fast timeout so it never hangs serverless lambdas
function createTransporter(port: number, secure: boolean) {
  const host = process.env.SMTP_HOST || 'mail.reachvector.in';
  const user = process.env.SMTP_USER || 'contact@reachvector.in';
  const pass = process.env.SMTP_PASS || 'geYLyeO$4$boHNG';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    // @ts-ignore
    family: 4,
    connectionTimeout: 3500,
    greetingTimeout: 3500,
    socketTimeout: 4000,
  });
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      endpoint: '/api/contact',
      service: 'ReachVector Intelligence Contact Service',
      time: new Date().toISOString(),
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      // ignore
    }
  }

  const { fullName, email, country, inquiryType, message, code } = body || {};

  if (!email || !fullName) {
    return res.status(400).json({
      success: false,
      error: 'Full name and email address are required.',
    });
  }

  const referenceCode = code || `RV-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`;
  const timestamp = new Date().toISOString();
  const safeCountry = country || 'India';
  const safeInquiry = inquiryType || 'General Company Inquiry';
  const safeMessage = message || '(No message content provided)';

  console.log(`[Contact Submission] Ref: ${referenceCode} | From: ${fullName} <${email}> | Type: ${safeInquiry}`);

  // 1. Email to Customer
  const customerSubject = `We've received your inquiry — ReachVector Intelligence [Ref: ${referenceCode}]`;
  const customerText = `Hello ${fullName},

Thank you for reaching out to ReachVector Intelligence regarding "${safeInquiry}".

This email confirms that your message has been received by our engineering and product team. We will review your inquiry and get back to you promptly.

Inquiry Reference: ${referenceCode}
Time: ${timestamp}
Topic: ${safeInquiry}

Your message:
${safeMessage}

If you have additional notes, reply directly to this email or write to contact@reachvector.in quoting reference ${referenceCode}.

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
    Thank you for contacting ReachVector Intelligence. We have received your inquiry regarding <strong>"${safeInquiry}"</strong> and our team will review it promptly.
  </p>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr>
        <td style="padding: 4px 0; color: #64748b; width: 120px;"><strong>Reference ID:</strong></td>
        <td style="padding: 4px 0; color: #0f172a; font-family: monospace;">${referenceCode}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #64748b;"><strong>Topic / Issue:</strong></td>
        <td style="padding: 4px 0; color: #0f172a;">${safeInquiry}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td>
        <td style="padding: 4px 0; color: #0f172a; white-space: pre-wrap;">${safeMessage}</td>
      </tr>
    </table>
  </div>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8;">
    ReachVector Intelligence · Bengaluru, Karnataka, India<br />
    <a href="https://reachvector.in" style="color: #64748b; text-decoration: none;">reachvector.in</a> · <a href="mailto:contact@reachvector.in" style="color: #64748b; text-decoration: none;">contact@reachvector.in</a>
  </div>
</div>
`;

  // 2. Email to Team
  const teamSubject = `[Inquiry ${referenceCode}] ${safeInquiry} from ${fullName}`;
  const teamText = `
New Contact Submission on ReachVector Intelligence:
--------------------------------------------------
Reference ID : ${referenceCode}
Time         : ${timestamp}
Full Name    : ${fullName}
Email        : ${email}
Country      : ${safeCountry}
Issue/Topic  : ${safeInquiry}

Message:
${safeMessage}
--------------------------------------------------
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
      <td style="padding: 8px 0; color: #64748b;"><strong>Country:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;">${safeCountry}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #64748b;"><strong>Issue / Topic:</strong></td>
      <td style="padding: 8px 0; color: #0f172a;"><span style="display: inline-block; background-color: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-weight: 600;">${safeInquiry}</span></td>
    </tr>
  </table>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;">Message:</h4>
    <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b;">${safeMessage}</p>
  </div>
</div>
`;

  let customerSent = false;
  let teamSent = false;

  // Method A: If RESEND_API_KEY is configured in Vercel, send via Resend HTTPS (100% reliable)
  if (process.env.RESEND_API_KEY) {
    try {
      console.log('Sending via Resend API (HTTPS)...');
      const fromAddress = process.env.RESEND_FROM || 'contact@reachvector.in';

      // Send to customer
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `ReachVector Intelligence <${fromAddress}>`,
          to: [email],
          subject: customerSubject,
          html: customerHtml,
        }),
      });
      customerSent = true;

      // Send to team
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `ReachVector Inquiries <${fromAddress}>`,
          to: ['contact@reachvector.in'],
          reply_to: email,
          subject: teamSubject,
          html: teamHtml,
        }),
      });
      teamSent = true;
    } catch (resendErr) {
      console.warn('Resend API attempt failed:', resendErr);
    }
  }

  // Method B: Attempt SMTP if not sent via API
  if (!customerSent || !teamSent) {
    const configs = [
      { port: 465, secure: true },
      { port: 587, secure: false },
    ];

    for (const cfg of configs) {
      try {
        const transporter = createTransporter(cfg.port, cfg.secure);

        if (!customerSent) {
          await transporter.sendMail({
            from: `"ReachVector Intelligence" <contact@reachvector.in>`,
            to: email,
            subject: customerSubject,
            text: customerText,
            html: customerHtml,
          });
          customerSent = true;
        }

        if (!teamSent) {
          await transporter.sendMail({
            from: `"ReachVector Inquiries" <contact@reachvector.in>`,
            to: 'contact@reachvector.in',
            replyTo: `"${fullName}" <${email}>`,
            subject: teamSubject,
            text: teamText,
            html: teamHtml,
          });
          teamSent = true;
        }

        break;
      } catch (smtpErr: any) {
        console.warn(`SMTP port ${cfg.port} notice:`, smtpErr?.message);
      }
    }
  }

  // Always return success to client so user gets their reference code
  return res.status(200).json({
    success: true,
    referenceCode,
    customerEmailSent: customerSent,
    teamEmailSent: teamSent,
    message: 'Your inquiry has been registered with the ReachVector team.',
  });
}
