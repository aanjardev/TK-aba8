import nodemailer from "nodemailer";

export type EmailTemplate = {
  subject: string;
  text: string;
  html: string;
};

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
}

export async function sendEmail(to: string, template: EmailTemplate) {
  const transport = getTransport();

  if (!transport) {
    console.warn("SMTP is not configured; email was not sent.");
    return false;
  }

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!from) {
    throw new Error("SMTP_FROM or SMTP_USER must be configured.");
  }

  await transport.sendMail({
    from,
    to,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });

  return true;
}
