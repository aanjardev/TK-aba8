import { access,constants,mkdir,writeFile,unlink } from 'node:fs/promises'
import path from 'node:path'
import { prisma } from '../lib/prisma'
async function main(){await prisma.$queryRaw`SELECT 1`;const folder=path.join(process.cwd(),'public','uploads');await mkdir(folder,{recursive:true});await access(folder,constants.R_OK|constants.W_OK);const probe=path.join(folder,`.health-${Date.now()}`);await writeFile(probe,'ok');await unlink(probe);console.log(JSON.stringify({database:'ok',uploads:'writable',timestamp:new Date().toISOString()}))}
main().catch(error=>{console.error(JSON.stringify({status:'failed',message:error instanceof Error?error.message:'Unknown error'}));process.exitCode=1}).finally(()=>prisma.$disconnect())
