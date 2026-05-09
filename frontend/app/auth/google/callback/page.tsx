import Link from "next/link";

export default function GoogleCallbackPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-16">
      <div className="rounded-[2rem] border border-amber-950/10 bg-white/85 p-8 shadow-card">
        <p className="text-xs uppercase tracking-[0.35em] text-torii">Google OAuth</p>
        <h1 className="mt-4 font-serif text-3xl">Callback endpoint ready</h1>
        <p className="mt-3 text-sm leading-7 text-ink/70">
          Trang này được tạo để dùng làm redirect URI hợp lệ cho Google OAuth. Luồng đăng nhập hiện tại
          ưu tiên Google Identity Services trên client, nhưng callback này vẫn sẵn sàng cho production setup.
        </p>
        <Link
          href="/vi/auth"
          className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm text-white"
        >
          Về trang tài khoản
        </Link>
      </div>
    </main>
  );
}
