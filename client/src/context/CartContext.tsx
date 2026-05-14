import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Bike } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (bike: Bike, startDate: string, endDate: string, duration: { value: number; unit: 'hours' | 'days' }) => void;
  removeFromCart: (bikeId: string) => void;
  clearCart: () => void;
  totalAmount: number;
  totalDeposit: number;
}

const CartContext = createContext<CartContextType>(null!);

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (bike: Bike, startDate: string, endDate: string, duration: { value: number; unit: 'hours' | 'days' }) => {
    setItems((prev) => {
      if (prev.find((i) => i.bike._id === bike._id)) return prev;
      return [...prev, { bike, startDate, endDate, duration }];
    });
  };

  const removeFromCart = (bikeId: string) => {
    setItems((prev) => prev.filter((i) => i.bike._id !== bikeId));
  };

  const clearCart = () => setItems([]);

  const totalAmount = items.reduce((sum, item) => {
    const price = item.duration.unit === 'days' ? item.bike.pricing.perDay : item.bike.pricing.perHour;
    return sum + price * item.duration.value;
  }, 0);

  const totalDeposit = items.reduce((sum, item) => sum + item.bike.pricing.deposit, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalAmount, totalDeposit }}>
      {children}
    </CartContext.Provider>
  );
}
