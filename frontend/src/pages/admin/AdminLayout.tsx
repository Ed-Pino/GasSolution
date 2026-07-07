import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AdminProducts from './AdminProducts'
import AdminServices from './AdminServices'
import AdminOrders from './AdminOrders'
import AdminScheduling from './AdminScheduling'

function AdminSidebar() {
  const location = useLocation()
  const links = [
    { to: '/admin', label: 'Dashboard', exact: true },
    { to: '/admin/products', label: 'Productos' },
    { to: '/admin/services', label: 'Servicios' },
    { to: '/admin/orders', label: 'Pedidos' },
    { to: '/admin/scheduling', label: 'Agenda' },
  ]

  return (
    <div className="w-64 bg-azul-energia text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map(link => (
          <Link key={link.to} to={link.to}
            className={`block px-4 py-2 rounded ${
              link.exact ? location.pathname === link.to ? 'bg-azul-pureza' : ''
              : location.pathname.startsWith(link.to) ? 'bg-azul-pureza' : 'hover:bg-blue-800'
            }`}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-azul-pureza/20 p-6 rounded-lg hover:bg-azul-pureza/30">
          <h3 className="font-bold text-lg">Productos</h3>
          <p className="text-gray-600">Gestionar catálogo</p>
        </Link>
        <Link to="/admin/services" className="bg-purple-50 p-6 rounded-lg hover:bg-purple-100">
          <h3 className="font-bold text-lg">Servicios</h3>
          <p className="text-gray-600">Gestionar servicios técnicos</p>
        </Link>
        <Link to="/admin/orders" className="bg-green-50 p-6 rounded-lg hover:bg-green-100">
          <h3 className="font-bold text-lg">Pedidos</h3>
          <p className="text-gray-600">Ver y gestionar pedidos</p>
        </Link>
        <Link to="/admin/scheduling" className="bg-yellow-50 p-6 rounded-lg hover:bg-yellow-100">
          <h3 className="font-bold text-lg">Agenda</h3>
          <p className="text-gray-600">Programar visitas técnicas</p>
        </Link>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const { isAdmin } = useAuth()
  if (!isAdmin) return <Navigate to="/" />

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="scheduling" element={<AdminScheduling />} />
        </Routes>
      </div>
    </div>
  )
}
