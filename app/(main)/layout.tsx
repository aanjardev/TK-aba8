import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { getSchoolContact } from '@/lib/school-contact'
import { getSiteSettings } from '@/lib/site-settings'
import { getHomeHero } from '@/lib/home-hero'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [contact,site,hero] = await Promise.all([getSchoolContact(),getSiteSettings(),getHomeHero()])
  return (
    <>
      <Navbar site={site} />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <Footer site={site} contact={contact} description={hero.description} />
      <FloatingWhatsApp phoneNumber={contact.whatsapp} message={contact.whatsappDefaultMessage} />
    </>
  )
}
