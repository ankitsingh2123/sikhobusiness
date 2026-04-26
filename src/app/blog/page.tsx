import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog ΓÇö Business Tips, Book Summaries & Learning Guides",
  description:
    "Read insightful articles on business, finance, NCERT study guides, book summaries, and productivity tips. Learn smarter with Seekho Business blog.",
  alternates: {
    canonical: "https://seekhobussiness.co.in/blog",
  },
  openGraph: {
    title: "Seekho Business Blog ΓÇö Business & Education Insights",
    description:
      "Articles on business books, finance, NCERT study guides, and self-improvement.",
    url: "https://seekhobussiness.co.in/blog",
  },
};

const blogPosts = [
  {
    title: "Why Financial Literacy Should Be Taught in Every Indian School",
    excerpt:
      "India has over 600 million people under 25, yet financial literacy remains absent from most school curricula. Here's why that needs to change and how you can start today.",
    slug: "why-financial-literacy-matters",
    category: "Finance",
    readTime: "8 min read",
    date: "April 20, 2026",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
    featured: true,
  },
  {
    title: "Top 5 Business Books Every Student Must Read in 2026",
    excerpt:
      "From Rich Dad Poor Dad to The Psychology of Money ΓÇö these five books will transform how you think about wealth, investing, and career success.",
    slug: "top-5-business-books",
    category: "Business",
    readTime: "6 min read",
    date: "April 15, 2026",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn",
    featured: false,
  },
  {
    title: "NCERT Physics Class 10 ΓÇö Complete Study Guide & Tips",
    excerpt:
      "Master Light, Electricity, and Magnetic Effects with our comprehensive guide. Includes video lesson links, formula sheets, and exam strategies.",
    slug: "ncert-physics-study-guide",
    category: "NCERT",
    readTime: "10 min read",
    date: "April 10, 2026",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
    featured: false,
  },
  {
    title: "How Atomic Habits Can Change Your Study Routine",
    excerpt:
      "James Clear's framework applied to education. Build better study habits, overcome procrastination, and achieve more with 1% daily improvements.",
    slug: "atomic-habits-study-routine",
    category: "Self Help",
    readTime: "7 min read",
    date: "April 5, 2026",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn",
    featured: false,
  },
  {
    title: "Understanding Assets vs Liabilities ΓÇö A Visual Guide",
    excerpt:
      "The most important concept from Rich Dad Poor Dad explained with Indian examples. Real estate, stocks, and building your asset column step by step.",
    slug: "assets-vs-liabilities-guide",
    category: "Finance",
    readTime: "5 min read",
    date: "March 28, 2026",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
    featured: false,
  },
];

const blogCategories = ["All", "Business", "Finance", "NCERT", "Self Help", "GK"];

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  return (
    <div className="pb-24 md:pb-12">
      {/* ΓòÉΓòÉΓòÉ Header ΓòÉΓòÉΓòÉ */}
      <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto pt-8 mb-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-sb-text-dim">
            <li>
              <Link href="/" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </li>
            <li className="text-sb-text-primary">Blog</li>
          </ol>
        </nav>

        <div className="animate-fade-in-up">
          <h1 className="text-[40px] font-bold leading-[1.2] tracking-tight max-md:text-2xl mb-4 text-sb-text-primary">
            Blog
          </h1>
          <p className="text-lg leading-relaxed max-md:text-base max-w-2xl text-sb-text-secondary">
            Insights on business, finance, education, and personal growth. Learn smarter with articles from the Seekho Business team.
          </p>
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉ Category Filters ΓòÉΓòÉΓòÉ */}
      <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-8">
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((cat, idx) => (
            <button
              key={cat}
              className={`py-1.5 px-4 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 bg-white/5 text-sb-text-secondary border-none hover:bg-white/10 hover:text-sb-text-primary ${idx === 0 ? "!bg-sb-brand !text-white" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉ Featured Post ΓòÉΓòÉΓòÉ */}
      {featured && (
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-12 animate-fade-in-up [animation-delay:0.1s]">
          <Link
            href={`/blog/${featured.slug}`}
            className="block group relative overflow-hidden bg-sb-bg-elevated rounded-3xl border border-sb-border"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 30% 50%, rgba(255,122,0,0.06) 0%, transparent 60%)",
              }}
            />
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 relative z-10">
              <div
                className="w-full md:w-80 h-48 md:h-56 rounded-xl overflow-hidden shrink-0 relative shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="py-1 px-3 rounded-full text-xs font-medium bg-sb-brand/15 text-sb-brand"
                  >
                    Featured
                  </span>
                  <span
                    className="py-1 px-3 rounded-full text-xs font-medium bg-white/[0.06] text-sb-text-secondary"
                  >
                    {featured.category}
                  </span>
                </div>
                <h2
                  className="text-[32px] font-semibold leading-[1.3] max-md:text-xl mb-3 group-hover:text-orange-400 transition-colors text-sb-text-primary"
                >
                  {featured.title}
                </h2>
                <p className="text-base leading-relaxed mb-4 line-clamp-2 text-sb-text-dim">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-sb-text-dim">
                  <span>{featured.date}</span>
                  <span>ΓÇó</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ΓòÉΓòÉΓòÉ Blog Grid ΓòÉΓòÉΓòÉ */}
      <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto animate-fade-in-up [animation-delay:0.2s]">
        <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-6 text-sb-text-primary">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-sb-surface border border-sb-border rounded-2xl transition-all duration-300 hover:border-sb-border-strong hover:bg-sb-surface-high group overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="py-0.5 px-2 rounded-full text-[11px] font-medium bg-white/[0.06] text-sb-text-secondary"
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-sb-text-dim">
                    {post.readTime}
                  </span>
                </div>
                <h3
                  className="text-sm font-medium leading-[1.2] font-semibold mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors text-sb-text-primary"
                >
                  {post.title}
                </h3>
                <p className="text-sm line-clamp-2 mb-3 text-sb-text-dim">
                  {post.excerpt}
                </p>
                <span className="text-xs text-sb-text-muted">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉ Newsletter CTA ΓòÉΓòÉΓòÉ */}
      <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mt-16">
        <div
          className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-sb-border"
          style={{
            background: "linear-gradient(135deg, #1c1b1b 0%, #2a2a2a 100%)",
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "rgba(184,195,255,0.06)" }}
          />
          <div className="relative z-10">
            <span className="material-symbols-outlined text-3xl mb-4 text-sb-accent-blue">
              mark_email_read
            </span>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-2 text-sb-text-primary">
              Stay in the loop
            </h2>
            <p className="text-base leading-relaxed mb-6 max-w-md mx-auto text-sb-text-dim">
              Get weekly articles on business, NCERT guides, and productivity tips delivered to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 py-3 px-4 rounded-xl text-sm outline-none bg-sb-surface-highest border border-white/[0.08] text-sb-text-primary"
              />
              <button className="bg-sb-brand text-[#5C2800] font-semibold text-sm py-3 px-6 rounded-xl border-none cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 hover:bg-[#ff8f1f] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,122,0,0.3)] active:translate-y-0 shrink-0">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
