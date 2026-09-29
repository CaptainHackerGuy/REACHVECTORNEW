import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolve4Async = promisify(dns.resolve4);

// Helper to create mail transporter
function createTransporter(port: number, secure: boolean) {
  const host = process.env.SMTP_HOST || 'mail.reachvector.in';
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
      rejectUnauthorized: false,
    },
    // @ts-ignore Force IPv4 in AWS Lambda/Vercel to prevent IPv6 DNS hang
    family: 4,
    connectionTimeout: 7000,
    greetingTimeout: 7000,
    socketTimeout: 9000,
  });
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Active GET diagnostic probe to test SMTP connectivity directly from browser or Vercel
  if (req.method === 'GET') {
    const diagLogs: string[] = [];
    const host = process.env.SMTP_HOST || 'mail.reachvector.in';
    const user = process.env.SMTP_USER || 'contact@reachvector.in';

    diagLogs.push(`[DNS] Resolving ${host}...`);
    let ip = 'unknown';
    try {
      const addresses = await resolve4Async(host);
      ip = addresses.join(', ');
      diagLogs.push(`[DNS] Resolved to IP(s): ${ip}`);
    } catch (e: any) {
      diagLogs.push(`[DNS] Resolution error: ${e.message}`);
    }

    // Probe 465
    diagLogs.push(`[SMTP 465] Testing connection to ${host}:465 (SSL)...`);
    let port465Success = false;
    let port465Error = '';
    try {
      const t465 = createTransporter(465, true);
      await t465.verify();
      port465Success = true;
      diagLogs.push(`[SMTP 465] ✅ Connection & Authentication Verified!`);
    } catch (e: any) {
      port465Error = e.message || String(e);
      diagLogs.push(`[SMTP 465] ❌ Error: ${port465Error}`);
    }

    // Probe 587
    diagLogs.push(`[SMTP 587] Testing connection to ${host}:587 (STARTTLS)...`);
    let port587Success = false;
    let port587Error = '';
    try {
      const t587 = createTransporter(587, false);
      await t587.verify();
      port587Success = true;
      diagLogs.push(`[SMTP 587] ✅ Connection & Authentication Verified!`);
    } catch (e: any) {
      port587Error = e.message || String(e);
      diagLogs.push(`[SMTP 587] ❌ Error: ${port587Error}`);
    }

    return res.status(200).json({
      status: 'diagnostic_report',
      timestamp: new Date().toISOString(),
      smtpHost: host,
      smtpUser: user,
      resolvedIp: ip,
      port465: { status: port465Success ? 'CONNECTED' : 'FAILED', error: port465Error || null },
      port587: { status: port587Success ? 'CONNECTED' : 'FAILED', error: port587Error || null },
      logs: diagLogs,
      environment: process.env.VERCEL ? 'Vercel Serverless' : 'Node.js Runtime',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const logs: string[] = [];
  const log = (msg: string) => {
    const entry = `[${new Date().toISOString().split('T')[1].slice(0, 8)}] ${msg}`;
    logs.push(entry);
    console.log(`[ReachVector Mail] ${entry}`);
  };

  // Parse body if stringified
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      // keep
    }
  }

  const { fullName, email, country, inquiryType, message, code } = body || {};

  if (!email || !fullName) {
    return res.status(400).json({
      success: false,
      error: 'Full name and email are required.',
    });
  }

  const referenceCode = code || `RV-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`;
  const timestamp = new Date().toISOString();
  const safeCountry = country || 'Not Specified';
  const safeInquiry = inquiryType || 'General Company Inquiry';
  const safeMessage = message || '(No message content provided)';

  log(`New inquiry received: Ref=${referenceCode}, From="${fullName}" <${email}>, Type="${safeInquiry}"`);

  // 1. Customer Email Content
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

  // 2. Team Notification Content
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

  const configs = [
    { port: 465, secure: true, name: 'Port 465 (SSL)' },
    { port: 587, secure: false, name: 'Port 587 (STARTTLS)' },
  ];

  let customerSent = false;
  let teamSent = false;
  let activeError: string | null = null;

  for (const cfg of configs) {
    log(`Attempting SMTP connection via ${cfg.name}...`);
    try {
      const transporter = createTransporter(cfg.port, cfg.secure);

      // Verify connection first
      await transporter.verify();
      log(`✅ ${cfg.name} verification succeeded!`);

      // 1. Send confirmation to customer
      log(`Sending customer confirmation email to <${email}>...`);
      const cRes = await transporter.sendMail({
        from: `"ReachVector Intelligence" <contact@reachvector.in>`,
        to: email,
        subject: customerSubject,
        text: customerText,
        html: customerHtml,
      });
      customerSent = true;
      log(`✅ Customer confirmation sent! MessageID: ${cRes.messageId}`);

      // 2. Send notification to team
      log(`Sending team notification email to <contact@reachvector.in>...`);
      const tRes = await transporter.sendMail({
        from: `"ReachVector Inquiries" <contact@reachvector.in>`,
        to: 'contact@reachvector.in',
        replyTo: `"${fullName}" <${email}>`,
        subject: teamSubject,
        text: teamText,
        html: teamHtml,
      });
      teamSent = true;
      log(`✅ Team notification sent! MessageID: ${tRes.messageId}`);
      break; // Success with this configuration
    } catch (err: any) {
      activeError = err?.message || String(err);
      log(`❌ ${cfg.name} failed: ${activeError}`);
    }
  }

  log(`Dispatch summary: customerSent=${customerSent}, teamSent=${teamSent}`);

  return res.status(200).json({
    success: true,
    referenceCode,
    customerEmailSent: customerSent,
    teamEmailSent: teamSent,
    error: activeError,
    logs,
    message: customerSent && teamSent
      ? 'Inquiry received and emails dispatched successfully.'
      : 'Inquiry received. SMTP notification queued.',
  });
}
