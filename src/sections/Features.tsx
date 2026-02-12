import { useEffect, useRef, useState } from 'react';
import { Globe, BookOpen, Headphones, Bookmark, Search, Bell } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Read and understand the Quran in 12+ languages including English, Malayalam, Urdu, Tamil, and Bengali.',
    color: 'from-[#0d9ba8] to-[#14b8c7]',
  },
  {
    icon: BookOpen,
    title: 'Word-by-Word Translation',
    description: 'Detailed word-by-word translation and tafseer to deepen your understanding of every verse.',
    color: 'from-[#1e6f5c] to-[#2a9d8f]',
  },
  {
    icon: Headphones,
    title: 'Audio Recitation',
    description: 'Listen to beautiful recitations from world-renowned Qaris with crystal-clear audio quality.',
    color: 'from-[#d4af37] to-[#f4d03f]',
  },
  {
    icon: Bookmark,
    title: 'Bookmark & Notes',
    description: 'Save your favorite verses and add personal notes for reflection and study.',
    color: 'from-[#0d9ba8] to-[#1e6f5c]',
  },
  {
    icon: Search,
    title: 'Search & Navigate',
    description: 'Quickly find any verse or topic with our powerful search and intuitive navigation.',
    color: 'from-[#14b8c7] to-[#0d9ba8]',
  },
  {
    icon: Bell,
    title: 'Daily Reminders',
    description: 'Set personalized reminders for daily Quran reading and maintain consistent habits.',
    color: 'from-[#1e6f5c] to-[#0a7a85]',
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 bg-[#f8fafb] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-[#0d9ba8]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#d4af37]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-4 scroll-animate">
            Powerful Features for{' '}
            <span className="text-gradient">Every Muslim</span>
          </h2>
          <p className="text-lg text-[#4a5568] max-w-2xl mx-auto scroll-animate stagger-1">
            Discover the tools that make Thafheemul Quran the perfect companion for your spiritual journey
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                data-index={index}
                className={`feature-card group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  visibleCards[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#0d9ba8] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#4a5568] leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#0d9ba8]/20 transition-colors duration-300" />

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0d9ba8]/5 to-transparent transform rotate-45 translate-x-16 -translate-y-16" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 scroll-animate">
          <p className="text-[#4a5568] mb-4">
            And many more features to enhance your Quran reading experience
          </p>
          <div className="inline-flex items-center gap-2 text-[#0d9ba8] font-semibold">
            <span className="w-8 h-0.5 bg-[#0d9ba8]" />
            <span>100% Free, No Ads</span>
            <span className="w-8 h-0.5 bg-[#0d9ba8]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
