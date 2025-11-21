import React from 'react';
import { X, Trash2, CreditCard, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types';
import { Button } from '../ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-dark-card border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-dark-900">
            <h2 className="text-xl font-display font-bold text-white flex items-center">
              <ShoppingBag className="mr-2 text-cyber" /> Your Loadout
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p>Your inventory is empty.</p>
                <Button variant="outline" size="sm" onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-white/5 rounded border border-white/5 hover:border-cyber/30 transition-colors">
                  <div className="w-20 h-20 bg-dark-800 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-gray-200 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-cyber mt-1">${item.price}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-dark-900 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-400">Total</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <Button variant="primary" className="w-full" onClick={onCheckout}>
                <CreditCard className="mr-2" size={18} /> Secure Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};