import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { StatusBadge, TagList } from "./Badges";
import { pageCopy } from "@/data/localization";
import type { CaseStudy, Project } from "@/data/types";
import type { Language } from "@/lib/language";

export function ProjectCard({
  project,
  language = "en",
}: {
  project: Project;
  language?: Language;
}) {
  const technologiesLabel = project.technologiesLabel ?? pageCopy[language].projects.stack;

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
        <StatusBadge status={project.status} language={language} />
      </div>
      {project.client || project.period ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {[
            project.client,
            project.period
              ? `${project.periodLabel?.[language] ?? (language === "ko" ? "프로젝트 기간" : "Project period")}: ${project.period}`
              : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      ) : null}
      {project.affiliation ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.affiliation[language]}
        </p>
      ) : null}
      <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
        {project.summary}
      </p>
      <div className="mt-5">
        <TagList items={project.technologies} label={technologiesLabel} />
      </div>
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:decoration-2"
      >
        {language === "ko" ? "프로젝트 상세" : "Project detail"}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

export function CaseStudyCard({
  study,
  language = "en",
}: {
  study: CaseStudy;
  language?: Language;
}) {
  const copy = pageCopy[language].experience;

  return (
    <article className="rounded-lg border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow">{study.category}</p>
        <StatusBadge status={study.status} language={language} />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-card-foreground">{study.title}</h3>

      <dl className="mt-5 space-y-4 text-sm">
        <Field term={copy.context}>{study.context}</Field>
        <Field term={copy.role}>{study.role}</Field>
        <Field term={copy.constraints}>
          <BulletList items={study.constraints} />
        </Field>
        <Field term={copy.keyActions}>
          <BulletList items={study.keyActions} />
        </Field>
        <Field term={copy.result}>{study.result}</Field>
      </dl>

      <div className="mt-5">
        <TagList items={study.technologies} label={copy.technologies} />
      </div>

      <Link
        to="/experience/$slug"
        params={{ slug: study.slug }}
        className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:decoration-2"
      >
        {copy.detail}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

function Field({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 md:grid-cols-[9rem_1fr] md:gap-4">
      <dt className="eyebrow md:pt-0.5">{term}</dt>
      <dd className="leading-relaxed text-muted-foreground">{children}</dd>
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
