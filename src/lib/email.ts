import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const ADMIN_EMAILS = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || ''

function getTransporter() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  })
}

export async function sendAdminNotification({ subject, html, text }: { subject: string; html?: string; text?: string }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.log('[email] SMTP not configured, skipping send. Subject:', subject)
    return
  }

  const to = ADMIN_EMAILS
  if (!to) {
    console.log('[email] No admin email configured (ADMIN_EMAILS), skipping send. Subject:', subject)
    return
  }

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text,
      html
    })
    console.log('[email] Sent admin notification:', subject)
  } catch (err) {
    console.error('[email] Error sending admin notification', err)
  }
}

export async function sendAuthorNotification({ to, subject, html, text }: { to: string; subject: string; html?: string; text?: string }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.log('[email] SMTP not configured, skipping author send. Subject:', subject)
    return
  }
  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text,
      html
    })
    console.log('[email] Sent author notification to', to)
  } catch (err) {
    console.error('[email] Error sending author notification', err)
  }
}
