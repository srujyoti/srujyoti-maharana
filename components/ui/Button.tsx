import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-display uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-cyber text-black hover:bg-white hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] font-bold clip-path-polygon",
    secondary: "bg-dark-card border border-white/10 hover:border-cyber/50 text-white hover:text-cyber",
    outline: "bg-transparent border border-cyber text-cyber hover:bg-cyber/10",
    danger: "bg-red-600 text-white hover:bg-red-500"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ clipPath: variant === 'primary' ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' : 'none' }}
      {...props}
    >
      {children}
    </button>
  );
};