(function(){
  // ===== Config =====
  const SUPABASE_URL = "https://kruunkysfiwzlgybppjt.supabase.co";
  const ANON_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydXVua3lzZml3emxneWJwcGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU1NTUsImV4cCI6MjA3MDQzMTU1NX0.DPZjBnc1Ia4WjhLBL7ZwDB8iQ6X2J83Y4fXehwVj9qM";
  const sb = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
  const GENERATE_SELECTOR = "[data-generate='1']"; // <— ACTUALIZA ESTO con el selector real del botón

  // Adoptar sesión si viene del Hub (tokens en #hash), NO afecta la carga de imagen
  (function adoptFromHash(){
    const p = new URLSearchParams(location.hash.slice(1));
    const at = p.get("access_token"); const rt = p.get("refresh_token");
    if (at && rt){ sb.auth.setSession({ access_token: at, refresh_token: rt }).then(()=> history.replaceState({}, "", location.pathname)); }
  })();

  // ---- Modal mínimo (solo aparece si hace falta login) ----
  const css = `
  .tspM{position:fixed;inset:0;background:#0008;display:flex;align-items:center;justify-content:center;z-index:9999}
  .tspC{background:#111;color:#fff;width:100%;max-width:360px;border-radius:12px;padding:16px;box-shadow:0 10px 30px #000}
  .tspH{display:none}
  .tspC input,.tspC button{width:100%;margin:6px 0;padding:10px;border-radius:8px;border:1px solid #333}
  .tspX{color:#aaa;font-size:13px;text-align:center}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const pop = document.createElement("div");
  pop.className = "tspM tspH";
  pop.innerHTML = `
    <div class="tspC">
      <h3 style="margin:0 0 10px">Inicia sesión</h3>
      <button id="tspG">Continuar con Google</button>
      <div class="tspX">o</div>
      <input id="tspE" type="email" placeholder="tu@correo.com"/>
      <input id="tspP" type="password" placeholder="Contraseña"/>
      <button id="tspL">Entrar</button>
      <button id="tspS">Crear cuenta</button>
      <button id="tspC">Cerrar</button>
      <p id="tspMsg" class="tspX"></p>
    </div>`;
  document.body.appendChild(pop);
  const show = (on)=> pop.classList.toggle("tspH", !on);

  async function ensureLogin(){
    const { data:{ session } } = await sb.auth.getSession();
    if (session) return session;
    show(true);
    return new Promise((resolve)=>{
      document.getElementById("tspG").onclick = async ()=>{
        localStorage.setItem("tsp:pendingGen","1");
        await sb.auth.signInWithOAuth({ provider:"google", options:{ redirectTo: window.location.href.split("#")[0] }});
      };
      document.getElementById("tspL").onclick = async ()=>{
        const email = (document.getElementById("tspE").value||"").trim();
        const pass  = document.getElementById("tspP").value||"";
        document.getElementById("tspMsg").textContent = "Entrando…";
        const { error } = await sb.auth.signInWithPassword({ email, password: pass });
        if (error){ document.getElementById("tspMsg").textContent = "Error: "+error.message; return; }
        show(false);
        resolve((await sb.auth.getSession()).data.session);
      };
      document.getElementById("tspS").onclick = async ()=>{
        const email = (document.getElementById("tspE").value||"").trim();
        const pass  = document.getElementById("tspP").value||"";
        document.getElementById("tspMsg").textContent = "Creando cuenta…";
        const { error } = await sb.auth.signUp({ email, password: pass, options:{ emailRedirectTo: window.location.href.split("#")[0] }});
        document.getElementById("tspMsg").textContent = error ? ("Error: "+error.message) : "Revisa tu correo para confirmar.";
      };
      document.getElementById("tspC").onclick = ()=>{ show(false); resolve(null); };
    });
  }

  // ---- Hook al botón de Generar (no toca subida de imagen) ----
  function hookGenerate(btn){
    if (!btn) return console.warn("[TSP] No se encontró botón de generar");
    const origOnClick = btn.onclick || null;
    let bypass = false;
    btn.addEventListener("click", async (e)=>{
      if (bypass) return; // re-disparo controlado
      e.preventDefault(); e.stopImmediatePropagation();
      try{
        const session = await ensureLogin();
        if (!session) return; // cancelado
        // ✅ Aquí solo exigimos login. (Créditos los añadimos en el paso 2)
        if (origOnClick) return origOnClick.call(btn, e);
        // Si tu flujo usa form:
        if (btn.form && btn.form.requestSubmit){ return btn.form.requestSubmit(); }
        // Como fallback: re-disparar el click sin volver a interceptar
        bypass = true; btn.click(); bypass = false;
      }catch(err){
        alert("No se pudo iniciar sesión: "+ (err?.message||err));
      }
    }, true); // 'capture' para interceptar primero
  }

  function boot(){
    const btn = document.querySelector(GENERATE_SELECTOR) || document.querySelector("[data-generate]");
    hookGenerate(btn);
    // Si venimos de OAuth y estaba pendiente, reintenta
    if (localStorage.getItem("tsp:pendingGen")==="1"){
      localStorage.removeItem("tsp:pendingGen");
      if (btn) btn.click();
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();