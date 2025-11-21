export interface ProductSpecs {
  performance: number;
  durability: number;
  ergonomics: number;
  features: number;
  value: number;
}

export interface Product {
  id: number;
  name: string;
  category: 'Mouse' | 'Keyboard' | 'Headset' | 'Monitor' | 'GPU';
  price: number;
  rating: number;
  image: string;
  description: string;
  specs: ProductSpecs;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum ViewState {
  HOME = 'HOME',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  CHECKOUT = 'CHECKOUT'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}