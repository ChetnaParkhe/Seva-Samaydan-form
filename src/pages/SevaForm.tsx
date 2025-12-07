import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, MapPin, Phone, Calendar, GraduationCap, Briefcase, Users, Heart, FileCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import PhotoUpload from "@/components/PhotoUpload";
import ProgressIndicator from "@/components/ProgressIndicator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(2, "पूर्ण नाम आवश्यक है"),
  fatherHusbandName: z.string().min(2, "पिता/पति का नाम आवश्यक है"),
  addressLine: z.string().min(5, "पता आवश्यक है"),
  village: z.string().min(2, "ग्राम/मोहल्ला आवश्यक है"),
  post: z.string().min(2, "डाकघर आवश्यक है"),
  tehsil: z.string().min(2, "तहसील आवश्यक है"),
  district: z.string().min(2, "जिला आवश्यक है"),
  pinCode: z.string().regex(/^\d{6}$/, "वैध पिन कोड दर्ज करें"),
  mobileNumber: z.string().regex(/^\d{10}$/, "10 अंकों का मोबाइल नंबर दर्ज करें"),
  whatsappNumber: z.string().regex(/^\d{10}$/, "10 अंकों का व्हाट्सएप नंबर दर्ज करें"),
  dateOfBirth: z.string().min(1, "जन्म तिथि आवश्यक है"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "12 अंकों का आधार नंबर दर्ज करें"),
  educationalQualification: z.string().min(2, "शैक्षिक योग्यता आवश्यक है"),
  additionalQualification: z.string().optional(),
  occupation: z.string().min(2, "व्यवसाय आवश्यक है"),
  sevaDurationFrom: z.string().min(1, "सेवा अवधि प्रारंभ तिथि आवश्यक है"),
  sevaDurationTo: z.string().min(1, "सेवा अवधि समाप्ति तिथि आवश्यक है"),
  previousSessions: z.string().optional(),
  associationSince: z.string().min(4, "वर्ष दर्ज करें"),
  activitiesParticipated: z.string().optional(),
  knownWorker1Name: z.string().min(2, "पहले परिचित कार्यकर्ता का नाम आवश्यक है"),
  knownWorker1Mobile: z.string().regex(/^\d{10}$/, "10 अंकों का मोबाइल नंबर दर्ज करें"),
  knownWorker2Name: z.string().min(2, "दूसरे परिचित कार्यकर्ता का नाम आवश्यक है"),
  knownWorker2Mobile: z.string().regex(/^\d{10}$/, "10 अंकों का मोबाइल नंबर दर्ज करें"),
  emergencyContact: z.string().regex(/^\d{10}$/, "10 अंकों का आपातकालीन संपर्क नंबर दर्ज करें"),
  medicalConditions: z.string().optional(),
  declaration: z.boolean().refine((val) => val === true, "घोषणा स्वीकार करना आवश्यक है"),
});

type FormData = z.infer<typeof formSchema>;

