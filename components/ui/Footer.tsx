import { getSettings } from "@/lib/settings";

export default async function Footer() {
  const settings = await getSettings();
  const links = [
    { url: settings.social_linkedin_url, label: "LinkedIn", icon: <LinkedInIcon /> },
    { url: settings.social_twitter_url, label: "X / Twitter", icon: <XIcon /> },
    { url: settings.social_github_url, label: "GitHub", icon: <GitHubIcon /> },
  ].filter((l) => !!l.url);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© <span data-year></span> Deepti Semwal · All rights reserved</div>
        {links.length > 0 && (
          <ul className="footer-social" aria-label="Social profiles">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                  {l.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div>Designed with care · Noida → World</div>
      </div>
    </footer>
  );
}

/* -- Icons (inline SVG, 18px, currentColor stroke) -- */
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.4c0-1.3-.02-2.97-1.8-2.97-1.8 0-2.07 1.4-2.07 2.87V21h-4V9z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.91l-4.71-6.18L4.8 22H2l7.02-8.02L2 2h7.07l4.27 5.66L18.244 2zm-2.43 18h1.84L7.27 4H5.34l10.474 16z"/>
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1.18-.02-2.13-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.66.79.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}
