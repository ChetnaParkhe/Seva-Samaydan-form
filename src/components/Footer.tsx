import flameLogo from "@/assets/flame-logo.jpg";

const Footer = () => {
  return (
    <footer className="w-full bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Flame Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-glow animate-glow border-2 border-primary/30">
            <img
              src={flameLogo}
              alt="ज्ञान ज्योति"
              className="w-full h-full object-cover animate-flame"
            />
          </div>
        </div>

        {/* Gayatri Mantra */}
        <div className="text-center mb-6">
          <p className="font-devanagari text-lg sm:text-xl md:text-2xl text-primary font-semibold leading-relaxed">
            ॐ भूर्भुवः स्वः
          </p>
          <p className="font-devanagari text-base sm:text-lg md:text-xl text-primary/90 font-medium leading-relaxed mt-2">
            तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥
          </p>
        </div>

        {/* Spiritual Divider */}
        <div className="spiritual-divider" />

      </div>
    </footer>
  );
};

export default Footer;
