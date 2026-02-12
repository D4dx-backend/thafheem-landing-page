import { useEffect, useMemo, useState } from 'react';
import { Globe, BookOpen, Headphones, Bookmark, Search, Bell, Badge, Clock, BookOpenIcon, WholeWordIcon, FileQuestionMark } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Thafheemul Qur’an is available in Urdu, Malayalam, English, Hindi, Tamil, and Bengali through its mobile apps and website , making the Qur’an and its Tafseer easily accessible to a wide and diverse audience. Users can study the Qur’an in their preferred language anytime, anywhere, across digital platforms.',
    color: 'from-[#0d9ba8] to-[#14b8c7]',
  },
  {
    icon: BookOpen,
    title: 'Word-by-Word Translation',
    description: 'Word-by-word translation helps readers understand the exact meaning of each Arabic word in the Qur’an, rather than only the general sense of a verse. It strengthens vocabulary, improves direct connection with the Qur’anic text, and supports deeper reflection during reading and study. This approach is especially valuable for learners, students, and anyone seeking a more accurate and conscious understanding of the Qur’an.',
    color: 'from-[#1e6f5c] to-[#2a9d8f]',
  },
  {
    icon: Headphones,
    title: 'Audio Recitation',
    description: 'The platform provides facilities to read and listen to the recitation by renowned Qaris, along with the translation and commentary of Thafheem-ul-Qur’an in Urdu and Malayalam.',
    color: 'from-[#d4af37] to-[#f4d03f]',
  },
  {
    icon: Bookmark,
    title: 'Bookmarking Features',
    description: 'Provides bookmarking features to save, organize, and revisit verses, blocks, interpretations, and audio for future reference.',
    color: 'from-[#0d9ba8] to-[#1e6f5c]',
  },
  {
    icon: Search,
    title: 'Search & Navigate',
    description: 'Easy search and smooth navigation, including AI-powered search, to quickly find verses and content.',
    color: 'from-[#14b8c7] to-[#0d9ba8]',
  },
  {
    icon: Bell,
    title: 'Daily Reminders',
    description: 'Personalized reminders to support and guide daily life.',
    color: 'from-[#1e6f5c] to-[#0a7a85]',
  },
  {
    icon: Badge,
    title: 'Countinue to Read',
    description: 'Automatically saves reading progress and allows users to resume reading from the last accessed verse.',
    color: 'from-[#1e6f5c] to-[#0a7a85]',
  },
  {
    icon: Clock,
    title: 'Prayer Times',
    description: 'Provides accurate prayer times calculated according to both Shafi and Hanafi schools of jurisprudence.',
    color: 'from-[#1e6f5c] to-[#0a7a85]',
  },
  {
    icon: BookOpenIcon,
    title: 'Mushaf',
    description: 'The app features a beautifully rendered Uthmani Mushaf for an authentic and elegant reading experience.',
    color: 'from-[#1e6f5c] to-[#0a7a85]',
  },
  {
    icon: WholeWordIcon,
    title: 'Word Meaning Game',
    description: 'An interactive drag-and-drop game designed to help users study and understand word meanings effectively.',
    color: 'from-[#1e6f5c] to-[#0a7a85]',
  },
  {
    icon: FileQuestionMark,
    title: 'Quiz',
    description: 'An interactive drag-and-drop game designed to help users study and understand word meanings effectively.',
    color: 'from-[#1e6f5c] to-[#0a7a85]',
  },
];

const Features = () => {
  const [cardsPerView, setCardsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(cardsPerView);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
        return;
      }

      if (window.innerWidth < 1024) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canSlide = features.length > cardsPerView;

  const displayFeatures = useMemo(() => {
    if (!canSlide) {
      return features;
    }

    return [
      ...features.slice(-cardsPerView),
      ...features,
      ...features.slice(0, cardsPerView),
    ];
  }, [canSlide, cardsPerView]);

  useEffect(() => {
    if (!canSlide) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [canSlide]);

  useEffect(() => {
    setCurrentIndex(cardsPerView);
    setIsAnimating(true);
  }, [cardsPerView]);

  useEffect(() => {
    if (isAnimating) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isAnimating]);

  const activeDotIndex = canSlide
    ? (currentIndex - cardsPerView + features.length) % features.length
    : 0;

  const handleTransitionEnd = () => {
    if (!canSlide) {
      return;
    }

    if (currentIndex >= features.length + cardsPerView) {
      setIsAnimating(false);
      setCurrentIndex(cardsPerView);
    }
  };

  return (
    <section
      id="features"
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

        {/* Features Slider */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              transition: isAnimating ? 'transform 700ms ease-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {displayFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
              <div
                key={`${feature.title}-${index}`}
                className="shrink-0 px-4"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="feature-card group relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
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
                    </div>
              );
            })}
          </div>
        </div>

        {features.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {features.map((_, featureIndex) => (
              <button
                key={`feature-dot-${featureIndex}`}
                type="button"
                onClick={() => {
                  setIsAnimating(true);
                  setCurrentIndex(cardsPerView + featureIndex);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  activeDotIndex === featureIndex
                    ? 'w-8 bg-[#0d9ba8]'
                    : 'w-2.5 bg-[#0d9ba8]/30 hover:bg-[#0d9ba8]/50'
                }`}
                aria-label={`Go to feature slide ${featureIndex + 1}`}
              />
            ))}
          </div>
        )}

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
