import { Metadata } from "next";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return { title: `Admin Dashboard | ${site.shortName}`, description: `Panel Administrasi ${site.shortName}` };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");
  const site=await getSiteSettings();
  return (
    <AdminLayoutClient siteName={site.shortName} siteLogo={site.logo} user={{ name: session.user.name ?? "Admin", email: session.user.email }}>
      {children}
    </AdminLayoutClient>
  );
}
