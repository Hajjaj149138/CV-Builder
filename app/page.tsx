'use client'

import { useState, useCallback } from 'react'

// ─── ICONS ───────────────────────────────────────────────────────────────────
function Ic({ d, size = 15 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d={d} />
    </svg>
  )
}
const PlusIcon     = ({ size }: { size?: number }) => <Ic size={size} d="M12 5v14M5 12h14" />
const TrashIcon    = ({ size }: { size?: number }) => <Ic size={size} d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
const DownloadIcon = ({ size }: { size?: number }) => <Ic size={size} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />

const uid = () => Math.random().toString(36).slice(2, 8)

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Personal   { name:string; title:string; phone:string; email:string; linkedin:string; github:string; location:string }
interface Experience { id:string; title:string; company:string; location:string; startDate:string; endDate:string; bullets:string[] }
interface Project    { id:string; title:string; tech:string; bullets:string[] }
interface Education  { id:string; degree:string; major:string; school:string; location:string; startDate:string; endDate:string; notes:string }
interface SkillGroup { id:string; category:string; skills:string }
interface Award      { id:string; title:string; org:string; desc:string }
interface CV { personal:Personal; summary:string; experience:Experience[]; projects:Project[]; education:Education[]; skillGroups:SkillGroup[]; awards:Award[] }

// ─── DEFAULT DATA (Hajjaj's CV) ───────────────────────────────────────────────
const DEFAULT: CV = {
  personal: {
    name: 'MD. HAJJAJ BIN SONOSI',
    title: 'Software Engineer',
    phone: '+88 01405-833036',
    email: 'hajjajbin149138@gmail.com',
    linkedin: 'linkedin.com/in/md-hajjaj-bin-sonosi',
    github: 'github.com/Hajjaj149138',
    location: '',
  },
  summary: 'Detail-oriented Software Engineer with hands-on experience in web development and Java-based backend systems. Skilled in Java, Spring Boot, RESTful APIs, MySQL, and modern web technologies. Actively involved in developing and maintaining production websites, implementing custom features, and working with hosting environments. Passionate about building scalable backend solutions and growing as a full-stack engineer through real-world projects.',
  experience: [
    {
      id: 'e1', title: 'Web Developer', company: 'Easy To Europe & TripZik LTD',
      location: '', startDate: 'June 2025', endDate: 'Present',
      bullets: [
        'Developed and maintained multiple production-level websites using WordPress with custom HTML, CSS, and JavaScript',
        'Customized Elementor components using custom code to enhance UI, responsiveness, and performance',
        'Worked with cPanel, hosting environments, domain configuration, databases, and deployment workflows',
        'Implemented custom features based on business and operational requirements',
        'Collaborated with internal stakeholders to convert functional requirements into technical solutions',
        'Actively involved in the initial development of an internal CRM system using Java and Spring Boot, focusing on backend architecture, basic user management, and database integration (early development stage)',
      ],
    },
  ],
  projects: [
    { id:'p1', title:'Internal CRM System (Initial Development)', tech:'Java, Spring Boot, MySQL', bullets:['Designed the initial backend architecture of an internal CRM system for business operations','Working with Spring Boot, basic RESTful concepts, and database schema design','Focused on user management, data handling, and backend workflow understanding'] },
    { id:'p2', title:'Food Delivery System', tech:'HTML, CSS, JavaScript, Database', bullets:['Developed a web-based food ordering platform with menu browsing and order placement','Implemented basic admin-side order management features'] },
    { id:'p3', title:'E-Ticketing System', tech:'Java, Java Swing', bullets:['Developed a ticket booking system for bus, train, and air travel','Implemented booking management, seat selection, and fare calculation features'] },
    { id:'p4', title:'Modern City Scenario', tech:'C++, OpenGL (GLUT)', bullets:['Built a modern city simulation using OpenGL (GLUT) with multiple animated objects','Implemented basic movement and animation logic for vehicles and environment elements'] },
    { id:'p5', title:'Prison Management System', tech:'C++', bullets:['Developed a console-based system to manage prisoner records','Implemented structured data handling and basic file operations'] },
  ],
  education: [
    { id:'ed1', degree:'Bachelor of Science (B.Sc.) in Computer Science & Engineering', major:'Major: Software Engineering', school:'American International University-Bangladesh (AIUB)', location:'', startDate:'Oct 2020', endDate:'June 2024', notes:'CGPA: 3.86 / 4.00' },
  ],
  skillGroups: [
    { id:'sg1', category:'Backend Development',   skills:'Java, Spring Boot, RESTful APIs, MySQL, OOP' },
    { id:'sg2', category:'Frontend & Web',         skills:'HTML5, CSS3, JavaScript (ES6+), React, WordPress (Customization-focused)' },
    { id:'sg3', category:'Programming Languages', skills:'Java, C++, Python, PHP' },
    { id:'sg4', category:'Tools & Platforms',      skills:'Git & GitHub, Postman, IntelliJ IDEA, VS Code, Visual Studio, Elementor, cPanel & Hosting Management' },
  ],
  awards: [
    { id:'a1', title:"Dean's List Honors (4 Times)",   org:'American International University-Bangladesh (AIUB)', desc:'Awarded for outstanding academic performance across multiple semesters' },
    { id:'a2', title:'Magna Cum Laude (Silver Medal)',  org:'American International University-Bangladesh (AIUB)', desc:'Graduated with high academic distinction in the Department of Computer Science & Engineering' },
    { id:'a3', title:'Cisco IT Essentials Certificate', org:'Cisco Networking Academy', desc:'Completed foundational training in computer hardware, networking, and IT fundamentals' },
  ],
}

