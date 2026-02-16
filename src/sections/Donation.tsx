import { useEffect, useRef, useState } from 'react';
import { Heart, Shield, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDonationCheckout } from '@/hooks/useDonationCheckout';

const PRESET_AMOUNTS = [100, 500, 1000, 5000];

const Donation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isLaunchingCheckout, startDonation } = useDonationCheckout();

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

  const handleDonate = () => {
    const rupees = Number(amount);
    if (!amount || isNaN(rupees) || rupees < 1) {
      window.alert('Please enter a valid amount (minimum ₹1).');
      return;
    }
    if (!donorName.trim()) {
      window.alert('Please enter your name.');
      return;
    }
    startDonation(rupees, {
      name: donorName.trim(),
      email: donorEmail.trim(),
      phone: donorPhone.trim(),
    });
  };

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

              {/* Donor Info Fields */}
              <div className="space-y-3 mb-5">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0aec0]" />
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#0d9ba8] focus:border-transparent placeholder:text-[#a0aec0]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0aec0]" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#0d9ba8] focus:border-transparent placeholder:text-[#a0aec0]"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0aec0]" />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#0d9ba8] focus:border-transparent placeholder:text-[#a0aec0]"
                    />
                  </div>
                </div>
              </div>

              {/* Preset Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(String(preset))}
                    className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      amount === String(preset)
                        ? 'bg-[#0d9ba8] text-white border-[#0d9ba8]'
                        : 'bg-[#f8fafb] text-[#1a1a2e] border-gray-200 hover:border-[#0d9ba8] hover:text-[#0d9ba8]'
                    }`}
                  >
                    ₹{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-[#4a5568]">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-4 rounded-xl border border-gray-200 text-lg font-semibold text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#0d9ba8] focus:border-transparent placeholder:font-normal placeholder:text-[#a0aec0]"
                />
              </div>

              <Button
                className="w-full bg-[#0d9ba8] hover:bg-[#0a7a85] text-white py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#0d9ba8]/30 flex items-center justify-center gap-2"
                onClick={handleDonate}
                disabled={isLaunchingCheckout}
              >
                <Heart className="w-5 h-5" />
                {isLaunchingCheckout
                  ? 'Opening...'
                  : amount
                    ? `Support ₹${Number(amount).toLocaleString('en-IN')}`
                    : 'Support Now'}
              </Button>

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
