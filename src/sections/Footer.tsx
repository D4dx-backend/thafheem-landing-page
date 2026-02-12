import { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Youtube, Globe, Mail, MapPin, Phone } from 'lucide-react';
import favIcon from '/images/fav-icon.png';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Screenshots', href: '#screenshots' },
  { name: 'About Us', href: '#about' },
];

const supportLinks = [
  { name: 'Contact Us', href: 'https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms' },
  { name: 'Privacy Policy', href: 'https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms' },
  { name: 'Terms of Service', href: 'https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/ThafheemulQuran', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/thafheemulquran_app/#', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@ThafheemulQuranApp', label: 'YouTube' },
  { icon: Globe, href: 'https://thafheem.net/', label: 'Website' },
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#1a1a2e] text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 islamic-pattern" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={favIcon}
                alt="Thafheemul Quran logo"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">Thafheemul Quran</h3>
                {/* <p className="text-xs text-gray-400 arabic-text">تَفْهِيمُ الْقُرْآنِ</p> */}
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Making the Quran accessible to every Muslim worldwide through technology and innovation.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9ba8] transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-[#0d9ba8] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#0d9ba8] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0d9ba8] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">info@d4dx.co, mail@d4dx.co</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0d9ba8] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Address
                  <br />
                  D4DX Innovations LLP
                  <br />
                  AMH Tower, First Floor, 63/3965 B,
                  <br />
                  Mavoor Rd, Thiruthiyad, Kozhikode 673004
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0d9ba8] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+91 98958 04006</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div
            className={`flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2025 Thafheemul Quran. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0d9ba8] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0d9ba8] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0d9ba8] transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
