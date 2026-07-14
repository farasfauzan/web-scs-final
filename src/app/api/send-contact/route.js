import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { getSetting } from "@/lib/data";
import { ContactNotificationEmail } from "@/emails/ContactNotificationEmail";

// Simple HTML escape to prevent injection in email template
const escapeHtml = (str) => {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validasi field wajib
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, Email, dan Pesan harus diisi" },
        { status: 400 }
      );
    }

    // Validasi format email
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Escape hanya untuk subject line (plain text, bukan React)
    // Data untuk React Email template tidak perlu di-escape (React handle otomatis)
    const emailSubject = `[Pesan dari Website] ${escapeHtml(subject || "Tidak ada subjek")} - dari ${escapeHtml(name)}`;

    // Ambil settings dari database
    const contactEmail = (await getSetting("contact_email")) || process.env.CONTACT_EMAIL || "__REDACTED__@__REDACTED__.com";
    const fromEmail = (await getSetting("contact_from_email")) || process.env.CONTACT_FROM_EMAIL || "__REDACTED__@__REDACTED__.dev";
    const fromName = "Hubungi Kami";

    // Kirim email via Resend menggunakan React Email template
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      reply_to: email,
      to: contactEmail,
      subject: emailSubject,
      react: ContactNotificationEmail({
        name,
        email,
        phone,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Gagal mengirim pesan. Silakan coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim! Kami akan menghubungi Anda segera.",
    });
  } catch (error) {
    console.error("Send contact error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
