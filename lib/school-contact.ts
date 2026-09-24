import { prisma } from '@/lib/prisma'

export type SchoolContactData = { sectionTitle:string; sectionDescription:string; address:string; district:string; regency:string; postalCode:string; phone:string; whatsapp:string; email:string; serviceHours:string; mapEmbedUrl:string; mapDirectionsUrl:string; whatsappDefaultMessage:string }
export const DEFAULT_SCHOOL_CONTACT: SchoolContactData = {
  sectionTitle:'Kunjungi Kami', sectionDescription:'Kami siap membantu orang tua mendapatkan informasi tentang sekolah, program belajar, dan pendaftaran siswa baru.',
  address:'Jl. Raya Pepen No. 45, RT 02 / RW 03, Kelurahan Pepen', district:'Kepanjen', regency:'Kabupaten Malang', postalCode:'65163',
  phone:'(0341) 395123', whatsapp:'6281234567890', email:'info@tkaba8kepanjen.sch.id', serviceHours:'Senin – Jumat, 07:30 – 16:00 WIB',
  mapEmbedUrl:'https://www.google.com/maps?q=Kepanjen%20Malang&output=embed', mapDirectionsUrl:'https://www.google.com/maps/search/?api=1&query=Kepanjen%20Malang',
  whatsappDefaultMessage:'Halo Admin TK ABA 8 Kepanjen, saya ingin bertanya mengenai informasi sekolah.',
}
export async function getSchoolContact():Promise<SchoolContactData>{const rows=await prisma.$queryRaw<SchoolContactData[]>`SELECT sectionTitle,sectionDescription,address,district,regency,postalCode,phone,whatsapp,email,serviceHours,mapEmbedUrl,mapDirectionsUrl,whatsappDefaultMessage FROM SchoolContact WHERE id='main' LIMIT 1`.catch(()=>[]);return rows[0]??DEFAULT_SCHOOL_CONTACT}
export const contactAddress=(c:SchoolContactData)=>[c.address,c.district,c.regency,c.postalCode].filter(Boolean).join(', ')
export const whatsappHref=(phone:string,message:string)=>`https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`
