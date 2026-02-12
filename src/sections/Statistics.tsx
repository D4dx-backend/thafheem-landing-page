import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50, suffix: 'K+', label: 'Active Users' },
  { value: 6, suffix: '', label: 'Languages Supported' },
  { value: 4.7, suffix: '★', label: 'App Store Rating' },
  { value: 12, suffix: '+', label: 'Qari Recitations' },
];

const CountUp = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  isVisible 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;
      
      setCount(Number.isInteger(end) ? Math.floor(currentValue) : Number(currentValue.toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Statistics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-r from-[#0a7a85] via-[#0d9ba8] to-[#1e6f5c] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 islamic-pattern" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 glow-gold">
                <CountUp 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  isVisible={isVisible}
                  duration={2000 + index * 200}
                />
              </div>
              <p className="text-white/80 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
            isVisible ? 'translate-x-full' : '-translate-x-full'
          }`}
          style={{ transitionDuration: '2s' }}
        />
      </div>
    </section>
  );
};

export default Statistics;
