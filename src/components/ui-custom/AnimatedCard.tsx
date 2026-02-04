'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = 'up'
}: AnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const getAnimationClass = () => {
    switch (direction) {
      case 'left':
        return isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8';
      case 'right':
        return isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8';
      case 'scale':
        return isVisible ? 'animate-scale-in' : 'opacity-0 scale-95';
      default:
        return isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-6';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        getAnimationClass(),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
