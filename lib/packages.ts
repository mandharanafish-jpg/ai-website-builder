import { Package } from "@/types";

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter Website",
    price: 400,
    pages: "1 Page",
    features: [
      "1 Page Website",
      "Mobile Responsive Design",
      "WhatsApp Button",
      "Basic Contact Section",
      "Google Maps Integration",
      "Social Media Links",
    ],
    delivery: "1–2 Business Days",
  },
  {
    id: "standard",
    name: "Standard Website",
    price: 600,
    pages: "Up to 3 Pages",
    features: [
      "Up to 3 Pages (Home, About, Contact)",
      "Mobile Responsive Design",
      "Basic SEO Optimization",
      "WhatsApp Button",
      "Contact Form",
      "Google Maps Integration",
      "Social Media Links",
    ],
    delivery: "2–3 Business Days",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Website",
    price: 800,
    pages: "Up to 5 Pages",
    features: [
      "Up to 5 Pages",
      "Business Information & About Section",
      "Photo Gallery Section",
      "Contact Form with Email",
      "Basic SEO Optimization",
      "WhatsApp Button",
      "Google Analytics Setup",
      "1 Month Free Support",
    ],
    delivery: "3–5 Business Days",
  },
];
