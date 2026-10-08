import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { activateAccount } from "../activation/actions";

export default async function ActivateAccountPage({
  searchParams,
}: PageProps<"/activate">) {
  const params = await searchParams;
  const email = typeof params?.email === "string" ? params.email : "";
  if (!email) redirect("/login?activation=invalid");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "PENDING") redirect("/login?activation=invalid");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Buat Password Admin
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Masukkan email dan password baru untuk mengaktifkan akun admin.
        </p>

        <form action={activateAccount} className="mt-6 space-y-4">
          <input type="hidden" name="email" value={email} />
          <label className="block text-sm font-semibold text-slate-700">
            Email
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {email}
            </div>
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Password baru
            <input
              name="password"
              type="password"
              minLength={8}
              required
              className="field mt-2"
              placeholder="Minimal 8 karakter"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Konfirmasi password
            <input
              name="confirmation"
              type="password"
              minLength={8}
              required
              className="field mt-2"
              placeholder="Ulangi password"
            />
          </label>

          <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700">
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
