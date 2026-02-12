import { useEffect, useRef, useState } from 'react';
import appStoreBadge from '/images/appstore.png';
import playStoreBadge from '/images/playstore.png';

const DownloadCTA = () => {
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

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0a7a85] via-[#0d9ba8] to-[#1e6f5c]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 islamic-pattern" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      {/* Floating Phone Mockups */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <div className="w-48 h-96 bg-white/10 rounded-[2rem] transform -rotate-12" />
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <div className="w-48 h-96 bg-white/10 rounded-[2rem] transform rotate-12" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Download Thafheemul Quran Today
        </h2>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Available on iOS and Android. Start your journey of Quranic understanding now.
        </p>

        {/* Store Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* App Store Button */}
          <a
            href="https://apps.apple.com/in/app/thafheem-ul-quran/id1292572556"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl"
          >
            <img
              src={appStoreBadge}
              alt="Download on the App Store"
              className="h-14 sm:h-16 w-auto rounded-xl"
            />
          </a>

          {/* Play Store Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.d4media.thafheem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl"
          >
            <img
              src={playStoreBadge}
              alt="Get it on Google Play"
              className="h-14 sm:h-16 w-auto rounded-xl"
            />
          </a>
        </div>

        {/* Note */}
        <p
          className={`text-white/70 text-sm transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Free to download. No ads. No subscriptions.
        </p>

        {/* Language Pills */}
        <div
          className={`flex flex-wrap justify-center gap-2 mt-8 transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {['English', 'മലയാളം', 'اردو', 'தமிழ்', 'বাংলা', 'हिंदी'].map((lang) => (
            <span
              key={lang}
              className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/90 border border-white/20"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
