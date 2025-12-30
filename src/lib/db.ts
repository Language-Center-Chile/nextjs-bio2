import { supabase } from './supabase'

export async function dbConnect() {
  return supabase
}

export default dbConnect
