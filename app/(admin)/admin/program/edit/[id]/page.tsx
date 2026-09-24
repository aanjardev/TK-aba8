import { notFound } from 'next/navigation'
import ProgramForm from '@/components/admin/ProgramForm'
import { getProgramById } from '@/lib/academics'
import { updateProgram } from '../../actions'
export default async function EditProgram({params}:{params:Promise<{id:string}>}){const {id}=await params;const data=await getProgramById(id);if(!data)notFound();return <ProgramForm action={updateProgram.bind(null,id)} values={data}/>}
