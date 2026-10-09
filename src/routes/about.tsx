import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/Layout";
import { BulletList } from "@/components/site/Cards";
import { aboutSections, pageCopy } from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "소개 — 박상준 | 클라우드·인프라 아키텍트";
const description =
  "금융권 NCP 인프라, AWS 전환, Terraform 구축과 운영 경험을 소개합니다. 클라우드·인프라 아키텍트 박상준의 프로젝트와 기술 기록입니다.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { language } = useLanguage();
  useDocumentTitle(
    language === "ko" ? title : "About — Sang jun (David) park | Cloud & Infrastructure Architect",
    language === "ko"
      ? description
      : "Financial NCP infrastructure, AWS migration, Terraform delivery and operations. Projects and technical writing by Sang jun (David) park, Cloud & Infrastructure Architect.",
  );
  const copy = pageCopy[language].about;

  return (
    <>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mx-auto w-full max-w-4xl space-y-12 px-5 py-14 md:px-8 md:py-16">
        {aboutSections[language].map((section) => (
          <Block key={section.title} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets.length ? (
              <div className="mt-2">
                <BulletList items={section.bullets} />
              </div>
            ) : null}
            {section.links ? (
              <p className="mt-4">
                <Link to="/projects" className="text-primary hover:underline">
                  {section.links.projects}
                </Link>{" "}
                {section.links.connector}{" "}
                <Link to="/experience" className="text-primary hover:underline">
                  {section.links.experience}
                </Link>
                .
              </p>
            ) : null}
          </Block>
        ))}
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="border-b border-border pb-2 text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {children}
      </div>
    </section>
  );
}
