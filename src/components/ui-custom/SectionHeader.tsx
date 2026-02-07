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
        <span className="inline-block px-6 lg:py-1.5 py-1 bg-red-50 border border-red-200 text-springer-red lg:text-sm text-xs font-medium rounded-full mb-4">
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        'text-xl md:text-2xl lg:text-3xl font-semibold text-springer-charcoal mb-4',
        titleClassName
      )}>
        {title}
      </h2>
      {description && (
        <p className="text-springer-gray text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
