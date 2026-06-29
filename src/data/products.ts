import { Product } from '@/types';
import { getProductImage } from '@/data/images';

const makeProduct = (
  id: string, name: string, slug: string, category: string, categorySlug: string,
  brand: string, brandSlug: string, price: number, originalPrice: number,
  finish: string, coverage: string, color: string, size: string,
  imageIndex: number,
  opts: Partial<Product> = {}
): Product => ({
  id, name, slug, category, categorySlug, brand, brandSlug, price, originalPrice,
  discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
  rating: 4.5, reviewCount: 24, stock: 50, stockStatus: 'in-stock',
  images: [getProductImage(imageIndex)],
  finish, coverage, color, size,
  description: `Premium quality ${name} by ${brand}. Ideal for ${category.toLowerCase()} applications.`,
  shortDescription: `${brand} ${name} - ${finish} finish`,
  dryTime: '2-4 hours', coats: '2-3 coats recommended',
  specifications: [
    { label: 'Finish', value: finish },
    { label: 'Coverage', value: coverage },
    { label: 'Dry Time', value: '2-4 hours' },
    { label: 'Recoat Time', value: '4-6 hours' },
    { label: 'Size', value: size },
    { label: 'Base', value: 'Water Based' },
  ],
  features: ['Low VOC', 'Washable', 'Anti-bacterial', 'Excellent coverage'],
  usageInstructions: ['Clean surface thoroughly', 'Apply primer if needed', 'Stir paint well before use', 'Apply with roller or brush', 'Allow 4 hours between coats'],
  isFeatured: false, isPopular: false, isNew: false, tags: [category, brand, finish],
  ...opts,
});

