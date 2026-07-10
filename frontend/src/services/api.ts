import axios from 'axios'
import type { Product, Service, CartResponse, Order, AuthResponse, User, Scheduling } from '../types'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function getSessionId(): string {
  let sid = localStorage.getItem('sessionId')
  if (!sid) {
    sid = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : uuidv4()
    localStorage.setItem('sessionId', sid)
  }
  return sid
}

export const productService = {
  getAll: (categoria?: string, search?: string) =>
    api.get<Product[]>('/products', { params: { categoria, search } }).then(r => r.data),
  getById: (id: number) => api.get<Product>(`/products/${id}`).then(r => r.data),
  getCategories: () => api.get<string[]>('/products/categories').then(r => r.data),
  create: (data: Partial<Product>) => api.post<Product>('/products', data).then(r => r.data),
  update: (id: number, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data).then(r => r.data),
  delete: (id: number) => api.delete(`/products/${id}`),
}

export const serviceService = {
  getAll: () => api.get<Service[]>('/services').then(r => r.data),
  getById: (id: number) => api.get<Service>(`/services/${id}`).then(r => r.data),
  create: (data: Partial<Service>) => api.post<Service>('/admin/services', data).then(r => r.data),
  update: (id: number, data: Partial<Service>) => api.put<Service>(`/admin/services/${id}`, data).then(r => r.data),
  delete: (id: number) => api.delete(`/admin/services/${id}`),
}

export const cartService = {
  get: () => api.get<CartResponse>('/cart', { params: { sessionId: getSessionId() } }).then(r => r.data),
  add: (itemType: string, itemId: number, quantity = 1) =>
    api.post<CartResponse>('/cart/add', { sessionId: getSessionId(), itemType, itemId, quantity }).then(r => r.data),
  updateItem: (itemId: number, quantity: number) =>
    api.put<CartResponse>(`/cart/item/${itemId}`, null, { params: { sessionId: getSessionId(), quantity } }).then(r => r.data),
  removeItem: (itemId: number) =>
    api.delete<CartResponse>(`/cart/item/${itemId}`, { params: { sessionId: getSessionId() } }).then(r => r.data),
}

export const orderService = {
  checkout: (data: { nombre: string; email: string; telefono: string; direccion: string }) =>
    api.post<Order>('/orders/checkout', { sessionId: getSessionId(), ...data }).then(r => r.data),
  getById: (id: number) => api.get<Order>(`/orders/${id}`).then(r => r.data),
  pay: (id: number) => api.put<Order>(`/orders/${id}/pay`).then(r => r.data),
}

export const authService = {
  register: (data: { email: string; password: string; nombre?: string; telefono?: string; direccion?: string }) =>
    api.post<AuthResponse>('/auth/register', data).then(r => r.data),
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data).then(r => r.data),
  me: () => api.get<User>('/auth/me').then(r => r.data),
}

export const adminService = {
  getOrders: (status?: string) =>
    api.get<Order[]>('/admin/orders', { params: { status } }).then(r => r.data),
  updateOrderStatus: (id: number, status: string) =>
    api.put<Order>(`/admin/orders/${id}/status`, { status }).then(r => r.data),
  getScheduling: (estado?: string) =>
    api.get<Scheduling[]>('/admin/scheduling', { params: { estado } }).then(r => r.data),
  updateScheduling: (id: number, data: Partial<Scheduling>) =>
    api.put<Scheduling>(`/admin/scheduling/${id}`, data).then(r => r.data),
}
