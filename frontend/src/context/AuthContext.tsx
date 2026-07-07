import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authService } from '../services/api'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; password: string; nombre?: string }) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      authService.me().then(setUser).catch(() => { setToken(null); localStorage.removeItem('token') })
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password })
    localStorage.setItem('token', res.token)
    setToken(res.token)
    setUser({ id: res.userId, email: res.email, nombre: res.nombre, telefono: '', direccion: '', rol: res.rol })
  }

  const register = async (data: { email: string; password: string; nombre?: string }) => {
    const res = await authService.register(data)
    localStorage.setItem('token', res.token)
    setToken(res.token)
    setUser({ id: res.userId, email: res.email, nombre: res.nombre, telefono: '', direccion: '', rol: res.rol })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin: user?.rol === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
