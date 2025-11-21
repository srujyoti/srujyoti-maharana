import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  return (
    <div className="group relative flex flex-col h-full glass-panel overflow-hidden hover:border-cyber/50 transition-all duration-300">
      {/* Image Container */}
      <div 
        className="relative h-64 overflow-hidden cursor-pointer bg-dark-800"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded text-cyber text-xs font-bold border border-cyber/30">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="text-lg font-display font-bold text-white group-hover:text-cyber transition-colors cursor-pointer"
            onClick={() => onClick(product)}
          >
            {product.name}
          </h3>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < Math.floor(product.rating) ? "text-neon-pink fill-neon-pink" : "text-gray-600"} 
            />
          ))}
          <span className="text-xs text-gray-400 ml-2">{product.rating.toFixed(1)}</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="group/btn"
          >
            <ShoppingCart size={16} className="mr-2 group-hover/btn:text-cyber" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};