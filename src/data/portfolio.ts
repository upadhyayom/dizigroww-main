export type ProjectType = "E-commerce" | "Landing Pages" | "Corporate";

export interface PortfolioProject {
  id: string;
  title: string;
  type: ProjectType;
  stack: string;
  result: string;
  image: string;
  link: string;
  sortOrder?: number;
}

// Built-in projects. Used as the fallback, and as the seed when you click
// "Load current projects" on the admin page. Once the database has rows, the
// database is the source of truth and this list is ignored.
export const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    id: "default-1",
    title: "Varak Edible Luxury",
    type: "E-commerce",
    stack: "Shopify",
    result: "Premium UI/UX Increased AOV by 24%",
    image: "https://api.microlink.io/?url=https://www.varakedibleluxury.com/&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://www.varakedibleluxury.com/"
  },
  {
    id: "default-2",
    title: "Prince Jewellers",
    type: "E-commerce",
    stack: "Shopify",
    result: "Scaling international cross-border sales",
    image: "https://api.microlink.io/?url=https://www.princejewellers.com.au&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://www.princejewellers.com.au"
  },
  {
    id: "default-3",
    title: "EVO Labs",
    type: "Corporate",
    stack: "Next.js",
    result: "Launched high-performance research platform",
    image: "https://api.microlink.io/?url=https://www.evolabsresearch.co/&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://www.evolabsresearch.co/"
  },
  {
    id: "default-4",
    title: "EvoVera",
    type: "E-commerce",
    stack: "React",
    result: "Increased conversion rate by 2.8%",
    image: "https://api.microlink.io/?url=https://evovera.store/&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://evovera.store/"
  },
  {
    id: "default-5",
    title: "MotoBlox",
    type: "Corporate",
    stack: "WordPress",
    result: "Automotive portal redesigned for speed",
    image: "https://motoblox.com/cdn/shop/files/Screenshot_2025-01-08_171555.png?v=1736702496",
    link: "https://motoblox.com/"
  },
  {
    id: "default-6",
    title: "Nexpet",
    type: "E-commerce",
    stack: "Shopify Plus",
    result: "Health brand scaled to Canada market",
    image: "https://api.microlink.io/?url=https://nexpet.is/&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://nexpet.is/"
  },
  {
    id: "default-7",
    title: "Toy Collectors India",
    type: "E-commerce",
    stack: "Shopify",
    result: "Retail store UI overhaul boosting retention",
    image: "https://api.microlink.io/?url=https://www.toycollectorsindia.com/&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://www.toycollectorsindia.com/"
  },
  {
    id: "default-8",
    title: "Sanduk",
    type: "E-commerce",
    stack: "WooCommerce",
    result: "Modernized traditional fashion retail frontend",
    image: "https://cdn.shopify.com/s/files/1/0601/7961/1856/files/jpeg_shop_0c426d75-af5a-4e38-b90b-ddd05849ea5a.jpg",
    link: "https://sanduk.co"
  },
  {
    id: "default-9",
    title: "The Fragrance Empire",
    type: "E-commerce",
    stack: "Shopify",
    result: "Boosted cosmetic cart conversions",
    image: "https://thefragranceempire.com/cdn/shop/files/TFE_GOLDEN_LOGO_Print_File_Updated_3.pdf.png",
    link: "https://thefragranceempire.com/"
  },
  {
    id: "default-10",
    title: "Stikrly",
    type: "E-commerce",
    stack: "Shopify & Web",
    result: "Optimized storefront & seamless user flow",
    image: "https://api.microlink.io/?url=https://stikrly.in&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://stikrly.in"
  },
  {
    id: "default-11",
    title: "Lovely Lady",
    type: "E-commerce",
    stack: "Shopify",
    result: "Fashion & beauty storefront built to convert",
    image: "https://api.microlink.io/?url=https://lovely-lady.com/&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://lovely-lady.com/"
  },
  {
    id: "default-12",
    title: "Nesiy",
    type: "E-commerce",
    stack: "Shopify",
    result: "Demi-fine jewelry storefront built for discovery & conversion",
    image: "https://api.microlink.io/?url=https://nesiy.com/&screenshot=true&meta=false&embed=screenshot.url",
    link: "https://nesiy.com/"
  }
];


export const screenshotUrl = (link: string) =>
  `https://api.microlink.io/?url=${link}&screenshot=true&meta=false&embed=screenshot.url`;
