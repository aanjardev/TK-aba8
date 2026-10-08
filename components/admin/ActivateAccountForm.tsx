"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock } from "lucide-react";
import { activateAccount } from "@/app/(admin)/activation/actions";

export function ActivateAccountForm({ email }: { email: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Buat Password Admin
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Masukkan email dan password baru untuk mengaktifkan akun admin.
        </p>

        <form
          action={activateAccount}
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            if (password.trim().length === 0) {
              event.preventDefault();
              setError("Password wajib diisi.");
              return;
            }
            if (password !== confirmation) {
              event.preventDefault();
              setError("Konfirmasi password tidak cocok.");
              return;
            }
            setError("");
          }}
        >
          <input type="hidden" name="email" value={email} />

          <label className="block text-sm font-semibold text-slate-700">
            Email
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {email}
            </div>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Password baru
            <div className="relative mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={1}
                className="field pl-11 pr-11"
                placeholder="Masukkan password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Konfirmasi password
            <div className="relative mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                name="confirmation"
                type={showConfirmation ? "text" : "password"}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                required
                minLength={1}
                className="field pl-11 pr-11"
                placeholder="Ulangi password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmation((value) => !value)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                aria-label={
                  showConfirmation
                    ? "Sembunyikan konfirmasi password"
                    : "Tampilkan konfirmasi password"
                }
              >
                {showConfirmation ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </label>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Aktivasi akun
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-emerald-600">
            Kembali ke login
          </Link>
        </p>
      </div>
    </main>
  );
}
