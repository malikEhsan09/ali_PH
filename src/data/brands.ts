import { Brand } from '@/types';
import { siteImages } from '@/data/images';

export const brands: Brand[] = [
  { id: 'brand-1', name: 'Gobis Paints', slug: 'gobis-paints', logo: siteImages.brands.gobis, description: 'Pakistan\'s trusted paint manufacturer', productCount: 12 },
  { id: 'brand-2', name: 'Bluebird Paints', slug: 'bluebird-paints', logo: siteImages.brands.bluebird, description: 'Premium decorative and texture coatings', productCount: 8 },
  { id: 'brand-3', name: 'Happilac Paints', slug: 'happilac-paints', logo: siteImages.brands.happilac, description: 'Leading industrial and decorative paints', productCount: 5 },
  { id: 'brand-4', name: 'AquaGuard', slug: 'aquaguard', logo: siteImages.brands.gobis, description: 'Waterproofing specialists', productCount: 4 },
  { id: 'brand-5', name: 'WoodMaster', slug: 'woodmaster', logo: siteImages.brands.bluebird, description: 'Premium wood finishing solutions', productCount: 3 },
  { id: 'brand-6', name: 'ColorTech', slug: 'colortech', logo: siteImages.brands.happilac, description: 'Innovative color technology', productCount: 4 },
];
