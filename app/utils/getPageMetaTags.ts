type MetaTag = {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  tagName?: string;
  rel?: string;
  href?: string;
  "script:ld+json"?: { [key: string]: unknown };
};

export default function getPageMetaTags(tags?: MetaTag[]): MetaTag[] {
  const titleTag = tags?.find((tag) => !!tag.title);
  const title: string = titleTag?.title ?? "";
  const descriptionTag = tags?.find((tag) => tag.name === "description");
  const keywordsTag = tags?.find((tag) => tag.name === "keywords");

  const metaDescription: string =
    descriptionTag?.content ??
    "Experience doorstep home healthcare services with DarDoc UAE, the front-runner in home health centres. Sign up now!";
  const keywords: string =
    keywordsTag?.content ??
    "blood tests, blood test at home in Dubai, at-home blood testing services, newborn care, nany, Homehealth care, lab tests, iv drips, babysitters in Abu Dhabi & Dubai";
  const list: MetaTag[] = [
    { name: "description", content: `${metaDescription}` },
    { name: "application-name", content: "DarDoc" },
    { name: "keywords", content: `${keywords}` },
    { name: "creator", content: "DarDoc Team" },
    { name: "publisher", content: "DarDoc Health Technologies Limited ADGM" },
    { name: "apple-itunes-app", content: "app-id=1570460216, app-argument=1570460216" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-title", content: title },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { property: "og:title", content: title },
    { property: "og:description", content: `${metaDescription}` },
    { property: "og:url", content: "{baseURL}" },
    { property: "og:site_name", content: "DarDoc" },
    { property: "og:locale", content: "en" },
    { property: "og:country_name", content: "uae" },
    { property: "og:image", content: "{baseURL}/favicon.ico" },
    { property: "og:type", content: "website" },
    { property: "og:keywords", content: `${keywords}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@dardocofficial" },
    { name: "twitter:creator", content: "@keswins" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: `${metaDescription}` },
    {
      name: "twitter:image",
      content: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/6c64797471ed96fc33bad71163777c3b.webp",
    },
    { property: "twitter:keywords", content: `${keywords}` },
    { property: "al:ios:url", content: "https://apps.apple.com/ae/app/dardoc/id1570460216" },
    { property: "al:ios:app_name", content: "DarDoc" },
    { property: "al:ios:app_store_id", content: "1570460216" },
    { property: "al:iphone:app_store_id", content: "1570460216" },
    { property: "al:iphone:app_name", content: "DarDoc" },
    { property: "al:iphone:url", content: "https://apps.apple.com/ae/app/dardoc/id1570460216" },
    { property: "al:ipad:url", content: "https://apps.apple.com/ae/app/dardoc/id1570460216" },
    { property: "al:ipad:app_name", content: "DarDoc" },
    { property: "al:ipad:app_store_id", content: "1570460216" },
    { property: "al:android:app_name", content: "DarDoc" },
    {
      property: "al:android:url",
      content: "https://play.google.com/store/apps/details?id=com.dardoc&pcampaignid=web_share",
    },
    { property: "al:android:package", content: "com.dardoc" },
    { property: "al:web:url", content: "{baseURL}" },
    { property: "al:web:should_fallback", content: "true" },
  ];
  if (titleTag) {
    list.unshift(titleTag);
  } else {
    list.unshift({ title: "Best Home Healthcare Providers in UAE | DarDoc" });
  }
  const tagsMap = new Map<string, MetaTag>();
  for (const tag of list) {
    if (tag.name) {
      tagsMap.set(`name-${tag.name}`, tag);
    } else if (tag.property) {
      tagsMap.set(`property-${tag.property}`, tag);
    } else if (tag.title) {
      tagsMap.set(`title-${tag.title}`, tag);
    }
  }
  for (const tag of tags ?? []) {
    if (tag.name) {
      tagsMap.set(`name-${tag.name}`, tag);
    } else if (tag.property) {
      tagsMap.set(`property-${tag.property}`, tag);
    } else if (tag.title) {
      tagsMap.set(`title-${tag.title}`, tag);
    } else if (tag.tagName === "link" && tag.rel === "canonical") {
      tagsMap.set(`link-${tag.href}`, tag);
    }
  }
  const metaList = Array.from(tagsMap.values());
  metaList.push({
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "DarDoc",
      url: "https://www.dardoc.com",
      logo: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc1.jpg",
      description: "Best Home Health Care in Abu Dhabi and Dubai",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Floor 15, WeWork x Hub 71, Al Khatem Tower, ADGM Square",
        addressLocality: "Abu Dhabi",
        addressCountry: "United Arab Emirates",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "wecare@dardoc.com",
        contactType: "Customer Service",
      },
      sameAs: [
        "https://www.instagram.com/dardoc/",
        "https://www.facebook.com/dardocofficial",
        "https://twitter.com/dardocofficial",
        "https://www.linkedin.com/company/dardoc",
      ],
    },
  });
  return metaList;
}
