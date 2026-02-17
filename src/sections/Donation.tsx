import { useEffect, useRef, useState } from 'react';
import { Heart, Shield } from 'lucide-react';

const RAZORPAY_DONATION_URL = 'https://pages.razorpay.com/thafheem-donation';

const Donation = () => {
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
      id="donate"
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-20" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#0d9ba8]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#d4af37]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="inline-block px-4 py-2 bg-[#0d9ba8]/10 rounded-full text-sm font-medium text-[#0d9ba8] mb-4">
                Support Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
                Support This <span className="text-gradient">Noble Cause</span>
              </h2>
              <p className="text-lg text-[#4a5568] leading-relaxed">
                Your Support helps us maintain and improve the app, add new languages,
                and reach more Muslims worldwide. Every contribution, no matter how small,
                makes a difference.
              </p>
            </div>

          </div>

          {/* Donation CTA Card */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-4 text-center">
                Be Part of This Ongoing Sadaqah
              </h3>
              <p className="text-[#4a5568] leading-relaxed text-center mb-6">
                Help us continue improving the app, expanding language support, and
                delivering reliable Quran learning features for everyone.
              </p>

              <a
                href={RAZORPAY_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0d9ba8] hover:bg-[#0a7a85] text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#0d9ba8]/30 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Support Now
              </a>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#4a5568]">
                <Shield className="w-4 h-4" />
                <span>Secure support gateway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
