import { Link } from "@tanstack/react-router";

import { commonCopy, homeCopy } from "@/data/localization";
import { nav, siteConfig } from "@/data/site";
import { useLanguage } from "@/lib/language";

export function SiteFooter() {
  const { language } = useLanguage();
  const copy = commonCopy[language];
  const home = homeCopy[language];

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="text-xs font-medium tracking-wide text-foreground">{copy.role}</p>
          <p className="mt-2 text-sm text-muted-foreground">{home.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{home.subline}</p>
        </div>

        <nav aria-label={copy.footerNavLabel}>
          <h2 className="eyebrow">{copy.site}</h2>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground hover:text-foreground"
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {copy.nav[item.to]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">{copy.links}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
              >
                {copy.contact}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
            </li>
            <li>
              {siteConfig.links.resume ? (
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {copy.resumePdf}
                </a>
              ) : (
                <span className="text-muted-foreground">{copy.resumePlaceholder}</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 font-mono text-xs text-muted-foreground md:px-8">
          {copy.anonymised}
        </p>
      </div>
    </footer>
  );
}
