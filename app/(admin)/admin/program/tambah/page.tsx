import ProgramForm from '@/components/admin/ProgramForm'
import { createProgram } from '../actions'
export default function AddProgram(){return <ProgramForm action={createProgram}/>}
