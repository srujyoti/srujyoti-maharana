import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, Github, Twitter, Monitor, Mouse, Headphones, Keyboard, Gamepad2, CheckCircle } from 'lucide-react';
import { Product, CartItem, ViewState } from './types';
import { ProductCard } from './components/Shop/ProductCard';
import { ProductDetails } from './components/Shop/ProductDetails';
import { CartDrawer } from './components/Shop/CartDrawer';
import { GeminiAssistant } from './components/AI/GeminiAssistant';
import { Button } from './components/ui/Button';

// Mock Data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Viper Ultimate X",
    category: "Mouse",
    price: 129.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-lightweight wireless gaming mouse with 20K DPI optical sensor and 70 hours battery life. Designed for esports professionals who demand speed and precision.",
    specs: { performance: 95, durability: 85, ergonomics: 92, features: 80, value: 85 },
    features: ["20K DPI Focus+ Sensor", "74g Lightweight Design", "Optical Mouse Switch"]
  },
  {
    id: 2,
    name: "BlackWidow V4 Pro",
    category: "Keyboard",
    price: 229.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    description: "Mechanical gaming keyboard with immersive underglow, dedicated macro keys, and a magnetic plush wrist rest. The command center for your battlestation.",
    specs: { performance: 90, durability: 98, ergonomics: 95, features: 100, value: 75 },
    features: ["Green Mechanical Switches", "Chroma RGB Underglow", "Multi-function Roller"]
  },
  {
    id: 3,
    name: "Kraken Kitty Edition",
    category: "Headset",
    price: 149.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612738980340-a1cf226315c1?auto=format&fit=crop&q=80&w=800",
    description: "Create your own meow-factor with the kitty ear gaming headset powered by Chroma RGB. Stream reactive lighting and THX Spatial Audio.",
    specs: { performance: 85, durability: 80, ergonomics: 88, features: 95, value: 80 },
    features: ["Stream Reactive Lighting", "Active Noise Canceling Mic", "THX Spatial Audio"]
  },
  {
    id: 4,
    name: "Raptor 27 165Hz",
    category: "Monitor",
    price: 399.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    description: "IPS gaming monitor with 165Hz refresh rate and 1ms response time. Supports G-Sync and HDR400 for vivid colors and tear-free gaming.",
    specs: { performance: 92, durability: 90, ergonomics: 85, features: 88, value: 90 },
    features: ["165Hz Refresh Rate", "1ms (GTG) Response", "NVIDIA G-Sync Compatible"]
  },
  {
    id: 5,
    name: "RTX 4090 Founder",
    category: "GPU",
    price: 1599.99,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
    description: "The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics. Experience ultra-high performance gaming.",
    specs: { performance: 100, durability: 95, ergonomics: 70, features: 100, value: 60 },
    features: ["24GB GDDR6X Memory", "Ada Lovelace Architecture", "DLSS 3.0 Support"]
  },
  {
    id: 6,
    name: "Stream Deck Mk.2",
    category: "Keyboard",
    price: 149.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&q=80&w=800",
    description: "15 LCD keys poised to launch unlimited actions. One-touch tactile operation lets you control apps, launch posts, adjust audio and more.",
    specs: { performance: 88, durability: 90, ergonomics: 95, features: 98, value: 85 },
    features: ["15 LCD Keys", "Customizable Faceplates", "Multi-Action Macros"]
  }
];

const CATEGORIES = [
  { name: 'All', icon: CheckCircle },
  { name: 'Mouse', icon: Mouse },
  { name: 'Keyboard', icon: Keyboard },
  { name: 'Headset', icon: Headphones },
  { name: 'Monitor', icon: Monitor },
  { name: 'GPU', icon: Gamepad2 },
];

function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Navigation Logic
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView(ViewState.PRODUCT_DETAILS);
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setView(ViewState.HOME);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  // Filtering
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-cyber selection:text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={goHome}>
              <div className="w-10 h-10 bg-cyber clip-path-polygon flex items-center justify-center mr-3 group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
                <span className="text-black font-display font-black text-xl">N</span>
              </div>
              <span className="font-display font-bold text-xl tracking-wider group-hover:text-cyber transition-colors">NEXUS</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search gear..." 
                  className="bg-dark-card border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-cyber/50 w-64 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:text-cyber transition-colors">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-neon-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsCartOpen(true)} className="mr-4 relative">
                <ShoppingBag size={24} />
                 {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-800 p-4 border-b border-white/10">
            <input 
              type="text" 
              placeholder="Search gear..." 
              className="w-full bg-dark-card border border-white/10 rounded p-2 mb-4 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="space-y-2">
              <button className="block w-full text-left py-2 hover:text-cyber" onClick={goHome}>Home</button>
              <button className="block w-full text-left py-2 hover:text-cyber">Account</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {view === ViewState.HOME && (
          <>
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden mb-12 group h-[400px] sm:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600" 
                alt="Gaming Setup" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-8 sm:p-16 z-20 max-w-2xl">
                <span className="text-cyber font-bold tracking-widest uppercase mb-2 block animate-fade-in-up">Level Up Your Game</span>
                <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 leading-tight animate-fade-in-up delay-100">
                  NEXT GEN <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber to-neon-purple">PERFORMANCE</span>
                </h1>
                <p className="text-gray-300 mb-8 text-lg animate-fade-in-up delay-200">
                  Equip yourself with the most advanced gaming hardware. Precision engineered for victory.
                </p>
                <Button variant="primary" size="lg" className="animate-fade-in-up delay-300">
                  Shop Collection
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-4 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setCategoryFilter(cat.name)}
                    className={`flex items-center px-6 py-3 rounded-full border transition-all whitespace-nowrap ${
                      categoryFilter === cat.name
                        ? 'bg-cyber text-black border-cyber font-bold'
                        : 'bg-dark-card border-white/10 text-gray-400 hover:border-cyber/50 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  onClick={handleProductClick}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-6 rounded-full bg-dark-card mb-4">
                  <Search size={48} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No gear found</h3>
                <p className="text-gray-400">Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        )}

        {view === ViewState.PRODUCT_DETAILS && selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            onBack={goHome} 
            onAddToCart={addToCart} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-cyber clip-path-polygon flex items-center justify-center mr-2">
                <span className="text-black font-display font-bold">N</span>
              </div>
              <span className="font-display font-bold text-lg tracking-wider">NEXUS</span>
            </div>
            <p className="text-gray-500 text-sm">
              Forging the future of gaming equipment. <br />
              Powered by innovation.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-cyber cursor-pointer">New Arrivals</li>
              <li className="hover:text-cyber cursor-pointer">Best Sellers</li>
              <li className="hover:text-cyber cursor-pointer">Sale</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-cyber cursor-pointer">FAQ</li>
              <li className="hover:text-cyber cursor-pointer">Shipping</li>
              <li className="hover:text-cyber cursor-pointer">Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Github className="text-gray-500 hover:text-white cursor-pointer" />
              <Twitter className="text-gray-500 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>

      {/* Global Components */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onCheckout={() => {
            alert('Checkout feature simulated. Thank you for your order!');
            clearCart();
            setIsCartOpen(false);
        }}
      />
      <GeminiAssistant />
      
    </div>
  );
}

export default App;