import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import avatar1 from '/images/avatar-1.jpg';
import avatar2 from '/images/avatar-2.jpg';
import avatar3 from '/images/avatar-3.jpg';
import avatar4 from '/images/avatar-4.jpg';

const testimonials = [
  {
    name: 'Naseem Thakur',
    location: 'Cairo, Egypt',
    avatar: avatar1,
    rating: 5,
    text: 'Jazakallahu Khairan shukran One of the best and simple to use app, Making it easy to read and understand AL QUR’AN.',
  },
  {
    name: 'Ismail Kalappurackal',
    location: 'Kuala Lumpur, Malaysia',
    avatar: avatar2,
    rating: 5,
    text: 'Very useful app to reach the deep of Quran. Thanks to the developers, Jazakallah. New updated version have totally changed the application.',
  },
  {
    name: 'Jalaludheen',
    location: 'London, UK',
    avatar: avatar3,
    rating: 5,
    text: 'This is a very useful and well-designed app for understanding the Qur’an. The interface is clean, easy to use, and navigation is smooth. The updates have improved the overall experience, fixing earlier issues and making it more reliable. The app makes reading and reflecting on the Qur’an much easier, with a pleasant design and helpful features. Truly one of the best apps for those who wish to study and connect deeply. Highly recommended.',
  },
  {
    name: 'IJAZ AHMAD',
    location: 'Mumbai, India',
    avatar: avatar4,
    rating: 5,
    text: 'I’ve been using this Quran app for a few months now, and I can confidently say it’s one of the best Islamic apps out there. The user interface is clean, intuitive, and easy to navigate. Whether you are a beginner or a fluent reader, the app offers a seamless experience.',
  },
];

const Testimonials = () => {
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#f0f7f7] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-[#0d9ba8]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-[#d4af37]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            What Our <span className="text-gradient">Users Say</span>
          </h2>
          <p
            className={`text-lg text-[#4a5568] max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Join thousands of satisfied users worldwide
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Main Testimonial Card */}
          <div className="relative bg-white rounded-3xl shadow-xl p-8 sm:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-[#0d9ba8] rounded-xl flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Testimonial Content */}
            <div className="pt-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-10 pointer-events-none'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#d4af37] text-[#d4af37]"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-xl sm:text-2xl text-[#1a1a2e] leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    
                    <div>
                      <p className="font-bold text-[#1a1a2e]">{testimonial.name}</p>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0d9ba8] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
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

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0d9ba8] hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
