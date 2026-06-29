/**
 * Image URLs sourced from official brand websites:
 * - gobispaint.com.pk (products, hero, CSR, projects)
 * - happilacpaints.com (CSR, brand logo)
 * - bluebirdpaints.com (calculator, services, brand logo)
 */

const GOBI = 'https://gobispaint.com.pk/php_assets/uploads';
const HAPPI = 'https://happilacpaints.com/wp-content/uploads';
const BLUEBIRD = 'https://bluebirdpaints.com/cdn/shop/files';
const SHOPIFY = 'https://cdn.shopify.com/s/files/1/0665/3630/8796/files';

export const siteImages = {
  hero: {
    /** Gobis "Our Services" banner — professional paint application */
    main: `${GOBI}/2022/01/Banner-Our-Services-1.jpg`,
  },
  about: {
    /** Happilac CSR — community painting / literacy campaign */
    team: `${HAPPI}/2019/04/39210690_2150502641689310_8403897301889712128_o.jpg`,
    /** Gobis product display — paint cans & coatings */
    store: `${GOBI}/2020/12/Asset-8.png`,
    /** Gobis CSR — tree plantation drive */
    csr: `${GOBI}/2021/12/Plant-A-Tree.jpg`,
  },
  brands: {
    gobis: `${GOBI}/2021/12/Logo-2.png`,
    bluebird: `${BLUEBIRD}/Bluebird_Paints_New_Logo_0092eafb-e438-4052-a87b-65204e13b431.webp`,
    happilac: `${HAPPI}/2022/03/happilac.png`,
    /** Royal Paint Shop site was unreachable; Gobis allied dealer logo used as paint retail partner */
    royal: `${GOBI}/2025/04/allied_paint_industry_gobis_paints__logo.jpg`,
  },
  calculator: {
    /** Bluebird Paint Calculator promotional image */
    banner: `${BLUEBIRD}/Paint_calculator_for_pricing.jpg`,
  },
  categories: {
    interior: `${GOBI}/2025/11/2.jpg`,
    exterior: `${GOBI}/2025/11/3.jpg`,
    wood: `${GOBI}/2021/12/Gobis-Sona-Lapi-253x253.png`,
    primers: `${GOBI}/2021/12/Gobis-WAll-Primer-Sealer-253x253.png`,
    textures: `${SHOPIFY}/Texture_Studio.png`,
    waterproofing: `${GOBI}/2021/12/Gobis-Weather-Protector-253x253.png`,
    enamels: `${GOBI}/2021/12/Gobis-Gloss-Enamel-253x253.png`,
    spray: `${GOBI}/2021/12/Gobis-Matt-Finish-Enamel-253x253.png`,
  },
  services: {
    interior: `${SHOPIFY}/Paint_it_for_me.png`,
    exterior: `${GOBI}/2022/01/Banner-Our-Services-1.jpg`,
    texture: `${SHOPIFY}/Texture_Studio.png`,
    wood: `${GOBI}/2021/12/Gobis-Sona-Lapi-253x253.png`,
    waterproofing: `${GOBI}/2021/12/Gobis-Weather-Protector-253x253.png`,
    industrial: `${GOBI}/2020/12/17-250x247.jpg`,
    consultation: `${SHOPIFY}/ColourLab_Consultation.png`,
    siteVisit: `${SHOPIFY}/Paint_it_for_me.png`,
  },
};

/** Gobis official product pack shots (253×253) */
const productImages: string[] = [
  `${GOBI}/2021/12/Gobis-Aqueous-Matt-Finish-253x253.png`,
  `${GOBI}/2021/12/Gobis-Weather-Protector-253x253.png`,
  `${GOBI}/2021/12/Gobis-Plastic-Emulsion-253x253.png`,
  `${GOBI}/2021/12/Gobis-Silksheen-Emulsion-253x253.png`,
  `${GOBI}/2021/12/Gobis-Matt-Finish-Enamel-253x253.png`,
  `${GOBI}/2021/12/Gobis-Gloss-Enamel-253x253.png`,
  `${GOBI}/2021/12/Gobis-Sona-Lapi-253x253.png`,
  `${GOBI}/2021/12/Gobis-WAll-Primer-Sealer-253x253.png`,
  `${GOBI}/2021/12/Gobis-Red-Oxide-Primer-253x253.png`,
  `${GOBI}/2021/12/gobis-aqueous-wall-sealer-253x253.png`,
  `${SHOPIFY}/1_53.png`,
  `${SHOPIFY}/2_56.png`,
  `${SHOPIFY}/01_1.png`,
  `${SHOPIFY}/02_1.png`,
  `${SHOPIFY}/03.png`,
  `${SHOPIFY}/04.png`,
  `${GOBI}/2021/12/Gobis-Aqueous-Matt-Finish-253x253.png`,
  `${GOBI}/2021/12/Gobis-Plastic-Emulsion-253x253.png`,
  `${GOBI}/2021/12/Gobis-Silksheen-Emulsion-253x253.png`,
  `${GOBI}/2021/12/Gobis-Matt-Finish-Enamel-253x253.png`,
  `${GOBI}/2021/12/Gobis-Gloss-Enamel-253x253.png`,
  `${GOBI}/2021/12/Gobis-Weather-Protector-253x253.png`,
  `${GOBI}/2021/12/Gobis-Sona-Lapi-253x253.png`,
  `${GOBI}/2021/12/Gobis-Red-Oxide-Primer-253x253.png`,
];

/** Gobis project / before-after portfolio photos */
const projectImages: string[] = [
  `${GOBI}/2025/06/Before.jpg`,
  `${GOBI}/2022/05/After.jpg`,
  `${GOBI}/2025/11/2.jpg`,
  `${GOBI}/2025/11/3.jpg`,
  `${GOBI}/2025/11/4.jpg`,
  `${GOBI}/2025/11/5.jpg`,
  `${GOBI}/2025/11/6.jpg`,
  `${GOBI}/2025/11/7.jpg`,
  `${GOBI}/2025/11/2.jpg`,
  `${GOBI}/2025/11/3.jpg`,
  `${GOBI}/2025/11/4.jpg`,
];

export function getProductImage(index: number): string {
  return productImages[index % productImages.length];
}

export function getProjectImage(index: number): string {
  return projectImages[index % projectImages.length];
}
