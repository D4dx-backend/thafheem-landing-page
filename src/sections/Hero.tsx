import { useEffect, useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import homeImage from '/images/home.png';
import prayImage from '/images/pray.png';
import settingsImage from '/images/settings.png';

const verseTranslations = [
  {
    language: 'Malayalam',
    dir: 'ltr',
    text: 'അല്ലാഹുവിന് കടം കൊടുക്കുന്നവരാരുണ്ട്? വിശിഷ്ടമായ കടം; അല്ലാഹു അത് പലയിരട്ടി വര്‍ധിപ്പിച്ചു തിരിച്ചേകാന്‍. അപ്രകാരം കടം കൊടുക്കുന്നവന്ന് ശ്രേഷ്ഠമായ പ്രതിഫലവുമുണ്ട്.',
  },
  {
    language: 'English',
    dir: 'ltr',
    text: 'Who is it that will give Allah a beautiful loan? A loan that Allah will repay after increasing it many times and grant him a generous reward.',
  },
  {
    language: 'Urdu',
    dir: 'rtl',
    text: 'کون ہے جو اللہ کو قرض دے؟ اچھا قرض، تاکہ اللہ اسے کئی گُنا بڑھا کر واپس دے، اور اُس کے لیے بہترین اجر ہے .',
  },
  {
    language: 'Tamil',
    dir: 'ltr',
    text: 'அல்லாஹ்விற்குக் கடன் கொடுப்பவர் யார்? அழகிய கடன்! அல்லாஹ் அதனைப் பன்மடங்கு பெருக்கி அவருக்குத் திரும்பக் கொடுப்பதற்காக! மேலும், அவருக்கு மிகச் சிறந்த கூலியும் இருக்கின்றது.',
  },
  {
    language: 'Bangla',
    dir: 'ltr',
    text: 'এমন কেউ কি আছে যে আল্লাহকে ঋণ দিতে পারে? উত্তম ঋণ যাতে আল্লাহ‌ তা কয়েকগুণ বৃদ্ধি করে ফেরত দেন। আর সেদিন তার জন্য রয়েছে সর্বোত্তম প্রতিদান১৬',
  },
  {
    language: 'Hindi',
    dir: 'ltr',
    text: 'कौन है जो अल्लाह को क़र्ज़ दे? अच्छा क़र्ज़, ताकि अल्लाह उसे कई गुना बढ़ाकर वापस दे, और उसके लिए बेहतरीन बदला है,',
  },
] as const;

const heroSlides = [
  {
    src: homeImage,
    alt: 'Thafheemul Quran app home screen',
  },
  {
    src: prayImage,
    alt: 'Thafheemul Quran prayer screen',
  },
  {
    src: settingsImage,
    alt: 'Thafheemul Quran settings screen',
  },
];

const Hero = () => {
  const [activeTranslationIndex, setActiveTranslationIndex] = useState(0);
  const [activeHeroSlideIndex, setActiveHeroSlideIndex] = useState(0);
  const activeTranslation = verseTranslations[activeTranslationIndex];
  const activeTranslationFontClass =
    activeTranslation.language === 'Urdu'
      ? 'urdu-text'
      : activeTranslation.language === 'Malayalam'
        ? 'malayalam-text'
        : '';

  useEffect(() => {
    const translationTimeout = window.setTimeout(() => {
      setActiveTranslationIndex((prev) => (prev + 1) % verseTranslations.length);
    }, 4000);

    return () => window.clearTimeout(translationTimeout);
  }, [activeTranslationIndex]);

  useEffect(() => {
    const heroSliderInterval = window.setInterval(() => {
      setActiveHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => window.clearInterval(heroSliderInterval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden bg-gradient-light"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 islamic-pattern opacity-50" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#0d9ba8]/10 animate-float-slow" />
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-[#d4af37]/20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 right-1/3 w-8 h-8 rounded-full bg-[#0d9ba8]/15 animate-float-slow" style={{ animationDelay: '2s' }} />
      
      {/* Crescent Moon Decoration */}
      <div className="absolute top-32 right-20 opacity-10 animate-float-slow">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path
            d="M40 0C17.909 0 0 17.909 0 40s17.909 40 40 40c5.495 0 10.73-1.11 15.5-3.117C42.5 71.5 30 57.5 30 40S42.5 8.5 55.5 3.117C50.73 1.11 45.495 0 40 0z"
            fill="#0d9ba8"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* <div className="inline-flex rounded-2xl bg-[#0f1722] p-4 shadow-xl scroll-animate">
              <img
                src={heroLogo}
                alt="Thafheemul Quran logo"
                className="h-12 sm:h-14 lg:h-16 w-[220px] sm:w-[280px] lg:w-[340px] object-contain"
              />
            </div> */}

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-tight scroll-animate stagger-1">
                Support
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient leading-tight scroll-animate stagger-2">
                Thafheemul Quran
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-[#4a5568] max-w-xl leading-relaxed scroll-animate stagger-4">
              Join us in spreading the understanding of Allah's words through your generous 
              contribution. Help us make the Quran accessible to millions worldwide.
            </p>

            {/* Compact Verse + Translation */}
            <div className="max-w-xl bg-white/90 backdrop-blur-sm border border-[#e8edf2] rounded-2xl px-4 py-4 sm:px-5 sm:py-5 shadow-lg scroll-animate stagger-4">
              <p className="text-lg sm:text-xl amiri-regular text-[#111827] leading-relaxed">
                مَنْ ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ وَلَهُ أَجْرٌ كَرِيمٌ
              </p>
              <p
                key={activeTranslationIndex}
                dir={activeTranslation.dir}
                className={`mt-3 text-sm sm:text-base text-[#374151] italic leading-relaxed animate-fade-in-up min-h-[4.5rem] ${activeTranslationFontClass}`}
              >
                {activeTranslation.text}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#6b7280] font-medium">
                {activeTranslation.language}
              </p>
              <p className="mt-2 text-[#0d9ba8] font-semibold text-sm sm:text-base">
                - Surah Al-Hadid 57:11
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 scroll-animate stagger-5">
              <Button
                onClick={() => scrollToSection('#donate')}
                className="bg-[#0d9ba8] hover:bg-[#0a7a85] text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#0d9ba8]/30 hover:-translate-y-1 flex items-center gap-2 animate-pulse-glow"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Button>
              <Button
                onClick={() => scrollToSection('#features')}
                variant="outline"
                className="border-2 border-[#0d9ba8] text-[#0d9ba8] hover:bg-[#0d9ba8] hover:text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Screenshot Column */}
          <div className="relative flex justify-center lg:justify-end scroll-animate-right">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[500px] aspect-[3/4]">
              {heroSlides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(13,155,168,0.25)] transition-opacity duration-1000 ${
                    activeHeroSlideIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
