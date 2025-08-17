#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to fix deployment configuration mismatch
 * Copies files from dist/public to dist to match deployment expectations
 */

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  console.log('🔧 Fixing deployment configuration mismatch...');
  
  const sourceDir = path.join(process.cwd(), 'dist', 'public');
  const targetDir = path.join(process.cwd(), 'dist');
  
  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ dist/public directory not found. Build may not have completed successfully.');
    process.exit(1);
  }
  
  console.log('📁 Found build output in dist/public');
  
  try {
    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy all files from dist/public to dist
    const items = fs.readdirSync(sourceDir);
    items.forEach(item => {
      const sourcePath = path.join(sourceDir, item);
      const targetPath = path.join(targetDir, item);
      copyRecursive(sourcePath, targetPath);
    });
    
    // Fix the index.html to include authentication script
    const indexPath = path.join(targetDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Check if auth script is already present
      if (!indexContent.includes('createClient from "https://esm.sh/@supabase/supabase-js@2"')) {
        console.log('📝 Adding authentication script to index.html...');
        
        const authModalHTML = `
    <!-- Authentication Modal Package -->
    <style>
      .tsp-auth-overlay{
        position:fixed !important;
        top:0 !important;
        left:0 !important;
        width:100vw !important;
        height:100vh !important;
        background:rgba(0,0,0,0.8) !important;
        display:flex !important;
        align-items:center !important;
        justify-content:center !important;
        z-index:99999 !important;
      }
      .tsp-auth-card{
        background:#111 !important;
        color:#fff !important;
        width:100% !important;
        max-width:400px !important;
        border-radius:12px !important;
        padding:24px !important;
        box-shadow:0 20px 40px rgba(0,0,0,0.8) !important;
        margin:20px !important;
      }
      .tsp-auth-overlay.hidden{
        display:none !important;
      }
      .tsp-auth-card input, .tsp-auth-card button{
        width:100% !important;
        margin:8px 0 !important;
        padding:12px !important;
        border-radius:8px !important;
        border:1px solid #333 !important;
        background:#222 !important;
        color:#fff !important;
        font-size:14px !important;
      }
      .tsp-auth-card button{
        background:#0066cc !important;
        border:none !important;
        cursor:pointer !important;
        font-weight:500 !important;
      }
      .tsp-auth-card button:hover{
        background:#0052a3 !important;
      }
      .tsp-auth-card button[id="tsp-close"]{
        background:#444 !important;
      }
      .tsp-auth-card button[id="tsp-close"]:hover{
        background:#555 !important;
      }
      .tsp-auth-muted{
        color:#aaa !important;
        font-size:14px !important;
        text-align:center !important;
        margin:8px 0 !important;
      }
    </style>

    <div id="tsp-auth" class="tsp-auth-overlay hidden">
      <div class="tsp-auth-card">
        <h3 style="margin:0 0 16px; font-size:18px; font-weight:600;">Inicia sesión</h3>
        <button id="tsp-google">Continuar con Google</button>
        <div class="tsp-auth-muted">o</div>
        <input id="tsp-email" type="email" placeholder="tu@correo.com" />
        <input id="tsp-pass" type="password" placeholder="Contraseña" />
        <button id="tsp-login">Entrar</button>
        <button id="tsp-signup">Crear cuenta</button>
        <button id="tsp-close">Cerrar</button>
        <p id="tsp-msg" class="tsp-auth-muted"></p>
      </div>
    </div>

    <script type="module">
      import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

      // === CONFIG ===
      const SUPABASE_URL = "https://kruunkysfiwzlgybppjt.supabase.co";
      const ANON_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydXVua3lzZml3emxneWJwcGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU1NTUsImV4cCI6MjA3MDQzMTU1NX0.DPZjBnc1Ia4WjhLBL7ZwDB8iQ6X2J83Y4fXehwVj9qM";
      const TOOL_URLS = {
        stencil: "https://ink-stencil-darwintattoo1.replit.app/",
        editor:  "https://darwinfluxkontext.replit.app/"
      };
      const HUB_URL = "https://h-ub-darwintattoo1.replit.app";
      // =============

      const supabase = createClient(SUPABASE_URL, ANON_KEY);

      // Helpers
      const $  = (q) => document.querySelector(q);
      const $$ = (q) => document.querySelectorAll(q);
      const modal = $("#tsp-auth");
      const msg   = $("#tsp-msg");
      const showModal = (on=true) => modal.classList.toggle("hidden", !on);
      function setText(sel, text){ $$(sel).forEach(el => el.textContent = text); }

      // Rellena plan/créditos si colocaste los placeholders
      async function renderProfile() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session){ setText("[data-plan]",""); setText("[data-credits]",""); return; }
        const { data, error } = await supabase.from("profiles")
          .select("plan, credits").eq("id", session.user.id).single();
        if (!error && data){
          setText("[data-plan]", \`Plan: \${data.plan}\`);
          setText("[data-credits]", \`Créditos: \${data.credits}\`);
        }
      }

      // Handoff hacia Stencil/Editor con tokens en el hash
      async function goTo(url){
        const { data: { session } } = await supabase.auth.getSession();
        if (!session){ showModal(true); return; }
        const { access_token, refresh_token, expires_in } = session;
        const dest = \`\${url}#access_token=\${encodeURIComponent(access_token)}&refresh_token=\${encodeURIComponent(refresh_token)}&expires_in=\${expires_in}\`;
        window.location.href = dest;
      }

      // Intercepta todos los CTAs que tengan data-tool
      $$('[data-tool]').forEach(a => {
        a.addEventListener('click', async (e) => {
          e.preventDefault();
          const tool = a.getAttribute('data-tool');
          const { data: { session } } = await supabase.auth.getSession();
          if (!session){
            // guarda intención y abre login
            localStorage.setItem('tsp:pendingTool', tool);
            showModal(true);
            return;
          }
          await goTo(TOOL_URLS[tool] || a.href);
        });
      });

      // Si el usuario volvió del login (Google/email), abre la herramienta que pidió
      (async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const pending = localStorage.getItem('tsp:pendingTool');
        if (session && pending){
          localStorage.removeItem('tsp:pendingTool');
          await goTo(TOOL_URLS[pending]);
          return;
        }
        await renderProfile();
      })();

      // --- Acciones del modal ---
      $("#tsp-google").onclick = async () => {
        const pending = localStorage.getItem('tsp:pendingTool') || "";
        localStorage.setItem('tsp:pendingTool', pending);
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: HUB_URL }
        });
      };

      $("#tsp-login").onclick = async () => {
        msg.textContent = "Entrando…";
        const email = $("#tsp-email").value.trim();
        const password = $("#tsp-pass").value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error){ msg.textContent = "Error: " + error.message; return; }
        showModal(false);
        await renderProfile();
        const pending = localStorage.getItem('tsp:pendingTool');
        if (pending){ localStorage.removeItem('tsp:pendingTool'); await goTo(TOOL_URLS[pending]); }
      };

      $("#tsp-signup").onclick = async () => {
        msg.textContent = "Creando cuenta…";
        const email = $("#tsp-email").value.trim();
        const password = $("#tsp-pass").value;
        const { error } = await supabase.auth.signUp({
          email, password, options: { emailRedirectTo: HUB_URL }
        });
        msg.textContent = error ? ("Error: " + error.message) : "Revisa tu correo para confirmar.";
      };

      $("#tsp-close").onclick = () => showModal(false);

      // (Opcional) expón para inspección en consola
      window.TSPAuth = { supabase };
    </script>`;
        
        // Insert auth script before closing </body> tag
        indexContent = indexContent.replace('</body>', authModalHTML + '\n  </body>');
        fs.writeFileSync(indexPath, indexContent, 'utf8');
        console.log('✅ Authentication script added to deployment HTML');
      }
    }
    
    console.log('✅ Successfully copied files from dist/public to dist');
    console.log('🚀 Deployment fix complete! You can now deploy your project.');
    
  } catch (error) {
    console.error('❌ Error copying files:', error.message);
    process.exit(1);
  }
}

// Run main function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { copyRecursive, main };