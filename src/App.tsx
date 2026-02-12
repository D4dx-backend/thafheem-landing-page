import { useEffect } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import TopBanner from './sections/TopBanner';

import Features from './sections/Features';
import Screenshots from './sections/Screenshots';
import Statistics from './sections/Statistics';
import About from './sections/About';
import Donation from './sections/Donation';
import Testimonials from './sections/Testimonials';
import DownloadCTA from './sections/DownloadCTA';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <main>
        <TopBanner />
        <Hero />
        {/* <QuranicVerse /> */}
        <Features />
        <Screenshots />
        <Statistics />
        <About />
        <Donation />
        <Testimonials />
        <DownloadCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
