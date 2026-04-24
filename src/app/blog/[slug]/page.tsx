import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      authors: ["Seekho Business"],
      url: `https://seekhobussiness.co.in/blog/${slug}`,
      images: [{ url: post.thumbnail, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://seekhobussiness.co.in/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "why-financial-literacy-matters" },
    { slug: "top-5-business-books" },
    { slug: "ncert-physics-study-guide" },
  ];
}

function getBlogPost(slug: string) {
  const posts: Record<string, BlogPost> = {
    "why-financial-literacy-matters": {
      title: "Why Financial Literacy Should Be Taught in Every Indian School",
      excerpt:
        "India has over 600 million people under 25, yet financial literacy remains absent from most school curricula.",
      category: "Finance",
      readTime: "8 min read",
      publishedDate: "2026-04-20",
      author: "Seekho Business Team",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
      content: `
## The State of Financial Education in India

India is home to over 600 million people under the age of 25. That's one of the largest youth populations in the world. Yet, financial literacy — the understanding of how money works, how to save, invest, and build wealth — is absent from most school curricula across the country.

### Why This Matters

According to the National Centre for Financial Education (NCFE), only **27% of Indian adults** are financially literate. This means roughly 3 out of 4 adults in India don't fully understand basic financial concepts like compound interest, inflation, or the difference between assets and liabilities.

The consequences are real:
- **Rising household debt**: Indian household debt has been increasing steadily
- **Low investment participation**: Less than 5% of Indians invest in the stock market
- **Vulnerability to scams**: Lack of financial knowledge makes people targets for Ponzi schemes and fraudulent investment plans

### What Books Like Rich Dad Poor Dad Teach Us

Robert Kiyosaki's *Rich Dad Poor Dad* introduces concepts that should be part of every student's education:

1. **Assets vs. Liabilities** — Understanding what puts money in your pocket vs. what takes it out
2. **The importance of financial independence** — Not relying solely on a paycheck
3. **How the rich think about money** — Focusing on building assets, not just earning income
4. **Taxes and corporate structures** — Understanding the system

### How Seekho Business is Bridging the Gap

At Seekho Business, we break down books like Rich Dad Poor Dad into **70+ video lessons in Hindi**. Each lesson covers one concept, explained simply with Indian examples.

Our goal is to make financial education:
- **Affordable** — Just ₹99 per course (less than a movie ticket)
- **Accessible** — Available in Hindi for maximum reach
- **Practical** — Real examples from the Indian context
- **Comprehensive** — 70+ videos, not just a 10-minute summary

### What You Can Do Today

1. **Start with free videos** — Watch the first 5 videos of any course for free
2. **Read one business book per month** — Or watch our video version
3. **Teach your family** — Share financial concepts with parents and siblings
4. **Start small** — Open a savings account, learn about mutual funds

Financial literacy is not a luxury. It's a necessity. And the sooner we start, the better off India will be.

---

*Ready to start your financial education journey? [Explore our Rich Dad Poor Dad course →](/courses/rich-dad-poor-dad)*
      `,
    },
  };

  return (
    posts[slug] || {
      title: "Blog Post",
      excerpt: "Article content",
      category: "General",
      readTime: "5 min read",
      publishedDate: "2026-01-01",
      author: "Seekho Business Team",
      thumbnail: "",
      content: "Content coming soon.",
    }
  );
}

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  thumbnail: string;
  content: string;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    author: {
      "@type": "Organization",
      name: "Seekho Business",
    },
    publisher: {
      "@type": "Organization",
      name: "Seekho Business",
      logo: {
        "@type": "ImageObject",
        url: "https://seekhobussiness.co.in/logo.png",
      },
    },
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://seekhobussiness.co.in/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://seekhobussiness.co.in" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://seekhobussiness.co.in/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://seekhobussiness.co.in/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="pb-24 md:pb-12">
        {/* Breadcrumb */}
        <nav className="px-6 md:px-8 lg:px-12 max-w-[900px] mx-auto pt-4 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-sb-text-dim">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
            <li><Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link></li>
            <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
            <li className="truncate max-w-[200px] text-sb-text-primary">{post.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="px-6 md:px-8 lg:px-12 max-w-[900px] mx-auto mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="py-1 px-3 rounded-full text-xs font-medium bg-sb-brand/15 text-sb-brand"
            >
              {post.category}
            </span>
            <span className="text-sm text-sb-text-dim">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-[40px] font-bold leading-[1.2] tracking-tight max-md:text-2xl mb-4 text-sb-text-primary">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FF7A00, #994700)",
              }}
            >
              <span className="text-white text-sm font-semibold">S</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-sb-text-primary">
                {post.author}
              </p>
              <p className="text-xs text-sb-text-dim">
                {new Date(post.publishedDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          {post.thumbnail && (
            <div
              className="w-full h-64 md:h-96 rounded-2xl overflow-hidden relative mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Body */}
        <div
          className="px-6 md:px-8 lg:px-12 max-w-[900px] mx-auto text-sb-text-secondary"
        >
          {post.content.split("\n").map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={idx} />;
            if (trimmed.startsWith("## "))
              return (
                <h2 key={idx} className="text-[32px] font-semibold leading-[1.3] max-md:text-xl mt-10 mb-4 text-sb-text-primary">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            if (trimmed.startsWith("### "))
              return (
                <h3 key={idx} className="text-2xl font-semibold leading-[1.4] max-md:text-lg mt-8 mb-3 text-sb-text-primary">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            if (trimmed.startsWith("---"))
              return <hr key={idx} className="my-8 border-white/5" />;
            if (trimmed.startsWith("- ") || trimmed.startsWith("* "))
              return (
                <li key={idx} className="text-base leading-relaxed ml-6 mb-2 list-disc text-sb-text-secondary">
                  {trimmed.replace(/^[-*]\s+/, "")}
                </li>
              );
            if (/^\d+\.\s/.test(trimmed))
              return (
                <li key={idx} className="text-base leading-relaxed ml-6 mb-2 list-decimal text-sb-text-secondary">
                  {trimmed.replace(/^\d+\.\s+/, "")}
                </li>
              );
            return (
              <p key={idx} className="text-base leading-relaxed mb-4 text-sb-text-secondary">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Share & CTA */}
        <div className="px-6 md:px-8 lg:px-12 max-w-[900px] mx-auto mt-12">
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-sb-bg-elevated border border-sb-border"
          >
            <div>
              <h3 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-2 text-sb-text-primary">
                Enjoyed this article?
              </h3>
              <p className="text-sm text-sb-text-dim">
                Watch the full video course on this topic.
              </p>
            </div>
            <Link href="/courses" className="bg-sb-brand text-[#5C2800] font-semibold text-sm py-3 px-6 rounded-xl border-none cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 hover:bg-[#ff8f1f] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,122,0,0.3)] active:translate-y-0 shrink-0">
              Explore Courses
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
