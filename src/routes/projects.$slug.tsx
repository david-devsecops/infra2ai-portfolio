import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { StatusBadge, TagList } from "@/components/site/Badges";
import { DetailSections, SectionNav } from "@/components/site/DetailSections";
import { localizeProject, pageCopy } from "@/data/localization";
import { getProject } from "@/data/projects";
import { useDocumentTitle, useLanguage } from "@/lib/language";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const project = localizeProject(loaderData.project, "ko");
    const title = `${project.title} — 클라우드·인프라 프로젝트`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: sourceProject } = Route.useLoaderData();
  const { language } = useLanguage();
  const project = localizeProject(sourceProject, language);
  const copy = pageCopy[language].projects;
  useDocumentTitle(
    language === "ko"
      ? `${project.title} — 클라우드·인프라 프로젝트`
      : `${project.title} — Cloud & Infrastructure Project`,
    project.summary,
  );

  return (
    <>
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            {copy.all}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} language={language} />
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.summary}
          </p>
          {sourceProject.client || sourceProject.period || sourceProject.role ? (
            <dl className="mt-6 grid max-w-3xl gap-3 text-sm sm:grid-cols-3">
              {sourceProject.client ? (
                <div>
                  <dt className="eyebrow">{language === "ko" ? "고객" : "Client"}</dt>
                  <dd className="mt-1 text-muted-foreground">{sourceProject.client}</dd>
                </div>
              ) : null}
              {sourceProject.period ? (
                <div>
                  <dt className="eyebrow">
                    {sourceProject.periodLabel?.[language] ??
                      (language === "ko" ? "프로젝트 기간" : "Project period")}
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{sourceProject.period}</dd>
                </div>
              ) : null}
              {sourceProject.role ? (
                <div>
                  <dt className="eyebrow">{language === "ko" ? "역할" : "Role"}</dt>
                  <dd className="mt-1 text-muted-foreground">{sourceProject.role[language]}</dd>
                </div>
              ) : null}
              {sourceProject.affiliation ? (
                <div className="sm:col-span-3">
                  <dt className="eyebrow">
                    {language === "ko" ? "소속·계약 관계" : "Affiliation / contract"}
                  </dt>
                  <dd className="mt-1 text-muted-foreground">
                    {sourceProject.affiliation[language]}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          <div className="mt-6">
            <TagList items={project.technologies} label={project.technologiesLabel ?? copy.stack} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[1fr_14rem]">
        <article>
          <DetailSections sections={project.sections} language={language} />
          {sourceProject.relatedBlog ? (
            <p className="mt-8">
              <Link
                to="/blog/$slug"
                params={{ slug: sourceProject.relatedBlog }}
                className="text-primary hover:underline"
              >
                {language === "ko"
                  ? "관련 기술 글: NCP VPC별 Terraform 변경 범위와 운영 기준"
                  : "Related article: Terraform change boundaries across NCP VPCs (Korean)"}
              </Link>
            </p>
          ) : null}
          {sourceProject.slug === "amorepacific-aws-migration" ? (
            <p className="mt-6">
              <Link
                to="/projects/$slug"
                params={{ slug: "amorepacific-aws-operations" }}
                className="text-primary hover:underline"
              >
                {language === "ko"
                  ? "후속 AWS 운영: 2023.11.01–2025.04"
                  : "Follow-up AWS operations: 2023.11.01–2025.04"}
              </Link>
            </p>
          ) : null}
          {sourceProject.slug === "skt-tdeal-terraform-infrastructure" ? (
            <p className="mt-6">
              <Link
                to="/projects/$slug"
                params={{ slug: "skt-tdeal-cross-account-monitoring" }}
                className="text-primary hover:underline"
              >
                {language === "ko" ? "교차 계정 모니터링 상세" : "Cross-account monitoring details"}
              </Link>
            </p>
          ) : null}
        </article>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SectionNav sections={project.sections} language={language} />
        </aside>
      </div>
    </>
  );
}
