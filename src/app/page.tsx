"use client";

import dynamic from "next/dynamic";

const ClientShell = dynamic(() => import("./ClientShell"), { ssr: false });

export default function Page() {
  return <ClientShell />;
}
