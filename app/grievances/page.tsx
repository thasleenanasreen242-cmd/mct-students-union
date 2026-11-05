"use client";
import { useState } from "react";
import Link from "next/link";
import "../connect.css";
import "./grievance.css";

const WHATSAPP_NUMBER = "919496744513";
const categories = ["Hostel facilities","Classrooms","Infrastructure","Examinations","Student welfare","Academics","Other"];
export default function GrievancePage(){
 const [category,setCategory]=useState("");
 const [location,setLocation]=useState("");
 const [studentName,setStudentName]=useState("");
 const [description,setDescription]=useState("");
 const [consent,setConsent]=useState(false);
 const [error,setError]=useState("");
 const submit=(event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  if(!category||description.trim().length<20){setError("Please select a category and describe the issue in at least 20 characters.");return;}
  if(!consent){setError("Please acknowledge the WhatsApp privacy notice.");return;}
  setError("");
  const message=[
   "MCT CONNECT | STUDENT GRIEVANCE",
   "",
   "Category: "+category,
   "Location / facility: "+(location.trim()||"Not specified"),
   "Student name: "+(studentName.trim()||"Not provided"),
   "",
   "Complaint:",
   description.trim(),
   "",
   "Submitted via MCT CONNECT. Please acknowledge receipt and advise next steps."
  ].join("\n");
  window.location.assign("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message));
 };
 return <main className="connect"><div className="topline"><div className="wrap">MCT COLLEGE OF LEGAL STUDIES · STUDENT SUPPORT</div></div>
 <header className="nav"><div className="wrap navinner"><Link className="logo" href="/">MCT <span>CONNECT.</span></Link><Link className="navbtn" href="/">← Back home</Link></div></header>
 <section className="innerhero"><div className="wrap"><div className="eyebrow">04 / STUDENT GRIEVANCE PORTAL</div><h1>Your concern matters.</h1><p>Share a campus-related concern with the Students’ Union through its official WhatsApp contact. You can review your message before sending it.</p></div></section>
 <section className="section"><div className="wrap grievance-layout"><div><div className="eyebrow">SEND A CONCERN</div><h2>Tell us what happened.</h2><p>Select a category, briefly explain the issue, then continue to WhatsApp. Your message is not submitted until you press Send in WhatsApp.</p>
 <form className="grievance-form" onSubmit={submit} noValidate>
 <label htmlFor="grievance-category">Complaint category <span aria-hidden="true">*</span></label>
 <select id="grievance-category" value={category} onChange={e=>setCategory(e.target.value)} required><option value="">Choose a category</option>{categories.map(x=><option key={x} value={x}>{x}</option>)}</select>
 <label htmlFor="grievance-location">Location / facility (optional)</label><input id="grievance-location" maxLength={120} value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. classroom, hostel block"/>
 <label htmlFor="grievance-name">Name (optional)</label><input id="grievance-name" maxLength={100} autoComplete="name" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="You may leave this blank"/>
 <label htmlFor="grievance-description">Describe your concern <span aria-hidden="true">*</span></label>
 <textarea id="grievance-description" minLength={20} maxLength={3000} rows={7} required value={description} onChange={e=>setDescription(e.target.value)} placeholder="Explain the issue, when it occurred, and any relevant details. Avoid including unnecessary sensitive personal information."/>
 <small className="field-hint">{description.length}/3000 characters · minimum 20</small>
 <div className="privacy-check"><input type="checkbox" id="grievance-consent" checked={consent} onChange={e=>setConsent(e.target.checked)}/><label htmlFor="grievance-consent">I understand that WhatsApp will share my phone number with the recipient, even if I leave my name blank. I will review the message before sending.</label></div>
 {error&&<p className="form-error" role="alert">{error}</p>}
 <button className="btn grievance-submit" type="submit">Continue to WhatsApp ↗</button>
 <p className="field-hint">Recipient: +91 94967 44513. The website does not save the contents of this form or assign a tracking number.</p>
 </form></div>
 <aside className="grievance-aside"><span className="status">WHATSAPP CONTACT</span><h3>What happens next?</h3><ol><li>Fill out the complaint form.</li><li>WhatsApp opens with your prepared message.</li><li>Review and press Send.</li><li>The Union can reply in the same WhatsApp conversation.</li></ol><div className="note"><strong>Privacy:</strong> This is not an anonymous channel. The WhatsApp account receiving the complaint will see your phone number. Do not send emergencies or highly sensitive documents through this form.</div><p>If WhatsApp does not open, contact the Union at <a href="https://wa.me/919496744513" target="_blank" rel="noopener noreferrer">+91 94967 44513</a>.</p></aside></div></section>
 <footer className="footer"><div className="wrap"><div className="logo">MCT <span>CONNECT.</span></div><p>Students’ Union · Learn · Lead · Belong</p></div></footer></main>;
}