import { RemixBrowser } from "@remix-run/react";
import { useState } from "react";
import { hydrateRoot } from "react-dom/client";

import { CacheProvider } from "@emotion/react";
import { ClientStyleContext } from "./context";
import { cssCache } from "./css-cache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(cssCache);
  function reset() {
    setCache(cssCache);
  }
  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
);
