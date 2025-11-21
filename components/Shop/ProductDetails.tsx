import React from 'react';
import { ArrowLeft, ShoppingCart, Check, Zap, Star } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack, onAddToCart }) => {
  // Transform specs for Recharts
  const data = [
    { subject: 'Performance', A: product.specs.performance, fullMark: 100 },
    { subject: 'Durability', A: product.specs.durability, fullMark: 100 },
    { subject: 'Ergonomics', A: product.specs.ergonomics, fullMark: 100 },
    { subject: 'Features', A: product.specs.features, fullMark: 100 },
    { subject: 'Value', A: product.specs.value, fullMark: 100 },
  ];

  return (
    <div className="animate-fade-in pb-20">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft size={16} className="mr-2" /> Back to Shop
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image & Highlights */}
        <div className="space-y-6">
          <div className="glass-panel p-2 border-cyber/30 relative group">
            <div className="absolute inset-0 bg-cyber/5 animate-pulse rounded-lg"></div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto rounded object-cover relative z-10"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="glass-panel p-4 text-center border-white/5">
                <Zap className="mx-auto text-cyber mb-2" size={20} />
                <span className="text-xs text-gray-300 block">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Stats */}
        <div className="flex flex-col h-full">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <span className="px-3 py-1 bg-cyber/10 border border-cyber/30 text-cyber text-sm font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-neon-pink flex items-center font-bold">
              <Star className="fill-neon-pink mr-1" size={16} /> {product.rating} / 5.0
            </span>
          </div>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="glass-panel p-6 mb-8 border-white/5 bg-black/40">
            <h3 className="text-xl font-display text-white mb-4 flex items-center">
              <span className="w-2 h-6 bg-cyber mr-3"></span>
              Performance Analysis
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name={product.name}
                    dataKey="A"
                    stroke="#00f0ff"
                    strokeWidth={2}
                    fill="#00f0ff"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#00f0ff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="block text-sm text-gray-500">Total Price</span>
              <span className="text-4xl font-display font-bold text-white">${product.price}</span>
            </div>
            <Button variant="primary" size="lg" onClick={() => onAddToCart(product)} className="w-full sm:w-auto">
              <ShoppingCart className="mr-2" size={20} /> Add to Loadout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};