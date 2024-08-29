import type { EntryContext } from "@remix-run/node";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { CacheProvider } from "@emotion/react";
import { RemixServer } from "@remix-run/react";
import { ServerStyleContext } from "./context";
import { PassThrough } from "stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { isbot } from "isbot";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { resolve } from "node:path";
import { createInstance } from "i18next";
import i18next from "./i18next.server";
import Backend from "i18next-fs-backend";
import i18n from "./i18n";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "./createEmotionCache";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  const instance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);
  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    });

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  const chunks = extractCriticalToChunks(html);

  // const markup = renderToString(
  //   <ServerStyleContext.Provider value={chunks.styles}>
  //     <CacheProvider value={cache}>
  //       <RemixServer context={remixContext} url={request.url} />
  //     </CacheProvider>
  //   </ServerStyleContext.Provider>
  // );

  // return new Response(`<!DOCTYPE html>${markup}`, {
  //   status: responseStatusCode,
  //   headers: responseHeaders,
  // });

  responseHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  return new Promise((resolve, reject) => {
    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerStyleContext.Provider value={chunks.styles}>
          <CacheProvider value={cache}>
            <RemixServer context={remixContext} url={request.url} />
          </CacheProvider>
        </ServerStyleContext.Provider>
      </I18nextProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );
          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
