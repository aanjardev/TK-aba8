import { CheckCircle2, Save } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";
import { SubmitButton } from "@/components/admin/FormControls";
import ImageUploadPreview from "@/components/admin/ImageUploadPreview";
import { updateSiteSettings } from "./actions";
const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500";
export default async function IdentityPage({
  searchParams,
}: PageProps<"/admin/identitas">) {
  const [data, q] = await Promise.all([getSiteSettings(), searchParams]);
  return (
    <div className="space-y-6">
      {q.saved === "1" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CheckCircle2 size={18} />
          Identitas website berhasil disimpan.
        </div>
      )}
      <form
        action={updateSiteSettings}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <h2 className="text-xl font-bold">Identitas Website</h2>
          <p className="mt-1 text-sm text-slate-500">
            Digunakan secara konsisten pada navbar, footer, dan metadata.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nama resmi">
            <input
              name="schoolName"
              defaultValue={data.schoolName}
              required
              className={field}
            />
          </Field>
          <Field label="Nama pendek">
            <input
              name="shortName"
              defaultValue={data.shortName}
              required
              className={field}
            />
          </Field>
        </div>
        <Field label="Nama panjang lembaga">
          <input
            name="longName"
            defaultValue={data.longName}
            required
            className={field}
          />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Logo (JPG, PNG, WebP, SVG)">
            <ImageUploadPreview
              name="logo"
              current={data.logo}
              removeName="removeLogo"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              hint="Logo aktif ditampilkan di navbar dan footer; maksimal 2 MB."
            />
          </Field>
          <Field label="Favicon (ICO atau PNG)">
            <ImageUploadPreview
              name="favicon"
              current={data.favicon}
              removeName="removeFavicon"
              accept="image/x-icon,image/png"
              hint="Favicon aktif untuk tab browser; maksimal 1 MB."
            />
          </Field>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Facebook">
            <input
              name="facebook"
              type="url"
              defaultValue={data.facebook}
              className={field}
            />
          </Field>
          <Field label="Instagram">
            <input
              name="instagram"
              type="url"
              defaultValue={data.instagram}
              className={field}
            />
          </Field>
          <Field label="YouTube">
            <input
              name="youtube"
              type="url"
              defaultValue={data.youtube}
              className={field}
            />
          </Field>
        </div>
        <div className="flex justify-end border-t pt-5">
          <SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-emerald-950">
            <Save size={18} />
            Simpan Identitas
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
