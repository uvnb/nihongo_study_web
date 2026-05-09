import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { dictionaries, isLocale } from "@/lib/i18n";

export default function DashboardPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const t = dictionaries[params.locale];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-torii">{t.nav.dashboard}</p>
        <h1 className="mt-3 font-serif text-4xl">Study dashboard</h1>
      </div>
      <DashboardPanel />
    </div>
  );
}

