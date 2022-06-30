import { Title } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { Outlet, useCatch } from "@remix-run/react";

import { Document } from "./components/Document";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function Root() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const _catch = useCatch();

  return (
    <Document>
      <Title>{_catch.status}</Title>
    </Document>
  );
}
