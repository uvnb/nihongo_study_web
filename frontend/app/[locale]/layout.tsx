import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { SiteShell } from "@/components/site-shell";
import { isLocale } from "@/lib/i18n";

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return <SiteShell locale={params.locale}>{children}</SiteShell>;
}

