import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', nombre: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(form)
      navigate('/')
    } catch (err: unknown) { setError((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'Error al registrarse') }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Crear Cuenta</h1>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})}
          className="border border-gray-300 rounded-xl w-full px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          className="border border-gray-300 rounded-xl w-full px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" required />
        <input type="password" placeholder="Contraseña (mín. 6 caracteres)" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          className="border border-gray-300 rounded-xl w-full px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" required minLength={6} />
        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white w-full py-3 rounded-full font-semibold transition-colors">
          Registrarse
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600 text-sm">
        ¿Ya tienes cuenta? <Link to="/login" className="text-blue-700 hover:underline font-medium">Inicia Sesión</Link>
      </p>
    </div>
  )
}
