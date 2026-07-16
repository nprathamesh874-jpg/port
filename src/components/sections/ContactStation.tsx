import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { Mail, Phone, Linkedin, Github, Send, MessageCircle } from "lucide-react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { SectionBackdrop, SectionHeader } from "./SkillsUniverse";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { sendContactEmail } from "@/lib/contact.functions";

const WHATSAPP_NUMBER = "918446692426"; // international format, no +
const EMAIL_ADDRESS = "nprathamesh519@gmail.com";

const channels = [
  { icon: Mail, label: "Email", value: EMAIL_ADDRESS, href: `mailto:${EMAIL_ADDRESS}` },
  { icon: Phone, label: "Phone", value: "+91 84466 92426", href: "tel:+918446692426" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 84466 92426", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/prathamesh-nalawade-994740262", href: "https://www.linkedin.com/in/prathamesh-nalawade-994740262" },
  { icon: Github, label: "GitHub", value: "github.com/nprathamesh519", href: "https://github.com/nprathamesh519" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export function ContactStation() {
  const [terminal, setTerminal] = useState("");
  const target = "CONTACT PRATHAMESH";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const sendEmail = useServerFn(sendContactEmail);

  useEffect(() => {
    const iv = setInterval(() => {
      setTerminal((s) => (s.length >= target.length ? target : target.slice(0, s.length + 1)));
    }, 90);
    return () => clearInterval(iv);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setStatus("error");
      return;
    }

    setStatus("sending");
    const { name, email, message } = parsed.data;

    // 1) Open WhatsApp with pre-filled message
    const waText =
      `Hi Prathamesh, this is ${name}.\n` +
      `Email: ${email}\n\n` +
      `${message}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // 2) Send email via Resend (server function)
    try {
      const result = await sendEmail({ data: { name, email, message } });
      if (!result.sent) {
        setError("Email not configured yet — WhatsApp opened.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setError("Email delivery failed — WhatsApp still opened.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden py-24">
      <SectionBackdrop />
      <SectionHeader eyebrow="SECTOR 06" title="Contact Station" subtitle="Open a comm channel. Signals routed instantly." />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel scanline mx-auto mb-10 max-w-2xl rounded-2xl px-6 py-4 text-center font-mono text-sm tracking-[0.3em]"
          style={{ color: "oklch(0.9 0.12 220)" }}
        >
          <span style={{ color: "oklch(0.7 0.15 220 / 0.7)" }}>&gt; </span>
          {terminal}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-1 inline-block h-[1em] w-[2px] align-middle bg-current" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Channels */}
          <div className="flex flex-col gap-3">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="glass-panel group flex items-center gap-4 rounded-xl p-4 transition"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "oklch(0.3 0.15 250 / 0.5)", boxShadow: "0 0 14px oklch(0.7 0.22 240 / 0.4)" }}>
                    <Icon className="h-5 w-5" style={{ color: "oklch(0.9 0.15 220)" }} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: "oklch(0.75 0.12 220)" }}>
                      {c.label.toUpperCase()}
                    </div>
                    <div className="text-sm" style={{ color: "oklch(0.95 0.05 230)" }}>{c.value}</div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel relative flex flex-col gap-4 rounded-2xl p-6 sm:p-8"
          >
            <Input
              label="CALLSIGN"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
            />
            <Input
              label="COMMS ADDRESS"
              name="email"
              type="email"
              placeholder="you@galaxy.dev"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
            />
            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.3em]" style={{ color: "oklch(0.75 0.12 220)" }}>
                TRANSMISSION
              </label>
              <textarea
                required
                rows={5}
                placeholder="Your message..."
                value={form.message}
                maxLength={1000}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg px-4 py-3 font-mono text-sm outline-none transition focus:ring-2"
                style={{
                  background: "oklch(0.1 0.05 270 / 0.6)",
                  border: "1px solid oklch(0.7 0.15 230 / 0.3)",
                  color: "oklch(0.95 0.05 230)",
                }}
              />
            </div>

            {error && (
              <p className="font-mono text-xs" style={{ color: "oklch(0.75 0.24 25)" }}>
                ✗ {error}
              </p>
            )}
            {status === "sent" && (
              <p className="font-mono text-xs" style={{ color: "oklch(0.8 0.2 160)" }}>
                ✓ Transmission dispatched — email sent & WhatsApp opened.
              </p>
            )}

            <div className="mt-2 flex items-center justify-between gap-4">
              <MagneticButton icon={<Send className="h-4 w-4" />}>
                {status === "sending"
                  ? "Transmitting..."
                  : status === "sent"
                  ? "Signal Received ✓"
                  : "Send Transmission"}
              </MagneticButton>
              {status === "sending" && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 1 }}
                  animate={{ scaleX: 1, opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="h-[2px] flex-1 origin-left rounded-full"
                  style={{ background: "linear-gradient(90deg, oklch(0.85 0.2 220), transparent)", boxShadow: "0 0 10px oklch(0.75 0.22 230)" }}
                />
              )}
            </div>

            <p className="font-mono text-[10px] leading-relaxed tracking-wider" style={{ color: "oklch(0.7 0.06 230 / 0.7)" }}>
              Opens WhatsApp with your message and delivers an email to {EMAIL_ADDRESS} via Resend.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] tracking-[0.3em]" style={{ color: "oklch(0.75 0.12 220)" }}>
        {label}
      </label>
      <input
        required
        {...rest}
        className="w-full rounded-lg px-4 py-3 font-mono text-sm outline-none transition focus:ring-2"
        style={{
          background: "oklch(0.1 0.05 270 / 0.6)",
          border: "1px solid oklch(0.7 0.15 230 / 0.3)",
          color: "oklch(0.95 0.05 230)",
        }}
      />
    </div>
  );
}
