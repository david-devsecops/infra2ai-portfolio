import { createFileRoute } from "@tanstack/react-router";

import { BlogCard } from "@/components/site/Blog";
import { PageHeader } from "@/components/site/Layout";
import { blogPosts } from "@/data/blogPosts";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "Blog — Legacy to Cloud | infra2ai.dev";
const description =
  "Solaris·x86·Storage·Oracle 운영 경험을 Terraform과 Cloud 설계 원칙으로 연결하는 심층 기술 기록입니다.";

const copy = {
  ko: {
    eyebrow: "ENGINEERING BLOG",
    title: "Legacy to Cloud",
    description,
    empty: "검토를 마친 글부터 공개합니다.",
  },
  en: {
    eyebrow: "ENGINEERING BLOG",
    title: "Legacy to Cloud",
    description:
      "Deep technical notes connecting Solaris, x86, storage and Oracle operations to Terraform and cloud design principles.",
    empty: "Articles are published after technical and security review.",
  },
} as const;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { language } = useLanguage();
  const currentCopy = copy[language];
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  useDocumentTitle(language === "ko" ? title : "Blog — Legacy to Cloud | infra2ai.dev");

  return (
    <>
      <PageHeader
        eyebrow={currentCopy.eyebrow}
        title={currentCopy.title}
        description={currentCopy.description}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-16">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} language={language} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-surface/30 p-6 text-sm text-muted-foreground">
            {currentCopy.empty}
          </p>
        )}
      </div>
    </>
  );
}
