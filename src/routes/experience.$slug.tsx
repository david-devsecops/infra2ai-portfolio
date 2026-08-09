import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { StatusBadge, TagList } from "@/components/site/Badges";
import { BulletList } from "@/components/site/Cards";
import { DetailSections } from "@/components/site/DetailSections";
import { getCaseStudy } from "@/data/caseStudies";
import { localizeCaseStudy, pageCopy } from "@/data/localization";
import { useDocumentTitle, useLanguage } from "@/lib/language";

export const Route = createFileRoute("/experience/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Case study not found" }, { name: "robots", content: "noindex" }] };
    }
    const study = localizeCaseStudy(loaderData.study, "ko");
    const title = `${study.title} — 프로덕션 엔지니어링 사례`;
    return {
      meta: [
        { title },
        { name: "description", content: study.context },
        { property: "og:title", content: title },
        { property: "og:description", content: study.context },
      ],
    };
  },
  component: CaseStudyDetail,
});

function CaseStudyDetail() {
  const { study: sourceStudy } = Route.useLoaderData();
  const { language } = useLanguage();
  const study = localizeCaseStudy(sourceStudy, language);
  const copy = pageCopy[language].experience;
  useDocumentTitle(
    language === "ko"
      ? `${study.title} — 프로덕션 엔지니어링 사례`
      : `${study.title} — Production Engineering Case Study`,
  );

  return (
    <>
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <Link
            to="/experience"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            {copy.all}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="eyebrow">{study.category}</p>
            <StatusBadge status={study.status} language={language} />
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {study.title}
          </h1>
          <div className="mt-6">
            <TagList items={study.technologies} label={copy.technologies} />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-5 py-14 md:px-8 md:py-16">
        <article className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <Block title={copy.context}>
            <p>{study.context}</p>
          </Block>
          <Block title={copy.role}>
            <p>{study.role}</p>
          </Block>
          <Block title={copy.constraints}>
            <BulletList items={study.constraints} />
          </Block>
          <Block title={copy.keyActions}>
            <BulletList items={study.keyActions} />
          </Block>
          <Block title={copy.result}>
            <p>{study.result}</p>
          </Block>
        </article>

        {study.sections ? (
          <div className="mt-16">
            <DetailSections sections={study.sections} language={language} />
          </div>
        ) : (
          <p className="mt-12 rounded-md border border-dashed border-border bg-surface/30 px-4 py-3 text-sm text-muted-foreground">
            {copy.deeper}
          </p>
        )}
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="border-b border-border pb-2 text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
