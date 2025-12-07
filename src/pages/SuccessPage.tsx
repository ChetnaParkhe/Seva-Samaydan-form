import { useNavigate } from "react-router-dom";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import flameLogo from "@/assets/flame-logo.jpg";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
        {/* Success Icon with Flame */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 rounded-full gradient-saffron opacity-20 animate-pulse-glow" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-glow animate-glow">
            <img
              src={flameLogo}
              alt="ज्ञान ज्योति"
              className="w-full h-full object-cover animate-flame"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="font-devanagari text-3xl md:text-4xl font-bold text-primary">
            सफलतापूर्वक जमा!
          </h1>
          <p className="font-devanagari text-xl text-foreground">
            आपका सेवा समयदान प्रपत्र सफलतापूर्वक जमा हो गया है
          </p>
        </div>

        {/* Blessing Message */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <p className="font-devanagari text-lg text-muted-foreground leading-relaxed">
            गायत्री माता की कृपा आप पर सदैव बनी रहे। आपकी सेवा भावना प्रशंसनीय है।
            शीघ्र ही हमारी टीम आपसे संपर्क करेगी।
          </p>
        </div>

        {/* Gayatri Mantra */}
        <div className="py-4">
          <div className="spiritual-divider" />
          <p className="font-devanagari text-primary font-medium mt-4">
            ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं
          </p>
          <p className="font-devanagari text-primary/80 text-sm">
            भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2 h-12 px-6"
          >
            <ArrowLeft className="w-4 h-4" />
            नया प्रपत्र
          </Button>
          <Button
            onClick={() => window.print()}
            className="flex items-center gap-2 h-12 px-6 gradient-saffron hover:opacity-90"
          >
            <Home className="w-4 h-4" />
            प्रिंट करें
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 Vaidikam | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
