import Link from "next/link";
import { Zap, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-white text-lg">
                WebCraft<span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Professional websites built fast. AI-powered tools to generate, preview, and download complete websites instantly.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://wa.me/919876543210" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <MessageCircle className="w-4 h-4" /> +91 98765 43210
              </a>
              <a href="mailto:hello@webcraft.ai" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                <Mail className="w-4 h-4" /> hello@webcraft.ai
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Pages</h3>
            <ul className="space-y-2.5 text-sm">
              {[["Home", "/"], ["Pricing", "/pricing"], ["Order Website", "/order"], ["Portfolio", "/portfolio"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Templates</h3>
            <ul className="space-y-2.5 text-sm">
              {["Business Website", "Restaurant Website", "Portfolio Site", "Online Shop", "Blog & News", "Landing Page"].map((s) => (
                <li key={s}><span className="hover:text-white transition-colors cursor-pointer">{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Packages</h3>
            <ul className="space-y-3 text-sm">
              <li><span className="text-white font-bold">₹400</span> – Starter <span className="text-xs">(1 page)</span></li>
              <li><span className="text-white font-bold">₹600</span> – Standard <span className="text-xs">(3 pages)</span></li>
              <li><span className="text-white font-bold">₹800</span> – Premium <span className="text-xs">(5 pages)</span></li>
              <li className="pt-1">
                <Link href="/order" className="inline-block bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                  Order Now →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} WebCraftAI. All rights reserved. Made with ❤️ in India.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
