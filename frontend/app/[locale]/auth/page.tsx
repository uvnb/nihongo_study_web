import { AuthPanel } from "@/components/auth/auth-panel";
import { dictionaries, isLocale } from "@/lib/i18n";

export default function AuthPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const t = dictionaries[params.locale];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-torii">{t.nav.auth}</p>
        <h1 className="mt-3 font-serif text-4xl">
          {params.locale === "vi"
            ? "Truy cập tài khoản"
            : params.locale === "ja"
              ? "アカウントアクセス"
              : "Account access"}
        </h1>
      </div>
      <AuthPanel />
    </div>
  );
}
