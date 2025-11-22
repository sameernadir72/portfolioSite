"use client";
import { useState } from "react";
import { Input, Textarea } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Mail, Linkedin, Github, Twitter, Check, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (!res.ok) throw new Error("Failed to send");
      
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@sameernadir.com",
      href: "mailto:hello@sameernadir.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "@sameernadir",
      href: "https://linkedin.com/in/sameernadir",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@sameernadir72",
      href: "https://github.com/sameernadir72",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@sameernadir",
      href: "https://twitter.com/sameernadir",
    },
  ];

  return (
    <section className="space-y-16 pt-16 md:pt-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Have a project in mind? Let's collaborate and create something amazing together. I'm always open to discussing new ideas and opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="default" className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Send me a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your project, ideas, or just say hello!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={loading}
                  rows={6}
                />
              </div>

              {status === "success" && (
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-300">Message sent!</p>
                    <p className="text-sm text-green-800 dark:text-green-400">Thank you! I'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-300">Failed to send</p>
                    <p className="text-sm text-red-800 dark:text-red-400">Please try again or contact me directly.</p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={loading || !name || !email || !message}
                className="w-full"
              >
                <Mail size={20} />
                {loading ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Typically, I respond within 24-48 hours.
              </p>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="gradient" className="p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Other ways to reach me</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Connect with me on social platforms or reach out via email directly.</p>
            </div>

            <div className="space-y-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <method.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{method.label}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">{method.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="text-2xl mb-2 block">!</span>
              I'm most productive in the mornings and love chatting about tech, design, and innovation over coffee.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
