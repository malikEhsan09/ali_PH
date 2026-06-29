// ============================================================
// ALI Paint & Hardware — TypeScript Type Definitions
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  brandSlug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  images: string[];
  finish: string;
  coverage: string;
  dryTime: string;
  coats: string;
  color: string;
  size: string;
  specifications: ProductSpecification[];
  features: string[];
  usageInstructions: string[];
  isFeatured: boolean;
  isPopular: boolean;
  isNew: boolean;
  tags: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  image: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'residential' | 'commercial' | 'industrial';
  description: string;
  images: string[];
  client: string;
  location: string;
  completedDate: string;
  productsUsed: string[];
  beforeImage: string;
  afterImage: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingInfo: ShippingInfo;
  createdAt: string;
  couponCode?: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface Achievement {
  id: string;
  number: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
