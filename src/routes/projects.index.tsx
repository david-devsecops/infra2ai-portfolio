import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/Cards";
import { localizeProject, pageCopy } from "@/data/localization";
import { projectGroups, projectsByGroup } from "@/data/projects";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "프로젝트 — 클라우드·인프라 아키텍트";
const description =
  "Terraform·Cloud 프로젝트, 검토가 끝난 프로덕션 사례와 계획 단계의 AI 플랫폼 학습 프로젝트를 실제 상태와 함께 소개합니다.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { language } = useLanguage();
  useDocumentTitle(language === "ko" ? title : "Projects — Cloud & Infrastructure Architect");
  const copy = pageCopy[language].projects;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mx-auto w-full max-w-6xl space-y-16 px-5 py-14 md:px-8 md:py-16">
        {projectGroups.map((group) => {
          const groupProjects = projectsByGroup(group.id).map((project) =>
            localizeProject(project, language),
          );
          if (groupProjects.length === 0) return null;

          return (
            <section key={group.id} aria-labelledby={`${group.id}-heading`}>
              <h2 id={`${group.id}-heading`} className="text-xl font-semibold text-foreground">
                {group[language]}
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {groupProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} language={language} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
