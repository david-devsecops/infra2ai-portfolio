import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/Layout";
import { StatusBadge } from "@/components/site/Badges";
import { BulletList } from "@/components/site/Cards";
import { architectureAreas } from "@/data/architecture";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import {
  localizeArchitectureArea,
  localizeCaseStudy,
  localizeProject,
  pageCopy,
} from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "아키텍처 — 플랫폼 엔지니어링 영역";
const description =
  "실무에서 다룬 인프라·클라우드·네트워크·IaC와 현재 공부하거나 계획 중인 Kubernetes·AI 플랫폼을 소개합니다.";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  const { language } = useLanguage();
  useDocumentTitle(
    language === "ko" ? title : "Architecture — Platform Engineering Areas",
    language === "ko"
      ? description
      : "Infrastructure, cloud, network and IaC technologies I have worked with, alongside Kubernetes and AI platforms I am studying or planning.",
  );
  const copy = pageCopy[language].architecture;
  const localizedAreas = architectureAreas.map((area) => localizeArchitectureArea(area, language));
  const localizedProjects = projects.map((project) => localizeProject(project, language));
  const localizedStudies = caseStudies.map((study) => localizeCaseStudy(study, language));

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mx-auto w-full max-w-6xl space-y-6 px-5 py-14 md:px-8 md:py-16">
        {localizedAreas.map((area) => (
          <section
            key={area.id}
            id={area.id}
            className="rounded-lg border border-border bg-card p-6 md:p-8"
            aria-labelledby={`${area.id}-heading`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id={`${area.id}-heading`} className="text-xl font-semibold text-card-foreground">
                {area.title}
              </h2>
              <StatusBadge status={area.status} language={language} />
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {area.description}
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-[1fr_18rem]">
              <div>
                <h3 className="eyebrow">{copy.practice}</h3>
                <div className="mt-3 text-sm text-muted-foreground">
                  <BulletList items={area.practices} />
                </div>
              </div>
              <div className="space-y-5">
                {area.relatedProjects?.length ? (
                  <div>
                    <h3 className="eyebrow">{copy.relatedProjects}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {area.relatedProjects.map((slug) => {
                        const project = localizedProjects.find((item) => item.slug === slug);
                        if (!project) return null;
                        return (
                          <li key={slug}>
                            <Link
                              to="/projects/$slug"
                              params={{ slug }}
                              className="text-sm text-primary hover:underline"
                            >
                              {project.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
                {area.relatedCaseStudies?.length ? (
                  <div>
                    <h3 className="eyebrow">{copy.relatedCaseStudies}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {area.relatedCaseStudies.map((slug) => {
                        const study = localizedStudies.find((item) => item.slug === slug);
                        if (!study) return null;
                        return (
                          <li key={slug}>
                            <Link
                              to="/experience/$slug"
                              params={{ slug }}
                              className="text-sm text-primary hover:underline"
                            >
                              {study.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
