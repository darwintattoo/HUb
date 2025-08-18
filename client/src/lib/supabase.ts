import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kruunkysfiwzlgybppjt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydXVua3lzZml3emxneWJwcGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU1NTUsImV4cCI6MjA3MDQzMTU1NX0.DPZjBnc1Ia4WjhLBL7ZwDB8iQ6X2J83Y4fXehwVj9qM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);