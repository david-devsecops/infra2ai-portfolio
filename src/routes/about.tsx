import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/Layout";
import { BulletList } from "@/components/site/Cards";
import { aboutSections, pageCopy } from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "소개 — 프로덕션 인프라에서 AI 플랫폼 엔지니어링까지";
const description =
  "Solaris·x86·Storage·Oracle 프로덕션 경험을 Terraform·Cloud와 AI 플랫폼 목표로 확장하는 접근 방식을 소개합니다.";

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
    language === "ko" ? title : "About — From Production Infrastructure to AI Platform Engineering",
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
