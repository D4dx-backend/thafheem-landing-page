import topBannerImage from '/images/banner.png';

const TopBanner = () => {
  return (
    <section className="pt-24 pb-4 bg-[#f8fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-[#0a0f14] shadow-lg">
          <a href="https://pages.razorpay.com/thafheem-donation" target="_blank" rel="noopener noreferrer">
          <img
            src={topBannerImage}
            alt="Thafheemul Quran multilingual app banner"
            className="w-full h-auto object-cover"
            loading="eager"
          />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
