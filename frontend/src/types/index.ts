export interface Product {
  id: number
  nombre: string
  descripcion: string
  precioCOP: number
  categoria: string
  imagenUrl: string | null
  activo: boolean
}

export interface Service {
  id: number
  nombre: string
  descripcion: string
  precioCOP: number
  categoriaAplicable: string | null
  imagenUrl: string | null
  activo: boolean
}

export interface CartItem {
  id: number
  itemType: 'PRODUCT' | 'SERVICE'
  itemId: number
  nombre: string
  precioUnitario: number
  quantity: number
  subtotal: number
}

export interface CartResponse {
  sessionId: string
  items: CartItem[]
  total: number
}

export interface OrderItem {
  id: number
  itemType: string
  itemId: number
  quantity: number
  price: number
}

export interface Order {
  id: number
  nombre: string
  email: string
  telefono: string
  direccion: string
  total: number
  status: string
  createdAt: string
  items: OrderItem[]
}

export interface AuthResponse {
  token: string
  userId: number
  email: string
  nombre: string
  rol: string
}

export interface User {
  id: number
  email: string
  nombre: string
  telefono: string
  direccion: string
  rol: string
}

export interface Scheduling {
  id: number
  orderId: number
  serviceId: number
  nombreServicio: string
  fechaAsignada: string
  tecnico: string
  estado: string
  notas: string
}
