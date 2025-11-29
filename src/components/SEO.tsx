// SEO component for dynamic meta tags and structured data
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  url?: string;
  structuredData?: object;
}

export const SEO = ({
  title = "JPR INFRAWORKS - Leading Construction Company | Builder & Architect Portfolio",
  description = "JPR INFRAWORKS is a premier construction company, builder, and architect firm specializing in residential construction, commercial projects, infrastructure development, and architectural design. View our portfolio of completed projects.",
  keywords = "construction company, builder, architect, construction services, residential construction, commercial construction, infrastructure development, architectural design, construction portfolio, building contractor, construction firm, home builder, construction projects",
  image = "/logo.jpg",
  type = "website",
  url,
  structuredData,
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = "https://jprinfraworks.com";
  const currentUrl = url || `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);

    // Update Open Graph tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: `${siteUrl}${image}` },
      { property: "og:url", content: currentUrl },
      { property: "og:type", content: type },
      { property: "og:site_name", content: "JPR INFRAWORKS" },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${siteUrl}${image}` },
    ];

    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // Add structured data (append new script to avoid conflicts with existing structured data)
    if (structuredData) {
      // Remove any existing page-specific structured data
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-page-seo]');
      existingScripts.forEach(script => script.remove());
      
      // Add new structured data
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-page-seo", "true");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, image, type, currentUrl, structuredData]);

  return null;
};

