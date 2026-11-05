"use client";
import { useState } from "react";
import Link from "next/link";
import "../chat.css";

type Message={role:"bot"|"user";text:string};
const greeting="Hi! I’m the MCT Student Help assistant. I can guide you to study resources, union updates, grievances and suggestions. What would you like to find?";
function answer(text:string){
 const q=text.toLowerCase();
 if(/grievance|complaint|hostel|problem|issue|support/.test(q)) return "To raise a concern, open the Student Grievance Portal. It prepares a message to the Union’s official WhatsApp number. Your phone number will be visible to the recipient, and this is not an anonymous channel.";
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
   <nav className="mct-chat-links" aria-label="Helpful pages"><Link href="/library" onClick={()=>setOpen(false)}>Library</Link><Link href="/grievances" onClick={()=>setOpen(false)}>Grievances</Link><Link href="/suggestions" onClick={()=>setOpen(false)}>Suggestions</Link></nav>
   <form className="mct-chat-input" onSubmit={e=>{e.preventDefault();send(input)}}><input aria-label="Ask MCT a question" placeholder="Ask about student services..." value={input} onChange={e=>setInput(e.target.value)} maxLength={500}/><button type="submit" aria-label="Send" disabled={!input.trim()}>↑</button></form>
   <p className="mct-chat-disclaimer">Automated guidance only. This chat does not submit grievances or store complaints.</p>
  </section>}
  <div className="mct-launcher-row"><a className="mct-wa-launcher" href="https://wa.me/919496744513?text=Hello%20MCT%20Students%27%20Union%2C%20I%20need%20assistance." target="_blank" rel="noopener noreferrer" aria-label="Chat with MCT Students' Union on WhatsApp"><span aria-hidden="true">✆</span> WhatsApp</a>
  <button className="mct-chat-launcher" type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?"Close MCT Student Help":"Open MCT Student Help"}><span className="mct-chat-symbol">{open?"×":"✳"}</span>{open?"Close":"Ask MCT"}</button></div>
 </div>;
}