import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://srgyjnzdtgowypakntsq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZ3lqbnpkdGdvd3lwYWtudHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzU3NzMsImV4cCI6MjA2Nzc1MTc3M30.ZouvWohy3wKmi5QanRlqWTicCuKK6FBa7cpuIYFjSOI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

