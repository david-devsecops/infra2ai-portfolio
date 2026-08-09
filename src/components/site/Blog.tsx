import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { TagList } from "./Badges";
import type { BlogBlock, BlogPost } from "@/data/types";
import type { Language } from "@/lib/language";

const disclosure =
  "고객사와 프로젝트명은 공개 승인을 기준으로 표시했습니다. 인명, 네트워크, 계정, 호스트, 용량과 세부 구성값은 공개용 예시로 재구성했으며 비밀정보는 포함하지 않습니다.";

export function BlogCard({ post, language }: { post: BlogPost; language: Language }) {
  const publishedAt = new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(`${post.publishedAt}T00:00:00`));

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-border-strong">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow">{post.category[language]}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {publishedAt} · {post.readingMinutes} min
        </p>
      </div>
      <h2 className="mt-4 text-xl font-semibold leading-snug text-card-foreground">
        {post.title[language]}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.summary[language]}
      </p>

      {post.client || post.project ? (
        <dl className="mt-5 grid gap-1 border-l border-primary/40 pl-3 text-xs text-muted-foreground">
          {post.client ? (
            <div className="flex gap-2">
              <dt className="font-medium text-foreground">
                {language === "ko" ? "고객" : "Client"}
              </dt>
              <dd>{post.client}</dd>
            </div>
          ) : null}
          {post.project ? (
            <div className="flex gap-2">
              <dt className="font-medium text-foreground">
                {language === "ko" ? "프로젝트" : "Project"}
              </dt>
              <dd>{post.project}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="mt-5">
        <TagList items={post.technologies} />
      </div>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {language === "ko" ? "글 읽기" : "Read article"}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

export function BlogMeta({ post, language }: { post: BlogPost; language: Language }) {
  const publishedAt = new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    dateStyle: "long",
  }).format(new Date(`${post.publishedAt}T00:00:00`));

  return (
    <dl className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
      <div className="flex gap-1.5">
        <dt>{language === "ko" ? "게시" : "Published"}</dt>
        <dd className="text-foreground">{publishedAt}</dd>
      </div>
      <div className="flex gap-1.5">
        <dt>{language === "ko" ? "읽는 시간" : "Reading time"}</dt>
        <dd className="text-foreground">
          {post.readingMinutes} {language === "ko" ? "분" : "min"}
        </dd>
      </div>
      {post.client ? (
        <div className="flex gap-1.5">
          <dt>{language === "ko" ? "고객" : "Client"}</dt>
          <dd className="text-foreground">{post.client}</dd>
        </div>
      ) : null}
      {post.project ? (
        <div className="flex gap-1.5">
          <dt>{language === "ko" ? "프로젝트" : "Project"}</dt>
          <dd className="text-foreground">{post.project}</dd>
        </div>
      ) : null}
    </dl>
  );
}

export function BlogArticle({ post, language }: { post: BlogPost; language: Language }) {
  return (
    <>
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            {language === "ko" ? "모든 글" : "All articles"}
          </Link>
          <p className="eyebrow mt-6">{post.series[language]}</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {post.title[language]}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {post.summary[language]}
          </p>
          <div className="mt-6">
            <BlogMeta post={post} language={language} />
          </div>
          <div className="mt-6">
            <TagList items={post.technologies} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <main className="min-w-0">
          <section
            aria-labelledby="english-abstract"
            className="rounded-lg border border-border bg-card p-6"
          >
            <p className="eyebrow">English</p>
            <h2 id="english-abstract" className="mt-2 text-xl font-semibold text-foreground">
              Abstract
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
              {post.englishAbstract.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {language === "en" ? (
            <p className="mt-6 rounded-md border border-status-progress/40 bg-surface/40 px-4 py-3 text-sm text-foreground">
              Full article is currently available in Korean.
            </p>
          ) : null}

          <div className="mt-10 lg:hidden">
            <TableOfContents post={post} language={language} />
          </div>

          <article className="mt-12 space-y-14">
            {post.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2
                  id={section.id}
                  className="scroll-mt-24 border-b border-border pb-3 text-2xl font-semibold text-foreground"
                >
                  {section.title}
                </h2>
                <div className="mt-6 space-y-5 text-[0.95rem] leading-8 text-muted-foreground">
                  {section.blocks.map((block, index) => (
                    <BlogBlockView key={`${section.id}-${index}`} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </article>

          <footer className="mt-16 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">
            {disclosure}
          </footer>
        </main>

        <aside className="hidden lg:block lg:self-stretch">
          <div className="sticky top-24">
            <TableOfContents post={post} language={language} />
          </div>
        </aside>
      </div>
    </>
  );
}

function TableOfContents({ post, language }: { post: BlogPost; language: Language }) {
  return (
    <nav aria-label={language === "ko" ? "글 목차" : "Article contents"}>
      <p className="eyebrow">{language === "ko" ? "목차" : "Contents"}</p>
      <ol className="mt-4 space-y-2 border-l border-border pl-4 text-xs leading-5 text-muted-foreground">
        {post.sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="hover:text-primary">
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function BlogBlockView({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "bullets":
      return (
        <ul className="space-y-2 pl-5">
          {block.items.map((item) => (
            <li key={item} className="list-disc pl-1 marker:text-primary">
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <figure>
          <pre className="overflow-x-auto rounded-md border border-border bg-background p-4 font-mono text-xs leading-6 text-foreground">
            <code className={`language-${block.language}`}>{block.code}</code>
          </pre>
          {block.caption ? (
            <figcaption className="mt-2 text-xs text-muted-foreground">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "figure":
      return (
        <figure>
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-md border border-border bg-surface"
          />
          <figcaption className="mt-2 text-xs text-muted-foreground">{block.caption}</figcaption>
        </figure>
      );
  }
}
