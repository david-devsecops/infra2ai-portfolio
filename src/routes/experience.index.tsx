import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/Layout";
import { CaseStudyCard } from "@/components/site/Cards";
import { caseStudies, caseStudyCategories } from "@/data/caseStudies";
import { koreanCategoryLabels, localizeCaseStudy, pageCopy } from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "경험 — 프로덕션 엔지니어링 사례";
const description =
  "Solaris·x86·Storage·Oracle 운영, 클라우드 마이그레이션, 네트워크·트래픽 흐름과 프로덕션 문제 해결 사례를 공개 검토 후 소개합니다.";

export const Route = createFileRoute("/experience/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { language } = useLanguage();
  useDocumentTitle(language === "ko" ? title : "Experience — Production Engineering Case Studies");
  const copy = pageCopy[language].experience;
  const localizedStudies = caseStudies.map((study) => localizeCaseStudy(study, language));

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mx-auto w-full max-w-6xl space-y-16 px-5 py-14 md:px-8 md:py-16">
        {caseStudyCategories.map((sourceCategory) => {
          const category =
            language === "ko"
              ? (koreanCategoryLabels[sourceCategory] ?? sourceCategory)
              : sourceCategory;
          const items = localizedStudies.filter((study) => study.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h2
                id={`cat-${category}`}
                className="border-b border-border pb-2 text-lg font-semibold text-foreground"
              >
                {category}
              </h2>
              <div className="mt-6 grid gap-6 xl:grid-cols-2">
                {items.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} language={language} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
