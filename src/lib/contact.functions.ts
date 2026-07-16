import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "nprathamesh519@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

    if (!apiKey) {
      return { sent: false, reason: "email_not_configured" as const };
    }

    const html = `
      <div style="font-family:system-ui,sans-serif;background:#0b1020;color:#e6eeff;padding:24px;border-radius:12px">
        <h2 style="margin:0 0 12px;color:#7cc4ff">New portfolio transmission</h2>
        <p><strong>Name:</strong> ${escape(data.name)}</p>
        <p><strong>Email:</strong> ${escape(data.email)}</p>
        <p style="white-space:pre-wrap"><strong>Message:</strong><br/>${escape(data.message)}</p>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Portfolio contact from ${data.name}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend send failed", res.status, body);
      throw new Error(`Email send failed: ${res.status}`);
    }

    return { sent: true as const };
  });

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
