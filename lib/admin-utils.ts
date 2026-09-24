import crypto from 'node:crypto'
import path from 'node:path'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function requireAdmin() { const session=await getServerSession(authOptions); if(!session?.user?.email) throw new Error('Sesi berakhir. Silakan login kembali.'); return session }
export const formText=(data:FormData,key:string)=>String(data.get(key)??'').trim()
export function requiredText(data:FormData,key:string,label:string){const value=formText(data,key);if(!value)throw new Error(`${label} wajib diisi.`);return value}
export function optionalUrl(data:FormData,key:string,label:string){const value=formText(data,key);if(!value)return null;try{const url=new URL(value);if(!['http:','https:'].includes(url.protocol))throw new Error();return url.toString()}catch{throw new Error(`${label} harus berupa URL http/https yang valid.`)}}
export function safeInternalUrl(data:FormData,key:string,label:string){const value=requiredText(data,key,label);if(value.startsWith('/')&&!value.startsWith('//'))return value;try{const url=new URL(value);if(['http:','https:'].includes(url.protocol))return url.toString()}catch{}throw new Error(`${label} harus berupa path internal atau URL http/https.`)}
export function parseJsonList<T>(data:FormData,key:string,label:string,validate:(item:unknown,index:number)=>T){try{const raw=JSON.parse(requiredText(data,key,label));if(!Array.isArray(raw))throw new Error();return raw.map(validate)}catch(error){if(error instanceof Error&&error.message.includes('wajib'))throw error;throw new Error(`${label} tidak valid.`)}}

type SaveOptions={folder:string;field:string;types:Record<string,string>;maxMb:number}
export async function saveUpload(data:FormData,{folder,field,types,maxMb}:SaveOptions){const file=data.get(field) as File|null;if(!file?.size)return undefined;const ext=types[file.type];if(!ext)throw new Error(`Format ${field} tidak didukung.`);if(file.size>maxMb*1024*1024)throw new Error(`Ukuran ${field} maksimal ${maxMb} MB.`);const root=path.join(process.cwd(),'public','uploads',folder);await mkdir(root,{recursive:true});const name=`${Date.now()}-${crypto.randomUUID()}.${ext}`;await writeFile(path.join(root,name),Buffer.from(await file.arrayBuffer()));return `/uploads/${folder}/${name}`}
export async function removeUpload(file:string|null|undefined,folder:string){if(!file?.startsWith(`/uploads/${folder}/`))return;const root=path.resolve(process.cwd(),'public','uploads',folder),target=path.resolve(process.cwd(),'public',file.slice(1));if(target.startsWith(`${root}${path.sep}`))await unlink(target).catch(()=>undefined)}
