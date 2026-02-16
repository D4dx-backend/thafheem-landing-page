import { useEffect, useRef, useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aboutMissionImage from '/images/about-mission.jpg';

const aboutTranslations = [
  {
    language: 'English',
    dir: 'ltr',
    text: "The Holy Quran is the light given by Allah to mankind. That light spreads in the hearts of those who understand and recite it. No human should miss out on this light. Quranic commentaries help common people understand the Quran. Through this, the great task of delivering the Quran's message to all sections of society using contemporary language and digital technologies is achieved. Its specialty is a language and style that easily communicates with the minds of educated people.",
  },
  {
    language: 'Tamil',
    dir: 'ltr',
    text: 'புனித குர்ஆன் என்பது அல்லாஹ் மனிதகுலத்திற்கு வழங்கிய ஒளியாகும். அதைப் புரிந்துகொண்டு ஓதுபவர்களின் இதயங்களில் அந்த ஒளி பரவுகிறது. எந்தவொரு மனிதனும் இந்த ஒளியைப் பெறாமல் இருக்கக்கூடாது. குர்ஆன் விளக்கவுரை நூல்கள் சாதாரண மக்கள் குர்ஆனைப் புரிந்துகொள்ள உதவுகின்றன. இதன் மூலம் குர்ஆனின் செய்தியை சமகால மொழியிலும் டிஜிட்டல் தொழில்நுட்பங்கள் மூலமாகவும் சமூகத்தின் அனைத்துப் பிரிவினருக்கும் கொண்டு சேர்க்கும் மகத்தான பணி நடைபெறுகிறது. படித்தவர்களின் சிந்தனைகளோடு எளிதில் உரையாடும் மொழியும் நடையும் இதன் சிறப்பம்சமாகும்.',
  },
  {
    language: 'Hindi',
    dir: 'ltr',
    text: 'पवित्र कुरान अल्लाह द्वारा मानव जाति को दिया गया नूर (प्रकाश) है। यह नूर उन लोगों के दिलों में फैलता है जो इसे समझते और पढ़ते हैं। किसी भी इंसान को इस रोशनी से महरूम नहीं रहना चाहिए। कुरान की व्याख्या वाली किताबें आम लोगों को कुरान समझने में मदद करती हैं। इसके माध्यम से कुरान के संदेश को समकालीन भाषा और डिजिटल तकनीकों के जरिए समाज के सभी वर्गों तक पहुँचाने का महान कार्य हो रहा है। इसकी विशेषता वह भाषा और शैली है जो शिक्षित लोगों के मस्तिष्क से आसानी से संवाद करती है।',
  },
  {
    language: 'Urdu',
    dir: 'rtl',
    text: 'قرآنِ پاک وہ نور ہے جو اللہ نے انسانیت کو عطا کیا ہے۔ یہ نور ان لوگوں کے دلوں میں پھیلتا ہے جو اسے سمجھتے اور اس کی تلاوت کرتے ہیں۔ کسی بھی انسان کو اس روشنی سے محروم نہیں رہنا چاہیے۔ قرآن کی تفسیری کتب عام لوگوں کو قرآن سمجھنے میں مدد دیتی ہیں۔ اس کے ذریعے قرآن کے پیغام کو عصری زبان اور ڈیجیٹل ٹیکنالوجیز کے ذریعے معاشرے کے تمام طبقات تک پہنچانے کا عظیم کام ہو رہا ہے۔ اس کی خصوصیت وہ زبان اور اسلوب ہے جو تعلیم یافتہ لوگوں کے ذہنوں سے آسانی سے ہم کلام ہوتا ہے۔',
  },
  {
    language: 'Bangla',
    dir: 'ltr',
    text: 'পবিত্র কুরআন হলো আল্লাহ কর্তৃক মানবজাতিকে প্রদত্ত এক নূর বা আলো। যারা এটি বোঝে এবং পাঠ করে, তাদের হৃদয়ে সেই আলো ছড়িয়ে পড়ে। কোনো মানুষেরই এই আলো থেকে বঞ্চিত হওয়া উচিত নয়। কুরআনের তাফসীর বা ব্যাখ্যামূলক গ্রন্থগুলো সাধারণ মানুষকে কুরআন বুঝতে সাহায্য করে। এর মাধ্যমে সমসাময়িক ভাষা ও ডিজিটাল প্রযুক্তির ব্যবহার করে সমাজের সকল স্তরের মানুষের কাছে কুরআনের বাণী পৌঁছে দেওয়ার মহান কাজটি সম্পন্ন হচ্ছে। এর বৈশিষ্ট্য হলো এমন ভাষা ও শৈলী যা শিক্ষিত মানুষের মস্তিষ্কের সাথে সহজেই যোগাযোগ স্থাপন করে।',
  },
  {
    language: 'Malayalam',
    dir: 'ltr',
    text: 'അല്ലാഹു മനുഷ്യലോകത്തിന് നല്‍കിയ വെളിച്ചത്തിന്റെ പേരാണ് വിശുദ്ധ ഖുര്‍ആന്‍. അത് മനസ്സിലാക്കുകയും പാരായണം ചെയ്യുകയും ചെയ്യുന്നവരുടെ ഹൃദയങ്ങളിലാണ് വെട്ടം പരക്കുന്നത്. ഏതൊരു മനുഷ്യനും ഈ വെളിച്ചം കിട്ടാതെ പോയിക്കൂടാ. ഖുര്‍ആന്‍ മനസ്സിലാക്കാന്‍ സാധാരണക്കാരെ സഹായിക്കുകയാണല്ലോ ഖുര്‍ആന്‍ വ്യാഖ്യാന ഗ്രന്ഥങ്ങള്‍ ചെയ്യുന്നത്. ഖുർആന്റെ സന്ദേശം സമകാലിക ഭാഷയിലും ഡിജിറ്റൽ സാങ്കേതികവിദ്യകളിലൂടെയും സമൂഹത്തിലെ എല്ലാ വിഭാഗങ്ങളിലേക്കും എത്തിക്കുക എന്ന അതിമഹത്തായ കാര്യമാണ് ഇതുവഴി നടക്കുന്നത്. അഭ്യസ്തവിദ്യരായ മനുഷ്യരുടെ മസ്തിഷ്‌കങ്ങളുമായി അനായാസം സംവദിക്കുന്ന ഭാഷയും ശൈലിയും ഇതിന്റെ സവിശേഷതയുമാണ്.',
  },
] as const;

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeTranslation = aboutTranslations[activeTranslationIndex];
  const activeTranslationFontClass =
    activeTranslation.language === 'Urdu'
      ? 'urdu-text'
      : activeTranslation.language === 'Malayalam'
        ? 'malayalam-text'
        : '';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-[#fdfbf7] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-[#0d9ba8]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-60 h-60 bg-[#d4af37]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={aboutMissionImage}
                  alt="Muslim reading Quran"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d9ba8]/30 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#0d9ba8]/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#0d9ba8]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a2e]">50+</p>
                    <p className="text-sm text-[#4a5568]">Countries</p>
                  </div>
                </div>
                <p className="text-xs text-[#4a5568]">
                  Reaching Muslims worldwide
                </p>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-[#0d9ba8]/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-[#d4af37]/30 rounded-br-3xl" />
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <span className="inline-block px-4 py-2 bg-[#0d9ba8]/10 rounded-full text-sm font-medium text-[#0d9ba8] mb-4">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
            </div>

            <div
              className={`space-y-4 transition-all duration-700 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {aboutTranslations.map((translation, index) => {
                  const isActive = index === activeTranslationIndex;
                  return (
                    <button
                      key={translation.language}
                      type="button"
                      onClick={() => setActiveTranslationIndex(index)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#0d9ba8] text-white shadow-md'
                          : 'bg-white text-[#4a5568] border border-[#dbe4ea] hover:border-[#0d9ba8]/40'
                      }`}
                    >
                      {translation.language}
                    </button>
                  );
                })}
              </div>

              <p
                key={activeTranslation.language}
                dir={activeTranslation.dir}
                className={`text-base sm:text-[0.95rem] text-[#4a5568] leading-relaxed animate-fade-in-up ${activeTranslationFontClass}`}
              >
                {activeTranslation.text}
              </p>
            </div>
{/* 
            Quote
            <div
              className={`relative pl-6 border-l-4 border-[#0d9ba8] py-2 transition-all duration-700 delay-400 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <p className="text-xl italic text-[#1a1a2e] mb-2">
                "{aboutTranslations[activeTranslationIndex].language}"
              </p>
              <p className="text-sm text-[#4a5568]">
                Translation language selector
              </p>
            </div> */}

            {/* CTA */}
            <div
              className={`transition-all duration-700 delay-600 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <Button
                onClick={() => scrollToSection('#donate')}
                className="bg-[#0d9ba8] hover:bg-[#0a7a85] text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#0d9ba8]/30 hover:-translate-y-1 flex items-center gap-2"
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
