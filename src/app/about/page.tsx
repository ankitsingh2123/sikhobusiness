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
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFB700]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="pb-24 md:pb-12 relative z-10">
        {/* Breadcrumb */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto pt-6 mb-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">
              <li><Link href="/" className="hover:text-[#FF7A00] transition-colors">Home</Link></li>
              <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
              <li className="text-white">About</li>
            </ol>
          </nav>
        </section>

        {/* Hero */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-16">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-[40px] md:text-[64px] font-black leading-[1.1] tracking-tight mb-6 text-white">
              Making quality education
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF7A00] to-[#FFB700] drop-shadow-[0_0_10px_rgba(255,122,0,0.5)]"> accessible</span><br className="hidden md:block"/> to every Indian student
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-400 font-medium max-w-3xl">
              We believe that understanding business, finance, and science shouldn't be limited by language or price. Seekho Business breaks down the world's best books and NCERT chapters into engaging Hindi video courses — available for just ₹99 each.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/courses" className="bg-gradient-to-r from-[#FF9A44] to-[#FF7A00] text-white font-black text-sm py-4 px-8 rounded-xl border-none cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,122,0,0.3)] active:translate-y-0">
                Explore Courses
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link href="/contact" className="bg-[#111]/80 backdrop-blur-md text-white font-bold text-sm py-4 px-8 rounded-xl border border-white/10 cursor-pointer transition-all duration-300 inline-flex items-center justify-center hover:bg-white/10 hover:border-white/20">Contact Us</Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-[24px] transition-all duration-500 hover:border-[#FF7A00]/30 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,122,0,0.1)] p-8 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                <p className="text-4xl md:text-5xl font-black mb-2 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,122,0,0.2)]">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest relative z-10">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-20">
          <div
            className="rounded-[32px] p-8 md:p-12 relative overflow-hidden bg-[#111]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[80px] pointer-events-none"
              style={{ backgroundColor: "rgba(255,122,0,0.1)" }}
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-[32px] font-black leading-[1.3] mb-6 text-white tracking-tight">
                  Our Mission
                </h2>
                <p className="text-base leading-relaxed mb-6 text-gray-400 font-medium">
                  India has over 600 million people under 25. Most of them study in Hindi. Yet the best business and self-help content is only available in English.
                </p>
                <p className="text-base leading-relaxed text-gray-400 font-medium">
                  We're changing that. Our team creates detailed, high-quality video courses from the world's bestselling books — all in Hindi, all affordable, and all designed for the Indian learner.
                </p>
              </div>
              <div>
                <h2 className="text-[32px] font-black leading-[1.3] mb-6 text-white tracking-tight">
                  Why Seekho?
                </h2>
                <ul className="space-y-5">
                  {[
                    { icon: "movie", text: "70+ videos per book — not just summaries" },
                    { icon: "language", text: "Everything in simple Hindi" },
                    { icon: "currency_rupee", text: "Just ₹99 per course — no subscriptions" },
                    { icon: "download", text: "Secure offline viewing — learn anywhere" },
                    { icon: "school", text: "NCERT chapters + Business books" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-4">
                      <span
                        className="material-symbols-outlined text-[24px] mt-0.5 text-[#FF7A00] drop-shadow-[0_0_5px_rgba(255,122,0,0.5)]"
                      >
                        {item.icon}
                      </span>
                      <span className="text-base leading-relaxed text-white font-medium">
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
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-20">
          <h2 className="text-[32px] font-black leading-[1.3] mb-10 text-white tracking-tight text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-[32px] transition-all duration-500 hover:border-[#FF7A00]/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                <div
                  className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-inner border border-white/5 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,122,0,0.15), rgba(255,122,0,0.05))",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-3xl text-[#FF7A00] drop-shadow-[0_0_5px_rgba(255,122,0,0.5)]"
                  >
                    {member.icon}
                  </span>
                </div>
                <h3 className="text-xl font-black mb-2 text-white relative z-10">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest relative z-10">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <div
            className="rounded-[32px] p-10 md:p-16 text-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] -z-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/10 blur-[80px] -z-10 rounded-full" />
            
            <h2 className="text-[32px] md:text-[40px] font-black leading-[1.3] mb-4 text-white tracking-tight">
              Ready to start learning?
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-gray-400 font-medium">
              Join 50,000+ students already learning on Seekho Business.
            </p>
            <Link href="/courses" className="bg-gradient-to-r from-[#FF9A44] to-[#FF7A00] text-white font-black text-lg px-10 py-4 rounded-xl border-none cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,122,0,0.3)] active:translate-y-0">
              Browse All Courses
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
