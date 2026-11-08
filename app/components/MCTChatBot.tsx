"use client";
import { useState } from "react";
import Link from "next/link";
import "../chat.css";

type Message={role:"bot"|"user";text:string};
const greeting="Hi! I’m the MCT Student Help assistant. I can guide you to study resources, union updates, grievances and suggestions. What would you like to find?";
function answer(text:string){
 const q=text.toLowerCase();
 if(/grievance|complaint|hostel|problem|issue|support/.test(q)) return "To raise a concern, open the Student Grievance Portal. It prepares a message to the provided WhatsApp number. Your phone number will be visible to the recipient, and this is not an anonymous channel.";
 if(/paper|question|notes|library|pdf|bare act|judgment|study|semester|resource|exam/.test(q)) return "The Law Students’ Digital Library is organised around course, semester and subject. The resource catalogue and PDF downloads are still being prepared. See the Library page for details.";
 if(/suggest|idea|feedback|improve/.test(q)) return "The Student Suggestions Box is designed for ideas on academics, sports, culture, infrastructure and welfare. Online submission is not yet enabled while secure storage is being arranged.";
 if(/union|transparen|resolved|progress|initiative|activity|programme|sport|moot|event/.test(q)) return "You can explore Union Transparency and Our Initiatives & Progress for verified updates. Figures and activity reports will appear when published by the Union.";
 if(/notice|announcement|week|date|deadline|schedule/.test(q)) return "Important announcements and This Week at MCT are on the homepage. Only confirmed dates and updates will be posted there.";
 if(/hi|hello|hey|thank/.test(q)) return "Hello! Ask me about grievances, previous question papers, announcements, suggestions or union activities.";
 return "I can help you locate grievance support, the law library, announcements, suggestions and union progress. Choose a topic below or use the links in the Student Hub.";
}
export default function MCTChatBot(){
 const [open,setOpen]=useState(false);
 const [input,setInput]=useState("");
 const [messages,setMessages]=useState<Message[]>([{role:"bot",text:greeting}]);
 const send=(message:string)=>{
  const value=message.trim();if(!value)return;
  setMessages(items=>[...items,{role:"user",text:value},{role:"bot",text:answer(value)}]);setInput("");
 };
 return <div className="mct-chat">
  {open&&<section className="mct-chat-window" aria-label="MCT Student Help chat">
   <header className="mct-chat-head"><div className="mct-chat-avatar">M</div><div className="mct-chat-headline"><strong>MCT Student Help</strong><small>Automated campus guide</small></div><button type="button" aria-label="Close chat" onClick={()=>setOpen(false)}>×</button></header>
   <div className="mct-chat-body" role="log" aria-live="polite" aria-relevant="additions text">{messages.map((item,index)=><div key={index} className={"mct-chat-message "+(item.role==="user"?"from-user":"from-bot")}>{item.text}</div>)}
   {messages.length===1&&<div className="mct-chat-prompts">{["Question papers","Grievance support","Union activities"].map(q=><button type="button" onClick={()=>send(q)} key={q}>{q}</button>)}</div>}</div>
   <nav className="mct-chat-links" aria-label="Helpful pages"><Link href="/library" onClick={()=>setOpen(false)}>Library</Link><Link href="https://wa.me/919496744513?text=Hello%2C%20I%20would%20like%20to%20raise%20a%20student%20concern." onClick={()=>setOpen(false)}>Grievances</Link><Link href="/suggestions" onClick={()=>setOpen(false)}>Suggestions</Link></nav>
   <form className="mct-chat-input" onSubmit={e=>{e.preventDefault();send(input)}}><input aria-label="Ask MCT a question" placeholder="Ask about student services..." value={input} onChange={e=>setInput(e.target.value)} maxLength={500}/><button type="submit" aria-label="Send" disabled={!input.trim()}>↑</button></form>
   <p className="mct-chat-disclaimer">Automated guidance only. This chat does not submit grievances or store complaints.</p>
  </section>}
  <div className="mct-launcher-row"><a className="mct-wa-launcher" href="https://wa.me/919496744513?text=Hello%2C%20I%20need%20assistance%20regarding%20MCT%20Students%27%20Union." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp"><svg aria-hidden="true" viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.6a8.6 8.6 0 0 1-12.6 7.6L3.4 20.5l1.3-4.3a8.6 8.6 0 1 1 15.8-4.6Z"/><path d="M8.7 8.1c-.4 0-.8.6-.8 1.3 0 2.7 3.3 6.3 6.5 6.6.8.1 1.6-.7 1.5-1.2l-2.2-1.2-.9 1c-1.2-.5-2.7-2-3.2-3.2l.9-.8-1.1-2.3-.7-.2Z"/></svg></a>
  <button className="mct-chat-launcher" type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?"Close MCT Student Help":"Open MCT Student Help"} title={open?"Close Ask MCT":"Ask MCT"}>
    <span className="mct-chat-symbol" aria-hidden="true">{open?
      <svg viewBox="0 0 32 32" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 9 23 23M23 9 9 23"/></svg>:
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path d="M15.8 3.5c1.25 6.6 3.1 8.45 9.7 9.7-6.6 1.25-8.45 3.1-9.7 9.7-1.25-6.6-3.1-8.45-9.7-9.7 6.6-1.25 8.45-3.1 9.7-9.7Z" fill="#ff526d"/>
        <path d="M25.8 19.2c.48 2.54 1.24 3.3 3.78 3.78-2.54.48-3.3 1.24-3.78 3.78-.48-2.54-1.24-3.3-3.78-3.78 2.54-.48 3.3-1.24 3.78-3.78Z" fill="#fff"/>
        <circle cx="6.8" cy="23.7" r="1.55" fill="#ff90a3"/>
      </svg>}
    </span>
  </button></div>
 </div>;
}
