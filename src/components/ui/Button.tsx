'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-full transition-all',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b2bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // Variants
            'bg-[#8b2bff] hover:bg-[#b366ff] text-white': variant === 'primary',
            'bg-[#2a2a2a] hover:bg-[#1a1a1a] text-white': variant === 'secondary',
            'bg-transparent hover:bg-[#2a2a2a] text-white': variant === 'ghost',
            'border border-[#333] hover:border-[#8b2bff] text-white bg-transparent': variant === 'outline',
            // Sizes
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
