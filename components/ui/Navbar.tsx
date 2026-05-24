import Link from "next/link";

export default function Navbar({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link className="logo" href={home ? "#top" : "/"} aria-label="Deepti Semwal — Home">
          <span className="logo-mark">
            <em>DS</em>
          </span>
          <span>
            <span className="logo-name">Deepti Semwal</span>
            <span className="logo-sub">Energy Policy · Regulations</span>
          </span>
        </Link>
        <ul className="nav-links">
          <li><a href={`${prefix}#skills`}>Skills</a></li>
          <li><a href={`${prefix}#services`}>Services</a></li>
          <li><a href={`${prefix}#projects`}>Projects</a></li>
          <li><a href={`${prefix}#analysis`}>Analysis</a></li>
          <li><a href={`${prefix}#contact`}>Contact</a></li>
        </ul>
        <a className="nav-cta" href={`${prefix}#contact`}>Let&apos;s Talk →</a>
      </div>
    </nav>
  );
}
