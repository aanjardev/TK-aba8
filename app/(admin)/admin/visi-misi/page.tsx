import { CheckCircle2, Save } from 'lucide-react'
import { getVisionMission } from '@/lib/vision-mission'
import { updateVisionMission } from './actions'
import DynamicListEditor from '@/components/admin/DynamicListEditor'
import { SubmitButton } from '@/components/admin/FormControls'
import TabbedFormSections from '@/components/admin/TabbedFormSections'
const field='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm'
export default async function Page({searchParams}:{searchParams:Promise<{saved?:string}>}){const[data,q]=await Promise.all([getVisionMission(),searchParams]);return <div className="space-y-6">{q.saved==='1'&&<div className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><CheckCircle2 className="mr-2 inline" size={18}/>Visi, misi, dan tujuan berhasil disimpan.</div>}<form action={updateVisionMission}><TabbedFormSections actions={<SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-emerald-950"><Save size={17}/>Simpan Perubahan</SubmitButton>} tabs={[
{id:'info',label:'Informasi Halaman',description:'Atur judul dan pengantar halaman publik.',content:<><Field label="Judul halaman"><input name="pageTitle" defaultValue={data.pageTitle} className={field} required/></Field><Field label="Teks pengantar"><textarea name="introduction" defaultValue={data.introduction} rows={4} className={field} required/></Field></>},
{id:'visi',label:'Visi Sekolah',description:'Pernyataan arah utama beserta fokusnya.',content:<><Field label="Judul visi"><input name="visionTitle" defaultValue={data.visionTitle} className={field} required/></Field><Field label="Pernyataan visi"><textarea name="visionDescription" defaultValue={data.visionDescription} rows={4} className={field} required/></Field><DynamicListEditor name="visionPoints" label="Poin fokus visi" initial={data.visionPoints.map(text=>({text}))} newItem={{text:''}} min={1} fields={[{key:'text',label:'Poin visi'}]}/></>},
{id:'misi',label:'Misi Sekolah',description:'Langkah utama pencapaian visi.',content:<DynamicListEditor name="missions" label="Daftar misi" initial={data.missions} newItem={{title:'',description:''}} min={1} fields={[{key:'title',label:'Judul'},{key:'description',label:'Deskripsi',kind:'textarea'}]}/>},
{id:'tujuan',label:'Tujuan Sekolah',description:'Hasil pendidikan yang ingin dicapai.',content:<DynamicListEditor name="goals" label="Tujuan sekolah" initial={data.goals.map(text=>({text}))} newItem={{text:''}} min={1} fields={[{key:'text',label:'Tujuan',kind:'textarea'}]}/>},
]}/></form></div>}
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span>{children}</label>}
