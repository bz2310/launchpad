import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  verified?: boolean;
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function Avatar({ src, alt, size = 'md', className, verified }: AvatarProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <Image
        src={src}
        alt={alt}
        width={size === 'xl' ? 64 : size === 'lg' ? 48 : size === 'md' ? 40 : size === 'sm' ? 32 : 24}
        height={size === 'xl' ? 64 : size === 'lg' ? 48 : size === 'md' ? 40 : size === 'sm' ? 32 : 24}
        className={cn(
          'rounded-full object-cover',
          sizeClasses[size]
        )}
      />
      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 bg-[#8b2bff] rounded-full p-0.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </div>
  );
}
