export type Template =
  | "business"
  | "portfolio"
  | "blog"
  | "restaurant"
  | "news"
  | "shop";

export interface Project {
  id: string;
  name: string;
  prompt: string;
  template: Template;
  html: string;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  pages: string;
  features: string[];
  delivery: string;
  popular?: boolean;
}

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  requirements: string;
  packageId: string;
  colorPreference: string;
  referenceWebsite: string;
}
