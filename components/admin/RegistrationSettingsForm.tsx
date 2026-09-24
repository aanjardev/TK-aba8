'use client'

import { useState } from 'react'
import { CreditCard, Download, FileText, ListOrdered, Save, Sparkles } from 'lucide-react'
import AdminTabs from '@/components/admin/AdminTabs'
import type { RegistrationSettingsData } from '@/lib/registration-settings'
import { updateRegistrationSettings } from '@/app/(admin)/admin/pendaftaran/actions'
import DynamicListEditor from '@/components/admin/DynamicListEditor'
import { SubmitButton } from '@/components/admin/FormControls'

const tabs = [
  { id: 'status', name: 'Status & Promosi', icon: Sparkles },
  { id: 'flow', name: 'Syarat & Alur', icon: ListOrdered },
  { id: 'fees', name: 'Biaya & Bank', icon: CreditCard },
  { id: 'files', name: 'Brosur & Formulir', icon: Download },
]
const field = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'

export default function RegistrationSettingsForm({ settings }: { settings: RegistrationSettingsData }) {
  const [activeTab, setActiveTab] = useState('status')
  const [isOpen, setIsOpen] = useState(settings.isOpen)
  const [showHome, setShowHome] = useState(settings.showHomeSection)

  return <form action={updateRegistrationSettings} className="space-y-6">
    <AdminTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} actions={<SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-emerald-950 hover:bg-amber-400"><Save size={17} />Simpan Perubahan</SubmitButton>} />
    <div className="min-h-96 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <section className={activeTab === 'status' ? 'space-y-7' : 'hidden'}>
        <SectionTitle title="Status dan promosi PPDB" description="Atur periode penerimaan dan kemunculan informasi PPDB di beranda." />
        <div className="grid gap-4 md:grid-cols-2">
          <Toggle name="isOpen" checked={isOpen} onChange={setIsOpen} title="Pendaftaran sedang dibuka" description="Mengatur label status yang dilihat calon wali murid." />
          <Toggle name="showHomeSection" checked={showHome} onChange={setShowHome} title="Tampilkan section PPDB di beranda" description="Nonaktifkan untuk menyembunyikan section PPDB dari halaman depan." />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Tahun ajaran"><input name="academicYear" defaultValue={settings.academicYear} className={field} required /></Field>
          <Field label="Gelombang saat ini"><input name="currentWave" defaultValue={settings.currentWave} className={field} required /></Field>
          <Field label="Kuota / ketersediaan"><input name="quota" defaultValue={settings.quota} className={field} required /></Field>
        </div>
        <Field label="Judul promosi"><input name="promoTitle" defaultValue={settings.promoTitle} className={field} required /></Field>
        <Field label="Deskripsi promosi"><textarea name="promoDescription" defaultValue={settings.promoDescription} rows={4} className={`${field} resize-y`} required /></Field>
        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Teks tombol CTA"><input name="ctaLabel" defaultValue={settings.ctaLabel} className={field} required /></Field>
          <Field label="Tujuan tombol"><select name="ctaDestination" defaultValue={settings.ctaDestination} className={field}><option value="form">Halaman info pendaftaran</option><option value="whatsapp">Chat WhatsApp</option><option value="brochure">Unduh brosur</option></select></Field>
          <Field label="Nomor WhatsApp" hint="Gunakan format negara, contoh 6281234567890"><input name="whatsappNumber" defaultValue={settings.whatsappNumber} className={field} inputMode="numeric" /></Field>
        </div>
      </section>

      <section className={activeTab === 'flow' ? 'space-y-7' : 'hidden'}>
        <SectionTitle title="Persyaratan dan alur pendaftaran" description="Data ini ditampilkan lengkap pada halaman informasi pendaftaran." />
        <Field label="Persyaratan" hint="Tulis satu persyaratan per baris."><textarea name="requirements" defaultValue={settings.requirements.join('\n')} rows={8} className={`${field} resize-y`} required /></Field>
        <DynamicListEditor name="steps" label="Tahapan pendaftaran" initial={settings.steps} newItem={{title:'',description:''}} min={1} fields={[{key:'title',label:'Judul'},{key:'description',label:'Deskripsi',kind:'textarea'}]}/>
      </section>

      <section className={activeTab === 'fees' ? 'space-y-7' : 'hidden'}>
        <SectionTitle title="Rincian biaya dan rekening" description="Berikan informasi biaya yang transparan kepada calon wali murid." />
        <DynamicListEditor name="fees" label="Komponen biaya" initial={settings.fees} newItem={{label:'',amount:''}} min={1} fields={[{key:'label',label:'Nama komponen'},{key:'amount',label:'Nominal'}]}/>
        <Field label="Catatan biaya / keringanan"><textarea name="feeNote" defaultValue={settings.feeNote} rows={3} className={`${field} resize-y`} /></Field>
        <div className="grid gap-5 border-t border-slate-100 pt-6 md:grid-cols-3"><Field label="Nama bank"><input name="bankName" defaultValue={settings.bankName} className={field} /></Field><Field label="Nomor rekening"><input name="bankAccount" defaultValue={settings.bankAccount} className={field} /></Field><Field label="Atas nama"><input name="bankHolder" defaultValue={settings.bankHolder} className={field} /></Field></div>
      </section>

      <section className={activeTab === 'files' ? 'space-y-7' : 'hidden'}>
        <SectionTitle title="Dokumen PPDB" description="Unggah dokumen yang dapat diunduh oleh calon wali murid." />
        <div className="grid gap-5 md:grid-cols-2">
          <DocumentField icon={Download} title="Brosur PPDB" name="brochureFile" accept="application/pdf,image/jpeg,image/png,image/webp" current={settings.brochureFile} hint="PDF/JPG/PNG/WebP, maksimal 8 MB" />
          <DocumentField icon={FileText} title="Formulir pendaftaran cetak" name="registrationFormFile" accept="application/pdf" current={settings.registrationFormFile} hint="PDF, maksimal 8 MB" />
        </div>
      </section>
    </div>
  </form>
}

function SectionTitle({ title, description }: { title: string; description: string }) { return <div className="border-b border-slate-100 pb-4"><h2 className="text-xl font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div> }
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>{children}{hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}</label> }
function Toggle({ name, checked, onChange, title, description }: { name: string; checked: boolean; onChange: (value: boolean) => void; title: string; description: string }) { return <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-5 ${checked ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}><span><span className="block text-sm font-bold text-slate-900">{title}</span><span className="mt-1 block text-xs leading-relaxed text-slate-500">{description}</span></span><input type="checkbox" name={name} checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 shrink-0 accent-emerald-600" /></label> }
function DocumentField({ icon: Icon, title, name, accept, current, hint }: { icon: typeof Download; title: string; name: string; accept: string; current: string; hint: string }) { const removeName=name==='brochureFile'?'removeBrochureFile':'removeRegistrationFormFile';return <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6"><Icon className="mb-3 text-emerald-600" size={28} /><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-xs text-slate-500">{hint}</p>{current&&<><a href={current} target="_blank" className="mt-3 block truncate text-xs font-semibold text-emerald-700 hover:underline">File aktif: {current.split('/').pop()}</a><label className="mt-2 flex gap-2 text-xs text-red-600"><input name={removeName} type="checkbox"/>Hapus file aktif</label></>}<input type="file" name={name} accept={accept} className="mt-5 block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-2 file:font-bold file:text-white" /></div> }
