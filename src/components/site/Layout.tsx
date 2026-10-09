import type { ReactNode } from "react";
import { pageCopy } from "@/data/localization";
import type { Language } from "@/lib/language";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  as: As = "section",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <As id={id} className={cn("scroll-mt-24 border-t border-border py-12 md:py-16", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? (
          <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
        ) : null}
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children ? <div className={cn(title || eyebrow ? "mt-8" : "")}>{children}</div> : null}
      </div>
    </As>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}

export function Placeholder({
  children,
  language = "en",
}: {
  children?: ReactNode;
  language?: Language;
}) {
  return (
    <p className="rounded-md border border-dashed border-border bg-surface/30 px-4 py-3 text-sm text-muted-foreground">
      {children ?? pageCopy[language].details.placeholder}
    </p>
  );
}
