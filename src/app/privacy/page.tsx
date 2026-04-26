import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Seekho Business collects, uses, and protects your personal information.",
  alternates: { canonical: "https://seekhobussiness.co.in/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="pb-24 md:pb-12">
      <section className="px-6 md:px-8 lg:px-12 max-w-[900px] mx-auto pt-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-sb-text-dim">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
            <li className="text-sb-text-primary">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="text-[40px] font-bold leading-[1.2] tracking-tight max-md:text-2xl mb-4 text-sb-text-primary">Privacy Policy</h1>
        <p className="text-sm mb-8 text-sb-text-dim">Last updated: April 2026</p>

        <div className="space-y-8 text-sb-text-secondary">
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">1. Information We Collect</h2>
            <p className="text-base leading-relaxed mb-3">We collect information you provide when creating an account, purchasing courses, or contacting us. This includes your name, email address, phone number, and payment information.</p>
            <p className="text-base leading-relaxed">We also automatically collect technical data such as device type, browser, IP address, and usage analytics to improve our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 space-y-2 text-base leading-relaxed">
              <li>To provide and maintain our video learning services</li>
              <li>To process payments and deliver course access</li>
              <li>To send important updates about your courses</li>
              <li>To improve our platform and create new content</li>
              <li>To respond to your support requests</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">3. Data Security</h2>
            <p className="text-base leading-relaxed">We implement industry-standard security measures including SSL encryption, secure payment gateways, and access controls to protect your data. Videos are served via encrypted streams and cannot be downloaded or screen-recorded.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">4. Third-Party Services</h2>
            <p className="text-base leading-relaxed">We use trusted third-party services for payment processing (Razorpay), video hosting (AWS), and analytics (Google Analytics). Each has their own privacy policy governing data handling.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold leading-[1.4] max-md:text-lg mb-3 text-sb-text-primary">5. Contact Us</h2>
            <p className="text-base leading-relaxed">For privacy-related questions, contact us at <a href="mailto:business@seekho.ai" className="text-sb-brand-light hover:underline">business@seekho.ai</a>.</p>
          </section>
        </div>
      </section>
    </div>
  );
}
