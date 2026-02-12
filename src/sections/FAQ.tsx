import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is the app free to use?',
    answer: 'Yes, Thafheemul Quran is completely free to download and use. We believe the Quran should be accessible to everyone without barriers. There are no hidden fees, no subscriptions, and no advertisements.',
  },
  {
    question: 'Which languages are supported?',
    answer: 'We currently support 6 languages including English, Malayalam (മലയാളം), Urdu (اردو), Tamil (தமிழ்), Bengali (বাংলা), Hindi (हिंदी), Arabic (العربية), and more. We are constantly working to add new languages to make the Quran accessible to more people.',
  },
  {
    question: 'Can I listen to audio offline?',
    answer: 'Yes! You can download recitations for offline listening. This is perfect for when you are traveling or in areas with limited connectivity. Simply download your favorite Qari\'s recitation when you have internet access.',
  },
  {
    question: 'How can I contribute to the project?',
    answer: 'You can support us through donations, sharing the app with friends and family, or volunteering for translations and proofreading. Every contribution helps us reach more Muslims worldwide.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We take privacy very seriously. Your bookmarks and notes are stored securely and never shared with third parties. We use industry-standard encryption to protect your data.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p
            className={`text-lg text-[#4a5568] max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Find answers to common questions about Thafheemul Quran
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
                  openIndex === index ? 'bg-[#0d9ba8]/5' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold text-[#1a1a2e] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0d9ba8] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-[#4a5568] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#4a5568] mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:info@d4dx.co"
            className="inline-flex items-center gap-2 text-[#0d9ba8] font-semibold hover:underline"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
