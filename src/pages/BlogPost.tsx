import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { getPost, posts } from "@/data/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  // Hooks must run unconditionally; feed safe defaults when the post is missing.
  const url = `https://dizigroww.in/blog/${slug}`;
  useMeta({
    title: post ? post.metaTitle : "Article not found | DiziGroww",
    description: post ? post.description : "This article could not be found.",
    keywords: post?.keywords,
    canonicalUrl: url,
    ogType: "article",
    robots: post ? undefined : "noindex, follow",
    structuredData: post
      ? [
          articleSchema({
            headline: post.title,
            description: post.description,
            url,
            datePublished: post.date,
            dateModified: post.updated,
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://dizigroww.in/" },
            { name: "Blog", url: "https://dizigroww.in/blog" },
            { name: post.title, url },
          ]),
        ]
      : undefined,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        <article className="section-padding">
          <div className="container-main max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={15} /> All articles
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <Clock size={12} /> {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">{post.title}</h1>

            <div
              className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-a:text-primary prose-strong:text-foreground prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Related */}
        <section className="section-padding bg-secondary">
          <div className="container-main max-w-5xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Keep reading</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group bg-card border border-border rounded-2xl p-5 shadow-card hover:border-primary/50 transition-colors"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {r.category}
                  </span>
                  <h3 className="text-base font-bold leading-snug mt-2 mb-2 group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                    Read <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
