import { createEmotionCache, MantineProvider } from "@mantine/core";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { type ReactNode, useContext, useEffect } from "react";
import { ClientStyleContext } from "~/context";

export function Document({ children }: { children: ReactNode }) {
  const clientStyleData = useContext(ClientStyleContext);
  const cache = createEmotionCache({ key: "mantine" });

  useEffect(() => {
    cache.sheet.container = document.head;
    const tags = cache.sheet.tags;
    cache.sheet.flush();
    tags.forEach((tag) => {
      (cache.sheet as any)._insertTag(tag);
    });
    clientStyleData?.reset();
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider
          theme={{ colorScheme: "dark" }}
          emotionCache={cache}
          withGlobalStyles
          withNormalizeCSS
        >
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
