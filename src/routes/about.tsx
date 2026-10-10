import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/Layout";
import { BulletList } from "@/components/site/Cards";
import { aboutSections, mentoringCopy, pageCopy } from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "프로필 — 박상준 | 클라우드·인프라 아키텍트";
const description =
  "클라우드·인프라 아키텍트 박상준의 경력, 자격 취득과 교육 수료 이력, 강의·심사·발표 및 윈터뷰 멘토링 활동을 소개합니다.";

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
    language === "ko"
      ? title
      : "Profile — Sang jun (David) park | Cloud & Infrastructure Architect",
    language === "ko"
      ? description
      : "I am Sang jun (David) park, a cloud and infrastructure architect. Read about my career, certification and course completion history, teaching, judging, speaking and Winterview mentoring.",
  );
  const copy = pageCopy[language].about;
  const mentoring = mentoringCopy[language];

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
        <section id="mentoring" aria-labelledby="mentoring-heading" className="scroll-mt-24">
          <h2
            id="mentoring-heading"
            className="border-b border-border pb-2 text-lg font-semibold text-foreground"
          >
            {mentoring.section}
          </h2>
          <article className="mt-4 rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              {mentoring.relationship} · {mentoring.period}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-card-foreground">{mentoring.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {mentoring.description}
            </p>
            <figure className="mt-6">
              <a
                href="/images/winterview-reviews-2026-10.png"
                target="_blank"
                rel="noreferrer noopener"
                aria-label={mentoring.imageLink}
                className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <img
                  src="/images/winterview-reviews-2026-10.png"
                  alt={mentoring.imageAlt}
                  width={987}
                  height={718}
                  loading="lazy"
                  className="h-auto w-full rounded-lg border border-border"
                />
              </a>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                {mentoring.imageCaption} · {mentoring.imageLink}
              </figcaption>
            </figure>
            <p className="mt-4 text-sm leading-relaxed text-foreground">{mentoring.reviews}</p>
            <a
              href="https://winterview.io/"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4 hover:decoration-2"
            >
              {mentoring.link}
            </a>
          </article>
        </section>
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
