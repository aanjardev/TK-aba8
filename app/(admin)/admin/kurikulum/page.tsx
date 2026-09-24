import { CheckCircle2, Save } from "lucide-react";
import { CURRICULUM_ICONS, getCurriculum } from "@/lib/academics";
import DynamicListEditor from "@/components/admin/DynamicListEditor";
import { SubmitButton } from "@/components/admin/FormControls";
import { updateCurriculum } from "./actions";
import ImageUploadPreview from "@/components/admin/ImageUploadPreview";
import TabbedFormSections from "@/components/admin/TabbedFormSections";
const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500";
export default async function AdminCurriculum({
  searchParams,
}: PageProps<"/admin/kurikulum">) {
  const [data, q] = await Promise.all([getCurriculum(), searchParams]);
  return (
    <div className="space-y-6">
      {q.saved === "1" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CheckCircle2 size={18} />
          Kurikulum berhasil disimpan.
        </div>
      )}
      <form action={updateCurriculum} className="space-y-6">
        <TabbedFormSections actions={<SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-emerald-950 hover:bg-amber-400"><Save size={17} />Simpan Perubahan</SubmitButton>} tabs={[{id:"utama",label:"Informasi Utama",description:"Atur pengantar, pendekatan, dan gambar kurikulum.",content:<>
          <Field label="Judul halaman">
            <input
              name="title"
              defaultValue={data.title}
              className={field}
              required
            />
          </Field>
          <Field label="Pengantar">
            <textarea
              name="introduction"
              defaultValue={data.introduction}
              rows={4}
              className={field}
              required
            />
          </Field>
          <Field label="Judul pendekatan">
            <input
              name="approachTitle"
              defaultValue={data.approachTitle}
              className={field}
              required
            />
          </Field>
          <Field label="Deskripsi pendekatan">
            <textarea
              name="approachDescription"
              defaultValue={data.approachDescription}
              rows={4}
              className={field}
              required
            />
          </Field>
          <Field label="Gambar aktivitas">
            <ImageUploadPreview current={data.image} />
          </Field>
        </>},{id:"metode",label:"Metode Pembelajaran",description:"Kelola metode belajar yang ditampilkan kepada pengunjung.",content:<>
          <DynamicListEditor
            name="methods"
            label="Daftar metode"
            initial={data.methods}
            newItem={{ title: "", description: "", icon: "BookOpen" }}
            min={1}
            fields={[
              {
                key: "icon",
                label: "Ikon",
                kind: "select",
                options: [...CURRICULUM_ICONS],
              },
              { key: "title", label: "Judul" },
              { key: "description", label: "Deskripsi", kind: "textarea" },
            ]}
          />
        </>},{id:"jadwal",label:"Jadwal Harian",description:"Atur urutan aktivitas harian sekolah.",content:<>
          <DynamicListEditor
            name="schedule"
            label="Rangkaian aktivitas"
            initial={data.schedule}
            newItem={{ time: "", activity: "", description: "" }}
            min={1}
            fields={[
              { key: "time", label: "Waktu" },
              { key: "activity", label: "Aktivitas" },
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
