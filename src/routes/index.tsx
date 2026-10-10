import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Section } from "@/components/site/Layout";
import { CareerFlow } from "@/components/site/CareerFlow";
import { ProjectCard } from "@/components/site/Cards";
import { StatusBadge } from "@/components/site/Badges";
import { featuredProjects, platformProjects, getProject } from "@/data/projects";
import { architectureAreas } from "@/data/architecture";
import { productionExperienceHighlights, siteConfig } from "@/data/site";
import {
  bookCopy,
  commonCopy,
  homeCopy,
  koreanProductionExperienceHighlights,
  localizeArchitectureArea,
  localizeProject,
} from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "박상준 | 클라우드·인프라 아키텍트";
const description =
  "금융권 NCP 인프라, AWS 전환, Terraform 구축과 운영 경험을 소개합니다. 클라우드·인프라 아키텍트 박상준의 프로젝트와 기술 기록입니다.";

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
    language === "ko" ? title : "Sang jun (David) park | Cloud & Infrastructure Architect",
    language === "ko"
      ? description
      : "Financial NCP infrastructure, AWS migration, Terraform delivery and operations. Projects and technical writing by Sang jun (David) park, Cloud & Infrastructure Architect.",
  );
  const copy = homeCopy[language];
  const book = bookCopy[language];
  const common = commonCopy[language];
  const projects = featuredProjects.map((project) => localizeProject(project, language));
  const highlights =
    language === "ko" ? koreanProductionExperienceHighlights : productionExperienceHighlights;
  const areas = architectureAreas.map((area) => localizeArchitectureArea(area, language));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="rule-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">{copy.role}</p>
          <p className="mt-3 text-sm font-medium text-foreground md:text-base">{copy.identity}</p>
          <h1 className="mt-5 max-w-3xl text-3xl leading-tight font-semibold tracking-tight break-keep text-foreground md:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{copy.subline}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">
            {copy.positioning}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              hash="selected-projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {copy.viewProjects}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border-strong bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {common.contact}
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <Section
        eyebrow={language === "ko" ? "진행 중" : "In progress"}
        title={
          language === "ko" ? "현재 CBDC 인프라 프로젝트" : "Current CBDC infrastructure project"
        }
      >
        <div className="max-w-2xl">
          <ProjectCard
            project={localizeProject(getProject("bok-cbdc-ncp-infrastructure")!, language)}
            language={language}
          />
        </div>
        <Link
          to="/blog/$slug"
          params={{ slug: "ibk-ncp-terraform-vpc-boundaries" }}
          className="mt-6 inline-flex text-sm text-primary underline underline-offset-4 hover:decoration-2"
        >
          {language === "ko"
            ? "기술 글: NCP VPC별 Terraform 변경 범위와 운영 기준"
            : "Technical article: Terraform change boundaries across NCP VPCs (Korean)"}
        </Link>
      </Section>

      <Section
        id="selected-projects"
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
        eyebrow={copy.careerEyebrow}
        title={copy.careerTitle}
        description={copy.careerDescription}
      >
        <CareerFlow language={language} />
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
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:decoration-2"
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
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
        <Link
          to="/architecture"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:decoration-2"
        >
          {copy.viewArchitecture}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Section>

      <Section
        eyebrow={language === "ko" ? "연구·계획" : "Research and plans"}
        title={language === "ko" ? "AI와 플랫폼 연구" : "AI and platform research"}
        description={
          language === "ko"
            ? "AI를 업무에 활용하는 방법과 플랫폼 운영을 공부하고 있습니다. 셀프서비스 AI 플랫폼과 LLM 추론 플랫폼은 아직 계획 단계입니다."
            : "I am studying how to use AI at work and how to operate AI platforms. The self-service AI and LLM inference platforms are still planned projects."
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          {platformProjects
            .filter((project) => project.status === "Planned")
            .map((project) => (
              <ProjectCard
                key={project.slug}
                project={localizeProject(project, language)}
                language={language}
              />
            ))}
        </div>
      </Section>

      <Section id="book" eyebrow={book.section} title={book.title}>
        <article className="grid gap-7 rounded-lg border border-border bg-card p-6 sm:grid-cols-[180px_1fr] sm:items-center">
          <img
            src="/images/vibe-coding-textbook-cover.png"
            alt={book.coverAlt}
            width={1000}
            height={1300}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-[180px] rounded-md border border-border"
          />
          <div>
            <p className="text-sm font-medium text-foreground">{book.author}</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {book.description}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{book.detail}</p>
            <nav aria-label={book.stores} className="mt-5 flex flex-wrap gap-3">
              {[
                { label: "YES24", href: "https://www.yes24.com/product/goods/197778543" },
                {
                  label: language === "ko" ? "교보문고" : "Kyobo",
                  href: "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000013676647",
                },
                { label: "WikiDocs", href: "https://wikidocs.net/book/21513" },
              ].map((store) => (
                <a
                  key={store.href}
                  href={store.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${store.label} · ${book.newTab}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-surface/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-surface/70"
                >
                  {store.label}
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              ))}
            </nav>
          </div>
        </article>
      </Section>

      <Section id="contact" eyebrow={copy.contactEyebrow} title={copy.contactTitle}>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {copy.contactDescription}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {common.contact}
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
          <a
            href={siteConfig.links.companyContact}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center px-2 py-2.5 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {language === "ko" ? "ELFIRST 회사 서비스 문의" : "ELFIRST company services"}
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
          ) : null}
          <Link
            to="/about"
            className="inline-flex min-h-11 items-center px-2 py-2.5 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {copy.about}
          </Link>
        </div>
      </Section>
    </>
  );
}
