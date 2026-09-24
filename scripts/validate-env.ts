const required=['DATABASE_URL','NEXTAUTH_SECRET','NEXTAUTH_URL'] as const
const missing=required.filter(key=>!process.env[key]?.trim())
if(missing.length)throw new Error(`Environment variable wajib belum tersedia: ${missing.join(', ')}`)
const authUrl=new URL(process.env.NEXTAUTH_URL!)
if(process.env.NODE_ENV==='production'&&authUrl.protocol!=='https:'&&authUrl.hostname!=='localhost')throw new Error('NEXTAUTH_URL produksi wajib menggunakan HTTPS.')
if(process.env.NEXTAUTH_SECRET!.length<32)throw new Error('NEXTAUTH_SECRET minimal 32 karakter.')
new URL(process.env.DATABASE_URL!)
console.log('Environment configuration valid.')
