import {useState,useEffect,useRef} from 'react'
import * as L from 'lucide-react'
import {T,COURSES,NAMES} from './i18n.js'
const PHONE='917000636271',MAIL='abhicomputer312377@gmail.com'
const MAP='https://www.google.com/maps/search/?api=1&query=Abhi%20Computer%20Center%2C%20Near%20Railway%20Crossing%2C%20New%20Colony%2C%20Pachore%2C%20Madhya%20Pradesh%2C%20India'
const IDS=["home","about","courses","contact"]
const Logo=()=><svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#315CFF"/><path d="M18 46 32 16l14 30M24 37h16" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="46" cy="18" r="5" fill="#54D7F2"/></svg>
function useReveal(){const r=useRef();useEffect(()=>{const o=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target)}}),{threshold:.15});r.current.querySelectorAll('.rv').forEach(n=>o.observe(n));return()=>o.disconnect()},[]);return r}
export default function App(){
const [lang,setLang]=useState('en'),t=T[lang]
const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),[active,setActive]=useState('home')
const [filter,setFilter]=useState('all'),[pick,setPick]=useState(null)
const [f,setF]=useState({name:'',mob:'',course:'',msg:'',ok:false}),[err,setErr]=useState({}),[sent,setSent]=useState(null)
const root=useReveal()
useEffect(()=>{document.documentElement.lang=lang==='hi'?'hi':'en'},[lang])
useEffect(()=>{const s=()=>setScrolled(scrollY>20);s();addEventListener('scroll',s,{passive:true});
const o=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&setActive(x.target.id)),{rootMargin:'-40% 0px -55% 0px'});IDS.forEach(i=>o.observe(document.getElementById(i)));
return()=>{removeEventListener('scroll',s);o.disconnect()}},[])
useEffect(()=>{const k=e=>e.key==='Escape'&&setOpen(false);addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[])
const go=id=>{setOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
const enquire=c=>{setF(p=>({...p,course:c}));go('enquire')}
const shown=COURSES.filter(c=>filter==='all'||c[1]===filter)
const xOpts=[['computer',COURSES.filter(c=>c[1]==='computer'&&c[0]!=='cpct').map(c=>c[0])],['typing',['cpct']],['academic',COURSES.filter(c=>c[1]==='academic').map(c=>c[0])]]
const mobOk=v=>/^(?:\+91|91|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g,''))
const buildUrl=()=>{const m=f.mob.replace(/[\s-]/g,'').slice(-10);let s=`${t.msgHead}\n\nName: ${f.name.trim()}\nMobile: ${m}\nCourse: ${NAMES[f.course]}\n`;if(f.msg.trim())s+=`Message: ${f.msg.trim()}\n`;s+=`\n${t.msgTail}`;return`https://wa.me/${PHONE}?text=${encodeURIComponent(s)}`}
const submit=e=>{e.preventDefault();const x={};if(!f.name.trim())x.name=t.eName;if(!mobOk(f.mob))x.mob=t.eMob;if(!f.course)x.course=t.eCourse;if(!f.ok)x.ok=t.eConsent;setErr(x);if(Object.keys(x).length){document.getElementById('f-'+Object.keys(x)[0])?.focus();return}
const u=buildUrl();setSent(u);window.open(u,'_blank','noopener')}
const Ic=({n,...p})=>{const C=L[n]||L.Circle;return<C {...p}/>}
return(<div ref={root}>
<header className={'nav'+(scrolled?' sc':'')}><a href="#home" className="brand" onClick={e=>{e.preventDefault();go('home')}}><Logo/><span>Abhi Computer Center</span></a>
<nav className={'links'+(open?' open':'')} aria-label="Main">{IDS.map((id,i)=><a key={id} href={'#'+id} className={active===id?'act':''} aria-current={active===id?'true':undefined} onClick={e=>{e.preventDefault();go(id)}}>{t.nav[i]}</a>)}</nav>
<div className="navr"><button className="lang" onClick={()=>setLang(lang==='en'?'hi':'en')} aria-label="Language"><L.Languages size={16}/>{lang==='en'?'हिंदी':'EN'}</button>
<button className="btn sm" onClick={()=>go('enquire')}>{t.enq}</button>
<button className="burger" aria-expanded={open} aria-label={t.menu} onClick={()=>setOpen(!open)}>{open?<L.X/>:<L.Menu/>}</button></div></header>

<section id="home" className="hero dark"><div className="grid"/><div className="hl">
<p className="eyebrow h1a">{t.eyebrow}</p>
<h1><span className="ln l1">{t.h1[0]}</span><span className="ln l2">{t.h1[1]}</span><span className="ln l3"><em>{t.h1[2]}</em></span></h1>
<p className="lead h2a">{t.heroP}</p>
<div className="ctas h3a"><button className="btn" onClick={()=>go('courses')}>{t.explore}</button><button className="btn ghost" onClick={()=>go('contact')}>{t.talk}</button></div>
<p className="loc h3a"><L.MapPin size={16}/>{t.loc}</p></div>
<div className="hv" aria-hidden="true"><div className="panel"><div className="orb"/><div className="screen"><i/><i/><i/><b/><b/><b/></div></div>
<div className="fl a"><L.Monitor size={18}/>{t.f1}</div><div className="fl b"><L.GraduationCap size={18}/>{t.f2}</div>
<div className="fl c"><span>{t.f3}</span>{['DCA','CPCT','BA'].map(x=><u key={x}>{x}</u>)}</div></div></section>

<section id="about" className="about"><div className="wrap two"><div className="rv"><h2>{t.aT}</h2><p className="big">{t.aP}</p></div>
<div className="rv aside"><b>{t.dir}</b><span>{t.dirN}</span><small>{t.loc}</small></div></div></section>

<section id="journey" className="journey dark"><div className="wrap"><h2 className="rv">{t.jT}</h2><ol className="jt">{t.tl.map(([d,x],i)=><li key={i} className={'rv jt'+i}><b>{d}</b><p>{x}</p></li>)}</ol></div></section>

<section id="courses" className="courses"><div className="wrap"><div className="rv"><h2>{t.cT}</h2><p className="sub">{t.cP}</p>
<div className="tabs" role="tablist">{['all','computer','academic'].map(k=><button key={k} role="tab" aria-selected={filter===k} className={filter===k?'on':''} onClick={()=>setFilter(k)}>{t.tabs[k]}</button>)}</div></div>
<ul className="cg" key={filter}>{shown.map(([id,g,ic],i)=><li key={id} className={'cc '+g+(i===0&&filter!=='academic'?' feat':'')} style={{animationDelay:i*45+'ms'}}>
<span className="ci"><Ic n={ic} size={26}/></span><h3>{NAMES[id]}</h3><p>{t.cd[id]}</p>
<button className="ask" onClick={()=>enquire(id)}>{t.ask}<L.ArrowUpRight size={18}/></button></li>)}</ul></div></section>

<section className="why dark"><div className="wrap"><h2 className="rv">{t.wT}</h2><div className="rows">{t.w.map(([h,p],i)=><div key={i} className="row rv" style={{transitionDelay:i*80+'ms'}}><L.Compass className="ri" size={22} style={{display:'none'}}/><span className="rn"><Ic n={['Compass','Laptop','GraduationCap','MessageCircle'][i]} size={28}/></span><h3>{h}</h3><p>{p}</p></div>)}</div></div></section>

<section className="explorer"><div className="wrap xw"><h2 className="rv">{t.xT}</h2>
<div className="xo" role="radiogroup" aria-label={t.xT}>{t.x.map((l,i)=><button key={i} role="radio" aria-checked={pick===i} className={pick===i?'on':''} onClick={()=>setPick(i)}>{l}</button>)}</div>
{pick!==null&&<div className="xr" key={pick} aria-live="polite"><div className="chips">{xOpts[pick][1].map(id=><span key={id}>{NAMES[id]}</span>)}</div>{pick===1&&<p className="note">{t.xNote}</p>}
<button className="btn" onClick={()=>enquire(xOpts[pick][1][0])}>{t.ask}</button></div>}</div></section>

<section id="enquire" className="enq dark"><div className="wrap two"><div className="rv"><h2>{t.fT}</h2><p className="sub">{t.fP}</p></div>
<form onSubmit={submit} noValidate className="rv">
<label htmlFor="f-name">{t.name}</label><input id="f-name" autoComplete="name" value={f.name} aria-invalid={!!err.name} onChange={e=>setF({...f,name:e.target.value})}/>{err.name&&<small role="alert">{err.name}</small>}
<label htmlFor="f-mob">{t.mob}</label><input id="f-mob" type="tel" inputMode="tel" autoComplete="tel" value={f.mob} aria-invalid={!!err.mob} onChange={e=>setF({...f,mob:e.target.value})}/>{err.mob&&<small role="alert">{err.mob}</small>}
<label htmlFor="f-course">{t.course}</label><select id="f-course" value={f.course} aria-invalid={!!err.course} onChange={e=>setF({...f,course:e.target.value})}><option value="">{t.pick}</option>{COURSES.map(c=><option key={c[0]} value={c[0]}>{NAMES[c[0]]}</option>)}</select>{err.course&&<small role="alert">{err.course}</small>}
<label htmlFor="f-msg">{t.msg}</label><textarea id="f-msg" rows="3" value={f.msg} onChange={e=>setF({...f,msg:e.target.value})}/>
<label className="chk"><input id="f-ok" type="checkbox" checked={f.ok} onChange={e=>setF({...f,ok:e.target.checked})}/>{t.consent}</label>{err.ok&&<small role="alert">{err.ok}</small>}
<button className="btn" type="submit">{t.send}</button>
{sent&&<p className="okm" role="status">{t.ok} <a href={sent} target="_blank" rel="noopener noreferrer">{t.fb}</a></p>}</form></div></section>

<section id="contact" className="contact"><div className="wrap"><div className="cta rv"><h2>{t.cT2}</h2>
<address><b>Abhi Computer Center</b><span>{t.dir}: {t.dirN}</span><span>{t.addr}</span><span>+91 7000636271</span><span>{MAIL}</span></address>
<div className="ctas"><a className="btn" href="tel:+917000636271"><L.Phone size={16}/>{t.call}</a><a className="btn ghost" href={'mailto:'+MAIL}><L.Mail size={16}/>{t.email}</a><a className="btn ghost" href={'https://wa.me/'+PHONE} target="_blank" rel="noopener noreferrer"><L.MessageCircle size={16}/>{t.wa}</a><a className="btn ghost" href={MAP} target="_blank" rel="noopener noreferrer"><L.MapPin size={16}/>{t.map}</a></div></div></div></section>

<footer className="foot dark"><div className="wrap fw"><div><div className="brand"><Logo/><span>Abhi Computer Center</span></div><p>{t.fd}</p></div>
<div className="fl2">{IDS.map((id,i)=><a key={id} href={'#'+id} onClick={e=>{e.preventDefault();go(id)}}>{t.nav[i]}</a>)}</div>
<div className="fl2">{['dca','pgdca','cpct','photoshop'].map(id=><a key={id} href="#enquire" onClick={e=>{e.preventDefault();enquire(id)}}>{NAMES[id]}</a>)}</div>
<div className="fl2"><a href="tel:+917000636271">+91 7000636271</a><a href={'mailto:'+MAIL}>{MAIL}</a><a href={'https://wa.me/'+PHONE} target="_blank" rel="noopener noreferrer">WhatsApp</a><span>{t.addr}</span></div></div>
<p className="copy">© {new Date().getFullYear()} Abhi Computer Center</p></footer></div>)}
