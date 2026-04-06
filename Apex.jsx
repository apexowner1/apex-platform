import { useState, useEffect, useRef } from “react”;

// ─── ALL APPS + FILES CATALOG ─────────────────────────────────────────────
const CATEGORIES = [
{
id: “main”,
label: “APEX Main App”,
icon: “⬡”,
color: “#00E5B4”,
desc: “Core photography platform — shot lists, golden hour, social hub, learn, gear”,
apps: [
{ id: “apex-v1”, name: “APEX Cinema (V1)”, desc: “Dark luxury cinema aesthetic — gold tones, sidebar nav”, tag: “Main App”, color: “#C8A96E”, icon: “⬡” },
{ id: “apex-v2”, name: “APEX Editorial (V2)”, desc: “Bold black editorial style — neon data readouts”, tag: “Main App”, color: “#00E5B4”, icon: “⬡” },
],
},
{
id: “raw”,
label: “APEX RAW”,
icon: “R”,
color: “#0090FF”,
desc: “RAW file transfer platform — vault, subscriptions, speed engine”,
apps: [
{ id: “apex-raw-full”,    name: “APEX RAW — Full Platform”,    desc: “Transfer, vault, subscriptions, AI speed engine, app vs PC features”, tag: “RAW App”, color: “#0090FF”, icon: “R” },
{ id: “apex-raw-pricing”, name: “APEX RAW — Pricing Page”,     desc: “All subscriptions, storage add-ons, competitor comparison, suggestions”, tag: “RAW App”, color: “#0090FF”, icon: “R” },
{ id: “apex-raw-finance”, name: “APEX RAW — Finance System”,   desc: “Tax engine, city finder, payment hub, admin, transfer log”, tag: “RAW App”, color: “#0090FF”, icon: “R” },
],
},
{
id: “owner”,
label: “Owner Dashboard”,
icon: “🔐”,
color: “#FF6B35”,
desc: “Private developer dashboard — revenue modeling, subscribers, finance, dev console”,
apps: [
{ id: “apex-owner”, name: “APEX Owner Dashboard”, desc: “Secure login, $10K revenue modeler, subscriber data, finance splits, dev console”, tag: “Owner Only”, color: “#FF6B35”, icon: “🔐” },
],
},
{
id: “tools”,
label: “Platform Tools”,
icon: “◈”,
color: “#C77DFF”,
desc: “Standalone tools built into the APEX ecosystem”,
apps: [
{ id: “shot-list”,   name: “Shot List Engine”,    desc: “Sports shot lists + custom categories + private notes”, tag: “Tool”, color: “#C77DFF”, icon: “◉” },
{ id: “golden-hour”, name: “Golden Hour Finder”,  desc: “GPS-based golden hour for any city worldwide”, tag: “Tool”, color: “#FFB800”, icon: “☀️” },
{ id: “dsp”,         name: “Music DSP Distributor”, desc: “Submit tracks + lyrics to Spotify, Apple Music, Tidal and more”, tag: “Tool”, color: “#FF6B35”, icon: “♫” },
{ id: “social-hub”,  name: “Social Command Hub”,  desc: “Post to Instagram, X, TikTok, Facebook, YouTube, LinkedIn all at once”, tag: “Tool”, color: “#5B8EFF”, icon: “◈” },
],
},
];

// ─── STANDALONE AI KNOWLEDGE BASE ────────────────────────────────────────
// This AI works WITHOUT Claude - uses built-in knowledge + rule engine
const AI_KNOWLEDGE = {
photography: {
keywords: [“settings”,“exposure”,“iso”,“aperture”,“shutter”,“lighting”,“lens”,“flash”,“depth”,“field”,“portrait”,“sports”,“golden”,“hour”,“raw”,“jpeg”,“white”,“balance”,“composition”,“rule”,“thirds”,“bokeh”,“focus”],
responses: [
{ match:[“sports”,“action”,“freeze”], ans: “For sports/action: Use shutter priority (Tv/S mode). Set shutter to 1/1000s–1/3200s to freeze motion. ISO 800–3200 depending on light. Aperture f/2.8–f/4 for background separation. Burst mode 10–20fps. Pre-focus on a zone where the action will be.” },
{ match:[“portrait”,“face”,“skin”], ans: “Portrait settings: f/1.4–f/2.8 for background blur. Shutter 1/200s minimum to avoid motion blur. ISO as low as possible (100–400). Use a 50mm, 85mm, or 135mm lens for flattering compression. Soft diffused light (window, overcast sky, or diffused strobe) works best.” },
{ match:[“golden”,“hour”,“sunset”,“sunrise”], ans: “Golden hour runs ~30–60 min after sunrise and before sunset. Use a lower ISO (100–400), slightly underexpose by -1/3 stop to preserve highlights, white balance around 5500–6500K. Side or backlight creates rim lighting and dramatic shadows. Shoot in RAW to recover detail in post.” },
{ match:[“iso”,“noise”,“grain”], ans: “ISO controls sensor sensitivity. ISO 100–400 = cleanest, least noise. ISO 800–1600 = acceptable for most cameras. ISO 3200+ = visible noise but modern cameras handle it well. Shoot RAW to better manage high ISO noise in post. Better to have a sharp photo at high ISO than a blurry one at low ISO.” },
{ match:[“aperture”,“depth”,“bokeh”,“blur”], ans: “Aperture (f-stop) controls depth of field. Low f-number (f/1.4, f/1.8, f/2.8) = shallow depth of field, blurry background (bokeh). High f-number (f/8, f/11, f/16) = everything sharp, great for landscapes and architecture.” },
{ match:[“shutter”,“motion”,“freeze”,“blur”], ans: “Shutter speed controls motion. Fast (1/500s+) = freezes action. Slow (1/30s and below) = motion blur, great for waterfalls and light trails. Rule: keep shutter at 1/(2x focal length) minimum to avoid camera shake — e.g. 1/100s on a 50mm lens.” },
{ match:[“lighting”,“studio”,“strobe”,“flash”], ans: “Studio lighting basics: 3-point setup = Key light (main), Fill light (reduces shadows, 1 stop lower), Rim/Hair light (separates subject from background). For portraits: softboxes or umbrellas diffuse harsh light. Start with a 45° angle on the key light at eye level.” },
{ match:[“raw”,“format”,“jpeg”], ans: “Always shoot RAW for professional work. RAW files capture full sensor data — 12–14 bits vs JPEG’s 8 bits. This means more latitude to fix exposure, white balance, and color in post without quality loss. JPEGs are processed in-camera and throw away data. Use RAW+JPEG if you need quick selects.” },
{ match:[“composition”,“rule”,“thirds”,“framing”], ans: “Strong composition rules: Rule of Thirds — place subjects at intersection points. Leading lines — roads, fences, rivers guide the eye. Negative space — empty space around subject adds impact. Frame within a frame — doorways, windows, arches. Fill the frame for powerful portraits. Break rules intentionally once you know them.” },
],
default: “Great photography question! Key principles: Exposure Triangle (ISO, Aperture, Shutter Speed) controls your image. Shoot RAW for maximum editing flexibility. Natural light is your best friend — golden hour (30 min after sunrise, before sunset) gives the warmest, most cinematic light. What specific aspect of photography can I help you with?”
},
business: {
keywords: [“price”,“charge”,“client”,“package”,“invoice”,“contract”,“money”,“rate”,“market”,“brand”,“instagram”,“social”,“promote”,“workshop”,“sell”,“revenue”,“income”],
responses: [
{ match:[“price”,“charge”,“how much”,“rate”], ans: “Pricing for photographers: Entry-level portraits $150–$400/session. Mid-range $500–$1,200. Experienced $1,500–$5,000+. Sports/commercial day rates $800–$3,000+. Formula: (hours x hourly rate) + editing time + expenses + profit margin. Never price below your cost. Your APEX RAW Pro subscription ($11.99/mo) pays for itself with one client.” },
{ match:[“client”,“contract”,“agreement”], ans: “Always use a contract. Key clauses: Payment schedule (50% deposit upfront, 50% on delivery). Usage rights (personal vs commercial). Delivery timeline. What happens if event is cancelled. Number of edited images included. Late payment fees. You can find photography contract templates online and customize them.” },
{ match:[“instagram”,“social”,“promote”,“market”], ans: “Instagram growth strategy: Post consistently (3–4x per week minimum). Use location tags for every post — this is how local clients find you. Stories daily. Reels outperform static posts 3–5x in reach. Use 5–10 niche hashtags (not the biggest ones). BTS (behind the scenes) content builds trust. Engage with your audience — reply to every comment.” },
{ match:[“workshop”,“teach”,“education”], ans: “Workshops are a high-margin revenue stream. In-person workshop: $75–$250/person x 10–15 people = $750–$3,750 per event. Online course: record once, sell forever. Price beginner at $49–$99, advanced at $149–$299. APEX platform has built-in course hosting — use it to monetize your knowledge.” },
],
default: “Smart business thinking! The key to a sustainable photography business: diversify your income across client work + digital products (presets, courses) + platform revenue. Set your prices based on value delivered, not just hours worked. Your APEX platform subscriptions create recurring monthly revenue that compounds over time.”
},
apex: {
keywords: [“apex”,“app”,“platform”,“subscription”,“plan”,“storage”,“vault”,“transfer”,“raw”,“send”,“file”,“upload”,“download”,“price”,“feature”],
responses: [
{ match:[“subscription”,“plan”,“price”,“cost”], ans: “APEX RAW Subscriptions (all tax-inclusive, files never expire):\n\n• Free — $0 | 15 GB vault | 2 transfers/mo\n• Spark — $5.99/mo | 500 GB vault | 25 transfers\n• Pro — $11.99/mo | 2 TB vault | 100 transfers ← Most Popular\n• Studio — $24.99/mo | 8 TB vault | 300 transfers\n• Cinema — $44.99/mo | Unlimited everything\n\nAnnual billing saves up to 20%. Add storage from $1/mo.” },
{ match:[“transfer”,“send”,“file”,“raw”,“send”], ans: “APEX RAW transfers: Send any file type (CR3, ARW, DNG, ProRes, BRAW, R3D, 8K MP4) directly to clients. Transfers cost $0.50–$2.00 each (or included in your subscription). Files are encrypted end-to-end, delivered via a branded link, and your vault copy never expires. The AI Speed Engine handles files up to unlimited size.” },
{ match:[“storage”,“vault”,“space”,“gb”,“tb”], ans: “APEX RAW vault storage: All files stored permanently — never deleted, never expire. Storage add-ons start at $1/mo for 10 GB up to $15/mo for 5 TB. The AI Speed Engine keeps the app fast no matter how full your vault is — uses adaptive caching, smart chunking, and geo-smart CDN routing.” },
{ match:[“golden hour”,“location”,“gps”], ans: “APEX Golden Hour Finder: Enable location sharing in the app → instantly calculates your morning and evening golden windows based on your exact GPS coordinates. Works worldwide — Louisville, Nashville, Tokyo, London, anywhere. The evening golden hour (45–60 min before sunset) gives the warmest cinematic light.” },
],
default: “I can help with anything APEX! The platform covers RAW file transfer, unlimited vault storage, social media hub, music DSP distribution, photography courses, golden hour finder, shot lists, and a full owner dashboard. What specifically would you like to know?”
},
general: {
default: “I’m APEX AI — your built-in photography and platform assistant. I can help with:\n\n📷 Camera settings & technique\n💼 Photography business & pricing\n⬡ APEX platform features\n☀️ Golden hour & lighting\n🎵 Music distribution\n📱 Social media strategy\n\nWhat would you like help with?”
}
};

function getAIResponse(query) {
const q = query.toLowerCase();
// Detect category
let category = “general”;
const photoScore = AI_KNOWLEDGE.photography.keywords.filter(k=>q.includes(k)).length;
const bizScore   = AI_KNOWLEDGE.business.keywords.filter(k=>q.includes(k)).length;
const apexScore  = AI_KNOWLEDGE.apex.keywords.filter(k=>q.includes(k)).length;
const max = Math.max(photoScore, bizScore, apexScore);
if (max > 0) {
if (photoScore === max) category = “photography”;
else if (bizScore === max) category = “business”;
else if (apexScore === max) category = “apex”;
}

// Find best matching response
const bank = AI_KNOWLEDGE[category];
if (bank.responses) {
for (const r of bank.responses) {
if (r.match.some(word => q.includes(word))) return r.ans;
}
}
return bank.default;
}

// ─── QUICK STATS ──────────────────────────────────────────────────────────
const QUICK_STATS = [
{ label:“Apps Built”,      val:“8”,      color:”#00E5B4”, icon:“⬡” },
{ label:“Categories”,      val:“4”,      color:”#5B8EFF”, icon:“◈” },
{ label:“Revenue Goal”,    val:”$10K”,   color:”#FFB800”, icon:“◉” },
{ label:“Tax Compliant”,   val:“✓”,      color:”#00E5B4”, icon:”$” },
{ label:“Subscriptions”,   val:“5 Tiers”,color:”#C77DFF”, icon:“▦” },
{ label:“AI Engine”,       val:“Built-in”,color:”#FF6B35”,icon:“🤖” },
];

export default function ApexPlatformHub() {
const [view, setView]         = useState(“hub”);  // hub | app
const [activeApp, setActiveApp] = useState(null);
const [activeCategory, setActiveCategory] = useState(“all”);
const [search, setSearch]     = useState(””);
const [aiInput, setAiInput]   = useState(””);
const [aiMessages, setAiMessages] = useState([
{ role:“ai”, text:“👋 Welcome to APEX AI! I’m your built-in assistant — no internet or Claude required. Ask me anything about photography, your platform, pricing, or business.” }
]);
const [aiThinking, setAiThinking] = useState(false);
const [pennies, setPennies]   = useState(0);
const [sessionSec, setSession] = useState(0);
const chatRef = useRef(null);

useEffect(() => {
const t = setInterval(() => {
setPennies(p => +(p+0.01).toFixed(2));
setSession(s => s+1);
}, 1000);
return () => clearInterval(t);
}, []);

useEffect(() => {
if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
}, [aiMessages]);

const sendAI = () => {
if (!aiInput.trim()) return;
const userMsg = aiInput.trim();
setAiMessages(m => […m, { role:“user”, text:userMsg }]);
setAiInput(””);
setAiThinking(true);
// Simulate thinking delay (0.6–1.2s) then respond with built-in AI
setTimeout(() => {
const response = getAIResponse(userMsg);
setAiMessages(m => […m, { role:“ai”, text:response }]);
setAiThinking(false);
}, 600 + Math.random() * 600);
};

// Filter apps
const allApps = CATEGORIES.flatMap(c => c.apps.map(a => ({ …a, categoryId:c.id, categoryLabel:c.label, categoryColor:c.color })));
const filtered = allApps.filter(a => {
const matchCat    = activeCategory===“all” || a.categoryId===activeCategory;
const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
return matchCat && matchSearch;
});

const fmt = (s) => `${Math.floor(s/60)}m ${String(s%60).padStart(2,"0")}s`;

return (
<div style={{ fontFamily:”‘DM Sans’,‘Helvetica Neue’,sans-serif”, background:”#04040E”, minHeight:“100vh”, color:”#EBE7DF” }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#111120;} .card{background:rgba(255,255,255,.032);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:18px;transition:border-color .2s,transform .2s;} .card:hover{border-color:rgba(255,255,255,.12);transform:translateY(-1px);} .btn{background:#00E5B4;color:#04040E;border:none;border-radius:11px;padding:11px 22px;font-family:'DM Sans',sans-serif;font-weight:800;font-size:12px;cursor:pointer;transition:all .2s;} .btn:hover{background:#00FFD1;transform:translateY(-1px);} .ghost{background:none;border:1px solid rgba(255,255,255,.09);color:#555;border-radius:10px;padding:8px 16px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:11px;cursor:pointer;transition:all .2s;} .ghost:hover{border-color:#00E5B4;color:#00E5B4;} .mono{font-family:'DM Mono',monospace;} .ri{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:10px;color:#EBE7DF;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;width:100%;outline:none;} .ri:focus{border-color:rgba(0,229,180,.4);} .nav{padding:9px 16px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.8px;cursor:pointer;border:none;background:none;color:#222;text-transform:uppercase;border-bottom:2px solid transparent;transition:color .2s;white-space:nowrap;} .nav.on{color:#00E5B4;border-bottom-color:#00E5B4;} .nav:hover{color:#555;} .pl{animation:pl 1.5s infinite;} @keyframes pl{0%,100%{opacity:1}50%{opacity:.2}} .fd{animation:fd .3s ease;} @keyframes fd{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}} .cat-pill{padding:7px 16px;border-radius:20px;border:1px solid;font-family:'DM Sans',sans-serif;font-weight:700;font-size:11px;cursor:pointer;transition:all .2s;text-transform:uppercase;letter-spacing:.5px;} .app-card{padding:20px;border-radius:16px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.028);cursor:pointer;transition:all .2s;display:flex;flex-direction:column;gap:12px;} .app-card:hover{border-color:rgba(255,255,255,.15);transform:translateY(-2px);background:rgba(255,255,255,.04);} .chat-bubble{padding:11px 14px;border-radius:14px;font-size:13px;line-height:1.7;max-width:88%;white-space:pre-wrap;} .stor-bar{height:4px;background:#0d0d1a;border-radius:2px;overflow:hidden;} .stor-fill{height:100%;border-radius:2px;}`}</style>

```
  {/* ── TOP BAR ── */}
  <div style={{ padding:"13px 20px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:12,background:"rgba(0,0,0,.6)",position:"sticky",top:0,zIndex:100 }}>
    <div style={{ width:36,height:36,background:"linear-gradient(135deg,#00E5B4,#0090FF)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"#04040E" }}>⬡</div>
    <div>
      <div style={{ fontWeight:800,fontSize:16,letterSpacing:1 }}>APEX <span style={{ color:"#00E5B4" }}>PLATFORM</span></div>
      <div style={{ fontSize:8,color:"#222",letterSpacing:4 }}>DEVELOPER HUB</div>
    </div>
    <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:14 }}>
      <div style={{ textAlign:"right" }}>
        <div className="mono" style={{ color:"#00E5B4",fontSize:15,fontWeight:700 }}>${pennies.toFixed(2)}</div>
        <div style={{ fontSize:8,color:"#333",letterSpacing:2 }}>LIVE REVENUE</div>
      </div>
      <div style={{ width:6,height:6,borderRadius:"50%",background:"#00E5B4" }} className="pl" />
    </div>
  </div>

  {/* ── VIEW TABS ── */}
  <div style={{ display:"flex",overflowX:"auto",padding:"0 12px",borderBottom:"1px solid rgba(255,255,255,.04)" }}>
    {[
      { id:"hub",  label:"App Hub"    },
      { id:"ai",   label:"APEX AI"    },
      { id:"stats",label:"Dashboard"  },
    ].map(t=><button key={t.id} className={`nav ${view===t.id?"on":""}`} onClick={()=>setView(t.id)}>{t.label}</button>)}
  </div>

  <div style={{ maxWidth:960,margin:"0 auto",padding:"24px 16px" }}>

    {/* ══════════════ HUB ══════════════ */}
    {view==="hub" && <div className="fd">
      {/* Hero */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:9,color:"#1a1a2e",letterSpacing:4,marginBottom:6 }}>ALL APPS & TOOLS</div>
        <div style={{ fontSize:34,fontWeight:800,lineHeight:1.1,marginBottom:10 }}>
          APEX <span style={{ color:"#00E5B4" }}>Platform Hub</span>
        </div>
        <p style={{ color:"#555",fontSize:13 }}>Every app, tool, and feature built for your platform — organized in one place.</p>
      </div>

      {/* Search */}
      <div style={{ position:"relative",marginBottom:20 }}>
        <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#444" }}>🔍</span>
        <input className="ri" placeholder="Search apps and tools..." value={search} onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:40 }} />
      </div>

      {/* Category filters */}
      <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:24 }}>
        {[{ id:"all",label:"All",color:"#00E5B4" },...CATEGORIES.map(c=>({id:c.id,label:c.label,color:c.color}))].map(c=>(
          <button key={c.id} className="cat-pill" onClick={()=>setActiveCategory(c.id)} style={{ borderColor:activeCategory===c.id?c.color:"rgba(255,255,255,.07)",background:activeCategory===c.id?`${c.color}14`:"none",color:activeCategory===c.id?c.color:"#555" }}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Category sections */}
      {(activeCategory==="all" ? CATEGORIES : CATEGORIES.filter(c=>c.id===activeCategory)).map(cat=>{
        const catApps = filtered.filter(a=>a.categoryId===cat.id);
        if (catApps.length===0) return null;
        return (
          <div key={cat.id} style={{ marginBottom:32 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
              <div style={{ width:30,height:30,borderRadius:8,background:`${cat.color}18`,border:`1px solid ${cat.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:cat.color }}>{cat.icon}</div>
              <div>
                <div style={{ fontWeight:800,fontSize:14,color:cat.color }}>{cat.label}</div>
                <div style={{ fontSize:11,color:"#444",marginTop:1 }}>{cat.desc}</div>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12 }}>
              {catApps.map(app=>(
                <div key={app.id} className="app-card" onClick={()=>{ setActiveApp(app); setView("hub"); }}>
                  <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10 }}>
                    <div style={{ width:40,height:40,borderRadius:11,background:`${app.color}16`,border:`1px solid ${app.color}38`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:app.color,flexShrink:0 }}>{app.icon}</div>
                    <span style={{ padding:"3px 9px",borderRadius:20,background:`${app.color}14`,color:app.color,fontSize:9,fontWeight:800,letterSpacing:1,whiteSpace:"nowrap" }}>{app.tag}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight:800,fontSize:14,marginBottom:4 }}>{app.name}</div>
                    <div style={{ fontSize:11,color:"#555",lineHeight:1.6 }}>{app.desc}</div>
                  </div>
                  <div style={{ display:"flex",gap:8,marginTop:4 }}>
                    <button className="btn" style={{ flex:1,padding:"9px",fontSize:11 }} onClick={e=>{e.stopPropagation();setActiveApp(app);}}>Open App</button>
                    <button className="ghost" style={{ fontSize:11 }} onClick={e=>{e.stopPropagation();}}>Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* App preview modal */}
      {activeApp && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }} onClick={()=>setActiveApp(null)}>
          <div style={{ background:"#08081A",border:`1px solid ${activeApp.color}40`,borderRadius:20,padding:28,maxWidth:480,width:"100%" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:16 }}>
              <div style={{ width:48,height:48,borderRadius:13,background:`${activeApp.color}18`,border:`1px solid ${activeApp.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:900,color:activeApp.color }}>{activeApp.icon}</div>
              <div>
                <div style={{ fontWeight:800,fontSize:17 }}>{activeApp.name}</div>
                <div style={{ fontSize:11,color:activeApp.color,marginTop:2 }}>{activeApp.categoryLabel}</div>
              </div>
            </div>
            <p style={{ color:"#666",fontSize:13,lineHeight:1.8,marginBottom:20 }}>{activeApp.desc}</p>
            <div style={{ padding:"12px 16px",background:"rgba(0,229,180,.05)",border:"1px solid rgba(0,229,180,.12)",borderRadius:12,fontSize:12,color:"#00E5B4",marginBottom:20 }}>
              ✓ This app is built and ready. To launch it on your device, open the corresponding .jsx file in your development environment or deploy it via your hosting provider.
            </div>
            <div style={{ display:"flex",gap:10 }}>
              <button className="btn" style={{ flex:1 }} onClick={()=>setActiveApp(null)}>Close</button>
              <button className="ghost" style={{ flex:1 }} onClick={()=>{setActiveApp(null);setView("ai");}}>Ask AI About This</button>
            </div>
          </div>
        </div>
      )}
    </div>}

    {/* ══════════════ BUILT-IN AI ══════════════ */}
    {view==="ai" && <div className="fd" style={{ display:"flex",flexDirection:"column",height:"calc(100vh - 140px)" }}>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:9,color:"#1a1a2e",letterSpacing:4,marginBottom:4 }}>NO CLAUDE REQUIRED</div>
        <div style={{ fontSize:30,fontWeight:800 }}>APEX <span style={{ color:"#00E5B4" }}>AI</span></div>
        <div style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:20,background:"rgba(0,229,180,.07)",border:"1px solid rgba(0,229,180,.15)",marginTop:6 }}>
          <div style={{ width:6,height:6,borderRadius:"50%",background:"#00E5B4" }} className="pl" />
          <span style={{ fontSize:10,fontWeight:700,color:"#00E5B4",letterSpacing:1 }}>BUILT-IN · WORKS OFFLINE · NO SUBSCRIPTION NEEDED</span>
        </div>
      </div>

      {/* Quick prompts */}
      <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:14 }}>
        {[
          "Best settings for sports photography",
          "How much should I charge for portraits?",
          "What are my APEX RAW subscription options?",
          "Golden hour tips for Louisville",
          "How to grow on Instagram as a photographer",
        ].map(q=>(
          <button key={q} className="ghost" style={{ fontSize:10,padding:"6px 12px" }} onClick={()=>{setAiInput(q);setTimeout(()=>sendAI(),50);}}>
            {q}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div ref={chatRef} style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,padding:"4px 0",marginBottom:14 }}>
        {aiMessages.map((m,i)=>(
          <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
            {m.role==="ai" && (
              <div style={{ width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#00E5B4,#0090FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#04040E",flexShrink:0,marginRight:8,marginTop:2 }}>⬡</div>
            )}
            <div className="chat-bubble" style={{ background:m.role==="user"?"rgba(0,229,180,.12)":"rgba(255,255,255,.04)", border:`1px solid ${m.role==="user"?"rgba(0,229,180,.25)":"rgba(255,255,255,.07)"}`, color:m.role==="user"?"#00E5B4":"#C8C4BC", borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px" }}>
              {m.text}
            </div>
          </div>
        ))}
        {aiThinking && (
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            <div style={{ width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#00E5B4,#0090FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#04040E" }}>⬡</div>
            <div style={{ display:"flex",gap:4,padding:"12px 16px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"14px 14px 14px 4px" }}>
              {[0,1,2].map(i=><div key={i} style={{ width:6,height:6,borderRadius:"50%",background:"#00E5B4",animation:`pl ${0.6+i*0.15}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display:"flex",gap:10 }}>
        <input className="ri" placeholder="Ask anything about photography, your platform, pricing..." value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAI()} style={{ flex:1 }} />
        <button className="btn" onClick={sendAI} disabled={aiThinking||!aiInput.trim()} style={{ whiteSpace:"nowrap",minWidth:70 }}>
          {aiThinking?"...":"Send →"}
        </button>
      </div>
      <div style={{ fontSize:10,color:"#1a1a2e",textAlign:"center",marginTop:8 }}>
        APEX AI runs entirely on-device — no internet connection or Claude account required
      </div>
    </div>}

    {/* ══════════════ DASHBOARD ══════════════ */}
    {view==="stats" && <div className="fd">
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:9,color:"#1a1a2e",letterSpacing:4,marginBottom:4 }}>PLATFORM OVERVIEW</div>
        <div style={{ fontSize:30,fontWeight:800 }}>Your <span style={{ color:"#00E5B4" }}>Dashboard</span></div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:20 }}>
        {QUICK_STATS.map(s=>(
          <div key={s.label} className="card" style={{ textAlign:"center",padding:14 }}>
            <div style={{ fontSize:22,marginBottom:4 }}>{s.icon}</div>
            <div className="mono" style={{ fontSize:18,fontWeight:700,color:s.color }}>{s.val}</div>
            <div style={{ fontSize:9,color:"#444",textTransform:"uppercase",letterSpacing:1,marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Live revenue */}
      <div className="card" style={{ marginBottom:14,background:"rgba(0,229,180,.04)",border:"1px solid rgba(0,229,180,.12)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div>
            <div style={{ fontWeight:800,fontSize:14 }}>Live Session Revenue</div>
            <div style={{ color:"#555",fontSize:11,marginTop:2 }}>Running for {fmt(sessionSec)}</div>
          </div>
          <div className="mono" style={{ fontSize:28,color:"#00E5B4",fontWeight:800 }}>${pennies.toFixed(2)}</div>
        </div>
        <div style={{ height:5,background:"#0d0d1a",borderRadius:3,overflow:"hidden" }}>
          <div style={{ height:"100%",background:"linear-gradient(90deg,#00E5B4,#0090FF)",borderRadius:3,width:`${Math.min(pennies/100*100,100)}%`,transition:"width .5s" }} />
        </div>
      </div>

      {/* All apps summary */}
      <div className="card" style={{ marginBottom:14 }}>
        <div style={{ fontWeight:700,fontSize:13,marginBottom:14 }}>All Platform Apps</div>
        {CATEGORIES.map(cat=>(
          <div key={cat.id} style={{ marginBottom:14 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:cat.color }} />
              <span style={{ fontSize:11,fontWeight:700,color:cat.color,textTransform:"uppercase",letterSpacing:1 }}>{cat.label}</span>
              <span style={{ fontSize:10,color:"#333" }}>({cat.apps.length} app{cat.apps.length>1?"s":""})</span>
            </div>
            {cat.apps.map(a=>(
              <div key={a.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.03)" }}>
                <div style={{ width:24,height:24,borderRadius:6,background:`${a.color}14`,border:`1px solid ${a.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:a.color,flexShrink:0 }}>{typeof a.icon==="string"&&a.icon.length<=2?a.icon:"⬡"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12,fontWeight:600 }}>{a.name}</div>
                </div>
                <span style={{ padding:"2px 8px",borderRadius:20,background:`${a.color}10`,color:a.color,fontSize:9,fontWeight:700 }}>✓ Built</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* What's next */}
      <div className="card" style={{ background:"rgba(199,125,255,.04)",border:"1px solid rgba(199,125,255,.12)" }}>
        <div style={{ fontWeight:700,fontSize:13,marginBottom:12,color:"#C77DFF" }}>🚀 Next Steps to Launch</div>
        {[
          { n:"01", t:"Deploy to Vercel / Netlify",      d:"Host all JSX files as a web app — free tier gets you started. Connect your domain (apexraw.io)." },
          { n:"02", t:"Connect Stripe for Payments",     d:"Add your Stripe keys to pricing.config.js — subscriptions and transfers go live instantly." },
          { n:"03", t:"Set Up AWS S3 Vault Storage",     d:"Connect an S3 bucket for unlimited file storage. APEX RAW handles the rest." },
          { n:"04", t:"Submit to App Store & Google Play",d:"Wrap in React Native / Expo for mobile. $2.99 one-time on both stores." },
          { n:"05", t:"Go Live in Louisville First",      d:"Start your geo-targeted push in Louisville/Lexington before expanding to Nashville, Indy, Columbus." },
        ].map(s=>(
          <div key={s.n} style={{ display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.04)" }}>
            <div style={{ width:28,height:28,borderRadius:7,background:"rgba(199,125,255,.1)",border:"1px solid rgba(199,125,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#C77DFF",flexShrink:0 }}>{s.n}</div>
            <div>
              <div style={{ fontWeight:700,fontSize:12,color:"#C77DFF",marginBottom:3 }}>{s.t}</div>
              <div style={{ fontSize:11,color:"#555",lineHeight:1.6 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>}

  </div>
</div>
```

);
}
