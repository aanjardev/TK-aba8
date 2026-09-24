'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton({children,className=''}:{children:React.ReactNode;className?:string}) {
  const {pending}=useFormStatus()
  return <button disabled={pending} className={`${className} disabled:cursor-wait disabled:opacity-60`}>{pending?'Menyimpan…':children}</button>
}

export function ConfirmButton({children,message,className='',formAction,disabled=false}:{children:React.ReactNode;message:string;className?:string;formAction:(data:FormData)=>void|Promise<void>;disabled?:boolean}) {
  const {pending}=useFormStatus()
  return <button data-confirmed="true" disabled={disabled||pending} formAction={formAction} onClick={event=>{if(!window.confirm(message))event.preventDefault()}} className={`${className} disabled:cursor-wait disabled:opacity-50`}>{pending?'Memproses…':children}</button>
}
