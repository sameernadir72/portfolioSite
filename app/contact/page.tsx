"use client";
import { useState } from "react";
import { Input, Textarea } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Failed to send');
      alert('Message sent — thank you!');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      console.error(err);
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="text-slate-600 mt-2">I’m open to freelance work, collaboration, or a friendly chat.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
        </div>
        <div>
          <Button type="submit" disabled={loading}>
            <Mail size={16} />
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </section>
  );
}