const SevaForm = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      declaration: false,
    },
  });

  const watchedFields = watch();
  const filledFields = Object.values(watchedFields).filter(
    (val) => val !== undefined && val !== "" && val !== false
  ).length;
  const totalFields = Object.keys(formSchema.shape).length;
  const currentStep = Math.min(filledFields + 1, totalFields);

  const onSubmit = async (data: FormData) => {
    if (!photo) {
      setPhotoError("फोटो अपलोड करना आवश्यक है");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - In production, this would send to backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form Data:", data);
      console.log("Photo:", photo);

      toast({
        title: "सफलतापूर्वक सबमिट",
        description: "आपका सेवा समयदान प्रपत्र सफलतापूर्वक जमा हो गया है।",
      });

      navigate("/success");
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "फॉर्म जमा करने में समस्या हुई। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalFields} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <FormSection title="व्यक्तिगत जानकारी" icon={<User className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="पूर्ण नाम"
                placeholder="अपना पूर्ण नाम दर्ज करें"
                required
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <FormInput
                label="पिता/पति का नाम"
                placeholder="पिता या पति का नाम दर्ज करें"
                required
                error={errors.fatherHusbandName?.message}
                {...register("fatherHusbandName")}
              />
            </div>
          </FormSection>

          {/* Address */}
          <FormSection title="पूर्ण पता" icon={<MapPin className="w-5 h-5" />}>
            <FormInput
              label="पता"
              placeholder="मकान नंबर, गली, क्षेत्र"
              required
              error={errors.addressLine?.message}
              {...register("addressLine")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="ग्राम/मोहल्ला"
                placeholder="ग्राम या मोहल्ला"
                required
                error={errors.village?.message}
                {...register("village")}
              />
              <FormInput
                label="डाकघर"
                placeholder="डाकघर का नाम"
                required
                error={errors.post?.message}
                {...register("post")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormInput
                label="तहसील"
                placeholder="तहसील"
                required
                error={errors.tehsil?.message}
                {...register("tehsil")}
              />
              <FormInput
                label="जिला"
                placeholder="जिला"
                required
                error={errors.district?.message}
                {...register("district")}
              />
              <FormInput
                label="पिन कोड"
                placeholder="000000"
                maxLength={6}
                required
                error={errors.pinCode?.message}
                {...register("pinCode")}
              />
            </div>
          </FormSection>

          {/* Contact Information */}
          <FormSection title="संपर्क जानकारी" icon={<Phone className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="मोबाइल नंबर"
                placeholder="10 अंकों का नंबर"
                maxLength={10}
                required
                error={errors.mobileNumber?.message}
                {...register("mobileNumber")}
              />
              <FormInput
                label="व्हाट्सएप नंबर"
                placeholder="10 अंकों का नंबर"
                maxLength={10}
                required
                error={errors.whatsappNumber?.message}
                {...register("whatsappNumber")}
              />
            </div>
          </FormSection>

          {/* Personal Details */}
          <FormSection title="व्यक्तिगत विवरण" icon={<Calendar className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="जन्म तिथि"
                type="date"
                required
                error={errors.dateOfBirth?.message}
                {...register("dateOfBirth")}
              />
              <FormInput
                label="आधार नंबर"
                placeholder="12 अंकों का आधार नंबर"
                maxLength={12}
                required
                error={errors.aadhaarNumber?.message}
                {...register("aadhaarNumber")}
              />
            </div>
          </FormSection>

          {/* Education & Occupation */}
          <FormSection title="शिक्षा एवं व्यवसाय" icon={<GraduationCap className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="शैक्षिक योग्यता"
                placeholder="उच्चतम शिक्षा"
                required
                error={errors.educationalQualification?.message}
                {...register("educationalQualification")}
              />
              <FormInput
                label="अतिरिक्त योग्यता"
                placeholder="कोई अन्य योग्यता (वैकल्पिक)"
                error={errors.additionalQualification?.message}
                {...register("additionalQualification")}
              />
            </div>
            <FormInput
              label="व्यवसाय"
              placeholder="वर्तमान व्यवसाय"
              required
              error={errors.occupation?.message}
              {...register("occupation")}
            />
          </FormSection>

          {/* Seva Details */}
          <FormSection title="सेवा विवरण" icon={<Briefcase className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="सेवा अवधि (प्रारंभ)"
                type="date"
                required
                error={errors.sevaDurationFrom?.message}
                {...register("sevaDurationFrom")}
              />
              <FormInput
                label="सेवा अवधि (समाप्ति)"
                type="date"
                required
                error={errors.sevaDurationTo?.message}
                {...register("sevaDurationTo")}
              />
            </div>
            <FormTextarea
              label="पूर्व सत्रों में भागीदारी (माह, वर्ष, विवरण)"
              placeholder="उदाहरण: जून 2023 - शांतिकुंज में अश्वमेध यज्ञ सेवा..."
              error={errors.previousSessions?.message}
              {...register("previousSessions")}
            />
          </FormSection>

          {/* Gayatri Parivar Association */}
          <FormSection title="गायत्री परिवार संबंध" icon={<Users className="w-5 h-5" />}>
            <FormInput
              label="गायत्री परिवार से जुड़ाव (वर्ष से)"
              placeholder="उदाहरण: 2015"
              required
              error={errors.associationSince?.message}
              {...register("associationSince")}
            />
            <FormTextarea
              label="जिन गतिविधियों में भाग लिया"
              placeholder="विभिन्न कार्यक्रमों का विवरण..."
              error={errors.activitiesParticipated?.message}
              {...register("activitiesParticipated")}
            />
          </FormSection>

          {/* Known Workers */}
          <FormSection title="परिचित कार्यकर्ता" icon={<Users className="w-5 h-5" />}>
            <p className="text-sm text-muted-foreground mb-4">
              कृपया दो ऐसे गायत्री परिवार के कार्यकर्ताओं का विवरण दें जो आपको जानते हों
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-muted/50 rounded-lg">
                <FormInput
                  label="प्रथम कार्यकर्ता का नाम"
                  placeholder="पूर्ण नाम"
                  required
                  error={errors.knownWorker1Name?.message}
                  {...register("knownWorker1Name")}
                />
                <FormInput
                  label="प्रथम कार्यकर्ता का मोबाइल"
                  placeholder="10 अंकों का नंबर"
                  maxLength={10}
                  required
                  error={errors.knownWorker1Mobile?.message}
                  {...register("knownWorker1Mobile")}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-muted/50 rounded-lg">
                <FormInput
                  label="द्वितीय कार्यकर्ता का नाम"
                  placeholder="पूर्ण नाम"
                  required
                  error={errors.knownWorker2Name?.message}
                  {...register("knownWorker2Name")}
                />
                <FormInput
                  label="द्वितीय कार्यकर्ता का मोबाइल"
                  placeholder="10 अंकों का नंबर"
                  maxLength={10}
                  required
                  error={errors.knownWorker2Mobile?.message}
                  {...register("knownWorker2Mobile")}
                />
              </div>
            </div>
          </FormSection>

          {/* Emergency & Medical */}
          <FormSection title="आपातकालीन एवं चिकित्सा जानकारी" icon={<Heart className="w-5 h-5" />}>
            <FormInput
              label="आपातकालीन संपर्क नंबर"
              placeholder="10 अंकों का नंबर"
              maxLength={10}
              required
              error={errors.emergencyContact?.message}
              {...register("emergencyContact")}
            />
            <FormTextarea
              label="चिकित्सीय स्थिति (वैकल्पिक)"
              placeholder="कोई महत्वपूर्ण चिकित्सीय जानकारी जो हमें जाननी चाहिए..."
              error={errors.medicalConditions?.message}
              {...register("medicalConditions")}
            />
          </FormSection>

          {/* Photo Upload */}
          <FormSection title="फोटो अपलोड" icon={<FileCheck className="w-5 h-5" />}>
            <PhotoUpload
              value={photo}
              onChange={(file) => {
                setPhoto(file);
                setPhotoError("");
              }}
              error={photoError}
            />
          </FormSection>

          {/* Declaration */}
          <div className="form-section animate-fade-in">
            <div className="flex items-start gap-3">
              <Checkbox
                id="declaration"
                checked={watchedFields.declaration}
                onCheckedChange={(checked) => setValue("declaration", checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="declaration" className="text-sm leading-relaxed cursor-pointer">
                <span className="font-semibold">घोषणा:</span> मैं प्रमाणित करता/करती हूँ कि उपरोक्त दी गई सभी जानकारी मेरी जानकारी और विश्वास के अनुसार सत्य और सही है। मैं गायत्री परिवार के नियमों और मार्गदर्शन का पालन करने के लिए सहमत हूँ।
                <span className="text-destructive ml-1">*</span>
              </label>
            </div>
            {errors.declaration && (
              <p className="text-sm text-destructive mt-2 animate-fade-in">
                {errors.declaration.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto min-w-[250px] h-14 text-lg font-semibold gradient-saffron hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-glow"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  जमा हो रहा है...
                </span>
              ) : (
                "सेवा प्रपत्र जमा करें"
              )}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default SevaForm;
