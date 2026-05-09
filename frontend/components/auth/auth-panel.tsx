"use client";

import Script from "next/script";
import { FormEvent, useEffect, useState } from "react";

import { getCurrentUser, login, loginWithGoogle, register } from "@/lib/api";
import { GoogleCredentialResponse, User } from "@/types/content";

const TOKEN_KEY = "nihongo-token";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme: string;
              size: string;
              text?: string;
              shape?: string;
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

export function readStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(TOKEN_KEY);
}

export function AuthPanel() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = readStoredToken();
    if (!token) {
      return;
    }
    getCurrentUser(token)
      .then(setUser)
      .catch(() => window.localStorage.removeItem(TOKEN_KEY));
  }, []);

  useEffect(() => {
    if (user || !GOOGLE_CLIENT_ID || !window.google) {
      return;
    }

    const button = document.getElementById("google-signin-button");
    if (!button || button.childElementCount > 0) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredential
    });
    window.google.accounts.id.renderButton(button, {
      theme: "outline",
      size: "large",
      text: "signin_with",
      shape: "pill",
      width: 320
    });
  }, [user]);

  async function handleGoogleCredential(response: GoogleCredentialResponse) {
    setLoading(true);
    setError(null);
    try {
      const auth = await loginWithGoogle({ credential: response.credential });
      window.localStorage.setItem(TOKEN_KEY, auth.access_token);
      setUser(auth.user);
      setPassword("");
      setError(null);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Đăng nhập Google thất bại");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response =
        mode === "login"
          ? await login({ email, password })
          : await register({ email, password, display_name: displayName });
      window.localStorage.setItem(TOKEN_KEY, response.access_token);
      setUser(response.user);
      setPassword("");
      setDisplayName("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Yêu cầu không thành công");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {GOOGLE_CLIENT_ID ? (
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      ) : null}
      <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
        <p className="text-xs uppercase tracking-[0.35em] text-torii">Phiên làm việc</p>
        {user ? (
          <div className="mt-4 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-serif text-3xl">{user.display_name}</div>
                <div className="mt-2 text-sm text-ink/70">{user.email}</div>
              </div>
              <div
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] ${
                  user.auth_provider === "google"
                    ? "bg-[#efe4d0] text-torii"
                    : "bg-[#f4efe6] text-ink/70"
                }`}
              >
                {user.auth_provider === "google" ? "Google account" : "Email account"}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-[#fcfaf5] p-4 text-sm leading-7 text-ink/70">
              <p>Bạn đã đăng nhập thành công và có thể quản lý lesson, vocabulary, kanji, quiz history và tiến độ học tập.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-amber-950/10 bg-white p-4">
                <div className="text-xs uppercase tracking-[0.28em] text-torii">Phương thức</div>
                <div className="mt-2 text-base">{user.auth_provider === "google" ? "Google OAuth" : "Email + mật khẩu"}</div>
              </div>
              <div className="rounded-[1.5rem] border border-amber-950/10 bg-white p-4">
                <div className="text-xs uppercase tracking-[0.28em] text-torii">Quyền thao tác</div>
                <div className="mt-2 text-base">Đã bật chỉnh sửa MVP</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem(TOKEN_KEY);
                setUser(null);
                setMode("login");
              }}
              className="rounded-full border border-amber-950/10 px-5 py-2 text-sm"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm leading-7 text-ink/70">
              Đăng nhập để tạo, sửa và xóa lesson trên giao diện MVP.
            </p>
            {GOOGLE_CLIENT_ID ? (
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-ink/45">Google OAuth</div>
                <div id="google-signin-button" className="min-h-11" />
              </div>
            ) : (
              <p className="text-sm text-ink/55">
                Google OAuth sẽ hiện khi đã cấu hình `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
              </p>
            )}
          </div>
        )}
      </div>

      {user ? (
        <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
          <div className="text-xs uppercase tracking-[0.35em] text-torii">Trạng thái tài khoản</div>
          <h2 className="mt-4 font-serif text-3xl">Phiên đăng nhập đang hoạt động</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink/70">
            Biểu mẫu đăng nhập đã được ẩn vì bạn đang có session hợp lệ. Nếu muốn đổi tài khoản, hãy đăng xuất trước.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#fcfaf5] p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-torii">Đăng nhập</div>
              <div className="mt-2 text-base">{user.auth_provider === "google" ? "Google" : "Email"}</div>
            </div>
            <div className="rounded-[1.5rem] bg-[#fcfaf5] p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-torii">Nội dung</div>
              <div className="mt-2 text-base">CRUD sẵn sàng</div>
            </div>
            <div className="rounded-[1.5rem] bg-[#fcfaf5] p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-torii">Tiến độ</div>
              <div className="mt-2 text-base">Đang theo dõi</div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card"
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-full px-4 py-2 text-sm ${mode === "login" ? "bg-torii text-white" : "bg-[#f8f3ea]"}`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-full px-4 py-2 text-sm ${mode === "register" ? "bg-torii text-white" : "bg-[#f8f3ea]"}`}
            >
              Đăng ký
            </button>
          </div>
          <div className="mt-5 grid gap-4">
            {mode === "register" ? (
              <label className="grid gap-2 text-sm">
                <span>Tên hiển thị</span>
                <input
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                  required
                />
              </label>
            ) : null}
            <label className="grid gap-2 text-sm">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Mật khẩu</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
          </div>
          {error ? <p className="mt-4 text-sm text-torii">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 rounded-full bg-ink px-6 py-3 text-sm text-white disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
          </button>
        </form>
      )}
    </div>
  );
}
