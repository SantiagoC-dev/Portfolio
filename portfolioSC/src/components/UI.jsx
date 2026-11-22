export function Icon({
  name = 'arrow',
  size = 20,
  ...props
}) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    external: <><path d="M7 17 17 7M7 7h10v10" /></>,
    down: <><path d="M12 5v14m-7-7 7 7 7-7" /></>,
    work: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 13h18" /></>,
    services: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
    contact: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    moon: <path d="M20.9 13.35A9 9 0 0 1 10.65 3.1 9 9 0 1 0 20.9 13.35Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19m0-14-1.5 1.5m-11 11L5 19" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" /></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
export function SectionHeading({
  eyebrow,
  title,
  intro
}) {
  return <header className="section-heading" data-reveal><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="lede">{intro}</p>}</header>;
}
export function Tags({
  items
}) {
  return <ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
