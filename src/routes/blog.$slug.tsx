import { createFileRoute, notFound } from "@tanstack/react-router";

import { BlogArticle } from "@/components/site/Blog";
import { getBlogPost } from "@/data/blogPosts";
import { useDocumentTitle, useLanguage } from "@/lib/language";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }

    const { post } = loaderData;
    const title = `${post.title.ko} — infra2ai.dev`;
    return {
      meta: [
        { title },
        { name: "description", content: post.summary.ko },
        { property: "og:title", content: title },
        { property: "og:description", content: post.summary.ko },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.publishedAt },
      ],
    };
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { post } = Route.useLoaderData();
  const { language } = useLanguage();
  useDocumentTitle(`${post.title[language]} — infra2ai.dev`, post.summary[language]);

  return <BlogArticle post={post} language={language} />;
}
