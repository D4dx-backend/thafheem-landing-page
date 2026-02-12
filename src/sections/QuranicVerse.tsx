import { useEffect, useRef, useState } from 'react';

const verseTranslations = [
  'അല്ലാഹുവിന് കടം കൊടുക്കുന്നവരാരുണ്ട്? വിശിഷ്ടമായ കടം; അല്ലാഹു അത് പലയിരട്ടി വര്‍ധിപ്പിച്ചു തിരിച്ചേകാന്‍. അപ്രകാരം കടം കൊടുക്കുന്നവന്ന് ശ്രേഷ്ഠമായ പ്രതിഫലവുമുണ്ട്.',
  'Who is it that will give Allah a beautiful loan? A loan that Allah will repay after increasing it many times and grant him a generous reward.',
  'کون ہے جو اللہ کو قرض دے؟ اچھا قرض، تاکہ اللہ اسے کئی گُنا بڑھا کر واپس دے، اور اُس کے لیے بہترین اجر ہے .',
  'அல்லாஹ்விற்குக் கடன் கொடுப்பவர் யார்? அழகிய கடன்! அல்லாஹ் அதனைப் பன்மடங்கு பெருக்கி அவருக்குத் திரும்பக் கொடுப்பதற்காக! மேலும், அவருக்கு மிகச் சிறந்த கூலியும் இருக்கின்றது.',
  'এমন কেউ কি আছে যে আল্লাহকে ঋণ দিতে পারে? উত্তম ঋণ যাতে আল্লাহ‌ তা কয়েকগুণ বৃদ্ধি করে ফেরত দেন। আর সেদিন তার জন্য রয়েছে সর্বোত্তম প্রতিদান১৬',
];

const QuranicVerse = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTranslationIndex, setActiveTranslationIndex] = useState(0);

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveTranslationIndex((prev) => (prev + 1) % verseTranslations.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 bg-[#f2f4f7]"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-[#e8edf2] px-4 sm:px-8 py-8 sm:py-10">
            <p className="text-[1.5rem] sm:text-4xl amiri-regular text-[#111827] leading-[1.7]">
              مَنْ ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ وَلَهُ أَجْرٌ كَرِيمٌ
            </p>
            <p
              key={activeTranslationIndex}
              className="mt-6 text-lg sm:text-2xl text-[#374151] italic leading-relaxed animate-fade-in-up"
            >
              {verseTranslations[activeTranslationIndex]}
            </p>
            <p className="mt-5 text-[#0d9ba8] font-semibold text-xl">
              - Surah Al-Hadid 57:11
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuranicVerse;
