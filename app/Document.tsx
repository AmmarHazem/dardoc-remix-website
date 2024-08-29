import { withEmotionCache } from "@emotion/react";
import { useLoaderData, Meta, Links, ScrollRestoration, Scripts, useLocation } from "@remix-run/react";
import { useContext, useEffect, useCallback, useMemo, useRef } from "react";
import { ServerStyleContext, ClientStyleContext } from "./context";
import { loader } from "./root";
import { Box } from "@chakra-ui/react";

interface DocumentProps {
  children: React.ReactNode;
  lang: "ar" | "en";
  dir: "ltr" | "rtl";
}

const Document = withEmotionCache(({ children, lang, dir }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  useEffect(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (emotionCache.sheet as any)._insertTag(tag);
    });
    clientStyleData?.reset();
  }, [clientStyleData, emotionCache.sheet]);

  const getColorMode = useCallback((cookies: string) => {
    const match = cookies.match(new RegExp(`(^| )${CHAKRA_COOKIE_COLOR_KEY}=([^;]+)`));
    return match == null ? void 0 : match[2];
  }, []);

  const DEFAULT_COLOR_MODE: "dark" | "light" | null = "light";

  const CHAKRA_COOKIE_COLOR_KEY = "chakra-ui-color-mode";

  const { cookies } = useLoaderData<typeof loader>();
  const cookiesWithDarkMode = useRef(cookies);

  if (typeof document !== "undefined") {
    cookiesWithDarkMode.current = document.cookie;
  }

  const colorMode = useMemo(() => {
    let color = getColorMode(cookiesWithDarkMode.current);
    if (!color && DEFAULT_COLOR_MODE) {
      cookiesWithDarkMode.current += ` ${CHAKRA_COOKIE_COLOR_KEY}=${DEFAULT_COLOR_MODE}`;
      color = DEFAULT_COLOR_MODE;
    }
    return color;
  }, [getColorMode]);

  const location = useLocation();
  const didAddScripts = useRef(false);

  useEffect(() => {
    if (window.location.host === "localhost:3000") return;
    if (location.pathname.startsWith("/test-home")) return;
    if (location.pathname === "/empty-page") return;
    if (didAddScripts.current) return;
    const facebookScript = document.createElement("script");
    facebookScript.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '319728923343587');fbq('track', 'PageView');`;
    document.head.insertBefore(facebookScript, document.head.firstChild);
    const gtmScript = document.createElement("script");
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P7ZS4Z4');`;
    document.head.insertBefore(gtmScript, document.head.firstChild);
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P7ZS4Z4"height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
    didAddScripts.current = true;
  }, [location.pathname]);

  return (
    <html
      lang={lang}
      dir={dir}
      {...(colorMode && {
        "data-theme": colorMode,
        style: { colorScheme: colorMode },
      })}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href={`/manifest.json`} />
        <link
          href="https://dardocstorageaccount.blob.core.windows.net/dardocpictures/6c64797471ed96fc33bad71163777c3b.webp"
          rel="apple-touch-startup-image"
        />
        <meta name="color-scheme" content="only light" />
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style key={key} data-emotion={`${key} ${ids.join(" ")}`} dangerouslySetInnerHTML={{ __html: css }} />
        ))}
      </head>
      <Box
        as="body"
        width={"100vw"}
        overflowX={"hidden"}
        className={`hide-scrollbar ${colorMode ? `chakra-ui-${colorMode}` : ""} ${lang}`}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </Box>
    </html>
  );
});

export default Document;