// ─── CV PREVIEW ───────────────────────────────────────────────────────────────
function CvPreview({ cv }: { cv: CV }) {
  const { personal: p, summary, experience, projects, education, skillGroups, awards } = cv
  const SH = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize:'10pt', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px',
      color:'#000', borderBottom:'1.5px solid #222', paddingBottom:'3px', margin:'0 0 7px' }}>
      {children}
    </h2>
  )
  return (
    <article id="cv-preview" style={{
      width:'210mm', minHeight:'297mm', background:'#fff', padding:'13mm 15mm 12mm',
      fontFamily:"'Arial','Helvetica Neue',sans-serif", fontSize:'9.5pt',
      lineHeight:1.55, color:'#111', boxSizing:'border-box',
    }}>
      <header style={{ textAlign:'center', marginBottom:'8px' }}>
        <h1 style={{ fontSize:'18pt', fontWeight:800, margin:'0 0 4px', letterSpacing:'0.5px' }}>
          {p.name || 'Your Name'}
        </h1>
        {p.title && <p style={{ fontSize:'10pt', margin:'0 0 5px', color:'#444' }}>{p.title}</p>}
        <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'12px', fontSize:'8.5pt', color:'#333' }}>
          {p.phone    && <span>📞 {p.phone}</span>}
          {p.email    && <span>✉ {p.email}</span>}
          {p.linkedin && <span>🔗 {p.linkedin}</span>}
          {p.github   && <span>💻 {p.github}</span>}
          {p.location && <span>📍 {p.location}</span>}
        </div>
      </header>
      <hr style={{ border:'none', borderTop:'1.5px solid #000', margin:'5px 0 9px' }} />

      {summary && <section style={{ marginBottom:'11px' }}><SH>Summary</SH><p style={{ margin:0, textAlign:'justify' }}>{summary}</p></section>}

      {experience.filter(e => e.title).length > 0 && (
        <section style={{ marginBottom:'11px' }}>
          <SH>Professional Experience</SH>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom:'8px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <strong style={{ fontSize:'10pt' }}>{exp.title}{exp.company ? `, ${exp.company}` : ''}</strong>
                <span style={{ fontSize:'8.5pt', color:'#555', whiteSpace:'nowrap', marginLeft:'8px' }}>
                  {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                </span>
              </div>
              {exp.location && <div style={{ fontSize:'8.5pt', color:'#555' }}>{exp.location}</div>}
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin:'4px 0 0 16px', padding:0 }}>
                  {exp.bullets.filter(Boolean).map((b,i) => <li key={i} style={{ marginBottom:'2px' }}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {projects.filter(p => p.title).length > 0 && (
        <section style={{ marginBottom:'11px' }}>
          <SH>Projects</SH>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom:'8px' }}>
              <strong style={{ textDecoration:'underline', fontSize:'9.5pt' }}>{proj.title}</strong>
              {proj.tech && <div style={{ fontSize:'8.5pt', color:'#444', marginBottom:'2px' }}>{proj.tech}</div>}
              {proj.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin:'2px 0 0 16px', padding:0 }}>
                  {proj.bullets.filter(Boolean).map((b,i) => <li key={i} style={{ marginBottom:'2px' }}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {skillGroups.filter(sg => sg.category).length > 0 && (
        <section style={{ marginBottom:'11px' }}>
          <SH>Technical Skills</SH>
          {skillGroups.filter(sg => sg.category).map(sg => (
            <div key={sg.id} style={{ marginBottom:'5px' }}>
              <strong style={{ fontSize:'9.5pt' }}>{sg.category}</strong>
              {sg.skills && <ul style={{ margin:'2px 0 0 16px', padding:0 }}><li>{sg.skills}</li></ul>}
            </div>
          ))}
        </section>
      )}

      {education.filter(e => e.degree || e.school).length > 0 && (
        <section style={{ marginBottom:'11px' }}>
          <SH>Education</SH>
          {education.map(ed => (
            <div key={ed.id} style={{ marginBottom:'8px' }}>
              <strong style={{ fontSize:'9.5pt' }}>{ed.degree}</strong>
              {ed.major  && <div style={{ fontSize:'9pt' }}>{ed.major}</div>}
              {ed.school && <div style={{ fontSize:'9pt' }}>{ed.school}</div>}
              {(ed.startDate || ed.endDate) && <div style={{ fontSize:'8.5pt', color:'#444' }}>{ed.startDate}{ed.endDate ? ` – ${ed.endDate}` : ''}</div>}
              {ed.notes && <ul style={{ margin:'2px 0 0 16px', padding:0 }}><li style={{ fontSize:'9pt' }}>{ed.notes}</li></ul>}
            </div>
          ))}
        </section>
      )}

      {awards.filter(a => a.title).length > 0 && (
        <section>
          <SH>Awards &amp; Certifications</SH>
          {awards.map(a => (
            <div key={a.id} style={{ marginBottom:'7px' }}>
              <strong style={{ fontSize:'9.5pt' }}>{a.title}</strong>
              {a.org  && <div style={{ fontSize:'8.5pt', color:'#444' }}>{a.org}</div>}
              {a.desc && <ul style={{ margin:'2px 0 0 16px', padding:0 }}><li style={{ fontSize:'9pt' }}>{a.desc}</li></ul>}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}

// ─── FORM PRIMITIVES ──────────────────────────────────────────────────────────
const IS: React.CSSProperties = { width:'100%', padding:'7px 10px', border:'1px solid #e2e8f0', borderRadius:'6px', fontSize:'12.5px', outline:'none', background:'#fafafa', color:'#1a1a2e', boxSizing:'border-box', fontFamily:'inherit' }

function Inp({ value, onChange, placeholder, type='text' }: { value:string; onChange:(v:string)=>void; placeholder?:string; type?:string }) {
  return <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={IS}
    onFocus={e=>(e.target.style.borderColor='#6366f1')} onBlur={e=>(e.target.style.borderColor='#e2e8f0')} />
}
function Txta({ value, onChange, placeholder, rows=3 }: { value:string; onChange:(v:string)=>void; placeholder?:string; rows?:number }) {
  return <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
    style={{...IS, resize:'vertical'}} onFocus={e=>(e.target.style.borderColor='#6366f1')} onBlur={e=>(e.target.style.borderColor='#e2e8f0')} />
}
function Fld({ label, children }: { label:string; children:React.ReactNode }) {
  return (
    <div style={{ marginBottom:'9px' }}>
      <label style={{ display:'block', fontSize:'10px', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'3px' }}>{label}</label>
      {children}
    </div>
  )
}
function Card({ children, onDelete }: { children:React.ReactNode; onDelete?:()=>void }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'12px', marginBottom:'10px', position:'relative' }}>
      {onDelete && <button onClick={onDelete} style={{ position:'absolute', top:'9px', right:'9px', background:'none', border:'none', cursor:'pointer', color:'#ef4444', padding:'1px' }}><TrashIcon size={13}/></button>}
      {children}
    </div>
  )
}
function AddBtn({ onClick, label }: { onClick:()=>void; label:string }) {
  return (
    <button onClick={onClick} style={{ width:'100%', padding:'9px', border:'2px dashed #c7d2fe', borderRadius:'8px', background:'none', color:'#6366f1', cursor:'pointer', fontSize:'12px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}>
      <PlusIcon size={13}/> {label}
    </button>
  )
}
const G2: React.CSSProperties = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }

// ─── STEP PANELS ──────────────────────────────────────────────────────────────
function StepPersonal({ cv, setCV }: { cv:CV; setCV:React.Dispatch<React.SetStateAction<CV>> }) {
  const set = (k: keyof Personal) => (v:string) => setCV(c=>({...c, personal:{...c.personal,[k]:v}}))
  return <>
    <Fld label="Full Name"><Inp value={cv.personal.name} onChange={set('name')} placeholder="Your Full Name" /></Fld>
    <Fld label="Professional Title"><Inp value={cv.personal.title} onChange={set('title')} placeholder="Software Engineer" /></Fld>
    <div style={G2}>
      <Fld label="Phone"><Inp value={cv.personal.phone} onChange={set('phone')} placeholder="+88 01xxx-xxxxxx" /></Fld>
      <Fld label="Email"><Inp value={cv.personal.email} onChange={set('email')} placeholder="you@email.com" /></Fld>
      <Fld label="LinkedIn"><Inp value={cv.personal.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/..." /></Fld>
      <Fld label="GitHub"><Inp value={cv.personal.github} onChange={set('github')} placeholder="github.com/..." /></Fld>
    </div>
    <Fld label="Location (optional)"><Inp value={cv.personal.location} onChange={set('location')} placeholder="Dhaka, Bangladesh" /></Fld>
    <Fld label="Professional Summary"><Txta rows={5} value={cv.summary} onChange={v=>setCV(c=>({...c,summary:v}))} placeholder="Brief career overview..." /></Fld>
  </>
}

function StepExperience({ cv, setCV }: { cv:CV; setCV:React.Dispatch<React.SetStateAction<CV>> }) {
  const add = () => setCV(c=>({...c, experience:[...c.experience,{id:uid(),title:'',company:'',location:'',startDate:'',endDate:'',bullets:['']}]}))
  const del = (id:string) => setCV(c=>({...c, experience:c.experience.filter(e=>e.id!==id)}))
  const sf  = (id:string, k:keyof Experience) => (v:string) => setCV(c=>({...c, experience:c.experience.map(e=>e.id===id?{...e,[k]:v}:e)}))
  const sb  = (id:string, i:number, v:string) => setCV(c=>({...c, experience:c.experience.map(e=>e.id===id?{...e,bullets:e.bullets.map((b,j)=>j===i?v:b)}:e)}))
  const ab  = (id:string) => setCV(c=>({...c, experience:c.experience.map(e=>e.id===id?{...e,bullets:[...e.bullets,'']}:e)}))
  const db  = (id:string, i:number) => setCV(c=>({...c, experience:c.experience.map(e=>e.id===id?{...e,bullets:e.bullets.filter((_,j)=>j!==i)}:e)}))
  return <>
    {cv.experience.map(exp=>(
      <Card key={exp.id} onDelete={()=>del(exp.id)}>
        <Fld label="Job Title"><Inp value={exp.title} onChange={sf(exp.id,'title')} placeholder="Web Developer" /></Fld>
        <Fld label="Company"><Inp value={exp.company} onChange={sf(exp.id,'company')} placeholder="Company Name" /></Fld>
        <div style={G2}>
          <Fld label="Start Date"><Inp value={exp.startDate} onChange={sf(exp.id,'startDate')} placeholder="June 2025" /></Fld>
          <Fld label="End Date"><Inp value={exp.endDate} onChange={sf(exp.id,'endDate')} placeholder="Present" /></Fld>
        </div>
        <Fld label="Location"><Inp value={exp.location} onChange={sf(exp.id,'location')} placeholder="Dhaka (optional)" /></Fld>
        <label style={{fontSize:'10px',fontWeight:700,color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.5px',display:'block',marginBottom:'5px'}}>Bullet Points</label>
        {exp.bullets.map((b,i)=>(
          <div key={i} style={{display:'flex',gap:'5px',marginBottom:'5px',alignItems:'flex-start'}}>
            <Txta rows={2} value={b} onChange={v=>sb(exp.id,i,v)} placeholder="Achievement or responsibility..." />
            <button onClick={()=>db(exp.id,i)} style={{background:'none',border:'none',cursor:'pointer',color:'#ef4444',marginTop:'6px',flexShrink:0}}><TrashIcon size={12}/></button>
          </div>
        ))}
        <button onClick={()=>ab(exp.id)} style={{fontSize:'11px',color:'#6366f1',background:'none',border:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center',gap:'4px'}}><PlusIcon size={12}/> Add bullet</button>
      </Card>
    ))}
    <AddBtn onClick={add} label="Add Experience" />
  </>
}

function StepProjects({ cv, setCV }: { cv:CV; setCV:React.Dispatch<React.SetStateAction<CV>> }) {
  const add = () => setCV(c=>({...c, projects:[...c.projects,{id:uid(),title:'',tech:'',bullets:['']}]}))
  const del = (id:string) => setCV(c=>({...c, projects:c.projects.filter(p=>p.id!==id)}))
  const sf  = (id:string, k:keyof Project) => (v:string) => setCV(c=>({...c, projects:c.projects.map(p=>p.id===id?{...p,[k]:v}:p)}))
  const sb  = (id:string, i:number, v:string) => setCV(c=>({...c, projects:c.projects.map(p=>p.id===id?{...p,bullets:p.bullets.map((b,j)=>j===i?v:b)}:p)}))
  const ab  = (id:string) => setCV(c=>({...c, projects:c.projects.map(p=>p.id===id?{...p,bullets:[...p.bullets,'']}:p)}))
  const db  = (id:string, i:number) => setCV(c=>({...c, projects:c.projects.map(p=>p.id===id?{...p,bullets:p.bullets.filter((_,j)=>j!==i)}:p)}))
  return <>
    {cv.projects.map(proj=>(
      <Card key={proj.id} onDelete={()=>del(proj.id)}>
        <Fld label="Project Title"><Inp value={proj.title} onChange={sf(proj.id,'title')} placeholder="Internal CRM System" /></Fld>
        <Fld label="Technologies"><Inp value={proj.tech} onChange={sf(proj.id,'tech')} placeholder="Java, Spring Boot, MySQL" /></Fld>
        <label style={{fontSize:'10px',fontWeight:700,color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.5px',display:'block',marginBottom:'5px'}}>Bullet Points</label>
        {proj.bullets.map((b,i)=>(
          <div key={i} style={{display:'flex',gap:'5px',marginBottom:'5px',alignItems:'center'}}>
            <Inp value={b} onChange={v=>sb(proj.id,i,v)} placeholder="What you built / achieved..." />
            <button onClick={()=>db(proj.id,i)} style={{background:'none',border:'none',cursor:'pointer',color:'#ef4444',flexShrink:0}}><TrashIcon size={12}/></button>
          </div>
        ))}
        <button onClick={()=>ab(proj.id)} style={{fontSize:'11px',color:'#6366f1',background:'none',border:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center',gap:'4px'}}><PlusIcon size={12}/> Add bullet</button>
      </Card>
    ))}
    <AddBtn onClick={add} label="Add Project" />
  </>
}

function StepSkills({ cv, setCV }: { cv:CV; setCV:React.Dispatch<React.SetStateAction<CV>> }) {
  const add = () => setCV(c=>({...c, skillGroups:[...c.skillGroups,{id:uid(),category:'',skills:''}]}))
  const del = (id:string) => setCV(c=>({...c, skillGroups:c.skillGroups.filter(s=>s.id!==id)}))
  const sf  = (id:string, k:keyof SkillGroup) => (v:string) => setCV(c=>({...c, skillGroups:c.skillGroups.map(s=>s.id===id?{...s,[k]:v}:s)}))
  return <>
    <p style={{fontSize:'11px',color:'#6b7280',margin:'0 0 12px'}}>Group skills by category (e.g. Backend, Frontend, Tools).</p>
    {cv.skillGroups.map(sg=>(
      <Card key={sg.id} onDelete={()=>del(sg.id)}>
        <Fld label="Category"><Inp value={sg.category} onChange={sf(sg.id,'category')} placeholder="Backend Development" /></Fld>
        <Fld label="Skills (comma-separated)"><Txta rows={2} value={sg.skills} onChange={sf(sg.id,'skills')} placeholder="Java, Spring Boot, MySQL, OOP" /></Fld>
      </Card>
    ))}
    <AddBtn onClick={add} label="Add Skill Group" />
  </>
}

function StepEducation({ cv, setCV }: { cv:CV; setCV:React.Dispatch<React.SetStateAction<CV>> }) {
  const add = () => setCV(c=>({...c, education:[...c.education,{id:uid(),degree:'',major:'',school:'',location:'',startDate:'',endDate:'',notes:''}]}))
  const del = (id:string) => setCV(c=>({...c, education:c.education.filter(e=>e.id!==id)}))
  const sf  = (id:string, k:keyof Education) => (v:string) => setCV(c=>({...c, education:c.education.map(e=>e.id===id?{...e,[k]:v}:e)}))
  return <>
    {cv.education.map(ed=>(
      <Card key={ed.id} onDelete={()=>del(ed.id)}>
        <Fld label="Degree"><Inp value={ed.degree} onChange={sf(ed.id,'degree')} placeholder="B.Sc. in Computer Science & Engineering" /></Fld>
        <Fld label="Major / Specialization"><Inp value={ed.major} onChange={sf(ed.id,'major')} placeholder="Major: Software Engineering" /></Fld>
        <Fld label="University / School"><Inp value={ed.school} onChange={sf(ed.id,'school')} placeholder="University Name" /></Fld>
        <div style={G2}>
          <Fld label="Start"><Inp value={ed.startDate} onChange={sf(ed.id,'startDate')} placeholder="Oct 2020" /></Fld>
          <Fld label="End"><Inp value={ed.endDate} onChange={sf(ed.id,'endDate')} placeholder="June 2024" /></Fld>
        </div>
        <Fld label="CGPA / Honors"><Inp value={ed.notes} onChange={sf(ed.id,'notes')} placeholder="CGPA: 3.86 / 4.00" /></Fld>
      </Card>
    ))}
    <AddBtn onClick={add} label="Add Education" />
  </>
}

function StepAwards({ cv, setCV }: { cv:CV; setCV:React.Dispatch<React.SetStateAction<CV>> }) {
  const add = () => setCV(c=>({...c, awards:[...c.awards,{id:uid(),title:'',org:'',desc:''}]}))
  const del = (id:string) => setCV(c=>({...c, awards:c.awards.filter(a=>a.id!==id)}))
  const sf  = (id:string, k:keyof Award) => (v:string) => setCV(c=>({...c, awards:c.awards.map(a=>a.id===id?{...a,[k]:v}:a)}))
  return <>
    {cv.awards.map(a=>(
      <Card key={a.id} onDelete={()=>del(a.id)}>
        <Fld label="Award / Certificate"><Inp value={a.title} onChange={sf(a.id,'title')} placeholder="Dean's List Honors" /></Fld>
        <Fld label="Issuing Organization"><Inp value={a.org} onChange={sf(a.id,'org')} placeholder="University / Academy" /></Fld>
        <Fld label="Description"><Inp value={a.desc} onChange={sf(a.id,'desc')} placeholder="Awarded for outstanding performance..." /></Fld>
      </Card>
    ))}
    <AddBtn onClick={add} label="Add Award / Certificate" />
  </>
}

const STEPS = ['Personal','Experience','Projects','Skills','Education','Awards']
const COMPS = [StepPersonal,StepExperience,StepProjects,StepSkills,StepEducation,StepAwards]
const ICONS = [
  'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2',
  'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
  'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5',
  'M8.21 13.89L7 23l5-3 5 3-1.21-9.12M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
]

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Page() {
  const [cv, setCV]     = useState<CV>(DEFAULT)
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleDownload = useCallback(async () => {
    setLoading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element  = document.getElementById('cv-preview')
      if (!element) return
      const opt = {
        margin:      0,
        filename:    `${(cv.personal.name || 'CV').replace(/\s+/g,'_')}_Resume.pdf`,
        image:       { type: 'jpeg', quality: 1 },
        html2canvas: { scale:2, useCORS:true, letterRendering:true, scrollX:0, scrollY:0 },
        jsPDF:       { unit:'mm', format:'a4', orientation:'portrait' },
        pagebreak:   { mode:['avoid-all','css','legacy'] },
      }
      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('PDF generation failed:', err)
      window.print()
    } finally {
      setLoading(false)
    }
  }, [cv.personal.name])

  const StepComp = COMPS[step]

  return (
    <>
      <style>{`
        .layout{display:flex;height:100vh;overflow:hidden;}
        .left{width:390px;flex-shrink:0;height:100vh;overflow-y:auto;background:#fff;border-right:1px solid #e5e7eb;display:flex;flex-direction:column;}
        .right{flex:1;overflow:auto;background:#eceaf8;display:flex;flex-direction:column;align-items:center;padding:20px;}
        .tabs{display:flex;flex-wrap:wrap;gap:3px;padding:10px 10px 0;}
        .tab{flex:1;min-width:52px;padding:6px 2px;border:none;border-radius:7px;cursor:pointer;font-size:9.5px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:3px;transition:all .15s;background:transparent;color:#9ca3af;}
        .tab.on{background:#eef2ff;color:#4338ca;}
        .tab:hover{background:#f5f3ff;color:#4338ca;}
        .form-body{flex:1;padding:14px;overflow-y:auto;}
        .form-footer{display:flex;gap:8px;padding:10px 14px;border-top:1px solid #f0f0f5;}
        .btn-pri{flex:1;padding:9px;background:#4f46e5;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12.5px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:5px;}
        .btn-pri:disabled{opacity:.7;cursor:not-allowed;}
        .btn-sec{flex:1;padding:9px;background:#f3f4f6;color:#374151;border:none;border-radius:7px;cursor:pointer;font-size:12.5px;font-weight:700;}
        .exp-btn{display:flex;align-items:center;gap:5px;padding:8px 13px;background:#1a1a2e;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:11.5px;font-weight:700;white-space:nowrap;}
        .exp-btn:disabled{opacity:.7;cursor:not-allowed;}
        .cv-shadow{box-shadow:0 2px 22px rgba(0,0,0,.14);}
        @media(max-width:900px){.layout{flex-direction:column;height:auto;}.left{width:100%;height:auto;}.right{padding:16px;}}
        @media print{.left,.right>*:not(.cv-shadow){display:none!important;}.right{padding:0;background:#fff;}.cv-shadow{box-shadow:none!important;}}
      `}</style>

      <div className="layout">
        {/* LEFT */}
        <div className="left">
          <div style={{padding:'12px 14px 10px',borderBottom:'1px solid #f0f0f5',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontWeight:800,fontSize:'15px',color:'#1a1a2e',letterSpacing:'-0.3px'}}>CV Builder</div>
              <div style={{fontSize:'10px',color:'#9ca3af'}}>ATS-Ready · Live Preview</div>
            </div>
            <button className="exp-btn" onClick={handleDownload} disabled={loading}>
              <DownloadIcon size={13}/>{loading?'Generating…':'Export PDF'}
            </button>
          </div>

          <div className="tabs">
            {STEPS.map((s,i)=>(
              <button key={s} className={`tab${step===i?' on':''}`} onClick={()=>setStep(i)}>
                <Ic d={ICONS[i]} size={13}/>{s}
              </button>
            ))}
          </div>

          <div className="form-body">
            <h3 style={{margin:'8px 0 12px',fontSize:'14px',fontWeight:800,color:'#1a1a2e'}}>{STEPS[step]}</h3>
            <StepComp cv={cv} setCV={setCV}/>
          </div>

          <div className="form-footer">
            {step>0 && <button className="btn-sec" onClick={()=>setStep(s=>s-1)}>← Back</button>}
            {step<STEPS.length-1
              ? <button className="btn-pri" onClick={()=>setStep(s=>s+1)}>Next →</button>
              : <button className="btn-pri" onClick={handleDownload} disabled={loading}><DownloadIcon size={13}/>{loading?'Generating…':'Download PDF'}</button>
            }
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',maxWidth:'780px',marginBottom:'14px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <span style={{fontWeight:800,fontSize:'13px',color:'#1a1a2e'}}>Live Preview</span>
              <span style={{fontSize:'10px',color:'#6b7280',background:'#fff',padding:'2px 8px',borderRadius:'10px',border:'1px solid #e2e8f0'}}>A4 · ATS-Optimized</span>
            </div>
            <button className="exp-btn" onClick={handleDownload} disabled={loading}>
              <DownloadIcon size={12}/>{loading?'Generating…':'Download PDF'}
            </button>
          </div>
          <div className="cv-shadow"><CvPreview cv={cv}/></div>
          <div style={{marginTop:'14px',padding:'8px 14px',background:'#fff',borderRadius:'8px',border:'1px solid #e5e7eb',maxWidth:'600px',fontSize:'10.5px',color:'#6b7280',textAlign:'center',lineHeight:1.6}}>
            ✅ Fully selectable HTML text — ATS-compatible. Click <strong>Download PDF</strong> to save your CV as a real PDF file.
          </div>
        </div>
      </div>
    </>
  )
}
