import { RemixBrowser } from "@remix-run/react";
import { useState } from "react";
import { hydrate } from "react-dom";

import { CacheProvider } from "@emotion/react";
import { ClientStyleContext } from "./context";
import { cssCache } from "./css-cache.client";

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

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
// hydrateRoot(
//   document,
//   <ClientCacheProvider>
//     <RemixBrowser />
//   </ClientCacheProvider>
// );
