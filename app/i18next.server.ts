import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next/server";
import { i18nCookie } from "./cookies.server";
import Backend from "i18next-fs-backend";
import i18n from "~/i18n";

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: i18nCookie,
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
  },
  plugins: [Backend],
});

export default i18next;