export const products: Product[] = [
  makeProduct('p-1', 'Royal Silk Emulsion', 'royal-silk-emulsion', 'Interior Paints', 'interior-paints', 'Gobis Paints', 'gobis-paints', 4500, 5200, 'Silk', '130-150 sq ft/L', 'Off White', '4 Liters', 0, { rating: 4.8, reviewCount: 56, isFeatured: true, isPopular: true }),
  makeProduct('p-2', 'Weather Shield Exterior', 'weather-shield-exterior', 'Exterior Paints', 'exterior-paints', 'Gobis Paints', 'gobis-paints', 5800, 6500, 'Matt', '100-120 sq ft/L', 'Ivory', '4 Liters', 1, { rating: 4.7, reviewCount: 42, isFeatured: true }),
  makeProduct('p-3', 'Premium Matt Finish', 'premium-matt-finish', 'Interior Paints', 'interior-paints', 'ALI Premium', 'ali-premium', 3800, 4200, 'Matt', '140-160 sq ft/L', 'Pearl White', '4 Liters', 2, { rating: 4.6, reviewCount: 38, isPopular: true }),
  makeProduct('p-4', 'Diamond Gloss Enamel', 'diamond-gloss-enamel', 'Enamels', 'enamels', 'Gobis Paints', 'gobis-paints', 2800, 3200, 'High Gloss', '120-140 sq ft/L', 'White', '1 Liter', 3, { rating: 4.5, reviewCount: 31 }),
  makeProduct('p-5', 'Aqua Shield Waterproof', 'aqua-shield-waterproof', 'Waterproofing', 'waterproofing', 'AquaGuard', 'aquaguard', 6200, 7000, 'Protective', '80-100 sq ft/L', 'Transparent', '5 Liters', 4, { rating: 4.9, reviewCount: 48, isFeatured: true, isNew: true }),
  makeProduct('p-6', 'Classic Wood Polish', 'classic-wood-polish', 'Wood Finishes', 'wood-finishes', 'WoodMaster', 'woodmaster', 3200, 3800, 'Satin', '100-120 sq ft/L', 'Walnut', '1 Liter', 5, { rating: 4.4, reviewCount: 22 }),
  makeProduct('p-7', 'Italian Texture Coat', 'italian-texture-coat', 'Textures', 'textures', 'ALI Premium', 'ali-premium', 7500, 8500, 'Textured', '40-60 sq ft/L', 'Sand Gold', '5 Liters', 6, { rating: 4.7, reviewCount: 35, isFeatured: true, isNew: true }),
  makeProduct('p-8', 'Universal Primer', 'universal-primer', 'Primers', 'primers', 'Shield Coat', 'shield-coat', 2200, 2600, 'Matt', '140-160 sq ft/L', 'White', '4 Liters', 7, { rating: 4.3, reviewCount: 28, isPopular: true }),
  makeProduct('p-9', 'Velvet Touch Interior', 'velvet-touch-interior', 'Interior Paints', 'interior-paints', 'Gobis Paints', 'gobis-paints', 5200, 5800, 'Velvet', '120-140 sq ft/L', 'Cream', '4 Liters', 8, { rating: 4.6, reviewCount: 33, isPopular: true }),
  makeProduct('p-10', 'Roof Guard Waterproof', 'roof-guard-waterproof', 'Waterproofing', 'waterproofing', 'AquaGuard', 'aquaguard', 8500, 9500, 'Protective', '60-80 sq ft/L', 'Grey', '10 Liters', 9, { rating: 4.8, reviewCount: 44 }),
  makeProduct('p-11', 'Satin Glow Interior', 'satin-glow-interior', 'Interior Paints', 'interior-paints', 'ALI Premium', 'ali-premium', 4200, 4800, 'Satin', '130-150 sq ft/L', 'Magnolia', '4 Liters', 10, { rating: 4.5, reviewCount: 27 }),
  makeProduct('p-12', 'Heat Shield Exterior', 'heat-shield-exterior', 'Exterior Paints', 'exterior-paints', 'Shield Coat', 'shield-coat', 6800, 7500, 'Matt', '90-110 sq ft/L', 'Cool White', '4 Liters', 11, { rating: 4.6, reviewCount: 19, isNew: true }),
  makeProduct('p-13', 'Rapid Spray Paint', 'rapid-spray-paint', 'Spray Paints', 'spray-paints', 'ColorTech', 'colortech', 850, 1000, 'Gloss', '30-40 sq ft/can', 'Multi', '400ml', 12, { rating: 4.2, reviewCount: 15 }),
  makeProduct('p-14', 'Teak Wood Stain', 'teak-wood-stain', 'Wood Finishes', 'wood-finishes', 'WoodMaster', 'woodmaster', 2800, 3200, 'Natural', '80-100 sq ft/L', 'Teak', '1 Liter', 13, { rating: 4.5, reviewCount: 20 }),
  makeProduct('p-15', 'Sand Stone Texture', 'sand-stone-texture', 'Textures', 'textures', 'Gobis Paints', 'gobis-paints', 6500, 7200, 'Textured', '35-50 sq ft/L', 'Natural Stone', '5 Liters', 14, { rating: 4.4, reviewCount: 18, isPopular: true }),
  makeProduct('p-16', 'Anti-Rust Metal Primer', 'anti-rust-metal-primer', 'Primers', 'primers', 'Shield Coat', 'shield-coat', 1800, 2200, 'Matt', '120-140 sq ft/L', 'Red Oxide', '1 Liter', 15, { rating: 4.3, reviewCount: 25 }),
  makeProduct('p-17', 'Luxury Emulsion Plus', 'luxury-emulsion-plus', 'Interior Paints', 'interior-paints', 'Gobis Paints', 'gobis-paints', 6200, 7000, 'Silk', '140-160 sq ft/L', 'Arctic White', '4 Liters', 16, { rating: 4.9, reviewCount: 62, isFeatured: true, isPopular: true }),
  makeProduct('p-18', 'Elastomeric Exterior', 'elastomeric-exterior', 'Exterior Paints', 'exterior-paints', 'ALI Premium', 'ali-premium', 7200, 8000, 'Flexible Matt', '80-100 sq ft/L', 'Sandstone', '4 Liters', 17, { rating: 4.7, reviewCount: 30 }),
  makeProduct('p-19', 'Marine Epoxy Coat', 'marine-epoxy-coat', 'Waterproofing', 'waterproofing', 'AquaGuard', 'aquaguard', 9800, 11000, 'Glossy', '50-70 sq ft/L', 'Clear', '5 Liters', 18, { rating: 4.8, reviewCount: 15, isNew: true }),
  makeProduct('p-20', 'Metallic Accent Paint', 'metallic-accent-paint', 'Textures', 'textures', 'ColorTech', 'colortech', 5500, 6200, 'Metallic', '60-80 sq ft/L', 'Champagne Gold', '1 Liter', 19, { rating: 4.6, reviewCount: 23, isNew: true }),
  makeProduct('p-21', 'Eco Fresh Interior', 'eco-fresh-interior', 'Interior Paints', 'interior-paints', 'ALI Premium', 'ali-premium', 4800, 5500, 'Egg Shell', '150-170 sq ft/L', 'Fresh Linen', '4 Liters', 20, { rating: 4.7, reviewCount: 41, isPopular: true }),
  makeProduct('p-22', 'Floor Coat Epoxy', 'floor-coat-epoxy', 'Enamels', 'enamels', 'Shield Coat', 'shield-coat', 8200, 9000, 'High Gloss', '60-80 sq ft/L', 'Industrial Grey', '5 Liters', 21, { rating: 4.5, reviewCount: 12 }),
  makeProduct('p-23', 'Cedar Wood Finish', 'cedar-wood-finish', 'Wood Finishes', 'wood-finishes', 'WoodMaster', 'woodmaster', 3500, 4000, 'Semi-Gloss', '90-110 sq ft/L', 'Cedar', '1 Liter', 22, { rating: 4.4, reviewCount: 17 }),
  makeProduct('p-24', 'Chrome Spray Paint', 'chrome-spray-paint', 'Spray Paints', 'spray-paints', 'ColorTech', 'colortech', 1200, 1400, 'Chrome', '25-35 sq ft/can', 'Chrome Silver', '400ml', 23, { rating: 4.3, reviewCount: 21 }),
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getPopularProducts = () => products.filter(p => p.isPopular);
export const getNewProducts = () => products.filter(p => p.isNew);
export const getRelatedProducts = (product: Product) => products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
