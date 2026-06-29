import { Project } from '@/types';
import { getProjectImage } from '@/data/images';

const makeProject = (
  id: string, title: string, slug: string, category: Project['category'],
  description: string, client: string, location: string, completedDate: string,
  productsUsed: string[], index: number
): Project => {
  const image = getProjectImage(index);
  return {
    id, title, slug, category, description, client, location, completedDate, productsUsed,
    images: [image, getProjectImage(index + 1)],
    beforeImage: image,
    afterImage: getProjectImage(index + 2),
  };
};

export const projects: Project[] = [
  makeProject('p-1', 'Modern Minimalist Villa', 'modern-minimalist-villa', 'residential', 'A complete interior and exterior transformation of a luxury villa in DHA Phase 6. Used premium Gobis emulsion with custom color matching for a sleek, modern aesthetic.', 'Ahmed & Sara Khan', 'DHA Phase 6, Islamabad', '2025-10-15', ['Gobis Silk Emulsion', 'Shield Coat Exterior'], 0),
  makeProject('p-2', 'Corporate Office Renovation', 'corporate-office-renovation', 'commercial', 'Complete painting and texturing of a 15,000 sq ft corporate office. Applied premium matte finish with accent texture walls in meeting rooms.', 'TechVenture Inc.', 'Blue Area, Islamabad', '2025-09-20', ['Gobis Premium Matt', 'Italian Texture'], 1),
  makeProject('p-3', 'Luxury Apartment Complex', 'luxury-apartment-complex', 'residential', 'Painting of 48 luxury apartments with consistent premium finish throughout. Each apartment featured a unique accent wall design.', 'Heights Developers', 'Gulberg III, Islamabad', '2025-08-10', ['Gobis Weather Shield', 'ALI Premium Interior'], 2),
  makeProject('p-4', 'Industrial Warehouse Coating', 'industrial-warehouse-coating', 'industrial', 'Epoxy flooring and anti-corrosion coating for a 30,000 sq ft industrial warehouse. Designed for heavy machinery and chemical resistance.', 'Indus Manufacturing', 'Sundar Industrial Estate', '2025-07-05', ['Industrial Epoxy', 'Anti-Corrosion Primer'], 3),
  makeProject('p-5', 'Boutique Hotel Interior', 'boutique-hotel-interior', 'commercial', 'Luxurious texture painting and wood polishing for a boutique hotel. Included metallic accent walls and premium wood finish for all furniture.', 'Pearl Hospitality', 'Mall Road, Islamabad', '2025-06-18', ['Metallic Texture Paint', 'WoodMaster Polish'], 4),
  makeProject('p-6', 'School Campus Exterior', 'school-campus-exterior', 'commercial', 'Complete exterior repainting of a school campus including classrooms, sports complex, and administration building with weather-resistant coatings.', 'City Grammar School', 'Johar Town, Islamabad', '2025-05-12', ['Gobis Weather Shield', 'Shield Coat Plus'], 5),
  makeProject('p-7', 'Farmhouse Retreat', 'farmhouse-retreat', 'residential', 'A rustic yet modern farmhouse transformation using earthy tones and natural wood finishes. Interior and exterior with waterproofing.', 'Malik Family', 'Bedian Road, Islamabad', '2025-04-08', ['Gobis Silk Emulsion', 'AquaGuard Waterproofing'], 6),
  makeProject('p-8', 'Food Court & Restaurant', 'food-court-restaurant', 'commercial', 'Vibrant, food-safe coating for a modern food court. Used washable and heat-resistant paints for the kitchen areas.', 'Flavor Street', 'Packages Mall, Islamabad', '2025-03-22', ['Washable Emulsion', 'Heat Resistant Coating'], 7),
  makeProject('p-9', 'Chemical Plant Protection', 'chemical-plant-protection', 'industrial', 'Specialized chemical-resistant coating for a pharmaceutical manufacturing plant. Required strict compliance with health and safety standards.', 'PharmaCo Industries', 'Quaid-e-Azam Industrial Estate', '2025-02-15', ['Chemical Resistant Epoxy', 'Anti-Bacterial Coating'], 8),
];
