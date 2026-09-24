import StaffForm from '@/components/admin/StaffForm'
import { createStaff } from '../actions'

export default function TambahGuru() { return <StaffForm action={createStaff} /> }
