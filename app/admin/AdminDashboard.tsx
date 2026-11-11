"use client";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import type { ContentKind, UnionItem } from "../../lib/union-content";

const sections: { id: ContentKind; label: string; glyph: string }[] = [
  { id: "notice", label: "Notices", glyph: "◈" }, { id: "library", label: "Library PDFs", glyph: "▤" },
  { id: "event", label: "Events", glyph: "▦" }, { id: "activity", label: "Activities", glyph: "✦" },
  { id: "office_bearer", label: "Office-bearers", glyph: "♙" },
];
type Draft = { kind: ContentKind; title: string; summary: string; body: string; status: string; pinned: boolean; starts_at: string; ends_at: string; expires_at: string; category: string; role: string; media_url: string; media_type: string };
const empty = (kind: ContentKind): Draft => ({kind,title:"",summary:"",body:"",status:"draft",pinned:false,starts_at:"",ends_at:"",expires_at:"",category:"",role:"",media_url:"",media_type:""});
const formDate = (date: string | null) => date ? new Date(date).toISOString().slice(0,16) : "";
const fromItem = (item: UnionItem): Draft => ({...item,starts_at:formDate(item.starts_at),ends_at:formDate(item.ends_at),expires_at:formDate(item.expires_at),media_url:item.media_url||"",media_type:item.media_type||""});
const expired = (item: UnionItem) => Boolean(item.expires_at && new Date(item.expires_at) <= new Date());

