import { CheckCircle2, Save } from "lucide-react";
import { getHomeHero, HERO_ICON_NAMES } from "@/lib/home-hero";
import { updateHomeHero } from "./actions";
import DynamicListEditor from "@/components/admin/DynamicListEditor";
import { SubmitButton } from "@/components/admin/FormControls";
import ImageUploadPreview from "@/components/admin/ImageUploadPreview";
import TabbedFormSections from "@/components/admin/TabbedFormSections";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export default async function AdminBeranda({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [hero, query] = await Promise.all([getHomeHero(), searchParams]);
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 animate-in fade-in duration-500">
      {query.saved === "1" && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle2 size={19} /> Perubahan hero berhasil disimpan dan sudah
          tampil di beranda.
        </div>
      )}

      <form action={updateHomeHero} className="space-y-6">
        <TabbedFormSections actions={<SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-emerald-950 hover:bg-amber-400"><Save size={17} />Simpan Perubahan</SubmitButton>} tabs={[{id:"hero",label:"Hero Beranda",description:"Atur teks, tombol, dan foto yang pertama kali dilihat pengunjung.",content:<>
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Judul baris pertama">
              <input
                name="headlineTop"
                defaultValue={hero.headlineTop}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Judul sorotan hijau">
              <input
                name="headlineHighlight"
                defaultValue={hero.headlineHighlight}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Judul baris terakhir">
              <input
                name="headlineBottom"
                defaultValue={hero.headlineBottom}
                className={inputClass}
                required
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Deskripsi">
              <textarea
                name="description"
                defaultValue={hero.description}
                rows={4}
                className={`${inputClass} resize-y leading-relaxed`}
                required
              />
            </Field>
          </div>
          <div className="mt-6 grid gap-5 rounded-xl border border-slate-200 p-5 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Tombol utama</h3>
              <Field label="Teks tombol">
                <input
                  name="primaryLabel"
                  defaultValue={hero.primaryLabel}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Tautan">
                <input
                  name="primaryUrl"
                  defaultValue={hero.primaryUrl}
                  className={inputClass}
                  required
                />
              </Field>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Tombol kedua</h3>
              <Field label="Teks tombol">
                <input
                  name="secondaryLabel"
                  defaultValue={hero.secondaryLabel}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Tautan">
                <input
                  name="secondaryUrl"
                  defaultValue={hero.secondaryUrl}
                  className={inputClass}
                  required
                />
              </Field>
            </div>
          </div>
          <div className="mt-6">
            <Field label="Background hero">
              <ImageUploadPreview
                name="backgroundImage"
                current={hero.backgroundImage}
                removeName="removeBackgroundImage"
              />
            </Field>
          </div>
        </>},{id:"statistik",label:"Statistik Sekolah",description:"Kelola angka ringkas yang ditampilkan pada hero.",content:<>
          <DynamicListEditor
            name="stats"
            label="Statistik sekolah"
            initial={hero.stats}
            newItem={{ value: "", label: "" }}
            min={1}
            max={4}
            fields={[
              { key: "value", label: "Nilai" },
              { key: "label", label: "Label" },
            ]}
          />
        </>},{id:"keunggulan",label:"Kartu Keunggulan",description:"Kelola kartu nilai unggulan sekolah.",content:<>
          <DynamicListEditor
            name="features"
            label="Kartu keunggulan"
            initial={hero.features}
            newItem={{ icon: "GraduationCap", title: "", description: "" }}
            min={1}
            fields={[
              {
                key: "icon",
                label: "Ikon",
                kind: "select",
                options: [...HERO_ICON_NAMES],
              },
              { key: "title", label: "Judul" },
              { key: "description", label: "Deskripsi", kind: "textarea" },
            ]}
          />
        </>}]} />

      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-2 block text-xs text-slate-500">{hint}</span>
      )}
    </label>
  );
}
