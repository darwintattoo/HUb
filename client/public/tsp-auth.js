// TSP Auth bootstrap (no cambiar estilos ni HTML existente)
(function () {
  const SUPABASE_URL = "https://kruunkysfiwzlgybppjt.supabase.co";
  const ANON_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydXVua3lzZml3emxneWJwcGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU1NTUsImV4cCI6MjA3MDQzMTU1NX0.DPZjBnc1Ia4WjhLBL7ZwDB8iQ6X2J83Y4fXehwVj9qM";
  const sb = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
  window.TSP = { sb }; // solo para debug en consola
  console.log("[TSP] supabase listo");
})();