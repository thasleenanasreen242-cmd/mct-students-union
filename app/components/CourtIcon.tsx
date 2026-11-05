import type { ReactNode, SVGProps } from "react";
export type CourtIconName="scales"|"landmark"|"book"|"scroll"|"gavel"|"quill"|"calendar"|"shield"|"laurel";
export default function CourtIcon({name,className,...rest}:{name:CourtIconName;className?:string}&Omit<SVGProps<SVGSVGElement>,"children">){
 const common={fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
 const shapes:Record<CourtIconName,ReactNode>={
  scales:<><path d="M12 3v17M6 21h12M8 7h8M4 9l4-2 4 2M12 9l4-2 4 2"/><path d="m4 9-2 5h8L8 9m8 0-2 5h8l-2-5"/><path d="M2 14c.6 2 7.4 2 8 0m4 0c.6 2 7.4 2 8 0"/></>,
  landmark:<><path d="M3 9h18M4 20h16M2 22h20M12 2 2 8h20L12 2Z"/><path d="M6 10v9m4-9v9m4-9v9m4-9v9"/></>,
  book:<><path d="M12 5c-3.5-2.3-6.5-2.1-10-.7v15c3.5-1.4 6.5-1.6 10 .7 3.5-2.3 6.5-2.1 10-.7v-15c-3.5-1.4-6.5-1.6-10 .7Z"/><path d="M12 5v15"/></>,
  scroll:<><path d="M6 3h12a3 3 0 0 1 3 3v14H7a4 4 0 0 1-4-4V6a3 3 0 0 1 3-3Z"/><path d="M7 20a3 3 0 0 0 0-6h11M8 8h9m-9 3h7"/></>,
  gavel:<><path d="m7 6 6 6m-4-9 7 7m-8 4 7-7M4 17l11-11M13 20h9M14 17h7v3H13v-2a1 1 0 0 1 1-1Z"/></>,
  quill:<><path d="M20 3C12 2 6 6 4 16l5-4 3 3c6-3 9-8 8-12Z"/><path d="M3 21c5-6 10-10 16-15M4 16l4 2"/></>,
  calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18M8 14h3m3 0h3m-9 4h3"/></>,
  shield:<><path d="m12 2 8 4v6c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-4Z"/><path d="m8.5 12 2.4 2.4 4.6-4.8"/></>,
  laurel:<><path d="M12 19v3m-3-3h6M8 17C3 14 2 10 4 5c1 3 3 4 5 5M16 17c5-3 6-7 4-12-1 3-3 4-5 5M8 17l4 2 4-2"/><path d="M5 9c2 0 3 1 4 3m10-3c-2 0-3 1-4 3"/></>
 };
 return <svg viewBox="0 0 48 48" width="38" height="38" aria-hidden="true" className={className} {...common} {...rest}>
  <circle cx="24" cy="24" r="22" strokeWidth=".85" opacity=".48"/>
  <circle cx="24" cy="24" r="18.9" strokeWidth=".7" opacity=".2"/>
  <circle cx="24" cy="24" r="18.3" fill="currentColor" stroke="none" opacity=".045"/>
  <path d="M24 1v4M24 43v4M1 24h4M43 24h4" strokeWidth="1.1" opacity=".74"/>
  <path d="m9 9 2.2 2.2M39 9l-2.2 2.2M9 39l2.2-2.2M39 39l-2.2-2.2" strokeWidth=".9" opacity=".43"/>
  <g transform="translate(8 8) scale(1.3333)" strokeWidth="1.45">{shapes[name]}</g>
  <path d="m24 4 1.6 1.6L24 7.2l-1.6-1.6L24 4Z" fill="currentColor" stroke="none" opacity=".65"/>
 </svg>;
}
