import { json, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { i18nCookie } from "./cookies.server";
import { ChakraProvider, cookieStorageManagerSSR, LightMode, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import Document from "./Document";
import i18next from "./i18next.server";
import "./app.css";
import DDNavbar from "./components/DDNavbar";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requestLocale = await i18next.getLocale(request);
  const locale = requestLocale ?? "en";
  const cookies = request.headers.get("cookie") ?? "";
  const localeCookie = await i18nCookie.serialize(locale);
  return json({ cookies, locale: locale }, { headers: { "Set-Cookie": localeCookie } });
};

const queryClient = new QueryClient();

export function Layout() {
  const { cookies, locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <Document lang={i18n.language as "en" | "ar"} dir={i18n.dir()}>
      <ChakraProvider theme={theme} colorModeManager={cookieStorageManagerSSR(cookies)}>
        <LightMode>
          <QueryClientProvider client={queryClient}>
            <DDNavbar />
            <Outlet />
            {/* <DDFooter /> */}
          </QueryClientProvider>
        </LightMode>
        <ScrollRestoration />
        <Scripts />
      </ChakraProvider>
    </Document>
  );
}

export default function App() {
  return <Outlet />;
}
