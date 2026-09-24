"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageIcon, Upload } from "lucide-react";
export default function ImageUploadPreview({
  name = "image",
  current = "",
  removeName = "removeImage",
  accept = "image/jpeg,image/png,image/webp",
  hint = "JPG, PNG, atau WebP; maksimal 5 MB.",
}: {
  name?: string;
  current?: string | null;
  removeName?: string;
  accept?: string;
  hint?: string;
}) {
  const [preview, setPreview] = useState(current || "");
  useEffect(
    () => () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:flex-row sm:items-center">
      <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white sm:w-36">
        {preview ? (
          <Image
            src={preview}
            alt="Preview gambar"
            fill
            sizes="144px"
            unoptimized={preview.startsWith("blob:")}
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-slate-300">
            <ImageIcon size={25} />
            <span className="text-[10px] font-semibold">Belum ada gambar</span>
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800">
          <Upload size={14} />
          Pilih gambar
          <input
            name={name}
            type="file"
            accept={accept}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="sr-only"
          />
        </label>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{hint}</p>
        {current && (
          <label className="mt-2 flex items-center gap-2 text-xs font-semibold text-red-600">
            <input
              name={removeName}
              type="checkbox"
              onChange={(e) => setPreview(e.target.checked ? "" : current)}
            />
            Hapus gambar aktif
          </label>
        )}
      </div>
    </div>
  );
}
