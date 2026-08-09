import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Section } from "@/components/site/Layout";
import { CareerFlow } from "@/components/site/CareerFlow";
import { ProjectCard } from "@/components/site/Cards";
import { StatusBadge } from "@/components/site/Badges";
import { featuredProjects } from "@/data/projects";
import { architectureAreas } from "@/data/architecture";
import { productionExperienceHighlights, siteConfig } from "@/data/site";
import {
  commonCopy,
  homeCopy,
  koreanProductionExperienceHighlights,
  localizeArchitectureArea,
  localizeProject,
} from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "AI 플랫폼 엔지니어 — AI 워크로드를 위한 신뢰할 수 있는 플랫폼";
const description =
  "Solaris·x86·Storage·Oracle 운영 경험을 Terraform과 AWS·NCP 클라우드 아키텍처로 확장한 엔지니어링 포트폴리오입니다.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});

function Home() {
  const { language } = useLanguage();
  useDocumentTitle(
    language === "ko"
      ? title
      : "AI Platform Engineer — Building reliable platforms for AI workloads",
  );
  const copy = homeCopy[language];
  const common = commonCopy[language];
  const projects = featuredProjects.map((project) => localizeProject(project, language));
  const highlights =
    language === "ko" ? koreanProductionExperienceHighlights : productionExperienceHighlights;
  const areas = architectureAreas.map((area) => localizeArchitectureArea(area, language));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="rule-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase md:text-sm">
            {copy.role}
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-4 font-mono text-sm text-muted-foreground md:text-base">
            {copy.subline}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {copy.positioning}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {copy.viewProjects}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {copy.viewExperience}
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <Section
        eyebrow={copy.careerEyebrow}
        title={copy.careerTitle}
        description={copy.careerDescription}
      >
        <CareerFlow language={language} />
      </Section>

      <Section
        eyebrow={copy.projectsEyebrow}
        title={copy.projectsTitle}
        description={copy.projectsDescription}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} language={language} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.experienceEyebrow}
        title={copy.experienceTitle}
        description={copy.experienceDescription}
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.title} className="border-l-2 border-primary/50 pl-4">
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ul>
        <Link
          to="/experience"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {copy.readCaseStudies}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Section>

      <Section
        eyebrow={copy.areasEyebrow}
        title={copy.areasTitle}
        description={copy.areasDescription}
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <li key={area.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-card-foreground">{area.title}</h3>
              </div>
              <StatusBadge status={area.status} className="mt-2" language={language} />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
        <Link
          to="/architecture"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {copy.viewArchitecture}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Section>

      <Section eyebrow={copy.contactEyebrow} title={copy.contactTitle}>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {copy.contactDescription}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            GitHub
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
          {siteConfig.links.resume ? (
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {common.resumePdf}
            </a>
          ) : (
            <span className="inline-flex items-center rounded-md border border-dashed border-border px-5 py-2.5 text-sm text-muted-foreground">
              {common.resumePlaceholder}
            </span>
          )}
          <Link
            to="/about"
            className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {copy.about}
          </Link>
        </div>
      </Section>
    </>
  );
}
