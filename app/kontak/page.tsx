// app/kontak/page.tsx
'use client'
import { useState } from 'react'

export default function KontakPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Mengirim...')
    // Di sini nanti akan diintegrasikan dengan Supabase
    setTimeout(() => {
      setStatus('Pesan terkirim!')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Hubungi Kami</h1>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-4">Informasi Kontak</h2>
          <div className="space-y-4">
            <p><strong>📍 Alamat:</strong> Jl. Pendidikan No. 123, Yogyakarta</p>
            <p><strong>📞 Telepon:</strong> (0274) 123456</p>
            <p><strong>✉️ Email:</strong> info@tkaba8.sch.id</p>
            <p><strong>🕒 Jam Operasional:</strong> Senin - Jumat, 07:30 - 16:00</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Kirim Pesan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Anda"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email Anda"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <textarea
              placeholder="Pesan"
              rows={5}
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Kirim Pesan
            </button>
            {status && <p className="text-green-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}