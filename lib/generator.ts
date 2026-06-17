import { Template } from "@/types";

interface ParsedPrompt {
  template: Template;
  businessName: string;
  keywords: string[];
  hasMenu: boolean;
  hasGallery: boolean;
  hasContact: boolean;
  hasBlog: boolean;
  hasShop: boolean;
  hasPortfolio: boolean;
  colorTheme: string;
  primaryColor: string;
  accentColor: string;
}

function detectTemplate(prompt: string): Template {
  const lower = prompt.toLowerCase();
  if (lower.includes("restaurant") || lower.includes("food") || lower.includes("cafe") || lower.includes("hotel") || lower.includes("menu") || lower.includes("dining")) return "restaurant";
  if (lower.includes("portfolio") || lower.includes("freelancer") || lower.includes("designer") || lower.includes("photographer") || lower.includes("artist")) return "portfolio";
  if (lower.includes("blog") || lower.includes("article") || lower.includes("news") || lower.includes("magazine") || lower.includes("journal")) return "blog";
  if (lower.includes("shop") || lower.includes("store") || lower.includes("ecommerce") || lower.includes("product") || lower.includes("buy") || lower.includes("sell")) return "shop";
  if (lower.includes("news") || lower.includes("portal") || lower.includes("media")) return "news";
  return "business";
}

function extractBusinessName(prompt: string): string {
  const patterns = [
    /for\s+([A-Z][a-zA-Z\s&]+?)(?:\s+(?:with|that|website|which|,|\.)|$)/,
    /called\s+["']?([A-Z][a-zA-Z\s&]+?)["']?(?:\s|,|\.)/,
    /named\s+["']?([A-Z][a-zA-Z\s&]+?)["']?(?:\s|,|\.)/,
    /"([^"]+)"/,
    /'([^']+)'/,
  ];
  for (const p of patterns) {
    const m = prompt.match(p);
    if (m && m[1] && m[1].length < 40) return m[1].trim();
  }
  return "My Business";
}

function pickColorTheme(prompt: string): { theme: string; primary: string; accent: string } {
  const lower = prompt.toLowerCase();
  if (lower.includes("blue") || lower.includes("tech") || lower.includes("corporate")) return { theme: "blue", primary: "#2563eb", accent: "#0ea5e9" };
  if (lower.includes("green") || lower.includes("eco") || lower.includes("nature") || lower.includes("organic")) return { theme: "green", primary: "#16a34a", accent: "#22c55e" };
  if (lower.includes("red") || lower.includes("bold") || lower.includes("power")) return { theme: "red", primary: "#dc2626", accent: "#f97316" };
  if (lower.includes("purple") || lower.includes("creative") || lower.includes("luxury")) return { theme: "purple", primary: "#7c3aed", accent: "#a855f7" };
  if (lower.includes("orange") || lower.includes("food") || lower.includes("restaurant") || lower.includes("cafe")) return { theme: "orange", primary: "#ea580c", accent: "#f59e0b" };
  if (lower.includes("pink") || lower.includes("beauty") || lower.includes("fashion") || lower.includes("salon")) return { theme: "pink", primary: "#db2777", accent: "#f472b6" };
  if (lower.includes("dark") || lower.includes("night") || lower.includes("black")) return { theme: "dark", primary: "#6366f1", accent: "#818cf8" };
  return { theme: "indigo", primary: "#4f46e5", accent: "#6366f1" };
}

function parsePrompt(prompt: string): ParsedPrompt {
  const lower = prompt.toLowerCase();
  const { theme, primary, accent } = pickColorTheme(prompt);
  return {
    template: detectTemplate(prompt),
    businessName: extractBusinessName(prompt),
    keywords: prompt.split(/\s+/).filter(w => w.length > 3),
    hasMenu: lower.includes("menu") || lower.includes("food") || lower.includes("dish"),
    hasGallery: lower.includes("gallery") || lower.includes("photo") || lower.includes("image") || lower.includes("portfolio"),
    hasContact: lower.includes("contact") || lower.includes("form") || lower.includes("enquiry"),
    hasBlog: lower.includes("blog") || lower.includes("article") || lower.includes("post"),
    hasShop: lower.includes("shop") || lower.includes("store") || lower.includes("product") || lower.includes("buy"),
    hasPortfolio: lower.includes("portfolio") || lower.includes("work") || lower.includes("project"),
    colorTheme: theme,
    primaryColor: primary,
    accentColor: accent,
  };
}

// ─── Template Generators ────────────────────────────────────────────────────

