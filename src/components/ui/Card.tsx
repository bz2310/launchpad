import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#1a1a1a] rounded-xl border border-[#333]',
        hover && 'hover:border-[#8b2bff] hover:shadow-lg hover:shadow-[#8b2bff]/10 transition-all cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-4 py-3 border-b border-[#333]', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-4 py-3 border-t border-[#333]', className)}>
      {children}
    </div>
  );
}
