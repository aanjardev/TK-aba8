"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  optionalUrl,
  removeUpload,
  requireAdmin,
  requiredText,
  saveUpload,
} from "@/lib/admin-utils";

export async function updateSiteSettings(data: FormData) {
  await requireAdmin();
  const old = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  const logo = await saveUpload(data, {
    folder: "site",
    field: "logo",
    types: {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/svg+xml": "svg",
    },
    maxMb: 2,
  });
  const favicon = await saveUpload(data, {
    folder: "site",
    field: "favicon",
    types: {
      "image/x-icon": "ico",
      "image/vnd.microsoft.icon": "ico",
      "image/png": "png",
    },
    maxMb: 1,
  });
  const finalLogo =
      data.get("removeLogo") === "on" ? null : (logo ?? old?.logo ?? null),
    finalFavicon =
      data.get("removeFavicon") === "on"
        ? null
        : (favicon ?? old?.favicon ?? null);
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      schoolName: requiredText(data, "schoolName", "Nama resmi"),
      shortName: requiredText(data, "shortName", "Nama pendek"),
      longName: requiredText(data, "longName", "Nama panjang lembaga"),
      logo: finalLogo,
      favicon: finalFavicon,
      facebook: optionalUrl(data, "facebook", "Facebook"),
      instagram: optionalUrl(data, "instagram", "Instagram"),
      youtube: optionalUrl(data, "youtube", "YouTube"),
    },
    update: {
      schoolName: requiredText(data, "schoolName", "Nama resmi"),
      shortName: requiredText(data, "shortName", "Nama pendek"),
      longName: requiredText(data, "longName", "Nama panjang lembaga"),
      logo: finalLogo,
      favicon: finalFavicon,
      facebook: optionalUrl(data, "facebook", "Facebook"),
      instagram: optionalUrl(data, "instagram", "Instagram"),
      youtube: optionalUrl(data, "youtube", "YouTube"),
    },
  });
  if ((logo || data.get("removeLogo") === "on") && old?.logo)
    await removeUpload(old.logo, "site");
  if ((favicon || data.get("removeFavicon") === "on") && old?.favicon)
    await removeUpload(old.favicon, "site");
  revalidatePath("/", "layout");
  redirect("/admin/identitas?saved=1");
}
