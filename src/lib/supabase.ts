import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://phemcniiqwjgmqvbklem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZW1jbmlpcXdqZ21xdmJrbGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NDk4MjAsImV4cCI6MjA4OTIyNTgyMH0.CJkB0UE9p8Z0pP5T72UxNboWDYjdyACSK38jxFZbYEk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
