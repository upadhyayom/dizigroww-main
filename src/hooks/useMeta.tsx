import { useEffect } from 'react';

interface MetaData {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const ensureMeta = (
  selector: string,
  attr: 'name' | 'property',
  attrValue: string,
  content: string
) => {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const useMeta = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogImage,
  ogType = 'website',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  structuredData,
}: MetaData) => {
  useEffect(() => {
    document.title = title;

    // Description
    ensureMeta('meta[name="description"]', 'name', 'description', description);
    // Robots
    ensureMeta('meta[name="robots"]', 'name', 'robots', robots);
    // Keywords
    if (keywords) {
      ensureMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // Open Graph
    ensureMeta('meta[property="og:title"]', 'property', 'og:title', title);
    ensureMeta('meta[property="og:description"]', 'property', 'og:description', description);
    ensureMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    if (canonicalUrl) {
      ensureMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    }
    if (ogImage) {
      ensureMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
      ensureMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    // Twitter
    ensureMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    // Canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // Page-specific structured data (JSON-LD)
    const existing = document.querySelector('script[data-page-jsonld="true"]');
    if (existing) existing.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-jsonld', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalUrl, keywords, ogImage, ogType, robots, structuredData]);
};
