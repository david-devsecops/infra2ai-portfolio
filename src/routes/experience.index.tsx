import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/Layout";
import { CaseStudyCard } from "@/components/site/Cards";
import { caseStudies, caseStudyCategories } from "@/data/caseStudies";
import { koreanCategoryLabels, localizeCaseStudy, pageCopy } from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "경험 — 프로덕션 엔지니어링 사례";
const description =
  "서버·스토리지·Oracle 운영, 클라우드 이관과 네트워크 분석에서 만났던 문제와 해결 과정을 정리했습니다.";

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
