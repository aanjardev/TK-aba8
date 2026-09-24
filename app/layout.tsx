import './globals.css'
import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/site-settings'

export async function generateMetadata():Promise<Metadata>{const site=await getSiteSettings();return{title:{default:site.shortName,template:`%s | ${site.shortName}`},description:site.longName,icons:site.favicon?{icon:site.favicon}:undefined}}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  )
}
