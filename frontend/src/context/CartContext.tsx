import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { cartService } from '../services/api'
import type { CartItem } from '../types'

interface CartContextType {
  items: CartItem[]
  total: number
  count: number
  loading: boolean
  refresh: () => Promise<void>
  addItem: (itemType: 'PRODUCT' | 'SERVICE', itemId: number, quantity?: number) => Promise<void>
  updateItem: (itemId: number, quantity: number) => Promise<void>
  removeItem: (itemId: number) => Promise<void>
  clear: () => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => { refresh() }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await cartService.get()
      setItems(res.items)
      setTotal(res.total)
    } catch { /* ignore */ } finally { setLoading(false) }
  }

  const addItem = async (itemType: 'PRODUCT' | 'SERVICE', itemId: number, quantity = 1) => {
    await cartService.add(itemType, itemId, quantity)
    await refresh()
  }

  const updateItem = async (itemId: number, quantity: number) => {
    if (quantity <= 0) { await removeItem(itemId); return }
    await cartService.updateItem(itemId, quantity)
    await refresh()
  }

  const removeItem = async (itemId: number) => {
    const removed = items.find(i => i.id === itemId)
    if (removed) {
      setItems(prev => prev.filter(i => i.id !== itemId))
      setTotal(prev => prev - removed.subtotal)
    }
    try { await cartService.removeItem(itemId) } catch { await refresh() }
  }

  const clear = () => { setItems([]); setTotal(0) }

  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, total, count, loading, refresh, addItem, updateItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
