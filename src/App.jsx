import { useState, useEffect } from "react";

const GOLD = "#C9A029";
const BLACK = "#0D0D0D";
const OFF_BLACK = "#161616";
const WHITE = "#F0EDE6";
const GRAY = "#7A7A72";
const GOLD_BORDER = "rgba(201,160,41,0.22)";

// â”€â”€ UPDATE THESE BEFORE GOING LIVE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CALENDLY   = "https://calendly.com/rhemaabikoye";
const NOTION_GMM = "https://www.notion.so/Singapore-Market-Intelligence-Report-March-2026-11005491c6e042ca9ab1bb061012f333";
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #0D0D0D; color: #F0EDE6; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #0D0D0D; }
  ::-webkit-scrollbar-thumb { background: #C9A029; }
  .display { font-family: 'Cormorant Garant', serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
  @keyframes expandW { from { width:0; } to { width:56px; } }
  @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
  @keyframes overlayIn { from { opacity:0 } to { opacity:1 } }
  @keyframes modalUp { from { opacity:0; transform:translateY(32px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
  .fu1 { opacity:0; animation:fadeUp .8s .10s ease forwards; }
  .fu2 { opacity:0; animation:fadeUp .8s .22s ease forwards; }
  .fu3 { opacity:0; animation:fadeUp .8s .34s ease forwards; }
  .fu4 { opacity:0; animation:fadeUp .8s .46s ease forwards; }
  .fu5 { opacity:0; animation:fadeUp .8s .58s ease forwards; }
  .gold-bar { display:block; height:1px; background:#C9A029; width:0; animation:expandW .6s .9s ease forwards; margin-top:14px; }
  .btn-gold { display:inline-block; background:#C9A029; color:#0D0D0D; padding:14px 34px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; cursor:pointer; border:none; transition:background .2s, transform .2s; }
  .btn-gold:hover { background:#E8C04A; transform:translateY(-2px); }
  .btn-outline { display:inline-block; background:transparent; color:#F0EDE6; padding:13px 34px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:400; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; cursor:pointer; border:1px solid rgba(240,237,230,0.28); transition:border-color .2s, color .2s, transform .2s; }
  .btn-outline:hover { border-color:#C9A029; color:#C9A029; transform:translateY(-2px); }
  .nav-lnk { color:rgba(240,237,230,.55); font-size:12px; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; cursor:pointer; transition:color .2s; }
  .nav-lnk:hover { color:#C9A029; }
  .slabel { font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#C9A029; font-family:'DM Sans',sans-serif; font-weight:500; }
  .card { border:1px solid rgba(201,160,41,0.18); transition:transform .3s, border-color .3s; cursor:pointer; }
  .card:hover { transform:translateY(-5px); border-color:rgba(201,160,41,.5); }
  .social-lnk { color:rgba(240,237,230,.35); font-size:11px; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; transition:color .2s; }
  .social-lnk:hover { color:#C9A029; }
  .shine-text { background:linear-gradient(90deg,#C9A029 0%,#F5D78E 40%,#C9A029 60%,#9A7A1E 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 3s linear infinite; }
  .modal-overlay { position:fixed; inset:0; z-index:500; background:rgba(0,0,0,.85); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:24px; animation:overlayIn .25s ease; }
  .modal-box { background:#161616; border:1px solid rgba(201,160,41,.3); max-width:640px; width:100%; max-height:88vh; overflow-y:auto; padding:48px; animation:modalUp .3s ease; position:relative; }
  .modal-close { position:absolute; top:20px; right:24px; background:none; border:none; color:rgba(240,237,230,.4); font-size:22px; cursor:pointer; transition:color .2s; }
  .modal-close:hover { color:#C9A029; }
  .form-input { width:100%; background:#0D0D0D; border:1px solid rgba(201,160,41,.2); color:#F0EDE6; font-family:'DM Sans',sans-serif; font-size:14px; padding:13px 16px; outline:none; transition:border-color .2s; }
  .form-input:focus { border-color:#C9A029; }
  .form-input::placeholder { color:rgba(240,237,230,.25); }
  .form-label { font-size:11px; letter-spacing:.15em; text-transform:uppercase; color:rgba(240,237,230,.5); display:block; margin-bottom:8px; }
  .headshot-placeholder { width:100%; aspect-ratio:3/4; background:#161616; border:1px dashed rgba(201,160,41,.3); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; max-width:300px; }
  @media (max-width:768px) {
    .desktop-nav { display:none !important; }
    .two-col { grid-template-columns:1fr !important; }
    .three-col { grid-template-columns:1fr !important; }
    .four-col { grid-template-columns:repeat(2,1fr) !important; }
    .stat-border { border-right:none !important; border-bottom:1px solid rgba(201,160,41,0.15) !important; }
    .hero-title { font-size:clamp(44px,12vw,80px) !important; }
    section, .pad-section { padding-left:24px !important; padding-right:24px !important; }
    .nav-wrap { padding:0 24px !important; }
    .footer-wrap { flex-direction:column; gap:16px; text-align:center; }
    .modal-box { padding:32px 24px; }
  }
`;

const WORKS = [
  {
    num:"01", tag:"Mentorship Programme", status:"Active",
    title:"6-Month Digital Marketing Mastery",
    desc:"A full-stack mentorship curriculum covering affiliate marketing, distribution strategy, and monetization architecture â€” built for Africa's next generation of digital entrepreneurs.",
    expand:false, link:null, scroll:null, linkLabel:"Apply for Mentorship",
  },
  {
    num:"02", tag:"Paid Framework", status:"Enrolling",
    title:"Global Market Metrics",
    desc:"A proprietary 9-dimension framework for analyzing any country's market readiness. Country-by-country intelligence reports unlocked through enrollment â€” starting with Singapore.",
    expand:true,
    expandContent:{
      what:"Global Market Metrics is Rabbi Rhema's flagship analytical framework. Each of the 9 dimensions is a structured lens through which any global market is evaluated and scored. Singapore is the first published analysis. New markets drop on a rolling enrollment schedule.",
      dimensions:["Base Power","Relationship Power","Loaned Power","Labor Power","Backend Defense","Currency Strength","Reliance","Trust Market","Behavioral Characteristics"],
      access:"Access to full country analysis reports is available via paid enrollment. Submit the form or book a call to receive pricing and onboarding details.",
      notionLabel:"Preview: Singapore Analysis â†’",
    },
  },
  {
    num:"03", tag:"Framework & Book", status:"In Development",
    title:"The OÂ³ Operator",
    desc:"Outthink. Outbuild. Outgrow. A PDF book and methodology for early-stage entrepreneurs built around three interconnected operating principles.",
    expand:true,
    expandContent:{
      what:"The OÂ³ Operator is a complete operating manual for early-stage entrepreneurs. Built around Origin, Order, and Output â€” three principles that define how market operators think, build, and compound growth over time.",
      pillars:[
        {sym:"OÂ¹", name:"Origin â€” Outthink", desc:"Your foundation. Positioning, philosophy, and unfair advantages mapped before a single move is made."},
        {sym:"OÂ²", name:"Order â€” Outbuild",  desc:"The architecture. Systems, sequences, and structures that translate vision into compounding operational reality."},
        {sym:"OÂ³", name:"Output â€” Outgrow",  desc:"The result. Where aligned origin and intelligent order cause market forces to start working for you."},
      ],
      access:"PDF book in development. Early access available â€” book a call to get on the priority list.",
    },
  },
  {
    num:"04", tag:"Ecosystem", status:"Coming Soon",
    title:"Entrepreneur's Growth Lab",
    desc:"A curated ecosystem for founders and operators â€” built around market intelligence, peer accountability, and compounding distribution strategy.",
    expand:false, link:null, scroll:"lab", linkLabel:"Apply for Access",
  },
  {
    num:"05", tag:"Architecture Framework", status:"Proprietary",
    title:"Ecosystem Architecture System",
    desc:"A proprietary methodology for designing interconnected relationships between entrepreneurs, organizations, and audiences using market principles and distribution strategy.",
    expand:true,
    expandContent:{
      what:"The Ecosystem Architecture System is Rabbi Rhema's core consulting framework. It maps the structural relationships between brands, audiences, partners, and platforms â€” then designs the operating logic that makes those relationships compound over time.",
      pillars:[
        {sym:"01", name:"Mapping",     desc:"Identify every node in your current ecosystem â€” people, platforms, and distribution channels."},
        {sym:"02", name:"Structuring", desc:"Define the operating logic and relationship architecture between each node."},
        {sym:"03", name:"Activating",  desc:"Deploy systems that cause the ecosystem to self-sustain and compound without constant manual input."},
      ],
      access:"Available as a consulting engagement. Book a discovery call to discuss your scope and objectives.",
    },
  },
];

const SERVICES = [
  {icon:"â—ˆ", title:"Ecosystem Architecture",       desc:"I design the structural relationships between your brand, audience, and partners â€” building systems that generate compounding, self-sustaining growth."},
  {icon:"â—‡", title:"Growth Strategy",              desc:"From distribution channels to conversion architecture, I map your growth pathway and build the operational blueprint to execute it at scale."},
  {icon:"â—‰", title:"Digital Marketing Mentorship", desc:"6-month intensive covering affiliate marketing, audience building, and monetization systems. For early-stage entrepreneurs ready to move fast."},
  {icon:"â—«", title:"Market Intelligence",          desc:"Country-level strategic analysis via the Global Market Metrics framework. Data-driven. Decision-grade. Built for founders and investors."},
];

const SOCIALS = [
  {label:"Instagram",   short:"IG", url:"https://instagram.com/rhemaabikoye"},
  {label:"Threads",     short:"TH", url:"https://threads.com/rhemaabikoye"},
  {label:"LinkedIn",    short:"LI", url:"https://linkedin.com/in/rhemaabikoye"},
  {label:"YouTube",     short:"YT", url:"https://youtube.com/rhemaabikoye"},
  {label:"X / Twitter", short:"X",  url:"https://x.com/rhemaabikoye"},
  {label:"Facebook",    short:"FB", url:"https://facebook.com/rhemaabikoye"},
];

const statusColor = (s) => {
  if (s === "Active")    return {color:"#5DBB72", border:"rgba(93,187,114,.28)"};
  if (s === "Enrolling") return {color:GOLD,       border:GOLD_BORDER};
  if (s === "Ongoing")   return {color:GOLD,       border:GOLD_BORDER};
  return                        {color:GRAY,       border:"rgba(122,122,114,.25)"};
};

function WorkModal({work, onClose}) {
  useEffect(() => {
    const esc = (e) => { if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);
  const c = work.expandContent;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>âœ•</button>
        <div className="slabel" style={{marginBottom:12}}>{work.tag}</div>
        <h2 className="display" style={{fontSize:34,fontWeight:500,color:WHITE,lineHeight:1.2,marginBottom:20}}>{work.title}</h2>
        <div style={{height:1,background:GOLD_BORDER,marginBottom:24}}/>
        <p style={{fontSize:15,lineHeight:1.85,color:"rgba(240,237,230,.65)",marginBottom:28}}>{c.what}</p>
        {c.dimensions && (
          <div style={{marginBottom:28}}>
            <div className="slabel" style={{marginBottom:14,color:GRAY}}>The 9 Dimensions</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {c.dimensions.map((d,i)=>(
                <div key={i} style={{fontSize:12,color:"rgba(240,237,230,.5)",padding:"8px 12px",border:`1px solid rgba(201,160,41,.1)`,display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:4,height:4,background:GOLD,borderRadius:"50%",flexShrink:0}}/> {d}
                </div>
              ))}
            </div>
          </div>
        )}
        {c.pillars && (
          <div style={{marginBottom:28}}>
            {c.pillars.map(p=>(
              <div key={p.sym} style={{display:"flex",gap:16,marginBottom:16,alignItems:"flex-start"}}>
                <div className="display" style={{fontSize:26,fontWeight:700,color:"rgba(201,160,41,.35)",flexShrink:0,lineHeight:1,marginTop:4}}>{p.sym}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:500,color:WHITE,marginBottom:5}}>{p.name}</div>
                  <div style={{fontSize:13,color:GRAY,lineHeight:1.65}}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{background:"rgba(201,160,41,.04)",border:`1px solid ${GOLD_BORDER}`,padding:"16px 20px",marginBottom:28}}>
          <div style={{fontSize:13,color:"rgba(240,237,230,.55)",lineHeight:1.7}}>{c.access}</div>
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-gold" style={{fontSize:12,padding:"11px 24px"}}>Book a Call</a>
          {c.notionLabel && <a href={NOTION_GMM} target="_blank" rel="noreferrer" className="btn-outline" style={{fontSize:12,padding:"10px 24px"}}>{c.notionLabel}</a>}
        </div>
      </div>
    </div>
  );
}

function LabForm() {
  const [form, setForm] = useState({name:"",email:"",instagram:"",business:"",why:"",stage:""});
  const [submitted, setSubmitted] = useState(false);
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const handleSubmit = async () => {
    if(!form.name||!form.email||!form.business||!form.why) return;
    try {
      const res = await fetch("https://formspree.io/f/mojkpwov", {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify(form),
      });
      if(res.ok) setSubmitted(true);
    } catch(e) { console.error("Form error:",e); }
  };
  if(submitted) return (
    <div style={{textAlign:"center",padding:"48px 32px",border:`1px solid ${GOLD_BORDER}`,background:"rgba(201,160,41,.03)"}}>
      <div style={{color:GOLD,fontSize:32,marginBottom:16}}>â—ˆ</div>
      <div className="display" style={{fontSize:28,color:WHITE,marginBottom:12}}>Application Received</div>
      <p style={{fontSize:14,color:GRAY,lineHeight:1.75}}>We'll review your application and reach out within 48 hours with next steps.</p>
    </div>
  );
  return (
    <div id="lab-form" style={{border:`1px solid ${GOLD_BORDER}`,padding:"40px 36px",background:"rgba(201,160,41,.02)"}}>
      <div className="slabel" style={{marginBottom:20}}>Apply for Access</div>
      <div style={{display:"grid",gap:20}}>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <label className="form-label">Full Name *</label>
            <input className="form-input" placeholder="Your full name" value={form.name} onChange={set("name")}/>
          </div>
          <div>
            <label className="form-label">Email Address *</label>
            <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")}/>
          </div>
        </div>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <label className="form-label">Instagram / Threads Handle</label>
            <input className="form-input" placeholder="@yourhandle" value={form.instagram} onChange={set("instagram")}/>
          </div>
          <div>
            <label className="form-label">Business Stage *</label>
            <select className="form-input" value={form.stage} onChange={set("stage")} style={{appearance:"none"}}>
              <option value="">Select stage</option>
              <option value="idea">Idea Stage</option>
              <option value="early">Early Stage (0â€“6 months)</option>
              <option value="growing">Growing (6 months â€“ 2 years)</option>
              <option value="established">Established (2+ years)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="form-label">What are you building? *</label>
          <textarea className="form-input" rows={3} placeholder="Describe your business, project, or idea..." value={form.business} onChange={set("business")} style={{resize:"vertical"}}/>
        </div>
        <div>
          <label className="form-label">Why do you want to join the Lab? *</label>
          <textarea className="form-input" rows={3} placeholder="What do you want to get out of this ecosystem?" value={form.why} onChange={set("why")} style={{resize:"vertical"}}/>
        </div>
        <div>
          <button className="btn-gold" onClick={handleSubmit} style={{fontSize:13,padding:"14px 36px"}}>Submit Application</button>
          <div style={{fontSize:12,color:GRAY,marginTop:12}}>Applications reviewed manually. Response within 48 hours.</div>
        </div>
      </div>
    </div>
  );
}

export default function RabbiRhemaPortfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  useEffect(()=>{
    const onScroll = ()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",onScroll);
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);
  const go = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const handleCardClick = w => {
    if(w.expand)  { setActiveModal(w); return; }
    if(w.scroll)  { go(w.scroll); return; }
    if(w.link)    { window.open(w.link,"_blank"); }
  };

  return (
    <>
      <style>{css}</style>
      {activeModal && <WorkModal work={activeModal} onClose={()=>setActiveModal(null)}/>}

      {/* NAV */}
      <nav className="nav-wrap" style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:64,padding:"0 48px",display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(13,13,13,.95)":"transparent",backdropFilter:scrolled?"blur(14px)":"none",borderBottom:scrolled?`1px solid ${GOLD_BORDER}`:"none",transition:"all .4s ease"}}>
        <span onClick={()=>go("hero")} style={{cursor:"pointer"}}>
          <span className="display" style={{fontSize:21,fontWeight:600,color:WHITE,letterSpacing:".01em"}}>Rabbi <span style={{color:GOLD}}>Rhema</span></span>
        </span>
        <div className="desktop-nav" style={{display:"flex",gap:36,alignItems:"center"}}>
          {[["works","Works"],["gmm","Market Metrics"],["o3","OÂ³ Operator"],["lab","Growth Lab"],["services","Services"]].map(([id,l])=>(
            <span key={id} className="nav-lnk" onClick={()=>go(id)}>{l}</span>
          ))}
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-gold" style={{padding:"10px 22px"}}>Book a Call</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"120px 48px 80px",position:"relative",background:`radial-gradient(ellipse 65% 55% at 72% 50%, rgba(201,160,41,.06) 0%, transparent 68%), ${BLACK}`,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"14%",right:"7%",width:1,height:220,background:"linear-gradient(to bottom, transparent, rgba(201,160,41,.35), transparent)"}}/>
        <div style={{position:"absolute",top:"18%",right:"9%",width:80,height:80,border:`1px solid rgba(201,160,41,.12)`,transform:"rotate(45deg)"}}/>
        <div style={{position:"absolute",bottom:"22%",right:"14%",width:40,height:40,border:`1px solid rgba(201,160,41,.18)`,transform:"rotate(45deg)"}}/>
        <div style={{position:"absolute",bottom:"10%",left:"48px",width:120,height:1,background:`linear-gradient(90deg, rgba(201,160,41,.4), transparent)`}}/>
        <div style={{maxWidth:1100,position:"relative",zIndex:1}}>
          <div className="slabel fu1" style={{marginBottom:24}}>Ecosystem Architect Â· Growth Strategist Â· Transformational Speaker</div>
          <h1 className="display hero-title fu2" style={{fontSize:"clamp(52px, 8.5vw, 104px)",fontWeight:300,lineHeight:1.0,letterSpacing:"-.025em",color:WHITE,marginBottom:4}}>Building Systems</h1>
          <h1 className="display hero-title fu3" style={{fontSize:"clamp(52px, 8.5vw, 104px)",fontWeight:700,lineHeight:1.0,letterSpacing:"-.025em",color:WHITE,marginBottom:4}}>That <em className="shine-text" style={{fontStyle:"italic"}}>Outlast</em></h1>
          <h1 className="display hero-title fu4" style={{fontSize:"clamp(52px, 8.5vw, 104px)",fontWeight:300,lineHeight:1.0,letterSpacing:"-.025em",color:WHITE,marginBottom:44}}>You.</h1>
          <p className="fu5" style={{fontSize:17,fontWeight:300,lineHeight:1.75,color:"rgba(240,237,230,.62)",maxWidth:520,marginBottom:48}}>I'm Rhema Abikoye â€” Ecosystem Architect, Growth Strategist & Transformational Speaker. I design the interconnected systems that turn ideas into institutions and founders into market forces.</p>
          <div className="fu5" style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-gold">Book a Discovery Call</a>
            <span className="btn-outline" onClick={()=>go("works")}>Explore My Works</span>
          </div>
        </div>
        <div style={{position:"absolute",bottom:40,left:48,display:"flex",alignItems:"center",gap:12,color:"rgba(240,237,230,.28)",fontSize:11,letterSpacing:".15em",textTransform:"uppercase"}}>
          <div style={{width:36,height:1,background:"rgba(240,237,230,.25)"}}/> Scroll to Explore
        </div>
      </section>

      {/* STATS */}
      <div style={{background:OFF_BLACK,borderTop:`1px solid ${GOLD_BORDER}`,borderBottom:`1px solid ${GOLD_BORDER}`}}>
        <div className="four-col" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
          {[["4+","Years Building"],["6-Mo","Mentorship Track"],["9","Market Dimensions"],["Age 20","Continental Target"]].map(([n,l],i)=>(
            <div key={i} className="stat-border" style={{textAlign:"center",padding:"36px 20px",borderRight:i<3?`1px solid ${GOLD_BORDER}`:"none"}}>
              <div className="display" style={{fontSize:48,fontWeight:600,color:GOLD,lineHeight:1}}>{n}</div>
              <div style={{fontSize:12,letterSpacing:".12em",textTransform:"uppercase",color:GRAY,marginTop:8}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section style={{padding:"120px 48px"}}>
        <div className="two-col" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
          <div>
            <div className="slabel" style={{marginBottom:20}}>About</div>
            <h2 className="display" style={{fontSize:"clamp(34px,4vw,52px)",fontWeight:400,lineHeight:1.2,marginBottom:6}}>
              Ecosystem Architect.<br/>Growth Strategist.<br/>Transformational Speaker.
            </h2>
            <span className="gold-bar"/>
            <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.66)",marginBottom:20,marginTop:28}}>
              At 16, I've spent 4+ years in digital marketing â€” starting at 13 â€” before evolving into ecosystem architecture: designing the systems that help entrepreneurs, organizations, and communities compound their impact over time.
            </p>
            <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.66)",marginBottom:36}}>
              My work bridges digital marketing intelligence, ecosystem theory, and continental market analysis â€” building infrastructure for a new generation of African builders to compete at a global level.
            </p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-outline">Let's Talk Strategy</a>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:24}}>
            {/* HEADSHOT â€” replace with <img> once you have your professional photo */}
            <div className="headshot-placeholder">
              <div style={{color:"rgba(201,160,41,.3)",fontSize:36}}>â—‰</div>
              <div style={{fontSize:10,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(201,160,41,.3)",textAlign:"center",lineHeight:1.8}}>Professional Photo<br/>Coming Soon</div>
            </div>
            <div style={{background:OFF_BLACK,border:`1px solid ${GOLD_BORDER}`,padding:"20px 24px",width:"100%",maxWidth:300}}>
              <div className="slabel" style={{marginBottom:10,color:GRAY}}>Philosophy</div>
              <p className="display" style={{fontSize:18,fontStyle:"italic",lineHeight:1.55,color:WHITE}}>"Systems outlast people. Build the system first, then build through it."</p>
            </div>
          </div>
        </div>
      </section>

      {/* RABBI'S WORKS */}
      <section id="works" style={{background:OFF_BLACK,padding:"80px 48px 120px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
            <div>
              <div className="slabel" style={{marginBottom:16}}>Rabbi's Works</div>
              <h2 className="display" style={{fontSize:"clamp(32px,4vw,48px)",fontWeight:400,lineHeight:1.2}}>Frameworks, Systems &<br/><em style={{color:GOLD}}>Market Infrastructure</em></h2>
            </div>
            <div style={{width:1,height:56,background:GOLD_BORDER}}/>
          </div>
          <p style={{fontSize:13,color:GRAY,marginBottom:48,letterSpacing:".04em"}}>Click any card to expand full details.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(310px,1fr))",gap:20}}>
            {WORKS.map(w=>{
              const sc=statusColor(w.status);
              return (
                <div key={w.num} className="card" style={{background:BLACK,padding:30}} onClick={()=>handleCardClick(w)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
                    <span className="display" style={{fontSize:42,fontWeight:700,color:"rgba(201,160,41,.18)",lineHeight:1}}>{w.num}</span>
                    <span style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:sc.color,border:`1px solid ${sc.border}`,padding:"4px 10px"}}>{w.status}</span>
                  </div>
                  <div className="slabel" style={{marginBottom:9,color:GRAY}}>{w.tag}</div>
                  <h3 style={{fontSize:19,fontWeight:500,color:WHITE,marginBottom:12,lineHeight:1.3}}>{w.title}</h3>
                  <p style={{fontSize:14,lineHeight:1.75,color:"rgba(240,237,230,.52)",marginBottom:22}}>{w.desc}</p>
                  <div style={{display:"flex",alignItems:"center",gap:8,color:GOLD,fontSize:12,letterSpacing:".06em"}}>
                    {w.expand?"View Details":w.linkLabel||"Learn More"} <span>â†’</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL MARKET METRICS */}
      <section id="gmm" style={{padding:"120px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="slabel" style={{marginBottom:16}}>Flagship Framework</div>
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
            <div>
              <h2 className="display" style={{fontSize:"clamp(32px,4vw,50px)",fontWeight:400,lineHeight:1.15,marginBottom:24}}>Global Market<br/><em style={{color:GOLD}}>Metrics</em></h2>
              <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.62)",marginBottom:16}}>
                A proprietary 9-dimension framework for evaluating any country's market readiness â€” built for founders, investors, and operators entering unfamiliar territories.
              </p>
              <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.62)",marginBottom:32}}>
                Each country analysis is a structured intelligence report published through the framework. Access is via enrollment â€” these are decision-grade assets, not free content.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:36}}>
                {["Base Power","Relationship Power","Loaned Power","Labor Power","Backend Defense","Currency Strength","Reliance","Trust Market","Behavioral Char."].map(dim=>(
                  <div key={dim} style={{fontSize:11,letterSpacing:".06em",textTransform:"uppercase",color:"rgba(240,237,230,.45)",padding:"7px 10px",border:`1px solid rgba(201,160,41,.1)`,display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:4,height:4,background:GOLD,borderRadius:"50%",flexShrink:0}}/> {dim}
                  </div>
                ))}
              </div>
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-gold">Enroll for Access</a>
            </div>
            <div>
              <div style={{background:OFF_BLACK,border:`1px solid ${GOLD_BORDER}`,padding:32,marginBottom:12,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg, ${GOLD}, transparent)`}}/>
                <div className="slabel" style={{marginBottom:12}}>Episode 01 â€” Singapore</div>
                <h3 style={{fontSize:22,fontWeight:500,color:WHITE,marginBottom:12}}>Singapore: The Precision State</h3>
                <p style={{fontSize:14,lineHeight:1.75,color:"rgba(240,237,230,.58)",marginBottom:24}}>
                  A 9-dimension analysis of Singapore's market infrastructure â€” from its trust economy to behavioral characteristics as Asia's premier business gateway. Full report available to enrolled members.
                </p>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <a href={NOTION_GMM} target="_blank" rel="noreferrer" className="btn-outline" style={{fontSize:12,padding:"9px 20px"}}>Preview on Notion â†’</a>
                  <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-gold" style={{fontSize:12,padding:"10px 20px"}}>Get Full Access</a>
                </div>
              </div>
              {["Episode 02 â€” UAE","Episode 03 â€” Nigeria","Episode 04 â€” United States","Episode 05 â€” China"].map(ep=>(
                <div key={ep} style={{padding:"15px 20px",border:`1px solid rgba(201,160,41,.08)`,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:14,color:"rgba(240,237,230,.38)"}}>{ep}</span>
                  <span style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:GRAY}}>Coming Soon</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OÂ³ OPERATOR */}
      <section id="o3" style={{background:OFF_BLACK,padding:"120px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:72}}>
            <div className="slabel" style={{marginBottom:20}}>Framework & Book</div>
            <h2 className="display" style={{fontSize:"clamp(52px,8vw,92px)",fontWeight:700,lineHeight:1.0,letterSpacing:"-.025em",marginBottom:10}}>The O<span style={{color:GOLD}}>Â³</span> Operator</h2>
            <p className="display" style={{fontSize:"clamp(20px,3vw,32px)",fontWeight:300,fontStyle:"italic",color:GRAY,marginBottom:22}}>Outthink. Outbuild. Outgrow.</p>
            <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.58)",maxWidth:560,margin:"0 auto"}}>A comprehensive framework and PDF book for early-stage entrepreneurs â€” built around three interconnected principles that define how operators think, build, and grow in complex markets.</p>
          </div>
          <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:GOLD_BORDER,marginBottom:60}}>
            {[
              {sym:"OÂ¹",tag:"Outthink",name:"Origin", desc:"Where you start from defines how far you can go. Origin is your foundation â€” positioning, philosophy, and your unfair advantages mapped."},
              {sym:"OÂ²",tag:"Outbuild",name:"Order",  desc:"Order is the architecture. The systems, structures, and sequences that translate vision into operational, compounding reality."},
              {sym:"OÂ³",tag:"Outgrow", name:"Output", desc:"Output is the compounding result of aligned origin and intelligent order. This is where market forces begin working for you."},
            ].map(o=>(
              <div key={o.sym} style={{background:BLACK,padding:"48px 32px",textAlign:"center"}}>
                <div className="display" style={{fontSize:60,fontWeight:700,color:GOLD,lineHeight:1,marginBottom:6}}>{o.sym}</div>
                <div style={{fontSize:10,letterSpacing:".22em",textTransform:"uppercase",color:GRAY,marginBottom:12}}>{o.tag}</div>
                <div style={{fontSize:22,fontWeight:500,color:WHITE,marginBottom:16}}>{o.name}</div>
                <p style={{fontSize:14,lineHeight:1.75,color:"rgba(240,237,230,.52)"}}>{o.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{display:"inline-flex",gap:20,alignItems:"center",padding:"20px 32px",border:`1px solid ${GOLD_BORDER}`,background:"rgba(201,160,41,.03)",flexWrap:"wrap",justifyContent:"center"}}>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:GRAY,marginBottom:4}}>Book Status</div>
                <div style={{fontSize:15,color:WHITE}}>In Development â€” PDF Release Coming Soon</div>
              </div>
              <div style={{width:1,height:40,background:GOLD_BORDER}}/>
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-gold" style={{fontSize:12,padding:"11px 22px",whiteSpace:"nowrap"}}>Get Early Access</a>
            </div>
          </div>
        </div>
      </section>

      {/* ENTREPRENEUR'S GROWTH LAB */}
      <section id="lab" style={{padding:"120px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start",marginBottom:64}}>
            <div>
              <div className="slabel" style={{marginBottom:20}}>Curated Ecosystem</div>
              <h2 className="display" style={{fontSize:"clamp(36px,4.5vw,54px)",fontWeight:400,lineHeight:1.12,marginBottom:24}}>Entrepreneur's<br/><em style={{color:GOLD}}>Growth Lab</em></h2>
              <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.62)",marginBottom:18}}>A curated ecosystem for founders, builders, and market operators â€” designed around peer accountability, market intelligence sharing, and distribution strategy.</p>
              <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.62)",marginBottom:36}}>The Lab is not a community. It's an operating system for ambitious builders who understand that growth is engineered, not wished for.</p>
              <div style={{background:"rgba(201,160,41,.05)",border:`1px solid ${GOLD_BORDER}`,padding:"18px 22px",display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{color:GOLD,fontSize:22,marginTop:2}}>â—ˆ</div>
                <div>
                  <div style={{fontSize:14,fontWeight:500,color:WHITE,marginBottom:4}}>Membership by Application</div>
                  <div style={{fontSize:13,color:GRAY,lineHeight:1.65}}>Full Lab brief and membership details are available to qualified applicants only. Complete the form below to receive your access invitation.</div>
                </div>
              </div>
            </div>
            <div>
              {[
                {icon:"â—ˆ",title:"Market Intelligence Sessions",   desc:"Regular deep-dives into global market analysis, distributed to Lab members before public release."},
                {icon:"â—‡",title:"Peer Ecosystem Network",         desc:"Curated connections between founders, operators, and builders across Africa and beyond."},
                {icon:"â—‰",title:"Framework Library Access",       desc:"Full access to Rabbi Rhema's proprietary ecosystem and growth architecture frameworks."},
                {icon:"â—‹",title:"Growth Accountability System",   desc:"Structured accountability built around real metrics, market outcomes, and execution cadence."},
              ].map(item=>(
                <div key={item.title} style={{display:"flex",gap:20,alignItems:"flex-start",padding:"22px 0",borderBottom:`1px solid rgba(201,160,41,.1)`}}>
                  <div style={{fontSize:22,color:GOLD,flexShrink:0,marginTop:2}}>{item.icon}</div>
                  <div>
                    <div style={{fontSize:15,fontWeight:500,color:WHITE,marginBottom:6}}>{item.title}</div>
                    <div style={{fontSize:13,color:GRAY,lineHeight:1.65}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <LabForm/>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{background:OFF_BLACK,padding:"120px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{marginBottom:56}}>
            <div className="slabel" style={{marginBottom:16}}>Work With Me</div>
            <h2 className="display" style={{fontSize:"clamp(32px,4vw,48px)",fontWeight:400,lineHeight:1.2}}>How I Can Help<br/><em style={{color:GOLD}}>Your Business Grow</em></h2>
          </div>
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:GOLD_BORDER}}>
            {SERVICES.map((s,i)=>(
              <div key={i} style={{background:BLACK,padding:"44px 38px"}}>
                <div style={{fontSize:30,color:GOLD,marginBottom:18}}>{s.icon}</div>
                <h3 style={{fontSize:19,fontWeight:500,color:WHITE,marginBottom:12}}>{s.title}</h3>
                <p style={{fontSize:14,lineHeight:1.8,color:"rgba(240,237,230,.58)",marginBottom:24}}>{s.desc}</p>
                <a href={CALENDLY} target="_blank" rel="noreferrer" style={{color:GOLD,fontSize:12,letterSpacing:".06em",textDecoration:"none",display:"flex",alignItems:"center",gap:8}}>Enquire <span>â†’</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{padding:"120px 48px",textAlign:"center",background:`radial-gradient(ellipse 55% 65% at 50% 50%, rgba(201,160,41,.07) 0%, transparent 68%), ${BLACK}`}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div className="slabel" style={{marginBottom:20}}>Ready to Build?</div>
          <h2 className="display" style={{fontSize:"clamp(40px,6.5vw,76px)",fontWeight:400,lineHeight:1.08,marginBottom:24}}>Let's Build Something<br/><em style={{color:GOLD}}>That Outlasts Us</em></h2>
          <p style={{fontSize:16,lineHeight:1.85,color:"rgba(240,237,230,.58)",marginBottom:48}}>Whether you're looking to architect your growth ecosystem, develop a market strategy, or explore a partnership â€” start with a discovery call.</p>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-gold" style={{fontSize:14,padding:"18px 52px"}}>Book a Discovery Call</a>
          <div style={{marginTop:52,display:"flex",justifyContent:"center",gap:28,flexWrap:"wrap"}}>
            {SOCIALS.map(s=><a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-lnk">{s.label}</a>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:OFF_BLACK,borderTop:`1px solid ${GOLD_BORDER}`,padding:"36px 48px"}}>
        <div className="footer-wrap" style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span className="display" style={{fontSize:19,fontWeight:600,color:WHITE}}>Rabbi <span style={{color:GOLD}}>Rhema</span></span>
          <span style={{fontSize:12,color:GRAY}}>Â© 2026 Rhema Abikoye Â· All Rights Reserved</span>
          <div style={{display:"flex",gap:18}}>
            {SOCIALS.slice(0,4).map(s=><a key={s.short} href={s.url} target="_blank" rel="noreferrer" className="social-lnk">{s.short}</a>)}
          </div>
        </div>
      </footer>
    </>
  );
}
