'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { parseJsonList } from '@/lib/admin-utils'

const value = (data: FormData, key: string) => String(data.get(key) ?? '').trim()
const required = (data: FormData, key: string, label: string) => { const result = value(data, key); if (!result) throw new Error(`${label} wajib diisi.`); return result }
const strings=(data:FormData,key:string,label:string)=>parseJsonList(data,key,label,(raw,index)=>{const item=raw as Record<string,unknown>,text=String(item.text??'').trim();if(!text)throw new Error(`${label} ${index+1} wajib diisi.`);return text})

export async function updateVisionMission(data: FormData) {
  if (!(await getServerSession(authOptions))?.user) throw new Error('Anda harus login sebagai admin.')
  const missions=parseJsonList(data,'missions','Misi',(raw,index)=>{const item=raw as Record<string,unknown>,title=String(item.title??'').trim(),description=String(item.description??'').trim();if(!title||!description)throw new Error(`Misi ${index+1} belum lengkap.`);return{title,description}})
  const pageTitle = required(data, 'pageTitle', 'Judul halaman')
  const introduction = required(data, 'introduction', 'Pengantar')
  const visionTitle = required(data, 'visionTitle', 'Judul visi')
  const visionDescription = required(data, 'visionDescription', 'Deskripsi visi')
  const visionPoints = strings(data, 'visionPoints','Poin visi')
  const goals = strings(data, 'goals','Tujuan')
  await prisma.$executeRaw`INSERT INTO VisionMissionSettings(id,pageTitle,introduction,visionTitle,visionDescription,visionPoints,missions,goals,createdAt,updatedAt) VALUES('main',${pageTitle},${introduction},${visionTitle},${visionDescription},${JSON.stringify(visionPoints)},${JSON.stringify(missions)},${JSON.stringify(goals)},NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE pageTitle=VALUES(pageTitle),introduction=VALUES(introduction),visionTitle=VALUES(visionTitle),visionDescription=VALUES(visionDescription),visionPoints=VALUES(visionPoints),missions=VALUES(missions),goals=VALUES(goals),updatedAt=NOW(3)`
  revalidatePath('/')
  revalidatePath('/tentang/visi-misi')
  revalidatePath('/admin/visi-misi')
  redirect('/admin/visi-misi?saved=1')
}
