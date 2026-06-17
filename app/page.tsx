import Link from "next/link";
import { Sparkles, Zap, Download, Eye, Code2, Star, ArrowRight, CheckCircle } from "lucide-react";
import { WebsiteBuilder } from "@/components/builder/WebsiteBuilder";

const stats = [
  { value: "500+", label: "Websites Built" },
  { value: "₹400", label: "Starting Price" },
  { value: "24h", label: "Avg Delivery" },
  { value: "4.9★", label: "Client Rating" },
];

const features = [
  { icon: <Sparkles className="w-5 h-5" />, title: "AI-Powered Generator", desc: "Describe your website in plain English and watch it come to life instantly." },
  { icon: <Eye className="w-5 h-5" />, title: "Live Preview", desc: "See your website rendered in real-time as you generate and edit." },
  { icon: <Code2 className="w-5 h-5" />, title: "Code Editor", desc: "Edit the HTML directly in the browser with a built-in code editor." },
  { icon: <Download className="w-5 h-5" />, title: "Download as ZIP", desc: "Get your complete website as a ZIP file, ready to deploy anywhere." },
  { icon: <Zap className="w-5 h-5" />, title: "6 Templates", desc: "Business, Portfolio, Restaurant, Shop, Blog, and News templates included." },
  { icon: <CheckCircle className="w-5 h-5" />, title: "No Login Required", desc: "Start building immediately — no account or signup needed." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-brand-950/20 dark:via-gray-950 dark:to-gray-950 pt-16 pb-8 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent dark:from-brand-900/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Banner */}
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-full px-4 py-2 text-sm font-bold mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            🏷️ Professional Websites Starting at Just ₹400
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5 tracking-tight">
            Build Stunning Websites
            <br />
            <span className="gradient-text">with AI in Seconds</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
            Type a prompt, get a complete responsive website. Edit, preview, and download — all for free. Or let our experts build it for you from{" "}
            <strong className="text-brand-600 dark:text-brand-400">just ₹400</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="#builder" className="btn-primary px-6 py-3 text-base rounded-xl flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" /> Try AI Builder Free
            </a>
            <Link href="/order" className="btn-secondary px-6 py-3 text-base rounded-xl flex items-center justify-center gap-2">
              Order a Website <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Builder */}
      <div id="builder">
        <WebsiteBuilder />
      </div>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-tag mb-2">Features</p>
            <h2 className="section-title mb-3">Everything You Need to Build Fast</h2>
            <p className="section-sub max-w-xl mx-auto">A complete website creation toolkit, from AI generation to download — all free.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card p-6 hover:border-brand-300 dark:hover:border-brand-700 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-600 to-accent-500 rounded-3xl p-10 text-center text-white">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-3">Want a Professional Build?</h2>
          <p className="text-brand-100 text-lg mb-7 max-w-xl mx-auto">Our team delivers hand-crafted, SEO-ready websites starting at just ₹400. Fast delivery, zero headaches.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing" className="bg-white text-brand-700 font-bold px-7 py-3 rounded-xl hover:bg-brand-50 transition-colors">
              View Pricing Plans
            </Link>
            <Link href="/order" className="bg-brand-700/50 hover:bg-brand-700/70 text-white font-bold px-7 py-3 rounded-xl border border-white/30 transition-colors">
              Order Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
