import { NextResponse } from 'next/server';
import supabaseAdmin from '../../../lib/supabaseAdmin';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Try to send via Resend if API key provided
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'no-reply@yourdomain.com',
          to: ['your.email@example.com'],
          subject: `Portfolio contact from ${name}`,
          html: `<p><strong>${name} &lt;${email}&gt;</strong></p><p>${message}</p>`,
        }),
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error('Resend error', err);
    }
  }

  // fallback: store message in a contacts table (make sure to create it in the SQL)
  try {
    await supabaseAdmin.from('contacts').insert({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Supabase store error', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
