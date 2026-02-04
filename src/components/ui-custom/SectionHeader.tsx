'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  titleClassName,
}: SectionHeaderProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12',
        alignClasses[align],
        isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-6',
        className
      )}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 bg-springer-red/10 text-springer-red text-sm font-medium rounded-full mb-4">
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        'text-2xl md:text-3xl lg:text-4xl font-semibold text-springer-charcoal mb-4',
        titleClassName
      )}>
        {title}
      </h2>
      {description && (
        <p className="text-springer-gray text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
