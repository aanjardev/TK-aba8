import { notFound } from 'next/navigation'
import StaffForm from '@/components/admin/StaffForm'
import { prisma } from '@/lib/prisma'
import { updateStaff } from '../../actions'

export default async function EditGuru({ params }: PageProps<'/admin/guru/edit/[id]'>) { const { id } = await params; const item = await prisma.staff.findUnique({ where: { id } }); if (!item) notFound(); return <StaffForm item={item} action={updateStaff.bind(null, id)} /> }
