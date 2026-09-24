import { CheckCircle2, Save } from 'lucide-react'
import AdminSectionTabs from '@/components/admin/AdminSectionTabs'
import { getFacilities, getSchoolHistory, getSchoolProfile, type FacilityData, type SchoolHistoryData, type SchoolProfileData } from '@/lib/school-about'
import { saveFacilities, saveHistory, saveProfile } from './actions'
import DynamicListEditor from '@/components/admin/DynamicListEditor'
import { SubmitButton } from '@/components/admin/FormControls'
import ImageUploadPreview from '@/components/admin/ImageUploadPreview'
import FacilityListEditor from '@/components/admin/FacilityListEditor'

const input = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
const icons = ['BookOpen', 'Trees', 'Palette', 'Library', 'HeartPulse', 'MonitorPlay', 'Building2']

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string; tab?: string }> }) {
  const [profile, history, facilities, query] = await Promise.all([getSchoolProfile(), getSchoolHistory(), getFacilities(), searchParams])
  const active = query.saved || query.tab || 'profil'
  return <div className="space-y-5">
    {query.saved && <div className="flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800"><CheckCircle2 size={18}/>Data berhasil disimpan.</div>}
    <AdminSectionTabs initialTab={active} tabs={[
      { id: 'profil', label: 'Profil & Sambutan', description: '', content: <ProfileForm data={profile}/> },
      { id: 'sejarah', label: 'Sejarah Sekolah', description: '', content: <HistoryForm data={history}/> },
      { id: 'fasilitas', label: 'Fasilitas Sekolah', description: 'Kelola sarana yang ditampilkan pada halaman fasilitas.', content: <FacilitiesForm data={facilities}/> },
    ]}/>
  </div>
}

function ProfileForm({ data }: { data: SchoolProfileData }) { const fields=[['npsn','NPSN',data.npsn],['accreditation','Status / akreditasi',data.accreditation],['foundedYear','Tahun berdiri',data.foundedYear],['operationalPermit','Nomor izin operasional',data.operationalPermit],['permitIssuer','Penerbit izin',data.permitIssuer]]; return <Form title="Profil & Sambutan" action={saveProfile}><Grid><Field label="Judul halaman"><input name="pageTitle" defaultValue={data.pageTitle} className={input} required/></Field><Field label="Nama kepala sekolah"><input name="principalName" defaultValue={data.principalName} className={input} required/></Field></Grid><Field label="Pengantar halaman"><textarea name="introduction" defaultValue={data.introduction} rows={3} className={input} required/></Field><Field label="Foto kepala sekolah"><ImageUploadPreview name="principalPhoto" current={data.principalPhoto} removeName="removePrincipalPhoto"/></Field><Field label="Sambutan kepala sekolah"><textarea name="welcomeMessage" defaultValue={data.welcomeMessage} rows={7} className={input} required/></Field><Grid>{fields.map(([name,label,value])=><Field key={name} label={label}><input name={name} defaultValue={value} className={input} required/></Field>)}</Grid></Form> }

function HistoryForm({ data }: { data: SchoolHistoryData }) { return <Form title="Sejarah Sekolah" action={saveHistory}><Grid><Field label="Judul halaman"><input name="historyPageTitle" defaultValue={data.pageTitle} className={input} required/></Field><Field label="Judul cerita"><input name="storyTitle" defaultValue={data.storyTitle} className={input} required/></Field></Grid><Field label="Pengantar halaman"><textarea name="historyIntroduction" defaultValue={data.introduction} rows={3} className={input} required/></Field><Field label="Cerita sejarah"><textarea name="story" defaultValue={data.story} rows={5} className={input} required/></Field><Field label="Foto dokumentasi"><ImageUploadPreview name="historyImage" current={data.image} removeName="removeHistoryImage"/></Field><DynamicListEditor name="milestones" label="Tonggak sejarah" initial={data.milestones} newItem={{year:'',title:'',description:''}} min={1} fields={[{key:'year',label:'Tahun'},{key:'title',label:'Judul'},{key:'description',label:'Deskripsi',kind:'textarea'}]}/></Form> }

function FacilitiesForm({ data }: { data: FacilityData }) { return <Form title="Fasilitas Sekolah" action={saveFacilities}><Field label="Judul halaman"><input name="facilityPageTitle" defaultValue={data.pageTitle} className={input} required/></Field><Field label="Pengantar halaman"><textarea name="facilityIntroduction" defaultValue={data.introduction} rows={3} className={input} required/></Field><FacilityListEditor initial={data.facilities} icons={icons}/></Form> }

function Form({ title, action, children }: { title:string; action:(data:FormData)=>Promise<void>; children:React.ReactNode }) { return <form action={action} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><div className="border-b border-slate-100 pb-4"><h2 className="text-xl font-bold text-slate-900">{title}</h2></div>{children}<div className="flex justify-end border-t border-slate-100 pt-5"><SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-emerald-950"><Save size={17}/>Simpan Perubahan</SubmitButton></div></form> }
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>{children}</label>}
function Grid({children}:{children:React.ReactNode}){return <div className="grid gap-4 md:grid-cols-2">{children}</div>}
