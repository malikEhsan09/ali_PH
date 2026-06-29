import { Category } from '@/types';
import { siteImages } from '@/data/images';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Interior Paints', slug: 'interior-paints', description: 'Premium interior wall paints for every room', icon: 'Home', productCount: 8, image: siteImages.categories.interior },
  { id: 'cat-2', name: 'Exterior Paints', slug: 'exterior-paints', description: 'Weather-resistant exterior coating solutions', icon: 'Building2', productCount: 6, image: siteImages.categories.exterior },
  { id: 'cat-3', name: 'Wood Finishes', slug: 'wood-finishes', description: 'Premium wood stains and polishes', icon: 'TreePine', productCount: 4, image: siteImages.categories.wood },
  { id: 'cat-4', name: 'Primers', slug: 'primers', description: 'Surface preparation primers', icon: 'Layers', productCount: 3, image: siteImages.categories.primers },
  { id: 'cat-5', name: 'Textures', slug: 'textures', description: 'Decorative texture paint finishes', icon: 'Paintbrush', productCount: 4, image: siteImages.categories.textures },
  { id: 'cat-6', name: 'Waterproofing', slug: 'waterproofing', description: 'Waterproof coatings and sealants', icon: 'Droplets', productCount: 3, image: siteImages.categories.waterproofing },
  { id: 'cat-7', name: 'Enamels', slug: 'enamels', description: 'High-gloss enamel paints', icon: 'Sparkles', productCount: 3, image: siteImages.categories.enamels },
  { id: 'cat-8', name: 'Spray Paints', slug: 'spray-paints', description: 'Quick-dry spray paint solutions', icon: 'Spray', productCount: 2, image: siteImages.categories.spray },
];
