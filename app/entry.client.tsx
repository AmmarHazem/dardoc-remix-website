import { startTransition, useCallback, useRef, useState } from "react";
import { CacheProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";
import { ClientStyleContext } from "./context";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";
import i18n from "./i18n";
import i18next from "i18next";
import createEmotionCache, { defaultCache } from "./createEmotionCache";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache);
  const didCallResetRef = useRef(false);

  const reset = useCallback(() => {
    if (didCallResetRef.current) return;
    setCache(createEmotionCache());
    didCallResetRef.current = true;
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCache(createEmotionCache());
  //   }, 350);
  // }, []);

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

async function hydrate() {
  await i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...i18n,
      ns: getInitialNamespaces(),
      backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
      detection: {
        order: ["htmlTag", "querystring", "cookie", "localStorage", "path", "subdomain"],
        caches: ["cookie"],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <ClientCacheProvider>
          <RemixBrowser />
        </ClientCacheProvider>
      </I18nextProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}

const po = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log("long-animation-frame", entry.toJSON());
  }
});

po.observe({ type: "long-animation-frame", buffered: true });