export default function AdminDashboard() {
  const [items,setItems] = useState<UnionItem[]>([]);
  const [section,setSection] = useState<ContentKind|"overview">("overview");
  const [editor,setEditor] = useState(false);
  const [itemId,setItemId] = useState<string|null>(null);
  const [form,setForm] = useState<Draft>(empty("notice"));
  const [busy,setBusy] = useState(false);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [query,setQuery] = useState("");
  const reload = useCallback(async () => {
    try { const response = await fetch("/api/admin/content",{cache:"no-store"}); const data = await response.json(); if (!response.ok) throw Error(data.error || "Could not load content"); setItems(data.items); setError(""); }
    catch(e) { setError(e instanceof Error ? e.message : "Unable to load content"); } finally { setLoading(false); }
  },[]);
  useEffect(()=>{void reload();},[reload]);
  const count = (kind:ContentKind) => items.filter(item=>item.kind===kind).length;
  const shown = items.filter(item => (section==="overview"||item.kind===section) && `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()));
  const begin = (kind:ContentKind,item?:UnionItem) => { setSection(kind);setItemId(item?.id||null);setForm(item?fromItem(item):empty(kind));setEditor(true);setError("");setSuccess("");window.scrollTo({top:0,behavior:"smooth"}); };
  const set = <K extends keyof Draft>(key:K,value:Draft[K]) => setForm(old=>({...old,[key]:value}));
  async function save(event:React.FormEvent) { event.preventDefault();setBusy(true);setError("");
    try { const response=await fetch(itemId?`/api/admin/content/${itemId}`:"/api/admin/content",{method:itemId?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const data=await response.json();if(!response.ok)throw Error(data.error||"Save failed");setEditor(false);setSuccess("Content saved successfully.");await reload(); }
    catch(e){setError(e instanceof Error?e.message:"Save failed");}finally{setBusy(false);}
  }
  async function status(item:UnionItem,value:"published"|"archived") { setBusy(true);try { const response=await fetch(`/api/admin/content/${item.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({...fromItem(item),status:value})});if(!response.ok)throw Error((await response.json()).error||"Update failed");setSuccess(`Content ${value}.`);await reload(); }catch(e){setError(e instanceof Error?e.message:"Update failed");}finally{setBusy(false);} }
  async function upload(file:File) { setBusy(true);setError("");try {const data=new FormData();data.append("file",file);const response=await fetch("/api/admin/upload",{method:"POST",body:data});const result=await response.json();if(!response.ok)throw Error(result.error||"Upload failed");setForm(old=>({...old,media_url:result.url,media_type:result.type}));setSuccess("File uploaded. Save this record to publish it.");}catch(e){setError(e instanceof Error?e.message:"Upload failed");}finally{setBusy(false);} }
  return <main id="main-content" className="admin-shell">
    <aside className="admin-sidebar"><Link className="admin-brand" href="/">MCT <span>STUDENTS’ UNION</span><small>ADMIN CONTENT STUDIO</small></Link><span className="admin-overline">WORKSPACE</span>
      <button className={section==="overview"?"admin-nav active":"admin-nav"} onClick={()=>{setSection("overview");setEditor(false)}}>▦ &nbsp; Overview</button>
      {sections.map(s=><button key={s.id} className={section===s.id?"admin-nav active":"admin-nav"} onClick={()=>{setSection(s.id);setEditor(false);setQuery("")}}>{s.glyph} &nbsp; {s.label}<small>{count(s.id)}</small></button>)}
      <div className="admin-sidebar-bottom"><Link href="/" target="_blank">↗ View website</Link><SignOutButton><button>⇥ Sign out</button></SignOutButton></div>
    </aside>
    <div className="admin-main"><header className="admin-topbar"><div><span className="admin-overline">MCT UNION / ADMINISTRATION</span><h1>{editor?itemId?"Edit content":"Create content":section==="overview"?"Dashboard overview":sections.find(s=>s.id===section)?.label}</h1></div><div className="admin-actions"><span className="admin-role">● Super Admin</span>{!editor&&<button className="admin-primary" onClick={()=>begin(section==="overview"?"notice":section)}>+ Create new</button>}</div></header>
    {error&&<div className="admin-message error" role="alert">{error}</div>}{success&&<div className="admin-message success" role="status">{success}</div>}
    {editor?<form className="admin-editor" onSubmit={save}><div className="admin-editor-head"><div><h2>{itemId?"Update":"New"} {sections.find(s=>s.id===form.kind)?.label}</h2><p>Draft content remains private until published.</p></div><button type="button" className="admin-secondary" onClick={()=>setEditor(false)}>← Cancel</button></div>
      <div className="admin-fields"><label>Section<select value={form.kind} onChange={e=>setForm(empty(e.target.value as ContentKind))}>{sections.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></label>
      <label>Status<select value={form.status} onChange={e=>set("status",e.target.value)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
      <label className="wide">{form.kind==="office_bearer"?"Person's name":"Title"}<input required maxLength={200} value={form.title} onChange={e=>set("title",e.target.value)} placeholder="Enter title" /></label>
      <label className="wide">Summary<textarea rows={3} maxLength={1000} value={form.summary} onChange={e=>set("summary",e.target.value)} placeholder="Short public description" /></label>
      <label className="wide">Full details<textarea rows={6} maxLength={20000} value={form.body} onChange={e=>set("body",e.target.value)} placeholder="Longer description or additional information" /></label>
      <label>Category<input maxLength={100} value={form.category} onChange={e=>set("category",e.target.value)} placeholder="Academics, Bare Acts…" /></label>
      {form.kind==="office_bearer"&&<label>Union role<input maxLength={100} value={form.role} onChange={e=>set("role",e.target.value)} placeholder="Chairperson, Secretary…" /></label>}
      {(form.kind==="event"||form.kind==="activity")&&<><label>Starts at<input type="datetime-local" value={form.starts_at} onChange={e=>set("starts_at",e.target.value)} /></label><label>Ends at<input type="datetime-local" value={form.ends_at} onChange={e=>set("ends_at",e.target.value)} /></label></>}
      {form.kind==="notice"&&<label>Expires at (optional)<input type="datetime-local" value={form.expires_at} onChange={e=>set("expires_at",e.target.value)} /><small>Expired notices are hidden automatically.</small></label>}
      <label className="wide">Upload {form.kind==="library"?"PDF":"photo or PDF"}<input type="file" accept={form.kind==="library"?"application/pdf":"image/png,image/jpeg,image/webp,application/pdf"} disabled={busy} onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file)}} /><small>Public files only · PDF / JPEG / PNG / WebP · maximum 10 MB</small></label>
      <label className="wide">Public file / resource URL<input type="url" value={form.media_url} onChange={e=>set("media_url",e.target.value)} placeholder="https://…" />{form.media_url&&<a href={form.media_url} target="_blank" rel="noopener noreferrer">Preview attachment ↗</a>}</label>
      <label className="wide admin-check"><input type="checkbox" checked={form.pinned} onChange={e=>set("pinned",e.target.checked)} /> Pin to top of public listings</label></div>
      <div className="admin-form-footer"><button type="button" className="admin-secondary" onClick={()=>setEditor(false)}>Cancel</button><button type="submit" className="admin-primary" disabled={busy}>{busy?"Working…":"Save content"}</button></div></form>:<>
      {section==="overview"&&<><div className="admin-stats"><article><span>Total records</span><strong>{items.length}</strong><small>All content</small></article><article><span>Published</span><strong>{items.filter(i=>i.status==="published"&&!expired(i)).length}</strong><small>Visible on site</small></article><article><span>Drafts</span><strong>{items.filter(i=>i.status==="draft").length}</strong><small>Not public</small></article><article><span>Archived / expired</span><strong>{items.filter(i=>i.status==="archived"||expired(i)).length}</strong><small>Not public</small></article></div><h2 className="admin-section-title">Manage your website</h2><div className="admin-modules">{sections.map(s=><button key={s.id} onClick={()=>setSection(s.id)}><span>{s.glyph}</span><strong>{s.label}</strong><small>{count(s.id)} records →</small></button>)}</div></>}
      <section className="admin-list"><div className="admin-list-top"><div><h2>{section==="overview"?"Recent content":sections.find(s=>s.id===section)?.label}</h2><p>Review, edit and publish verified information.</p></div><input aria-label="Search content" placeholder="Search…" value={query} onChange={e=>setQuery(e.target.value)} /></div>
      {loading?<p className="admin-empty">Loading content…</p>:shown.length?<div className="admin-table-scroll"><table><thead><tr><th>Content</th><th>Section</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{shown.map(item=><tr key={item.id}><td><strong>{item.title}</strong><small>{item.summary.slice(0,90)||"No description"}</small></td><td>{sections.find(s=>s.id===item.kind)?.label}</td><td><span className={`admin-status ${expired(item)?"archived":item.status}`}>{expired(item)?"Expired":item.status}</span></td><td>{new Date(item.updated_at).toLocaleDateString("en-IN")}</td><td><div className="admin-row-actions"><button disabled={busy} onClick={()=>begin(item.kind,item)}>Edit</button>{item.status!=="published"&&<button disabled={busy} onClick={()=>void status(item,"published")}>Publish</button>}{item.status==="published"&&<button disabled={busy} onClick={()=>void status(item,"archived")}>Archive</button>}</div></td></tr>)}</tbody></table></div>:<div className="admin-empty"><h3>No content yet</h3><p>Create your first record in this section.</p><button className="admin-primary" onClick={()=>begin(section==="overview"?"notice":section)}>+ Add content</button></div>}</section></>}
    </div>
  </main>;
}
