import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ayahwiseImage from '/images/ayahwise.jpeg';
import bookmarksImage from '/images/bookmarks.jpeg';
import dailyPrayerImage from '/images/daily-prayer.jpeg';
import expandedMenuImage from '/images/expanded-menu.jpeg';
import landingImage from '/images/landing.jpeg';
import qiblaFinderImage from '/images/qibla-finder.jpeg';
import suraListingImage from '/images/sura-listing.jpeg';
import urduImage from '/images/urdu.jpeg';
import hindiImage from '/images/hindi.jpeg';
import englishImage from '/images/english.jpeg';
import banglaImage from '/images/bangla.jpeg';
import wideSettingsImage from '/images/wide-settings.jpeg';

const screenshots = [
  {
    src: ayahwiseImage,
    title: 'Ayah-Wise Reading',
    description: 'Read verses clearly with elegant Arabic text and translation flow.',
  },
  {
    src: bookmarksImage,
    title: 'Smart Bookmarks',
    description: 'Save verses, blocks, interpretations, and audio in one place.',
  },
  {
    src: dailyPrayerImage,
    title: 'Daily Prayer Companion',
    description: 'Track prayer times, dhikr, and essential daily worship tools.',
  },
  {
    src: expandedMenuImage,
    title: 'Clean Navigation Menu',
    description: 'Access Quran, library, feedback, settings, and privacy quickly.',
  },
  {
    src: landingImage,
    title: 'Branded App Experience',
    description: 'A polished launch screen with lightweight startup flow.',
  },
  {
    src: qiblaFinderImage,
    title: 'Qibla Finder',
    description: 'Find accurate Qibla direction with location-based guidance.',
  },
  {
    src: suraListingImage,
    title: 'Surah Listing',
    description: 'Browse surahs with clean cards, metadata, and quick continue.',
  },
  {
    src: urduImage,
    title: 'Urdu Reading Mode',
    description: 'Explore Surah listing and reading flow with Urdu language support.',
  },
  {
    src: hindiImage,
    title: 'Hindi Reading Mode',
    description: 'Navigate the app in Hindi with localized Surah and UI labels.',
  },
  {
    src: englishImage,
    title: 'English Reading Mode',
    description: 'Use the complete Quran experience with clean English localization.',
  },
  {
    src: banglaImage,
    title: 'Bangla Reading Mode',
    description: 'Read and browse in Bangla with a familiar and intuitive interface.',
  },
  {
    src: wideSettingsImage,
    title: 'Advanced Settings',
    description: 'Fine-tune theme, fonts, language, audio, and reading preferences.',
  },
];

const Screenshots = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const getSlideStyle = (index: number) => {
    const total = screenshots.length;
    const forwardDistance = (index - activeIndex + total) % total;
    let diff: number;

    if (forwardDistance === 0) {
      diff = 0;
    } else if (forwardDistance <= 2) {
      diff = forwardDistance;
    } else if (forwardDistance >= total - 2) {
      diff = forwardDistance - total;
    } else {
      return {
        transform: 'translateX(0) scale(0.55)',
        opacity: 0,
        zIndex: 0,
      };
    }

    const absDistance = Math.abs(diff);

    const slideOpacity = absDistance === 0 ? 1 : absDistance === 1 ? 0.2 : 0.08;

    return {
      transform: `translateX(${diff * 44}%) scale(${1 - absDistance * 0.2}) rotateY(${-diff * 10}deg)`,
      opacity: slideOpacity,
      zIndex: 10 - absDistance,
    };
  };

  return (
    <section
      id="screenshots"
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f8fafb] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8fafb] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Experience the <span className="text-gradient">Beauty</span>
          </h2>
          <p
            className={`text-lg text-[#4a5568] max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            See how Thafheemul Quran brings the divine words to your fingertips
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative h-[390px] sm:h-[520px] perspective-1000 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  ...getSlideStyle(index),
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative w-[170px] sm:w-[220px] rounded-[2rem] bg-[#111827] p-2.5 shadow-[0_16px_40px_rgba(17,24,39,0.28)]">
                  <div className="absolute left-1/2 top-[10px] -translate-x-1/2 w-14 h-1.5 rounded-full bg-white/40" />
                  <img
                    src={screenshot.src}
                    alt={screenshot.title}
                    className="w-full h-auto rounded-[1.5rem] object-cover border border-white/20"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0d9ba8] hover:text-white transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0d9ba8] hover:text-white transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Active Slide Label */}
        <div className="mt-6 sm:mt-8 min-h-[74px] px-4 text-center">
          <p className="font-bold text-[#1a1a2e]">{screenshots[activeIndex].title}</p>
          <p className="text-sm text-[#4a5568] max-w-xl mx-auto">
            {screenshots[activeIndex].description}
          </p>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-6">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-[#0d9ba8] w-8'
                  : 'bg-[#0d9ba8]/30 hover:bg-[#0d9ba8]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
