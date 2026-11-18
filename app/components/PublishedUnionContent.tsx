import Link from "next/link";
import { publicItems, type ContentKind } from "../../lib/union-content";

const labels: Record<ContentKind,string> = {notice:"Notices",library:"Library resources",event:"Events",activity:"Union activities",office_bearer:"Office-bearers"};
const routes:Record<ContentKind,string> = {notice:"notices",library:"library",event:"events",activity:"activities",office_bearer:"office-bearers"};

export async function PublishedUnionContent({kind,limit}:{kind:ContentKind;limit?:number}) {
  const entries = (await publicItems(kind)).slice(0,limit||100);
  if (!entries.length) return null;
  return <section className="published-content" aria-label={`Published ${labels[kind]}`}>
    <div className="published-grid">{entries.map(item=><article className="published-card" key={item.id}>
      {item.media_url && item.media_type?.startsWith("image/") && <img className="published-thumb" src={item.media_url} alt={item.title} loading="lazy" />}
      <div className="published-meta">{item.category||labels[kind]}{item.pinned?" · Pinned":""}</div>
      <h3>{item.title}</h3>{item.role&&<strong className="published-role">{item.role}</strong>}
      {item.summary&&<p>{item.summary}</p>}{item.body&&<p className="published-body">{item.body}</p>}
      {item.starts_at&&<time dateTime={item.starts_at}>{new Date(item.starts_at).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:kind==="event"?"short":undefined})}</time>}
      {item.media_url&&<a target="_blank" rel="noopener noreferrer" href={item.media_url}>{item.media_type==="application/pdf"?"Open PDF resource ↗":"View attachment ↗"}</a>}
    </article>)}</div>
    {limit&&entries.length===limit&&<p><Link href={`/${routes[kind]}`}>View all {labels[kind].toLowerCase()} →</Link></p>}
  </section>;
}
