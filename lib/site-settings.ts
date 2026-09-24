import { prisma } from '@/lib/prisma'

export type SiteSettingsData = { schoolName:string; shortName:string; longName:string; logo:string; favicon:string; facebook:string; instagram:string; youtube:string }
export const DEFAULT_SITE_SETTINGS: SiteSettingsData = { schoolName:'TK Aisyiyah Bustanul Athfal 8 Kepanjen', shortName:'TK ABA 8 Kepanjen', longName:'Taman Kanak-kanak ‘Aisyiyah Bustanul Athfal', logo:'', favicon:'', facebook:'', instagram:'', youtube:'' }

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const row = await prisma.siteSettings.findUnique({ where:{ id:'main' }, select:{ schoolName:true,shortName:true,longName:true,logo:true,favicon:true,facebook:true,instagram:true,youtube:true } }).catch(()=>null)
  return row ? { ...row, logo:row.logo||'',favicon:row.favicon||'',facebook:row.facebook||'',instagram:row.instagram||'',youtube:row.youtube||'' } : DEFAULT_SITE_SETTINGS
}
