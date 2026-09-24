import { CheckCircle2 } from 'lucide-react'
import { getRegistrationSettings } from '@/lib/registration-settings'
import RegistrationSettingsForm from '@/components/admin/RegistrationSettingsForm'

export default async function AdminPendaftaran({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [settings, query] = await Promise.all([getRegistrationSettings(), searchParams])
  return (
    <div className="space-y-6">
      {query.saved === '1' && <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><CheckCircle2 size={19} /> Pengaturan PPDB berhasil disimpan.</div>}
      <RegistrationSettingsForm settings={settings} />
    </div>
  )
}
