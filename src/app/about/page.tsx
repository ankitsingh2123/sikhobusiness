import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us ΓÇö Our Mission to Make Learning Accessible",
  description:
    "Seekho Business is India's leading video learning platform. We break down best-selling business books and NCERT chapters into affordable, easy-to-understand video courses in Hindi.",
  alternates: {
    canonical: "https://seekhobussiness.co.in/about",
  },
};

const stats = [
  { value: "50+", label: "Video Courses" },
  { value: "3,500+", label: "Video Lessons" },
  { value: "50K+", label: "Students" },
  { value: "Γé╣99", label: "Per Course" },
];

const team = [
  { name: "Founder", role: "CEO & Content Creator", icon: "person" },
  { name: "Co-Founder", role: "CTO & Engineering", icon: "code" },
  { name: "Head of Content", role: "Curriculum Design", icon: "school" },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Seekho Business",
      description:
        "India's leading video learning platform for business books and NCERT chapters.",
      foundingDate: "2025",
      url: "https://seekhobussiness.co.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className="pb-24 md:pb-12">
        {/* Breadcrumb */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto pt-4 mb-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-sb-text-dim">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
              <li className="text-sb-text-primary">About</li>
            </ol>
          </nav>
        </section>

        {/* Hero */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-16">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-[56px] font-extrabold leading-[1.1] tracking-tight max-md:text-[28px] mb-6 text-sb-text-primary">
              Making quality education
              <span className="text-sb-brand"> accessible</span> to every Indian student
            </h1>
            <p className="text-lg leading-relaxed max-md:text-base mb-8 text-sb-text-secondary">
              We believe that understanding business, finance, and science shouldn&apos;t be limited by language or price. Seekho Business breaks down the world&apos;s best books and NCERT chapters into engaging Hindi video courses ΓÇö available for just Γé╣99 each.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/courses" className="bg-sb-brand text-[#5C2800] font-semibold text-sm py-3 px-6 rounded-xl border-none cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 hover:bg-[#ff8f1f] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,122,0,0.3)] active:translate-y-0">
                Explore Courses
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link href="/contact" className="bg-transparent text-sb-text-primary font-medium text-sm py-3 px-6 rounded-xl border border-sb-border-strong cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/20">Contact Us</Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-sb-surface border border-sb-border rounded-2xl transition-all duration-300 hover:border-sb-border-strong hover:bg-sb-surface-high p-6 text-center"
              >
                <p className="text-3xl font-bold mb-1 text-sb-brand-light">
                  {stat.value}
                </p>
                <p className="text-sm text-sb-text-dim">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-16">
          <div
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden bg-sb-bg-elevated border border-sb-border"
          >
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "rgba(255,122,0,0.08)" }}
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-[32px] font-semibold leading-[1.3] max-md:text-xl mb-4 text-sb-text-primary">
                  Our Mission
                </h2>
                <p className="text-base leading-relaxed mb-4 text-sb-text-secondary">
                  India has over 600 million people under 25. Most of them study in Hindi. Yet the best business and self-help content is only available in English.
                </p>
                <p className="text-base leading-relaxed text-sb-text-secondary">
                  We&apos;re changing that. Our team creates detailed, high-quality video courses from the world&apos;s bestselling books ΓÇö all in Hindi, all affordable, and all designed for the Indian learner.
                </p>
              </div>
              <div>
                <h2 className="text-[32px] font-semibold leading-[1.3] max-md:text-xl mb-4 text-sb-text-primary">
                  Why Seekho?
                </h2>
                <ul className="space-y-4">
                  {[
                    { icon: "movie", text: "70+ videos per book ΓÇö not just summaries" },
                    { icon: "language", text: "Everything in simple Hindi" },
                    { icon: "currency_rupee", text: "Just Γé╣99 per course ΓÇö no subscriptions" },
                    { icon: "download", text: "Secure offline viewing ΓÇö learn anywhere" },
                    { icon: "school", text: "NCERT chapters + Business books" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-[20px] mt-0.5 text-sb-brand"
                      >
                        {item.icon}
                      </span>
                      <span className="text-base leading-relaxed text-sb-text-primary">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-16">
          <h2 className="text-[32px] font-semibold leading-[1.3] max-md:text-xl mb-8 text-sb-text-primary">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-sb-surface border border-sb-border rounded-2xl transition-all duration-300 hover:border-sb-border-strong hover:bg-sb-surface-high p-6 text-center group"
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,122,0,0.15), rgba(255,122,0,0.05))",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-2xl text-sb-brand"
                  >
                    {member.icon}
                  </span>
                </div>
                <h3 className="text-sm font-medium leading-[1.2] font-semibold mb-1 text-sb-text-primary">
                  {member.name}
                </h3>
                <p className="text-sm text-sb-text-dim">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <div
            className="rounded-3xl p-8 md:p-12 text-center border border-sb-border"
            style={{
              background: "linear-gradient(135deg, #1c1b1b, #2a2a2a)",
            }}
          >
            <h2 className="text-[32px] font-semibold leading-[1.3] max-md:text-xl mb-3 text-sb-text-primary">
              Ready to start learning?
            </h2>
            <p className="text-base leading-relaxed mb-6 text-sb-text-dim">
              Join 50,000+ students already learning on Seekho Business.
            </p>
            <Link href="/courses" className="bg-sb-brand text-[#5C2800] font-semibold text-base px-8 py-3.5 rounded-xl border-none cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 hover:bg-[#ff8f1f] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,122,0,0.3)] active:translate-y-0">
              Browse All Courses
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
