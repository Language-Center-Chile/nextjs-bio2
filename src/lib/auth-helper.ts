import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

export function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return null
  const match = authHeader.match(/^Bearer\s+(.+)$/i)
  return match?.[1] ?? null
}

export async function getAuthUser(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const token = getBearerToken(req)
  if (!token) return null

  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) return null
  
  return { sub: user.id, email: user.email }
}
