import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";

import { commonCopy } from "@/data/localization";
import { nav, siteConfig } from "@/data/site";
import { useLanguage } from "@/lib/language";

const linkBase =
  "rounded px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const copy = commonCopy[language];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="group flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-mono text-[0.7rem] tracking-[0.18em] text-primary uppercase">
            {copy.role}
          </span>
          <span className="text-sm text-muted-foreground">{copy.brandSubtitle}</span>
        </Link>

        <nav aria-label={copy.mainNavLabel} className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={linkBase}
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {copy.nav[item.to]}
            </Link>
          ))}
          <ResumeLink />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-1 inline-flex items-center gap-1.5 rounded border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-border-strong hover:bg-secondary"
          >
            GitHub
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
          <LanguageToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? copy.closeMenu : copy.openMenu}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded border border-border p-2 text-foreground"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
          <LanguageToggle />
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label={copy.mainNavLabel}
          className="border-t border-border bg-surface lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 md:px-8">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 text-sm text-muted-foreground"
                  activeProps={{ className: "text-foreground font-medium" }}
                >
                  {copy.nav[item.to]}
                </Link>
              </li>
            ))}
            <li>
              <span className="block border-b border-border/60 py-3">
                <ResumeLink mobile />
              </span>
            </li>
            <li>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="block py-3 text-sm text-foreground"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function ResumeLink({ mobile }: { mobile?: boolean }) {
  const { language } = useLanguage();
  const copy = commonCopy[language];
  const cls = mobile ? "text-sm text-muted-foreground" : linkBase;

  if (!siteConfig.links.resume) {
    return (
      <span className={cls} title={copy.resumeNote}>
        {copy.resume} <span className="font-mono text-[0.65rem] uppercase">({copy.soon})</span>
      </span>
    );
  }

  return (
    <a href={siteConfig.links.resume} target="_blank" rel="noreferrer noopener" className={cls}>
      {copy.resume}
    </a>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const copy = commonCopy[language];

  return (
    <div
      role="group"
      aria-label={copy.languageLabel}
      className="ml-1 inline-flex rounded border border-border bg-surface p-0.5"
    >
      <button
        type="button"
        aria-label={copy.korean}
        aria-pressed={language === "ko"}
        onClick={() => setLanguage("ko")}
        className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
          language === "ko"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        KO
      </button>
      <button
        type="button"
        aria-label={copy.english}
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
        className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}
