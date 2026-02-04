import { useCountUp } from '@/hooks/useScrollAnimation';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({ 
  end, 
  suffix = '', 
  prefix = '',
  duration = 2000,
  className = ''
}: CounterProps) {
  const { count, countRef } = useCountUp(end, duration);

  return (
    <span ref={countRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
