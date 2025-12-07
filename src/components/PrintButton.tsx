import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrintButtonProps {
  className?: string;
}

const PrintButton = ({ className }: PrintButtonProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      type="button"
      onClick={handlePrint}
      variant="outline"
      className={`print:hidden gap-2 ${className}`}
    >
      <Printer className="w-4 h-4" />
      <span>Print Form (प्रिंट करें)</span>
    </Button>
  );
};

export default PrintButton;