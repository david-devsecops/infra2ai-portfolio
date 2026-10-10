import { createFileRoute } from "@tanstack/react-router";

import { BlogCard } from "@/components/site/Blog";
import { PageHeader } from "@/components/site/Layout";
import { blogPosts } from "@/data/blogPosts";
import { useDocumentTitle, useLanguage } from "@/lib/language";

const title = "Blog — Legacy to Cloud | infra2ai.dev";
const description =
  "Solaris·x86·스토리지·Oracle을 운영하며 배운 것과 Terraform·클라우드 업무에서 확인한 내용을 씁니다.";

const copy = {
  ko: {
    eyebrow: "ENGINEERING BLOG",
    title: "Legacy to Cloud",
    description,
    empty: "글을 준비하고 있습니다.",
  },
  en: {
    eyebrow: "ENGINEERING BLOG",
    title: "Legacy to Cloud",
    description:
      "Notes on what I learned operating Solaris, x86, storage and Oracle, and working with Terraform and cloud infrastructure.",
    empty: "I am preparing new articles.",
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
  useDocumentTitle(title, currentCopy.description);

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
