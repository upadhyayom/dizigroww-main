// Reusable schema.org JSON-LD builders for per-page structured data.
// Pass the output to useMeta({ structuredData }).

const ORG = {
  "@type": "Organization",
  name: "DiziGroww",
  url: "https://dizigroww.in/",
  logo: "https://dizigroww.in/logo.png",
};

const DEFAULT_AREAS = ["India", "United Arab Emirates", "Singapore"];

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: opts.url,
    provider: ORG,
    areaServed: (opts.areaServed ?? DEFAULT_AREAS).map((name) => ({
      "@type": "Country",
      name,
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: opts.image ?? "https://dizigroww.in/logo.png",
    author: ORG,
    publisher: ORG,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
