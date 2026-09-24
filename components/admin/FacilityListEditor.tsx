"use client";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { FacilityItem } from "@/lib/school-about";
import ImageUploadPreview from "./ImageUploadPreview";
type Item = FacilityItem & { clientKey: string };
const input =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm";
export default function FacilityListEditor({
  initial,
  icons,
}: {
  initial: FacilityItem[];
  icons: string[];
}) {
  const [items, setItems] = useState<Item[]>(() =>
    initial.map((x, i) => ({ ...x, clientKey: `existing-${i}` })),
  );
  const [selected, setSelected] = useState<string | null>(null),
    [mode, setMode] = useState<"view" | "edit">("edit");
  const item = items.find((x) => x.clientKey === selected);
  const update = (
    key: string,
    field: keyof FacilityItem,
    value: string | boolean,
  ) =>
    setItems((list) =>
      list.map((x) => (x.clientKey === key ? { ...x, [field]: value } : x)),
    );
  const move = (i: number, to: number) =>
    setItems((list) => {
      if (to < 0 || to >= list.length) return list;
      const copy = [...list];
      [copy[i], copy[to]] = [copy[to], copy[i]];
      return copy;
    });
  const open = (key: string, next: "view" | "edit") => {
    setSelected(key);
    setMode(next);
  };
  const add = () => {
    const key = crypto.randomUUID();
    setItems((x) => [
      ...x,
      {
        clientKey: key,
        title: "",
        description: "",
        image: "",
        icon: "Building2",
        isActive: true,
      },
    ]);
    open(key, "edit");
  };
  return (
    <section className="space-y-4">
      <input type="hidden" name="facilities" value={JSON.stringify(items)} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">Daftar fasilitas</h3>
          <p className="text-xs text-slate-500">
            Kelola data melalui aksi tabel agar halaman tetap ringkas.
          </p>
        </div>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white"
        >
          <Plus size={15} />
          Tambah fasilitas
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Fasilitas</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Urutan</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((row, i) => (
              <tr key={row.clientKey} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-lg border bg-slate-100">
                    {row.image ? (
                      <Image
                        src={row.image}
                        alt={row.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-slate-300">
                        <ImageIcon size={20} />
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">
                    {row.title || "Fasilitas baru"}
                  </p>
                  <p className="max-w-md truncate text-xs text-slate-500">
                    {row.description || "Belum ada deskripsi"}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${row.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                  >
                    {row.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={!i}
                    onClick={() => move(i, i - 1)}
                    className="p-2 disabled:opacity-20"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    type="button"
                    disabled={i === items.length - 1}
                    onClick={() => move(i, i + 1)}
                    className="p-2 disabled:opacity-20"
                  >
                    <ArrowDown size={15} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      title="Lihat"
                      onClick={() => open(row.clientKey, "view")}
                      className="p-2 text-slate-500"
                    >
                      <Eye size={17} />
                    </button>
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => open(row.clientKey, "edit")}
                      className="p-2 text-emerald-700"
                    >
                      <Pencil size={17} />
                    </button>
                    <button
                      type="button"
                      title="Hapus"
                      onClick={() =>
                        confirm(`Hapus fasilitas ${row.title || "ini"}?`) &&
                        setItems((x) =>
                          x.filter((y) => y.clientKey !== row.clientKey),
                        )
                      }
                      className="p-2 text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && (
          <div className="p-10 text-center text-sm text-slate-400">
            Belum ada fasilitas.
          </div>
        )}
      </div>
      {item && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {mode === "view" ? "Detail fasilitas" : "Edit fasilitas"}
                </h3>
                <p className="text-xs text-slate-500">
                  Klik Simpan Perubahan di halaman untuk menyimpan permanen.
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)}>
                <X size={20} />
              </button>
            </div>
            {mode === "view" ? (
              <div className="space-y-4">
                <div className="relative h-52 overflow-hidden rounded-xl bg-slate-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-slate-300">
                      <ImageIcon size={40} />
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-slate-600">{item.description}</p>
                <button
                  type="button"
                  onClick={() => setMode("edit")}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white"
                >
                  Edit data
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-1 block text-xs font-semibold">Ikon</span>
                  <select
                    value={item.icon}
                    onChange={(e) =>
                      update(item.clientKey, "icon", e.target.value)
                    }
                    className={input}
                  >
                    {icons.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-1 block text-xs font-semibold">Nama</span>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      update(item.clientKey, "title", e.target.value)
                    }
                    className={input}
                  />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-1 block text-xs font-semibold">
                    Deskripsi
                  </span>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      update(item.clientKey, "description", e.target.value)
                    }
                    rows={3}
                    className={input}
                  />
                </label>
                <div className="md:col-span-2">
                  <span className="mb-1 block text-xs font-semibold">
                    Gambar
                  </span>
                  <ImageUploadPreview
                    name={`facilityImage_${item.clientKey}`}
                    current={item.image}
                    removeName={`removeFacilityImage_${item.clientKey}`}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={item.isActive}
                    onChange={(e) =>
                      update(item.clientKey, "isActive", e.target.checked)
                    }
                  />
                  Tampilkan di website
                </label>
                <div className="flex justify-end md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white"
                  >
                    Simpan perubahan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
