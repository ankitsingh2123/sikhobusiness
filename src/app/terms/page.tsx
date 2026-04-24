import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using the Seekho Business learning platform.",
  alternates: { canonical: "https://seekhobussiness.co.in/terms" },
};

export default function TermsPage() {
  return (
    <div className="pb-24 md:pb-12">
      <section className="px-6 md:px-8 lg:px-12 max-w-[900px] mx-auto pt-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-sb-text-dim">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
            <li className="text-sb-text-primary">Terms of Service</li>
          </ol>
        </nav>

        <h1 className="text-[40px] font-bold leading-[1.2] tracking-tight max-md:text-2xl mb-4 text-sb-text-primary">Terms of Service</h1>
        <p className="text-sm mb-8 text-sb-text-dim">Last updated: April 2026</p>

        <div className="space-y-8 text-sb-text-secondary">
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">1. Acceptance of Terms</h2>
            <p className="text-base leading-relaxed">By accessing or using Seekho Business (seekhobussiness.co.in), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">2. Account Registration</h2>
            <p className="text-base leading-relaxed">You must provide accurate information when creating an account. You are responsible for maintaining the security of your account and password. You must be at least 13 years old to use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">3. Course Access & Payment</h2>
            <ul className="list-disc ml-6 space-y-2 text-base leading-relaxed">
              <li>First 5 videos of each course are free to watch</li>
              <li>Full course access requires a one-time payment of ₹99</li>
              <li>Once purchased, you get lifetime access to the course</li>
              <li>Payments are processed securely via Razorpay</li>
              <li>Refunds are available within 7 days of purchase if less than 20% of the course has been viewed</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">4. Content Usage & DRM</h2>
            <p className="text-base leading-relaxed mb-3">All video content on Seekho Business is protected by copyright and DRM (Digital Rights Management). You may not:</p>
            <ul className="list-disc ml-6 space-y-2 text-base leading-relaxed">
              <li>Download, copy, or redistribute any video content</li>
              <li>Use screen recording software to capture our videos</li>
              <li>Share your account credentials with others</li>
              <li>Use automated tools to access or scrape our content</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">5. Contact</h2>
            <p className="text-base leading-relaxed">For questions about these terms, email <a href="mailto:business@seekho.ai" className="text-sb-brand-light hover:underline">business@seekho.ai</a>.</p>
          </section>
        </div>
      </section>
    </div>
  );
}
