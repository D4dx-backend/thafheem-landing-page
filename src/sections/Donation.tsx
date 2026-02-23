import { useEffect, useRef, useState } from 'react';
import { Heart, Shield, Copy, Check } from 'lucide-react';

const RAZORPAY_DONATION_URL = 'https://pages.razorpay.com/thafheem-donation';
const UPI_ID = 'vyapar.176971524101@hdfcbank';

const Donation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = UPI_ID;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

              {/* UPI QR Code – prominent, scannable */}
              <div className="flex flex-col items-center gap-3 mb-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0d9ba8]">Scan &amp; Pay via UPI</span>
                <div className="bg-white border-2 border-[#0d9ba8]/20 rounded-2xl p-4 shadow-md">
                  <img
                    src="/images/upi1.jpeg"
                    alt="UPI QR Code – D4DX INNOVATIONS LLP"
                    className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl"
                  />
                </div>
                <p className="text-sm text-[#4a5568] text-center">Open any UPI app, tap <strong>Scan QR</strong>, and donate</p>

                {/* UPI ID copy row */}
                <div className="w-full flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <span className="flex-1 text-sm font-mono text-[#1a1a2e] truncate select-all">{UPI_ID}</span>
                  <button
                    onClick={handleCopyUPI}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#0d9ba8] hover:text-[#0a7a85] transition-colors shrink-0"
                    aria-label="Copy UPI ID"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex flex-col gap-1.5 text-xs text-[#4a5568]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#718096]">Account Name</span>
                    <span className="font-semibold text-[#1a1a2e]">D4DX INNOVATIONS LLP</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#718096]">TID</span>
                    <span className="font-semibold text-[#1a1a2e] font-mono">82182968</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#718096]">Bank</span>
                    <span className="font-semibold text-[#1a1a2e]">HDFC SmartHub Vyapar</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-[#4a5568] font-medium whitespace-nowrap">Or support via Razorpay</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <a
                href={RAZORPAY_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0d9ba8] hover:bg-[#0a7a85] text-white py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#0d9ba8]/30 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Support Now
              </a>

              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#4a5568]">
                <Shield className="w-3.5 h-3.5" />
                <span>Secure payment gateway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
