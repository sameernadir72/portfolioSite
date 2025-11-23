import { NextResponse } from 'next/server'
import supabaseAdmin from '../../../../lib/supabaseAdmin'

// Server-only API to allow inserting projects using the service role.
// Protect with ADMIN_SECRET header to avoid exposing the service role to clients.

export async function POST(request: Request) {
  const secret = request.headers.get('x-admin-secret')
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { title, description, tech_stack = [], github_url = null, live_url = null, image_url = null } = body
  if (!title || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const { data, error } = await supabaseAdmin.from('projects').insert([{ title, description, tech_stack, github_url, live_url, image_url }]).select().single()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ project: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}
