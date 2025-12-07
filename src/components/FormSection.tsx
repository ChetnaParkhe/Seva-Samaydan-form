import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

const FormSection = ({ title, children, icon }: FormSectionProps) => {
  return (
    <div className="form-section animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-primary-foreground shadow-soft">
            {icon}
          </div>
        )}
        <h2 className="font-devanagari text-xl font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
