import birthCentenaryLogo from "@/assets/birth-centenary-logo.png";
import akhandDeepLogo from "@/assets/akhand-deep-logo.png";

const Header = () => {
  return (
    <header className="w-full gradient-header shadow-soft rounded-b-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Logo */}
          <div className="flex-shrink-0">
            <img
              src={birthCentenaryLogo}
              alt="माताजी जन्म शताब्दी लोगो"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Center Title */}
          <div className="flex-1 text-center">
            <h1 className="font-devanagari text-primary-foreground font-bold leading-tight">
              <span className="block text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md">
                परम वन्दनीय माताजी जन्म शताब्दी कार्यक्रम
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1 drop-shadow-md">
                सेवा समयदान प्रपत्र
              </span>
            </h1>
          </div>

          {/* Right Logo */}
          <div className="flex-shrink-0">
            <img
              src={akhandDeepLogo}
              alt="अखंड दीप शताब्दी लोगो"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