function generateRestaurantHTML(p: ParsedPrompt, prompt: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.businessName} – Fine Dining</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${p.primaryColor};
      --accent: ${p.accentColor};
      --dark: #1a1a1a;
      --text: #333;
      --light: #f9f5f0;
    }
    body { font-family: 'Georgia', serif; color: var(--text); background: #fff; }
    a { color: inherit; text-decoration: none; }

    /* NAV */
    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: rgba(26,26,26,0.95); backdrop-filter: blur(8px); }
    .logo { font-size: 1.5rem; font-weight: 700; color: var(--accent); letter-spacing: 0.05em; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: #e5e7eb; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.3s; }
    .nav-links a:hover { color: var(--accent); }
    .nav-cta { background: var(--primary); color: #fff; padding: 0.5rem 1.25rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600; transition: opacity 0.3s; }
    .nav-cta:hover { opacity: 0.85; }

    /* HERO */
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, ${p.primaryColor}cc 0%, #1a1a1a 60%), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23222" width="100" height="100"/><circle cx="20" cy="20" r="8" fill="%23333"/><circle cx="60" cy="50" r="12" fill="%23333"/><circle cx="80" cy="80" r="6" fill="%23333"/></svg>') center/cover; padding: 2rem; }
    .hero-badge { display: inline-block; background: var(--accent); color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.35rem 1rem; border-radius: 20px; margin-bottom: 1.5rem; }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 400; color: #fff; line-height: 1.1; margin-bottom: 1.25rem; }
    .hero h1 span { font-style: italic; color: var(--accent); }
    .hero p { font-size: 1.15rem; color: #cbd5e1; max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.8; }
    .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-primary { background: var(--primary); color: #fff; padding: 0.9rem 2rem; border-radius: 4px; font-size: 1rem; font-weight: 600; display: inline-block; transition: transform 0.2s, box-shadow 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    .btn-outline { border: 2px solid #fff; color: #fff; padding: 0.9rem 2rem; border-radius: 4px; font-size: 1rem; font-weight: 600; display: inline-block; transition: background 0.2s; }
    .btn-outline:hover { background: rgba(255,255,255,0.1); }

    /* SECTIONS */
    section { padding: 5rem 1.5rem; }
    .container { max-width: 1100px; margin: 0 auto; }
    .section-tag { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--primary); margin-bottom: 0.75rem; }
    .section-title { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 400; color: var(--dark); line-height: 1.2; margin-bottom: 1rem; }
    .section-title em { font-style: italic; color: var(--primary); }
    .section-sub { color: #64748b; font-size: 1.05rem; line-height: 1.8; max-width: 560px; }
    .divider { width: 60px; height: 3px; background: var(--primary); margin: 1.5rem 0; }

    /* ABOUT */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about-visual { background: linear-gradient(135deg, ${p.primaryColor}22, ${p.accentColor}33); border-radius: 12px; height: 420px; display: flex; align-items: center; justify-content: center; font-size: 5rem; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; }
    .stat { text-align: center; padding: 1.5rem; background: var(--light); border-radius: 8px; }
    .stat-num { font-size: 2.5rem; font-weight: 700; color: var(--primary); display: block; }
    .stat-label { font-size: 0.85rem; color: #64748b; margin-top: 0.25rem; }

    /* MENU */
    .menu-bg { background: var(--light); }
    .menu-header { text-align: center; margin-bottom: 3rem; }
    .menu-header .divider { margin: 1rem auto; }
    .menu-tabs { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem; }
    .tab { padding: 0.6rem 1.5rem; border-radius: 30px; font-size: 0.9rem; font-weight: 600; cursor: pointer; border: 2px solid transparent; transition: all 0.3s; background: #fff; color: var(--dark); }
    .tab.active, .tab:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .menu-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
    .menu-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
    .menu-img { height: 180px; background: linear-gradient(135deg, ${p.primaryColor}33, ${p.accentColor}55); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .menu-info { padding: 1.25rem; }
    .menu-name { font-size: 1.1rem; font-weight: 700; color: var(--dark); margin-bottom: 0.5rem; }
    .menu-desc { font-size: 0.85rem; color: #64748b; line-height: 1.6; margin-bottom: 1rem; }
    .menu-footer { display: flex; justify-content: space-between; align-items: center; }
    .menu-price { font-size: 1.15rem; font-weight: 700; color: var(--primary); }
    .menu-badge { font-size: 0.7rem; font-weight: 700; background: var(--accent); color: #fff; padding: 0.2rem 0.6rem; border-radius: 20px; text-transform: uppercase; }

    /* GALLERY */
    .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .gallery-item { aspect-ratio: 1; border-radius: 8px; overflow: hidden; background: linear-gradient(135deg, ${p.primaryColor}${Math.floor(Math.random()*55+20).toString(16)}, ${p.accentColor}${Math.floor(Math.random()*55+20).toString(16)}); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; transition: transform 0.3s; cursor: pointer; }
    .gallery-item:hover { transform: scale(1.04); }
    .gallery-item:nth-child(1) { grid-row: span 2; font-size: 4rem; }

    /* CONTACT */
    .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
    .contact-info h3 { font-size: 1.5rem; font-weight: 700; color: var(--dark); margin-bottom: 1.5rem; }
    .contact-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .contact-icon { width: 44px; height: 44px; background: ${p.primaryColor}22; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .contact-text p:first-child { font-weight: 700; color: var(--dark); margin-bottom: 0.2rem; }
    .contact-text p:last-child { color: #64748b; font-size: 0.9rem; }
    .form-group { margin-bottom: 1.25rem; }
    label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--dark); margin-bottom: 0.5rem; }
    input, textarea, select { width: 100%; padding: 0.75rem 1rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 0.95rem; font-family: inherit; transition: border-color 0.3s; outline: none; }
    input:focus, textarea:focus { border-color: var(--primary); }
    textarea { resize: vertical; min-height: 120px; }
    .submit-btn { width: 100%; background: var(--primary); color: #fff; padding: 0.9rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: opacity 0.3s; }
    .submit-btn:hover { opacity: 0.85; }

    /* WHATSAPP */
    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.3s; text-decoration: none; }
    .whatsapp-btn:hover { transform: scale(1.1); }

    /* FOOTER */
    footer { background: var(--dark); color: #94a3b8; padding: 3rem 1.5rem 1.5rem; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
    .footer-brand { color: #fff; font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem; }
    .footer-desc { font-size: 0.9rem; line-height: 1.7; }
    .footer-title { color: #fff; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; }
    .footer-links { list-style: none; }
    .footer-links li { margin-bottom: 0.6rem; }
    .footer-links a { font-size: 0.9rem; transition: color 0.3s; }
    .footer-links a:hover { color: var(--accent); }
    .footer-bottom { border-top: 1px solid #334155; padding-top: 1.5rem; text-align: center; font-size: 0.85rem; }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      nav { padding: 1rem; }
      .nav-links { display: none; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .gallery-item:nth-child(1) { grid-row: span 1; }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
      .footer-grid > div:first-child { grid-column: span 2; }
    }
    @media (max-width: 480px) {
      .gallery-grid { grid-template-columns: 1fr 1fr; }
      .footer-grid { grid-template-columns: 1fr; }
      .footer-grid > div:first-child { grid-column: span 1; }
    }
  </style>
</head>
<body>

<nav>
  <div class="logo">🍽️ ${p.businessName}</div>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#menu">Menu</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Reserve Table</a>
</nav>

<section class="hero">
  <div>
    <span class="hero-badge">✨ Fine Dining Experience</span>
    <h1>Taste the <span>Art of</span><br>Fine Cuisine</h1>
    <p>Experience exquisite flavors crafted with passion. ${p.businessName} brings you an unforgettable dining journey in an elegant atmosphere.</p>
    <div class="hero-btns">
      <a href="#menu" class="btn-primary">Explore Menu</a>
      <a href="#contact" class="btn-outline">Reserve a Table</a>
    </div>
  </div>
</section>

<section id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-visual">🍽️</div>
      <div>
        <p class="section-tag">Our Story</p>
        <h2 class="section-title">Where Every Meal is a <em>Memory</em></h2>
        <div class="divider"></div>
        <p class="section-sub">Founded with a passion for exceptional cuisine, ${p.businessName} has been delighting guests with carefully crafted dishes made from the finest locally sourced ingredients. Our chefs bring decades of culinary expertise to every plate.</p>
        <div class="stats">
          <div class="stat"><span class="stat-num">12+</span><span class="stat-label">Years of Excellence</span></div>
          <div class="stat"><span class="stat-num">50K+</span><span class="stat-label">Happy Guests</span></div>
          <div class="stat"><span class="stat-num">80+</span><span class="stat-num" style="font-size:1.4rem">Menu Items</span></div>
          <div class="stat"><span class="stat-num">4.9★</span><span class="stat-label">Average Rating</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="menu" class="menu-bg">
  <div class="container">
    <div class="menu-header">
      <p class="section-tag">Our Menu</p>
      <h2 class="section-title">Crafted with <em>Passion</em></h2>
      <div class="divider"></div>
      <p class="section-sub" style="margin:0 auto">From starters to desserts, every dish is a masterpiece crafted by our award-winning chefs.</p>
    </div>
    <div class="menu-tabs">
      <span class="tab active">All</span>
      <span class="tab">Starters</span>
      <span class="tab">Mains</span>
      <span class="tab">Desserts</span>
      <span class="tab">Drinks</span>
    </div>
    <div class="menu-grid">
      <div class="menu-card"><div class="menu-img">🥗</div><div class="menu-info"><div class="menu-name">Garden Fresh Salad</div><div class="menu-desc">Crisp seasonal greens with house vinaigrette, cherry tomatoes, and croutons</div><div class="menu-footer"><span class="menu-price">₹280</span><span class="menu-badge">Veg</span></div></div></div>
      <div class="menu-card"><div class="menu-img">🍲</div><div class="menu-info"><div class="menu-name">Signature Butter Chicken</div><div class="menu-desc">Tender chicken in rich tomato-cream sauce with aromatic spices</div><div class="menu-footer"><span class="menu-price">₹480</span><span class="menu-badge">Chef's Pick</span></div></div></div>
      <div class="menu-card"><div class="menu-img">🍝</div><div class="menu-info"><div class="menu-name">Truffle Mushroom Pasta</div><div class="menu-desc">Fresh pasta with wild mushrooms, truffle oil, and parmesan</div><div class="menu-footer"><span class="menu-price">₹420</span><span class="menu-badge">Veg</span></div></div></div>
      <div class="menu-card"><div class="menu-img">🍖</div><div class="menu-info"><div class="menu-name">Grilled Lamb Chops</div><div class="menu-desc">Tender New Zealand lamb with mint jelly and roasted vegetables</div><div class="menu-footer"><span class="menu-price">₹980</span><span class="menu-badge">Premium</span></div></div></div>
      <div class="menu-card"><div class="menu-img">🍰</div><div class="menu-info"><div class="menu-name">Belgian Chocolate Fondant</div><div class="menu-desc">Warm chocolate cake with molten center, served with vanilla ice cream</div><div class="menu-footer"><span class="menu-price">₹320</span><span class="menu-badge">Must Try</span></div></div></div>
      <div class="menu-card"><div class="menu-img">🍹</div><div class="menu-info"><div class="menu-name">Artisan Mocktails</div><div class="menu-desc">Handcrafted non-alcoholic beverages with fresh fruits and herbs</div><div class="menu-footer"><span class="menu-price">₹180</span><span class="menu-badge">Refreshing</span></div></div></div>
    </div>
  </div>
</section>

<section id="gallery">
  <div class="container">
    <div style="text-align:center;margin-bottom:3rem">
      <p class="section-tag">Gallery</p>
      <h2 class="section-title">A Visual <em>Journey</em></h2>
      <div class="divider" style="margin:1rem auto"></div>
    </div>
    <div class="gallery-grid">
      <div class="gallery-item" style="background:linear-gradient(135deg,${p.primaryColor}44,${p.accentColor}66)">🍽️</div>
      <div class="gallery-item" style="background:linear-gradient(135deg,${p.accentColor}44,${p.primaryColor}66)">🥘</div>
      <div class="gallery-item" style="background:linear-gradient(225deg,${p.primaryColor}55,${p.accentColor}44)">🍷</div>
      <div class="gallery-item" style="background:linear-gradient(135deg,#f59e0b44,${p.primaryColor}44)">🍰</div>
      <div class="gallery-item" style="background:linear-gradient(135deg,${p.accentColor}33,#f59e0b44)">🌿</div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="container">
    <div class="contact-grid">
      <div>
        <p class="section-tag">Get In Touch</p>
        <h2 class="section-title">Reserve Your <em>Table</em></h2>
        <div class="divider"></div>
        <p class="section-sub" style="margin-bottom:2rem">Book a table or contact us for private events and catering inquiries.</p>
        <div class="contact-item"><div class="contact-icon">📍</div><div class="contact-text"><p>Address</p><p>123 Gourmet Street, Food District<br>Mumbai, Maharashtra 400001</p></div></div>
        <div class="contact-item"><div class="contact-icon">📞</div><div class="contact-text"><p>Phone</p><p>+91 98765 43210</p></div></div>
        <div class="contact-item"><div class="contact-icon">⏰</div><div class="contact-text"><p>Hours</p><p>Mon–Sun: 12:00 PM – 11:00 PM</p></div></div>
        <div class="contact-item"><div class="contact-icon">✉️</div><div class="contact-text"><p>Email</p><p>hello@${p.businessName.toLowerCase().replace(/\s+/g, "")}.com</p></div></div>
      </div>
      <div>
        <div class="form-group"><label>Full Name</label><input type="text" placeholder="Your name" /></div>
        <div class="form-group"><label>Email Address</label><input type="email" placeholder="your@email.com" /></div>
        <div class="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" /></div>
        <div class="form-group"><label>Date & Time</label><input type="datetime-local" /></div>
        <div class="form-group"><label>Number of Guests</label><select><option>1-2 Guests</option><option>3-5 Guests</option><option>6-10 Guests</option><option>10+ Guests</option></select></div>
        <div class="form-group"><label>Special Requests</label><textarea placeholder="Any dietary requirements or special occasions?"></textarea></div>
        <button class="submit-btn">Reserve Table</button>
      </div>
    </div>
  </div>
</section>

<a href="https://wa.me/919876543210?text=Hi, I'd like to make a reservation at ${encodeURIComponent(p.businessName)}" class="whatsapp-btn" target="_blank">💬</a>

<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">🍽️ ${p.businessName}</div>
        <p class="footer-desc">An unforgettable dining destination where every meal tells a story. Join us for an exceptional culinary journey.</p>
      </div>
      <div>
        <p class="footer-title">Quick Links</p>
        <ul class="footer-links">
          <li><a href="#about">About Us</a></li>
          <li><a href="#menu">Our Menu</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-title">Hours</p>
        <ul class="footer-links">
          <li><a href="#">Mon – Thu: 12PM–10PM</a></li>
          <li><a href="#">Fri – Sat: 12PM–11PM</a></li>
          <li><a href="#">Sunday: 1PM–10PM</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-title">Connect</p>
        <ul class="footer-links">
          <li><a href="#">📘 Facebook</a></li>
          <li><a href="#">📸 Instagram</a></li>
          <li><a href="#">🐦 Twitter</a></li>
          <li><a href="#">⭐ Google Reviews</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} ${p.businessName}. All rights reserved. Made with ❤️</div>
  </div>
</footer>

<script>
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
</script>
</body>
</html>`;
}

function generateBusinessHTML(p: ParsedPrompt, prompt: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.businessName} – Business Solutions</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --primary: ${p.primaryColor}; --accent: ${p.accentColor}; --dark: #0f172a; --gray: #64748b; }
    body { font-family: 'Inter', system-ui, sans-serif; color: #334155; background: #fff; }
    a { text-decoration: none; color: inherit; }

    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 1.3rem; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 0.5rem; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { font-size: 0.9rem; font-weight: 500; color: #475569; transition: color 0.2s; }
    .nav-links a:hover { color: var(--primary); }
    .nav-cta { background: var(--primary); color: #fff; padding: 0.55rem 1.25rem; border-radius: 6px; font-size: 0.875rem; font-weight: 600; transition: opacity 0.2s; }
    .nav-cta:hover { opacity: 0.85; }

    .hero { min-height: 100vh; background: linear-gradient(135deg, ${p.primaryColor}0f 0%, #fff 50%, ${p.accentColor}0f 100%); display: flex; align-items: center; padding: 7rem 1.5rem 4rem; }
    .hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; }
    .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: ${p.primaryColor}15; color: var(--primary); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.4rem 1rem; border-radius: 20px; margin-bottom: 1.5rem; border: 1px solid ${p.primaryColor}30; }
    .hero h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; color: var(--dark); line-height: 1.1; margin-bottom: 1.25rem; }
    .hero h1 span { background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero p { font-size: 1.1rem; color: #64748b; line-height: 1.8; margin-bottom: 2rem; }
    .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
    .btn-primary { background: var(--primary); color: #fff; padding: 0.85rem 1.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; transition: transform 0.2s, box-shadow 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${p.primaryColor}40; }
    .btn-ghost { padding: 0.85rem 1.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; color: var(--primary); border: 2px solid ${p.primaryColor}40; transition: all 0.2s; }
    .btn-ghost:hover { background: ${p.primaryColor}10; border-color: var(--primary); }
    .trust-row { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
    .trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #64748b; }
    .hero-visual { background: linear-gradient(135deg, ${p.primaryColor}15, ${p.accentColor}20); border-radius: 20px; height: 440px; display: flex; align-items: center; justify-content: center; font-size: 6rem; border: 1px solid ${p.primaryColor}20; }

    .container { max-width: 1100px; margin: 0 auto; }
    section { padding: 5rem 1.5rem; }
    .section-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--primary); margin-bottom: 0.75rem; }
    .section-h { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800; color: var(--dark); line-height: 1.2; margin-bottom: 1rem; }
    .section-sub { font-size: 1.05rem; color: #64748b; line-height: 1.8; }

    .features { background: #f8fafc; }
    .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
    .feature-card { background: #fff; border-radius: 12px; padding: 2rem; border: 1px solid #e2e8f0; transition: all 0.3s; }
    .feature-card:hover { border-color: var(--primary); box-shadow: 0 8px 24px ${p.primaryColor}15; transform: translateY(-4px); }
    .feature-icon { width: 52px; height: 52px; background: ${p.primaryColor}15; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 1.25rem; }
    .feature-card h3 { font-size: 1.1rem; font-weight: 700; color: var(--dark); margin-bottom: 0.5rem; }
    .feature-card p { font-size: 0.9rem; color: #64748b; line-height: 1.7; }

    .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .service-item { display: flex; gap: 1.25rem; padding: 1.75rem; border-radius: 12px; border: 1px solid #e2e8f0; align-items: flex-start; transition: all 0.3s; }
    .service-item:hover { background: ${p.primaryColor}05; border-color: var(--primary); }
    .service-num { font-size: 2rem; font-weight: 800; color: ${p.primaryColor}25; font-variant-numeric: tabular-nums; }
    .service-item h3 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 0.4rem; }
    .service-item p { font-size: 0.875rem; color: #64748b; line-height: 1.7; }

    .testimonials { background: linear-gradient(135deg, var(--dark) 0%, #1e293b 100%); }
    .testimonials .section-eyebrow { color: var(--accent); }
    .testimonials .section-h { color: #fff; }
    .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .testi-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.75rem; }
    .stars { color: #f59e0b; margin-bottom: 1rem; font-size: 0.9rem; }
    .testi-text { color: #cbd5e1; font-size: 0.9rem; line-height: 1.8; margin-bottom: 1.25rem; font-style: italic; }
    .testi-author { display: flex; align-items: center; gap: 0.75rem; }
    .testi-avatar { width: 40px; height: 40px; background: ${p.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 1rem; }
    .testi-name { font-weight: 700; color: #fff; font-size: 0.9rem; }
    .testi-role { font-size: 0.8rem; color: #94a3b8; }

    .cta-section { background: linear-gradient(135deg, var(--primary), var(--accent)); text-align: center; border-radius: 20px; margin: 0 1.5rem 5rem; padding: 4rem 2rem; }
    .cta-section h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: #fff; margin-bottom: 1rem; }
    .cta-section p { color: rgba(255,255,255,0.85); font-size: 1.05rem; margin-bottom: 2rem; }
    .btn-white { background: #fff; color: var(--primary); padding: 0.9rem 2rem; border-radius: 8px; font-weight: 700; font-size: 0.95rem; display: inline-block; transition: transform 0.2s; }
    .btn-white:hover { transform: translateY(-2px); }

    .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
    .contact-info-card { background: #f8fafc; border-radius: 16px; padding: 2rem; }
    .contact-info-card h3 { font-size: 1.3rem; font-weight: 800; color: var(--dark); margin-bottom: 1.5rem; }
    .ci { display: flex; gap: 1rem; margin-bottom: 1.25rem; align-items: flex-start; }
    .ci-icon { width: 40px; height: 40px; background: ${p.primaryColor}15; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ci-text p:first-child { font-weight: 700; font-size: 0.85rem; color: var(--dark); }
    .ci-text p:last-child { font-size: 0.875rem; color: #64748b; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1.15rem; }
    label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--dark); margin-bottom: 0.4rem; letter-spacing: 0.04em; }
    input, textarea, select { width: 100%; padding: 0.7rem 0.9rem; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
    input:focus, textarea:focus, select:focus { border-color: var(--primary); }
    textarea { resize: vertical; min-height: 110px; }
    .submit-btn { width: 100%; background: var(--primary); color: #fff; padding: 0.85rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity 0.2s; }
    .submit-btn:hover { opacity: 0.85; }

    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 54px; height: 54px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.3s; }
    .whatsapp-btn:hover { transform: scale(1.1); }

    footer { background: var(--dark); color: #64748b; padding: 3rem 1.5rem 1.5rem; }
    .footer-inner { max-width: 1100px; margin: 0 auto; }
    .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
    .footer-logo { font-size: 1.3rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; }
    .footer-desc { font-size: 0.875rem; line-height: 1.8; }
    .footer-col h4 { color: #94a3b8; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1rem; }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 0.6rem; }
    .footer-col a { font-size: 0.875rem; transition: color 0.2s; }
    .footer-col a:hover { color: #fff; }
    .footer-bottom-bar { border-top: 1px solid #1e293b; padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; }

    @media (max-width: 900px) { .features-grid, .testi-grid { grid-template-columns: 1fr 1fr; } .hero-inner { grid-template-columns: 1fr; } .hero-visual { display: none; } }
    @media (max-width: 768px) { .nav-links { display: none; } .services-grid, .contact-grid { grid-template-columns: 1fr; } .footer-top { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 480px) { .features-grid, .testi-grid, .form-row { grid-template-columns: 1fr; } .footer-top { grid-template-columns: 1fr; } }
  </style>
</head>
<body>

<nav>
  <div class="logo">💼 ${p.businessName}</div>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#testimonials">Clients</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Get Started →</a>
</nav>

<section class="hero">
  <div class="hero-inner">
    <div>
      <div class="hero-badge">⚡ Trusted by 500+ Businesses</div>
      <h1>Grow Your Business<br>with <span>Smart Solutions</span></h1>
      <p>We help businesses like yours scale faster with modern strategies, cutting-edge technology, and dedicated support at every step.</p>
      <div class="hero-ctas">
        <a href="#contact" class="btn-primary">Get Free Consultation →</a>
        <a href="#services" class="btn-ghost">Our Services</a>
      </div>
      <div class="trust-row">
        <div class="trust-item">✅ No Hidden Fees</div>
        <div class="trust-item">✅ 24/7 Support</div>
        <div class="trust-item">✅ 100% Satisfaction</div>
      </div>
    </div>
    <div class="hero-visual">💼</div>
  </div>
</section>

<section id="features" class="features">
  <div class="container">
    <div style="text-align:center;margin-bottom:3rem">
      <p class="section-eyebrow">Why Choose Us</p>
      <h2 class="section-h">Everything You Need to <br>Succeed Online</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card"><div class="feature-icon">🚀</div><h3>Fast Delivery</h3><p>We work quickly without compromising quality. Your projects are delivered on time, every time.</p></div>
      <div class="feature-card"><div class="feature-icon">🎯</div><h3>Result-Driven</h3><p>Every strategy we implement is focused on driving measurable results and real business growth.</p></div>
      <div class="feature-card"><div class="feature-icon">🛡️</div><h3>Reliable Support</h3><p>Our dedicated team is always available to help you navigate challenges and seize opportunities.</p></div>
      <div class="feature-card"><div class="feature-icon">📊</div><h3>Data Analytics</h3><p>Make informed decisions with detailed insights and performance tracking dashboards.</p></div>
      <div class="feature-card"><div class="feature-icon">💡</div><h3>Innovation First</h3><p>We stay ahead of industry trends so your business always has a competitive edge.</p></div>
      <div class="feature-card"><div class="feature-icon">💰</div><h3>Cost Effective</h3><p>Premium quality services at prices that make sense for businesses of all sizes.</p></div>
    </div>
  </div>
</section>

<section id="services">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:4rem;align-items:center">
      <div>
        <p class="section-eyebrow">What We Do</p>
        <h2 class="section-h">Services Built for Your Growth</h2>
        <p class="section-sub">From strategy to execution, we provide end-to-end business solutions that deliver real impact.</p>
        <br/><a href="#contact" class="btn-primary">View All Services →</a>
      </div>
      <div class="services-grid">
        <div class="service-item"><div class="service-num">01</div><div><h3>Digital Strategy</h3><p>Custom roadmaps aligned with your business goals and market opportunities.</p></div></div>
        <div class="service-item"><div class="service-num">02</div><div><h3>Web Development</h3><p>Modern, responsive websites that convert visitors into loyal customers.</p></div></div>
        <div class="service-item"><div class="service-num">03</div><div><h3>Brand Identity</h3><p>Compelling visual identities that tell your unique story and build recognition.</p></div></div>
        <div class="service-item"><div class="service-num">04</div><div><h3>Digital Marketing</h3><p>Data-driven campaigns that reach your ideal audience and maximize ROI.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section id="testimonials" class="testimonials">
  <div class="container">
    <div style="text-align:center;margin-bottom:3rem">
      <p class="section-eyebrow">Testimonials</p>
      <h2 class="section-h">Loved by Our Clients</h2>
    </div>
    <div class="testi-grid">
      <div class="testi-card"><div class="stars">★★★★★</div><p class="testi-text">"Working with ${p.businessName} transformed our online presence. Sales increased by 300% within just 3 months!"</p><div class="testi-author"><div class="testi-avatar">R</div><div><div class="testi-name">Rahul Sharma</div><div class="testi-role">CEO, TechStart India</div></div></div></div>
      <div class="testi-card"><div class="stars">★★★★★</div><p class="testi-text">"Exceptional quality and attention to detail. Our new website has received nothing but compliments from clients."</p><div class="testi-author"><div class="testi-avatar">P</div><div><div class="testi-name">Priya Patel</div><div class="testi-role">Founder, StyleHouse</div></div></div></div>
      <div class="testi-card"><div class="stars">★★★★★</div><p class="testi-text">"Professional, responsive, and truly talented. They delivered exactly what we envisioned and more!"</p><div class="testi-author"><div class="testi-avatar">A</div><div><div class="testi-name">Arjun Mehta</div><div class="testi-role">Director, GlobalTrade</div></div></div></div>
    </div>
  </div>
</section>

<div class="cta-section">
  <h2>Ready to Transform Your Business?</h2>
  <p>Join 500+ businesses already growing with our solutions. Start your journey today.</p>
  <a href="#contact" class="btn-white">Get Started Free →</a>
</div>

<section id="contact">
  <div class="container">
    <div class="contact-grid">
      <div>
        <p class="section-eyebrow">Contact Us</p>
        <h2 class="section-h">Let's Build Something <br>Great Together</h2>
        <div class="contact-info-card" style="margin-top:2rem">
          <h3>Get in Touch</h3>
          <div class="ci"><div class="ci-icon">📍</div><div class="ci-text"><p>Address</p><p>Business Hub, MG Road<br>Bengaluru, Karnataka 560001</p></div></div>
          <div class="ci"><div class="ci-icon">📞</div><div class="ci-text"><p>Phone</p><p>+91 98765 43210</p></div></div>
          <div class="ci"><div class="ci-icon">✉️</div><div class="ci-text"><p>Email</p><p>hello@${p.businessName.toLowerCase().replace(/\s+/g, "")}.in</p></div></div>
          <div class="ci"><div class="ci-icon">⏰</div><div class="ci-text"><p>Working Hours</p><p>Mon–Sat: 9AM – 7PM</p></div></div>
        </div>
      </div>
      <div>
        <div class="form-row">
          <div class="form-group"><label>First Name</label><input type="text" placeholder="John" /></div>
          <div class="form-group"><label>Last Name</label><input type="text" placeholder="Doe" /></div>
        </div>
        <div class="form-group"><label>Email Address</label><input type="email" placeholder="john@company.com" /></div>
        <div class="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" /></div>
        <div class="form-group"><label>Service Needed</label><select><option>Web Development</option><option>Digital Marketing</option><option>Brand Identity</option><option>Business Strategy</option><option>Other</option></select></div>
        <div class="form-group"><label>Your Message</label><textarea placeholder="Tell us about your project..."></textarea></div>
        <button class="submit-btn">Send Message →</button>
      </div>
    </div>
  </div>
</section>

<a href="https://wa.me/919876543210" class="whatsapp-btn" target="_blank">💬</a>

<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-logo">💼 ${p.businessName}</div>
        <p class="footer-desc">Empowering businesses with innovative digital solutions since 2018. Let's build the future together.</p>
      </div>
      <div class="footer-col"><h4>Services</h4><ul><li><a href="#">Web Development</a></li><li><a href="#">Mobile Apps</a></li><li><a href="#">Digital Marketing</a></li><li><a href="#">SEO & Analytics</a></li></ul></div>
      <div class="footer-col"><h4>Company</h4><ul><li><a href="#">About Us</a></li><li><a href="#">Portfolio</a></li><li><a href="#">Blog</a></li><li><a href="#">Careers</a></li></ul></div>
      <div class="footer-col"><h4>Contact</h4><ul><li><a href="#">Contact Us</a></li><li><a href="#">Support</a></li><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li></ul></div>
    </div>
    <div class="footer-bottom-bar">
      <span>© ${new Date().getFullYear()} ${p.businessName}. All rights reserved.</span>
      <span>Made with ❤️ in India</span>
    </div>
  </div>
</footer>
<script>
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>
</body>
</html>`;
}

function generatePortfolioHTML(p: ParsedPrompt, prompt: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.businessName} – Creative Portfolio</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --primary: ${p.primaryColor}; --accent: ${p.accentColor}; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #0a0a0a; color: #e5e5e5; }
    a { text-decoration: none; color: inherit; }
    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.25rem 2rem; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 1.1rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { font-size: 0.875rem; color: #a3a3a3; transition: color 0.2s; }
    .nav-links a:hover { color: #fff; }
    .hire-btn { background: #fff; color: #0a0a0a; padding: 0.5rem 1.25rem; border-radius: 30px; font-size: 0.875rem; font-weight: 700; transition: opacity 0.2s; }
    .hire-btn:hover { opacity: 0.85; }

    .hero { min-height: 100vh; display: flex; align-items: center; padding: 6rem 2rem 4rem; max-width: 1100px; margin: 0 auto; }
    .hero-content { max-width: 680px; }
    .available-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: #16a34a22; border: 1px solid #16a34a55; color: #4ade80; font-size: 0.8rem; font-weight: 600; padding: 0.35rem 0.9rem; border-radius: 20px; margin-bottom: 2rem; }
    .available-dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    .hero h1 { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 800; color: #fff; line-height: 1.0; letter-spacing: -0.03em; margin-bottom: 1.5rem; }
    .hero h1 .highlight { color: var(--primary); }
    .hero p { font-size: 1.1rem; color: #a3a3a3; line-height: 1.8; margin-bottom: 2.5rem; max-width: 520px; }
    .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn-grad { background: linear-gradient(135deg, var(--primary), var(--accent)); color: #fff; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 700; font-size: 0.95rem; transition: opacity 0.2s; }
    .btn-grad:hover { opacity: 0.85; }
    .btn-outline-w { border: 1px solid #333; color: #e5e5e5; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 600; font-size: 0.95rem; transition: border-color 0.2s; }
    .btn-outline-w:hover { border-color: #666; }

    .skills-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 3rem; padding-top: 3rem; border-top: 1px solid #1e1e1e; }
    .skill-chip { background: #1a1a1a; border: 1px solid #2a2a2a; color: #a3a3a3; padding: 0.4rem 0.9rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }

    section { padding: 5rem 1.5rem; max-width: 1100px; margin: 0 auto; }
    .section-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--primary); margin-bottom: 1rem; }
    .section-h { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 1rem; }

    .work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 2.5rem; }
    .work-card { border-radius: 16px; overflow: hidden; border: 1px solid #1e1e1e; transition: border-color 0.3s, transform 0.3s; cursor: pointer; }
    .work-card:hover { border-color: var(--primary); transform: translateY(-4px); }
    .work-preview { height: 260px; display: flex; align-items: center; justify-content: center; font-size: 4rem; }
    .work-card:nth-child(1) .work-preview { background: linear-gradient(135deg, #1e1b4b, #312e81); }
    .work-card:nth-child(2) .work-preview { background: linear-gradient(135deg, #064e3b, #065f46); }
    .work-card:nth-child(3) .work-preview { background: linear-gradient(135deg, #7c2d12, #9a3412); }
    .work-card:nth-child(4) .work-preview { background: linear-gradient(135deg, #1e3a5f, #1e40af); }
    .work-meta { padding: 1.25rem; background: #111; }
    .work-tags { display: flex; gap: 0.5rem; margin-bottom: 0.6rem; }
    .work-tag { font-size: 0.7rem; font-weight: 700; color: var(--primary); background: ${p.primaryColor}20; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
    .work-meta h3 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem; }
    .work-meta p { font-size: 0.85rem; color: #737373; }

    .about-split { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
    .about-img { aspect-ratio: 1; border-radius: 20px; background: linear-gradient(135deg, ${p.primaryColor}33, ${p.accentColor}22); display: flex; align-items: center; justify-content: center; font-size: 6rem; border: 1px solid #1e1e1e; }
    .about-text p { color: #a3a3a3; line-height: 1.9; margin-bottom: 1.25rem; }
    .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
    .exp-item { background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 1.25rem; }
    .exp-num { font-size: 2rem; font-weight: 800; color: var(--primary); }
    .exp-label { font-size: 0.8rem; color: #737373; margin-top: 0.2rem; }

    .contact-box { background: #111; border: 1px solid #1e1e1e; border-radius: 20px; padding: 3rem; text-align: center; }
    .contact-box h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; color: #fff; margin-bottom: 1rem; }
    .contact-box p { color: #a3a3a3; margin-bottom: 2rem; line-height: 1.8; }
    .contact-email { font-size: 1.2rem; font-weight: 700; color: var(--primary); display: block; margin-bottom: 2rem; }
    .social-row { display: flex; gap: 1rem; justify-content: center; }
    .social-btn { background: #1a1a1a; border: 1px solid #2a2a2a; color: #a3a3a3; padding: 0.6rem 1.25rem; border-radius: 8px; font-size: 0.875rem; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
    .social-btn:hover { background: #222; color: #fff; border-color: #444; }

    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 54px; height: 54px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.3s; }
    .whatsapp-btn:hover { transform: scale(1.1); }

    footer { border-top: 1px solid #1a1a1a; padding: 2rem 1.5rem; text-align: center; color: #4b5563; font-size: 0.875rem; max-width: 1100px; margin: 0 auto; }

    @media (max-width: 768px) { .nav-links { display: none; } .work-grid, .about-split, .exp-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
<nav>
  <div class="logo">✦ ${p.businessName}</div>
  <ul class="nav-links"><li><a href="#work">Work</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul>
  <a href="#contact" class="hire-btn">Hire Me</a>
</nav>

<div class="hero">
  <div class="hero-content">
    <div class="available-badge"><span class="available-dot"></span>Available for new projects</div>
    <h1>Creative<br><span class="highlight">Designer</span><br>& Developer</h1>
    <p>I'm ${p.businessName}, a passionate designer and developer crafting beautiful digital experiences that people love to use.</p>
    <div class="hero-ctas">
      <a href="#work" class="btn-grad">View My Work</a>
      <a href="#contact" class="btn-outline-w">Let's Talk →</a>
    </div>
    <div class="skills-row">
      <span class="skill-chip">UI/UX Design</span>
      <span class="skill-chip">Web Development</span>
      <span class="skill-chip">React & Next.js</span>
      <span class="skill-chip">Brand Identity</span>
      <span class="skill-chip">Motion Design</span>
    </div>
  </div>
</div>

<section id="work">
  <p class="section-label">Selected Work</p>
  <h2 class="section-h">Projects I'm proud of</h2>
  <div class="work-grid">
    <div class="work-card"><div class="work-preview">🛒</div><div class="work-meta"><div class="work-tags"><span class="work-tag">E-commerce</span><span class="work-tag">React</span></div><h3>ShopEase Platform</h3><p>Modern e-commerce with seamless checkout experience</p></div></div>
    <div class="work-card"><div class="work-preview">📱</div><div class="work-meta"><div class="work-tags"><span class="work-tag">Mobile App</span><span class="work-tag">UI/UX</span></div><h3>FitTrack App</h3><p>Fitness tracking with beautiful data visualizations</p></div></div>
    <div class="work-card"><div class="work-preview">🏢</div><div class="work-meta"><div class="work-tags"><span class="work-tag">Corporate</span><span class="work-tag">Branding</span></div><h3>InnovateCorp Website</h3><p>Complete rebrand and digital presence overhaul</p></div></div>
    <div class="work-card"><div class="work-preview">🎨</div><div class="work-meta"><div class="work-tags"><span class="work-tag">SaaS</span><span class="work-tag">Dashboard</span></div><h3>Analytics Dashboard</h3><p>Data-rich interface for business intelligence platform</p></div></div>
  </div>
</section>

<section id="about">
  <div class="about-split">
    <div class="about-img">👤</div>
    <div class="about-text">
      <p class="section-label">About Me</p>
      <h2 class="section-h" style="font-size:2rem">Turning ideas into<br>digital reality</h2>
      <p>With over 5 years of experience in design and development, I specialize in creating user-centered digital products that are both beautiful and functional.</p>
      <p>I believe great design is invisible — it simply works. My approach combines aesthetics with data-driven decisions to create experiences that genuinely delight users.</p>
      <a href="#contact" class="btn-grad" style="display:inline-block;margin-top:1.5rem">Download Resume</a>
      <div class="exp-grid">
        <div class="exp-item"><div class="exp-num">5+</div><div class="exp-label">Years Experience</div></div>
        <div class="exp-item"><div class="exp-num">80+</div><div class="exp-label">Projects Completed</div></div>
        <div class="exp-item"><div class="exp-num">50+</div><div class="exp-label">Happy Clients</div></div>
        <div class="exp-item"><div class="exp-num">15+</div><div class="exp-label">Design Awards</div></div>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="contact-box">
    <h2>Let's Work Together</h2>
    <p>Have a project in mind? I'd love to hear about it. Let's create something amazing together.</p>
    <a class="contact-email" href="mailto:hello@${p.businessName.toLowerCase().replace(/\s+/g, "")}.design">hello@${p.businessName.toLowerCase().replace(/\s+/g, "")}.design</a>
    <div class="social-row">
      <a href="#" class="social-btn">🐦 Twitter</a>
      <a href="#" class="social-btn">💼 LinkedIn</a>
      <a href="#" class="social-btn">🎨 Dribbble</a>
      <a href="#" class="social-btn">⌨️ GitHub</a>
    </div>
  </div>
</section>

<a href="https://wa.me/919876543210" class="whatsapp-btn" target="_blank">💬</a>
<footer>© ${new Date().getFullYear()} ${p.businessName}. Designed & built with ❤️</footer>
<script>
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' }); });
  });
</script>
</body>
</html>`;
}

function generateShopHTML(p: ParsedPrompt, prompt: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.businessName} – Online Store</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --primary: ${p.primaryColor}; --accent: ${p.accentColor}; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #fff; color: #1a1a1a; }
    a { text-decoration: none; color: inherit; }
    .topbar { background: var(--primary); color: #fff; text-align: center; padding: 0.5rem; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; border-bottom: 1px solid #f1f1f1; }
    .logo { font-size: 1.4rem; font-weight: 800; color: #1a1a1a; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { font-size: 0.875rem; color: #555; transition: color 0.2s; }
    .nav-links a:hover { color: var(--primary); }
    .nav-right { display: flex; align-items: center; gap: 1rem; }
    .nav-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: background 0.2s; }
    .nav-icon:hover { background: #f5f5f5; }
    .cart-btn { background: var(--primary); color: #fff; padding: 0.5rem 1.1rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 0.4rem; }
    .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
    .hero-left { padding: 5rem 3rem; display: flex; flex-direction: column; justify-content: center; background: #fafafa; }
    .sale-badge { display: inline-block; background: var(--accent); color: #fff; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 20px; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.1em; }
    .hero-left h1 { font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 800; color: #0a0a0a; line-height: 1.1; margin-bottom: 1rem; }
    .hero-left p { font-size: 1.05rem; color: #666; line-height: 1.8; margin-bottom: 2rem; }
    .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn-primary { background: var(--primary); color: #fff; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 700; font-size: 0.95rem; transition: opacity 0.2s; }
    .btn-primary:hover { opacity: 0.85; }
    .btn-outline { border: 2px solid #e5e5e5; color: #333; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 600; font-size: 0.95rem; transition: border-color 0.2s; }
    .btn-outline:hover { border-color: var(--primary); color: var(--primary); }
    .hero-right { background: linear-gradient(135deg, ${p.primaryColor}20, ${p.accentColor}30); display: flex; align-items: center; justify-content: center; font-size: 8rem; }
    .categories { padding: 3rem 1.5rem; background: #0a0a0a; }
    .categories h2 { text-align: center; color: #fff; font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem; letter-spacing: 0.05em; }
    .cat-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .cat-pill { background: #1a1a1a; color: #ccc; padding: 0.6rem 1.25rem; border-radius: 30px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid #2a2a2a; transition: all 0.2s; }
    .cat-pill:hover, .cat-pill.active { background: var(--primary); color: #fff; border-color: var(--primary); }
    .products { padding: 4rem 1.5rem; max-width: 1200px; margin: 0 auto; }
    .products-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .products-header h2 { font-size: 1.8rem; font-weight: 800; }
    .filter-row { display: flex; gap: 0.75rem; }
    .filter-btn { padding: 0.45rem 1rem; border-radius: 30px; font-size: 0.8rem; font-weight: 600; border: 1px solid #e5e5e5; cursor: pointer; transition: all 0.2s; background: #fff; }
    .filter-btn.active, .filter-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
    .product-card { border: 1px solid #f0f0f0; border-radius: 16px; overflow: hidden; transition: all 0.3s; cursor: pointer; }
    .product-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.1); transform: translateY(-4px); }
    .product-img { height: 220px; display: flex; align-items: center; justify-content: center; font-size: 4rem; position: relative; }
    .product-img:nth-of-type(1) { background: linear-gradient(135deg, #fef3c7, #fde68a); }
    .badge-new { position: absolute; top: 0.75rem; left: 0.75rem; background: #ef4444; color: #fff; font-size: 0.65rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase; }
    .badge-sale { position: absolute; top: 0.75rem; left: 0.75rem; background: #16a34a; color: #fff; font-size: 0.65rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase; }
    .wishlist-btn { position: absolute; top: 0.75rem; right: 0.75rem; width: 32px; height: 32px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .product-info { padding: 1.25rem; }
    .product-category { font-size: 0.72rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.3rem; }
    .product-name { font-size: 1rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.4rem; }
    .product-rating { display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.75rem; }
    .stars { color: #f59e0b; font-size: 0.8rem; }
    .rating-count { font-size: 0.75rem; color: #888; }
    .product-footer { display: flex; justify-content: space-between; align-items: center; }
    .price-group { display: flex; align-items: baseline; gap: 0.5rem; }
    .price { font-size: 1.2rem; font-weight: 800; color: #1a1a1a; }
    .price-old { font-size: 0.85rem; color: #999; text-decoration: line-through; }
    .add-btn { background: var(--primary); color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; font-family: inherit; }
    .add-btn:hover { opacity: 0.85; }
    .benefits { background: #f9fafb; padding: 3rem 1.5rem; }
    .benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; max-width: 1000px; margin: 0 auto; }
    .benefit { text-align: center; padding: 1.5rem 1rem; }
    .benefit-icon { font-size: 2rem; margin-bottom: 0.75rem; }
    .benefit h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem; }
    .benefit p { font-size: 0.8rem; color: #666; }
    .newsletter { background: linear-gradient(135deg, var(--primary), var(--accent)); padding: 4rem 1.5rem; text-align: center; }
    .newsletter h2 { font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; }
    .newsletter p { color: rgba(255,255,255,0.85); margin-bottom: 2rem; }
    .email-form { display: flex; gap: 0.75rem; max-width: 480px; margin: 0 auto; }
    .email-form input { flex: 1; padding: 0.8rem 1.25rem; border: none; border-radius: 8px; font-size: 0.95rem; outline: none; }
    .email-form button { background: #0a0a0a; color: #fff; padding: 0.8rem 1.5rem; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; white-space: nowrap; font-family: inherit; }
    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 54px; height: 54px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.3s; }
    .whatsapp-btn:hover { transform: scale(1.1); }
    footer { background: #0a0a0a; color: #64748b; padding: 3rem 1.5rem 1.5rem; }
    .footer-inner { max-width: 1100px; margin: 0 auto; }
    .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
    .footer-brand { color: #fff; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.75rem; }
    .footer-col h4 { color: #94a3b8; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 0.6rem; font-size: 0.875rem; }
    .footer-col a:hover { color: #fff; }
    .footer-bottom { border-top: 1px solid #1e293b; padding-top: 1.5rem; text-align: center; font-size: 0.8rem; }
    @media (max-width: 768px) { .hero { grid-template-columns: 1fr; } .hero-right { height: 250px; } .nav-links { display: none; } .benefits-grid { grid-template-columns: 1fr 1fr; } .footer-top { grid-template-columns: 1fr 1fr; } .email-form { flex-direction: column; } }
    @media (max-width: 480px) { .benefits-grid, .footer-top { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
<div class="topbar">🎉 Free Shipping on Orders Above ₹999 | Use Code: WELCOME10 for 10% Off</div>
<nav>
  <div class="logo">🛍️ ${p.businessName}</div>
  <ul class="nav-links"><li><a href="#">Home</a></li><li><a href="#">Shop</a></li><li><a href="#">Categories</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul>
  <div class="nav-right">
    <div class="nav-icon">🔍</div>
    <div class="nav-icon">♡</div>
    <div class="cart-btn">🛒 Cart (0)</div>
  </div>
</nav>

<div class="hero">
  <div class="hero-left">
    <span class="sale-badge">🔥 Summer Sale – Up to 50% Off</span>
    <h1>Discover Premium Products You'll Love</h1>
    <p>Shop from thousands of carefully curated products with fast delivery and easy returns.</p>
    <div class="hero-btns">
      <a href="#products" class="btn-primary">Shop Now →</a>
      <a href="#" class="btn-outline">View Collections</a>
    </div>
  </div>
  <div class="hero-right">🛍️</div>
</div>

<div class="categories">
  <h2>BROWSE BY CATEGORY</h2>
  <div class="cat-row">
    <span class="cat-pill active">All Products</span>
    <span class="cat-pill">👗 Fashion</span>
    <span class="cat-pill">📱 Electronics</span>
    <span class="cat-pill">🏠 Home Decor</span>
    <span class="cat-pill">💄 Beauty</span>
    <span class="cat-pill">📚 Books</span>
    <span class="cat-pill">⚽ Sports</span>
  </div>
</div>

<div id="products" class="products">
  <div class="products-header">
    <h2>Featured Products</h2>
    <div class="filter-row">
      <span class="filter-btn active">Popular</span>
      <span class="filter-btn">New</span>
      <span class="filter-btn">Price ↑</span>
    </div>
  </div>
  <div class="product-grid">
    <div class="product-card"><div class="product-img" style="background:linear-gradient(135deg,#fef3c7,#fde68a)"><span class="badge-new">New</span><span class="wishlist-btn">♡</span>👟</div><div class="product-info"><div class="product-category">Footwear</div><div class="product-name">Premium Running Shoes</div><div class="product-rating"><span class="stars">★★★★★</span><span class="rating-count">(128)</span></div><div class="product-footer"><div class="price-group"><span class="price">₹2,499</span><span class="price-old">₹3,999</span></div><button class="add-btn">Add to Cart</button></div></div></div>
    <div class="product-card"><div class="product-img" style="background:linear-gradient(135deg,#e0e7ff,#c7d2fe)"><span class="badge-sale">-30%</span><span class="wishlist-btn">♡</span>📱</div><div class="product-info"><div class="product-category">Electronics</div><div class="product-name">Wireless Earbuds Pro</div><div class="product-rating"><span class="stars">★★★★☆</span><span class="rating-count">(89)</span></div><div class="product-footer"><div class="price-group"><span class="price">₹1,799</span><span class="price-old">₹2,599</span></div><button class="add-btn">Add to Cart</button></div></div></div>
    <div class="product-card"><div class="product-img" style="background:linear-gradient(135deg,#dcfce7,#bbf7d0)"><span class="wishlist-btn">♡</span>👜</div><div class="product-info"><div class="product-category">Fashion</div><div class="product-name">Leather Tote Bag</div><div class="product-rating"><span class="stars">★★★★★</span><span class="rating-count">(204)</span></div><div class="product-footer"><div class="price-group"><span class="price">₹3,299</span></div><button class="add-btn">Add to Cart</button></div></div></div>
    <div class="product-card"><div class="product-img" style="background:linear-gradient(135deg,#fce7f3,#fbcfe8)"><span class="badge-sale">-20%</span><span class="wishlist-btn">♡</span>💄</div><div class="product-info"><div class="product-category">Beauty</div><div class="product-name">Skincare Essentials Kit</div><div class="product-rating"><span class="stars">★★★★★</span><span class="rating-count">(312)</span></div><div class="product-footer"><div class="price-group"><span class="price">₹1,199</span><span class="price-old">₹1,499</span></div><button class="add-btn">Add to Cart</button></div></div></div>
    <div class="product-card"><div class="product-img" style="background:linear-gradient(135deg,#fff7ed,#fed7aa)"><span class="badge-new">New</span><span class="wishlist-btn">♡</span>⌚</div><div class="product-info"><div class="product-category">Electronics</div><div class="product-name">Smart Watch Series 5</div><div class="product-rating"><span class="stars">★★★★☆</span><span class="rating-count">(67)</span></div><div class="product-footer"><div class="price-group"><span class="price">₹4,999</span><span class="price-old">₹6,499</span></div><button class="add-btn">Add to Cart</button></div></div></div>
    <div class="product-card"><div class="product-img" style="background:linear-gradient(135deg,#ede9fe,#ddd6fe)"><span class="wishlist-btn">♡</span>🏠</div><div class="product-info"><div class="product-category">Home Decor</div><div class="product-name">Minimalist Lamp Set</div><div class="product-rating"><span class="stars">★★★★★</span><span class="rating-count">(45)</span></div><div class="product-footer"><div class="price-group"><span class="price">₹2,799</span></div><button class="add-btn">Add to Cart</button></div></div></div>
  </div>
</div>

<div class="benefits"><div class="benefits-grid"><div class="benefit"><div class="benefit-icon">🚚</div><h3>Free Shipping</h3><p>On all orders above ₹999</p></div><div class="benefit"><div class="benefit-icon">↩️</div><h3>Easy Returns</h3><p>30-day hassle-free returns</p></div><div class="benefit"><div class="benefit-icon">🔒</div><h3>Secure Payment</h3><p>100% safe transactions</p></div><div class="benefit"><div class="benefit-icon">💬</div><h3>24/7 Support</h3><p>Chat with us anytime</p></div></div></div>

<div class="newsletter"><h2>Stay in the Loop</h2><p>Subscribe for exclusive deals, new arrivals, and style inspiration.</p><div class="email-form"><input type="email" placeholder="Enter your email address" /><button>Subscribe →</button></div></div>

<a href="https://wa.me/919876543210" class="whatsapp-btn" target="_blank">💬</a>

<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div><div class="footer-brand">🛍️ ${p.businessName}</div><p style="font-size:0.875rem;line-height:1.8">Your one-stop destination for premium products at unbeatable prices. Trusted by thousands.</p></div>
      <div class="footer-col"><h4>Shop</h4><ul><li><a href="#">New Arrivals</a></li><li><a href="#">Best Sellers</a></li><li><a href="#">Sale</a></li><li><a href="#">Collections</a></li></ul></div>
      <div class="footer-col"><h4>Help</h4><ul><li><a href="#">Track Order</a></li><li><a href="#">Returns</a></li><li><a href="#">Shipping Policy</a></li><li><a href="#">FAQ</a></li></ul></div>
      <div class="footer-col"><h4>Company</h4><ul><li><a href="#">About Us</a></li><li><a href="#">Blog</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li></ul></div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} ${p.businessName}. All rights reserved.</div>
  </div>
</footer>
<script>
  document.querySelectorAll('.cat-pill, .filter-btn').forEach(el => {
    el.addEventListener('click', () => {
      el.closest('.cat-row, .filter-row')?.querySelectorAll(el.tagName.toLowerCase()).forEach(e => e.classList.remove('active'));
      el.classList.add('active');
    });
  });
</script>
</body>
</html>`;
}

function generateBlogHTML(p: ParsedPrompt, prompt: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.businessName} – Blog & Stories</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --primary: ${p.primaryColor}; --accent: ${p.accentColor}; }
    body { font-family: 'Georgia', serif; background: #fff; color: #1a1a1a; }
    a { text-decoration: none; color: inherit; }
    nav { border-bottom: 1px solid #e5e5e5; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 1.5rem; font-weight: 700; font-style: italic; color: var(--primary); }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { font-size: 0.875rem; font-family: 'Inter', sans-serif; font-weight: 500; color: #555; }
    .nav-links a:hover { color: var(--primary); }
    .subscribe-btn { background: var(--primary); color: #fff; padding: 0.5rem 1.25rem; border-radius: 4px; font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600; }
    .hero-post { display: grid; grid-template-columns: 1fr 1fr; min-height: 500px; border-bottom: 1px solid #e5e5e5; }
    .hero-post-img { background: linear-gradient(135deg, ${p.primaryColor}33, ${p.accentColor}44); display: flex; align-items: center; justify-content: center; font-size: 6rem; }
    .hero-post-content { padding: 3.5rem; display: flex; flex-direction: column; justify-content: center; }
    .post-category { font-size: 0.75rem; font-weight: 700; font-family: 'Inter', sans-serif; letter-spacing: 0.15em; text-transform: uppercase; color: var(--primary); margin-bottom: 1rem; }
    .hero-post h1 { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; line-height: 1.25; margin-bottom: 1.25rem; }
    .hero-post p { font-size: 1rem; color: #555; line-height: 1.9; margin-bottom: 1.5rem; }
    .post-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.8rem; font-family: 'Inter', sans-serif; color: #888; }
    .author-avatar { width: 32px; height: 32px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 0.85rem; }
    .read-more { color: var(--primary); font-weight: 600; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1rem; }
    .main-layout { display: grid; grid-template-columns: 1fr 360px; gap: 0; max-width: 1200px; margin: 0 auto; }
    .posts-section { padding: 3rem 2rem 3rem 0; border-right: 1px solid #e5e5e5; }
    .posts-section h2 { font-size: 1rem; font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; border-bottom: 2px solid #1a1a1a; padding-bottom: 0.5rem; margin-bottom: 2rem; }
    .post-card { display: grid; grid-template-columns: 180px 1fr; gap: 1.5rem; padding: 1.75rem 0; border-bottom: 1px solid #f0f0f0; }
    .post-thumb { border-radius: 8px; background: linear-gradient(135deg, ${p.primaryColor}22, ${p.accentColor}33); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; aspect-ratio: 3/2; }
    .post-card-content h3 { font-size: 1.2rem; font-weight: 700; line-height: 1.35; margin-bottom: 0.5rem; }
    .post-card-content h3 a:hover { color: var(--primary); }
    .post-card-content p { font-size: 0.875rem; color: #666; line-height: 1.7; margin-bottom: 0.75rem; font-family: 'Inter', sans-serif; }
    .post-footer { display: flex; align-items: center; gap: 1rem; }
    .sidebar { padding: 3rem 0 3rem 2.5rem; }
    .sidebar-widget { margin-bottom: 2.5rem; }
    .widget-title { font-size: 0.75rem; font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 0.5rem; margin-bottom: 1.25rem; }
    .search-box { display: flex; border: 1px solid #e5e5e5; border-radius: 4px; overflow: hidden; }
    .search-box input { flex: 1; padding: 0.6rem 0.9rem; border: none; outline: none; font-family: 'Inter', sans-serif; font-size: 0.875rem; }
    .search-box button { background: var(--primary); color: #fff; border: none; padding: 0.6rem 1rem; cursor: pointer; font-family: inherit; }
    .topic-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .topic-pill { border: 1px solid #e5e5e5; padding: 0.3rem 0.75rem; border-radius: 30px; font-size: 0.78rem; font-family: 'Inter', sans-serif; font-weight: 500; color: #555; cursor: pointer; transition: all 0.2s; }
    .topic-pill:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
    .pop-post { display: flex; gap: 1rem; margin-bottom: 1.25rem; align-items: flex-start; }
    .pop-num { font-size: 1.5rem; font-weight: 700; color: #e5e5e5; line-height: 1; }
    .pop-info h4 { font-size: 0.9rem; font-weight: 600; line-height: 1.4; margin-bottom: 0.3rem; }
    .pop-info span { font-size: 0.75rem; font-family: 'Inter', sans-serif; color: #888; }
    .newsletter-widget { background: #f9f9f9; padding: 1.5rem; border-radius: 8px; text-align: center; }
    .newsletter-widget h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
    .newsletter-widget p { font-size: 0.85rem; color: #666; margin-bottom: 1rem; font-family: 'Inter', sans-serif; line-height: 1.6; }
    .newsletter-widget input { width: 100%; padding: 0.6rem 0.9rem; border: 1px solid #e5e5e5; border-radius: 4px; font-family: 'Inter', sans-serif; margin-bottom: 0.5rem; outline: none; font-size: 0.875rem; }
    .newsletter-widget button { width: 100%; background: var(--primary); color: #fff; border: none; padding: 0.7rem; border-radius: 4px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .whatsapp-btn { position: fixed; bottom: 2rem; right: 2rem; width: 54px; height: 54px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.3s; }
    .whatsapp-btn:hover { transform: scale(1.1); }
    footer { background: #1a1a1a; color: #94a3b8; padding: 2rem; text-align: center; font-family: 'Inter', sans-serif; font-size: 0.875rem; }
    @media (max-width: 768px) { .hero-post, .main-layout { grid-template-columns: 1fr; } .hero-post-img { height: 240px; } .posts-section { border-right: none; padding: 2rem 1rem; } .sidebar { padding: 2rem 1rem; border-top: 1px solid #e5e5e5; } .post-card { grid-template-columns: 1fr; } .post-thumb { height: 180px; } .nav-links { display: none; } }
  </style>
</head>
<body>
<nav>
  <div class="logo">${p.businessName}</div>
  <ul class="nav-links"><li><a href="#">Home</a></li><li><a href="#">Technology</a></li><li><a href="#">Lifestyle</a></li><li><a href="#">Travel</a></li><li><a href="#">About</a></li></ul>
  <a href="#" class="subscribe-btn">Subscribe</a>
</nav>

<div class="hero-post">
  <div class="hero-post-img">📰</div>
  <div class="hero-post-content">
    <p class="post-category">✦ Featured Story</p>
    <h1>The Future of Digital Experiences: What 2025 Holds for Creators</h1>
    <p>As technology continues to evolve at breakneck speed, creators and innovators are finding new ways to connect with audiences and tell compelling stories...</p>
    <div class="post-meta">
      <div class="author-avatar">A</div>
      <span>Aisha Patel</span>
      <span>·</span>
      <span>June 10, 2025</span>
      <span>·</span>
      <span>8 min read</span>
    </div>
    <a href="#" class="read-more">Read Full Story →</a>
  </div>
</div>

<div style="max-width:1200px;margin:0 auto;padding:0 1.5rem">
  <div class="main-layout">
    <div class="posts-section">
      <h2>Latest Articles</h2>

      <div class="post-card">
        <div class="post-thumb">🤖</div>
        <div class="post-card-content">
          <p class="post-category">Technology</p>
          <h3><a href="#">How AI is Revolutionizing Content Creation in 2025</a></h3>
          <p>Artificial intelligence tools are transforming how writers, designers, and marketers approach their craft. Here's what you need to know...</p>
          <div class="post-footer">
            <div class="post-meta"><div class="author-avatar">R</div><span>Rohit Kumar</span><span>·</span><span>5 min read</span></div>
          </div>
        </div>
      </div>

      <div class="post-card">
        <div class="post-thumb">🌏</div>
        <div class="post-card-content">
          <p class="post-category">Travel</p>
          <h3><a href="#">Hidden Gems of India: 10 Destinations You Must Visit</a></h3>
          <p>Beyond the famous landmarks lie breathtaking places that most tourists never discover. Our travel correspondent explores India's best-kept secrets...</p>
          <div class="post-footer">
            <div class="post-meta"><div class="author-avatar">S</div><span>Sneha Verma</span><span>·</span><span>7 min read</span></div>
          </div>
        </div>
      </div>

      <div class="post-card">
        <div class="post-thumb">💰</div>
        <div class="post-card-content">
          <p class="post-category">Finance</p>
          <h3><a href="#">Smart Money Moves: Building Wealth in Your 30s</a></h3>
          <p>Financial experts share their top strategies for growing your wealth during the crucial decade when compound interest really starts to matter...</p>
          <div class="post-footer">
            <div class="post-meta"><div class="author-avatar">M</div><span>Manish Gupta</span><span>·</span><span>6 min read</span></div>
          </div>
        </div>
      </div>

      <div class="post-card">
        <div class="post-thumb">🎨</div>
        <div class="post-card-content">
          <p class="post-category">Design</p>
          <h3><a href="#">The Psychology of Color in Modern Brand Design</a></h3>
          <p>Colors communicate more than aesthetics — they shape perception, emotion, and buying behavior. Here's what every designer should understand...</p>
          <div class="post-footer">
            <div class="post-meta"><div class="author-avatar">P</div><span>Priya Nair</span><span>·</span><span>4 min read</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-widget">
        <p class="widget-title">Search</p>
        <div class="search-box"><input type="text" placeholder="Search articles..." /><button>→</button></div>
      </div>

      <div class="sidebar-widget">
        <p class="widget-title">Popular Topics</p>
        <div class="topic-pills">
          <span class="topic-pill">Technology</span><span class="topic-pill">Design</span><span class="topic-pill">Finance</span><span class="topic-pill">Travel</span><span class="topic-pill">Health</span><span class="topic-pill">Career</span><span class="topic-pill">Lifestyle</span><span class="topic-pill">AI & ML</span>
        </div>
      </div>

      <div class="sidebar-widget">
        <p class="widget-title">Most Read</p>
        <div class="pop-post"><span class="pop-num">01</span><div class="pop-info"><h4>10 Side Hustles That Actually Work in 2025</h4><span>3.2k reads</span></div></div>
        <div class="pop-post"><span class="pop-num">02</span><div class="pop-info"><h4>The Complete Guide to Freelancing in India</h4><span>2.8k reads</span></div></div>
        <div class="pop-post"><span class="pop-num">03</span><div class="pop-info"><h4>Mindfulness Practices for Busy Professionals</h4><span>2.1k reads</span></div></div>
      </div>

      <div class="sidebar-widget">
        <div class="newsletter-widget">
          <h3>Get the Newsletter</h3>
          <p>Join 12,000+ readers getting our best stories every week.</p>
          <input type="email" placeholder="Your email address" />
          <button>Subscribe Free →</button>
        </div>
      </div>
    </div>
  </div>
</div>

<a href="https://wa.me/919876543210" class="whatsapp-btn" target="_blank">💬</a>
<footer>© ${new Date().getFullYear()} ${p.businessName}. All Rights Reserved. · Privacy Policy · Terms</footer>
</body>
</html>`;
}

export function generateWebsite(prompt: string): { html: string; template: Template } {
  const parsed = parsePrompt(prompt);
  let html = "";
  switch (parsed.template) {
    case "restaurant": html = generateRestaurantHTML(parsed, prompt); break;
    case "portfolio": html = generatePortfolioHTML(parsed, prompt); break;
    case "shop": html = generateShopHTML(parsed, prompt); break;
    case "blog":
    case "news": html = generateBlogHTML(parsed, prompt); break;
    default: html = generateBusinessHTML(parsed, prompt);
  }
  return { html, template: parsed.template };
}
