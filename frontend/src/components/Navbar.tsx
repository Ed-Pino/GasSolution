import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-yellow-300' : 'text-white hover:text-yellow-200'}`

  return (
    <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/logo.png" alt="GasSolutions" className="h-12 w-auto" />
            <div>
              <p className="text-sm sm:text-base font-bold leading-tight">GasSolutions</p>
              <p className="text-[10px] sm:text-xs text-blue-200 leading-tight">Bogotá · 314 253 3524</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/products" className={navLinkClass}>Productos</NavLink>
            <NavLink to="/services" className={navLinkClass}>Servicios</NavLink>

            {isAdmin && (
              <NavLink to="/admin" className={() => 'text-sm font-medium text-yellow-300 hover:text-yellow-200 transition-colors'}>
                Admin
              </NavLink>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center gap-1 text-sm font-medium hover:text-yellow-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold uppercase">
                  {user.nombre.charAt(0)}
                </div>
                <span className="text-sm hidden lg:inline">{user.nombre.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="text-sm text-red-300 hover:text-red-200 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                Ingresar
              </Link>
            )}
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(o => !o)} className="p-1">
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900 px-4 pb-4 space-y-1">
          <NavLink to="/products" className={() => 'block py-3 px-2 text-sm font-medium text-white hover:text-yellow-200'} onClick={() => setMenuOpen(false)}>Productos</NavLink>
          <NavLink to="/services" className={() => 'block py-3 px-2 text-sm font-medium text-white hover:text-yellow-200'} onClick={() => setMenuOpen(false)}>Servicios</NavLink>
          {isAdmin && <NavLink to="/admin" className={() => 'block py-3 px-2 text-sm font-medium text-yellow-300'} onClick={() => setMenuOpen(false)}>Admin</NavLink>}
          <hr className="border-blue-700 my-1" />
          {user ? (
            <div className="flex items-center justify-between py-3 px-2">
              <span className="text-sm text-white">{user.nombre}</span>
              <button onClick={() => { logout(); setMenuOpen(false) }} className="text-sm text-red-300 font-medium">Salir</button>
            </div>
          ) : (
            <Link to="/login" className="block bg-orange-500 text-white text-sm font-semibold px-4 py-3 rounded-full text-center mt-2" onClick={() => setMenuOpen(false)}>
              Ingresar
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
