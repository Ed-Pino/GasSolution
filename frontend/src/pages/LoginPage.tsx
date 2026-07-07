import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch { setError('Credenciales inválidas') }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Iniciar Sesión</h1>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 rounded-xl w-full px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
          className="border border-gray-300 rounded-xl w-full px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" required />
        <button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white w-full py-3 rounded-full font-semibold transition-colors">
          Ingresar
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600 text-sm">
        ¿No tienes cuenta? <Link to="/register" className="text-blue-700 hover:underline font-medium">Regístrate</Link>
      </p>
      <p className="text-center mt-2 text-xs text-gray-400">
        Admin: admin@gassolutions.com / admin123
      </p>
    </div>
  )
}
