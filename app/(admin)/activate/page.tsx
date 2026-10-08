import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ActivateAccountForm } from "@/components/admin/ActivateAccountForm";

export default async function ActivateAccountPage({
  searchParams,
}: PageProps<"/activate">) {
  const params = await searchParams;
  const email = typeof params?.email === "string" ? params.email : "";

  if (!email) redirect("/login?activation=invalid");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "PENDING") redirect("/login?activation=invalid");

  return <ActivateAccountForm email={email} />;
}
