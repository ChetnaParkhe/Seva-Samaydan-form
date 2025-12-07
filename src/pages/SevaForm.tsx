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
import PrintButton from "@/components/PrintButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required / पूर्ण नाम आवश्यक है"),
  fatherHusbandName: z.string().min(2, "Father/Husband name is required / पिता/पति का नाम आवश्यक है"),
  addressLine: z.string().min(5, "Address is required / पता आवश्यक है"),
  village: z.string().min(2, "Village/Locality is required / ग्राम/मोहल्ला आवश्यक है"),
  post: z.string().min(2, "Post office is required / डाकघर आवश्यक है"),
  tehsil: z.string().min(2, "Tehsil is required / तहसील आवश्यक है"),
  district: z.string().min(2, "District is required / जिला आवश्यक है"),
  pinCode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit pin code / वैध पिन कोड दर्ज करें"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Enter 10-digit mobile number / 10 अंकों का मोबाइल नंबर दर्ज करें"),
  whatsappNumber: z.string().regex(/^\d{10}$/, "Enter 10-digit WhatsApp number / 10 अंकों का व्हाट्सएप नंबर दर्ज करें"),
  dateOfBirth: z.string().min(1, "Date of birth is required / जन्म तिथि आवश्यक है"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Enter 12-digit Aadhaar number / 12 अंकों का आधार नंबर दर्ज करें"),
  educationalQualification: z.string().min(2, "Educational qualification is required / शैक्षिक योग्यता आवश्यक है"),
  additionalQualification: z.string().optional(),
  occupation: z.string().min(2, "Occupation is required / व्यवसाय आवश्यक है"),
  sevaDurationFrom: z.string().min(1, "Seva start date is required / सेवा अवधि प्रारंभ तिथि आवश्यक है"),
  sevaDurationTo: z.string().min(1, "Seva end date is required / सेवा अवधि समाप्ति तिथि आवश्यक है"),
  previousSessions: z.string().optional(),
  associationSince: z.string().min(4, "Enter the year / वर्ष दर्ज करें"),
  activitiesParticipated: z.string().optional(),
  knownWorker1Name: z.string().min(2, "First known worker name is required / पहले परिचित कार्यकर्ता का नाम आवश्यक है"),
  knownWorker1Mobile: z.string().regex(/^\d{10}$/, "Enter 10-digit mobile number / 10 अंकों का मोबाइल नंबर दर्ज करें"),
  knownWorker2Name: z.string().min(2, "Second known worker name is required / दूसरे परिचित कार्यकर्ता का नाम आवश्यक है"),
  knownWorker2Mobile: z.string().regex(/^\d{10}$/, "Enter 10-digit mobile number / 10 अंकों का मोबाइल नंबर दर्ज करें"),
  emergencyContact: z.string().regex(/^\d{10}$/, "Enter 10-digit emergency contact / 10 अंकों का आपातकालीन संपर्क नंबर दर्ज करें"),
  medicalConditions: z.string().optional(),
  declaration: z.boolean().refine((val) => val === true, "Declaration acceptance is required / घोषणा स्वीकार करना आवश्यक है"),
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
      setPhotoError("Photo upload is required / फोटो अपलोड करना आवश्यक है");
      toast({
        title: "Photo Required / फोटो आवश्यक है",
        description: "Please upload a passport size photo / कृपया पासपोर्ट साइज़ फोटो अपलोड करें",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form Data:", data);
      console.log("Photo:", photo);

      toast({
        title: "Successfully Submitted / सफलतापूर्वक सबमिट",
        description: "Your Seva Samaydan form has been submitted successfully / आपका सेवा समयदान प्रपत्र सफलतापूर्वक जमा हो गया है।",
      });

      navigate("/success");
    } catch (error) {
      toast({
        title: "Error / त्रुटि",
        description: "Problem submitting form. Please try again / फॉर्म जमा करने में समस्या हुई। कृपया पुनः प्रयास करें।",
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
        {/* Print Button Top */}
        <div className="flex justify-end mb-4">
          <PrintButton />
        </div>

        <ProgressIndicator currentStep={currentStep} totalSteps={totalFields} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <FormSection title="Personal Information (व्यक्तिगत जानकारी)" icon={<User className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Full Name (पूर्ण नाम)"
                placeholder="Enter your full name / अपना पूर्ण नाम दर्ज करें"
                required
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <FormInput
                label="Father/Husband Name (पिता/पति का नाम)"
                placeholder="Enter father's or husband's name / पिता या पति का नाम दर्ज करें"
                required
                error={errors.fatherHusbandName?.message}
                {...register("fatherHusbandName")}
              />
            </div>
          </FormSection>

          {/* Address */}
          <FormSection title="Full Address (पूर्ण पता)" icon={<MapPin className="w-5 h-5" />}>
            <FormInput
              label="Address Line (पता)"
              placeholder="House no., Street, Area / मकान नंबर, गली, क्षेत्र"
              required
              error={errors.addressLine?.message}
              {...register("addressLine")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Village/Locality (ग्राम/मोहल्ला)"
                placeholder="Village or Locality / ग्राम या मोहल्ला"
                required
                error={errors.village?.message}
                {...register("village")}
              />
              <FormInput
                label="Post Office (डाकघर)"
                placeholder="Post office name / डाकघर का नाम"
                required
                error={errors.post?.message}
                {...register("post")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormInput
                label="Tehsil (तहसील)"
                placeholder="Tehsil / तहसील"
                required
                error={errors.tehsil?.message}
                {...register("tehsil")}
              />
              <FormInput
                label="District (जिला)"
                placeholder="District / जिला"
                required
                error={errors.district?.message}
                {...register("district")}
              />
              <FormInput
                label="Pin Code (पिन कोड)"
                placeholder="000000"
                maxLength={6}
                required
                error={errors.pinCode?.message}
                {...register("pinCode")}
              />
            </div>
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact Information (संपर्क जानकारी)" icon={<Phone className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Mobile Number (मोबाइल नंबर)"
                placeholder="10-digit number / 10 अंकों का नंबर"
                maxLength={10}
                required
                error={errors.mobileNumber?.message}
                {...register("mobileNumber")}
              />
              <FormInput
                label="WhatsApp Number (व्हाट्सएप नंबर)"
                placeholder="10-digit number / 10 अंकों का नंबर"
                maxLength={10}
                required
                error={errors.whatsappNumber?.message}
                {...register("whatsappNumber")}
              />
            </div>
          </FormSection>

          {/* Personal Details */}
          <FormSection title="Personal Details (व्यक्तिगत विवरण)" icon={<Calendar className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Date of Birth (जन्म तिथि)"
                type="date"
                required
                error={errors.dateOfBirth?.message}
                {...register("dateOfBirth")}
              />
              <FormInput
                label="Aadhaar Number (आधार नंबर)"
                placeholder="12-digit Aadhaar / 12 अंकों का आधार नंबर"
                maxLength={12}
                required
                error={errors.aadhaarNumber?.message}
                {...register("aadhaarNumber")}
              />
            </div>
          </FormSection>

          {/* Education & Occupation */}
          <FormSection title="Education & Occupation (शिक्षा एवं व्यवसाय)" icon={<GraduationCap className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Educational Qualification (शैक्षिक योग्यता)"
                placeholder="Highest education / उच्चतम शिक्षा"
                required
                error={errors.educationalQualification?.message}
                {...register("educationalQualification")}
              />
              <FormInput
                label="Additional Qualification (अतिरिक्त योग्यता)"
                placeholder="Any other qualification (optional) / कोई अन्य योग्यता (वैकल्पिक)"
                error={errors.additionalQualification?.message}
                {...register("additionalQualification")}
              />
            </div>
            <FormInput
              label="Occupation (व्यवसाय)"
              placeholder="Current occupation / वर्तमान व्यवसाय"
              required
              error={errors.occupation?.message}
              {...register("occupation")}
            />
          </FormSection>

          {/* Seva Details */}
          <FormSection title="Seva Details (सेवा विवरण)" icon={<Briefcase className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Seva Duration From (सेवा अवधि प्रारंभ)"
                type="date"
                required
                error={errors.sevaDurationFrom?.message}
                {...register("sevaDurationFrom")}
              />
              <FormInput
                label="Seva Duration To (सेवा अवधि समाप्ति)"
                type="date"
                required
                error={errors.sevaDurationTo?.message}
                {...register("sevaDurationTo")}
              />
            </div>
            <FormTextarea
              label="Previous Sessions Attended (पूर्व सत्रों में भागीदारी)"
              placeholder="Example: June 2023 - Ashwamedh Yagya Seva at Shantikunj / उदाहरण: जून 2023 - शांतिकुंज में अश्वमेध यज्ञ सेवा..."
              error={errors.previousSessions?.message}
              {...register("previousSessions")}
            />
          </FormSection>

          {/* Gayatri Parivar Association */}
          <FormSection title="Gayatri Parivar Association (गायत्री परिवार संबंध)" icon={<Users className="w-5 h-5" />}>
            <FormInput
              label="Associated with Gayatri Parivar Since (गायत्री परिवार से जुड़ाव वर्ष से)"
              placeholder="Example: 2015 / उदाहरण: 2015"
              required
              error={errors.associationSince?.message}
              {...register("associationSince")}
            />
            <FormTextarea
              label="Activities Participated In (जिन गतिविधियों में भाग लिया)"
              placeholder="Details of various programs / विभिन्न कार्यक्रमों का विवरण..."
              error={errors.activitiesParticipated?.message}
              {...register("activitiesParticipated")}
            />
          </FormSection>

          {/* Known Workers */}
          <FormSection title="Known Workers (परिचित कार्यकर्ता)" icon={<Users className="w-5 h-5" />}>
            <p className="text-sm text-muted-foreground mb-4">
              Please provide details of two Gayatri Parivar workers who know you / कृपया दो ऐसे गायत्री परिवार के कार्यकर्ताओं का विवरण दें जो आपको जानते हों
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-muted/50 rounded-lg">
                <FormInput
                  label="First Worker Name (प्रथम कार्यकर्ता का नाम)"
                  placeholder="Full name / पूर्ण नाम"
                  required
                  error={errors.knownWorker1Name?.message}
                  {...register("knownWorker1Name")}
                />
                <FormInput
                  label="First Worker Mobile (प्रथम कार्यकर्ता का मोबाइल)"
                  placeholder="10-digit number / 10 अंकों का नंबर"
                  maxLength={10}
                  required
                  error={errors.knownWorker1Mobile?.message}
                  {...register("knownWorker1Mobile")}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-muted/50 rounded-lg">
                <FormInput
                  label="Second Worker Name (द्वितीय कार्यकर्ता का नाम)"
                  placeholder="Full name / पूर्ण नाम"
                  required
                  error={errors.knownWorker2Name?.message}
                  {...register("knownWorker2Name")}
                />
                <FormInput
                  label="Second Worker Mobile (द्वितीय कार्यकर्ता का मोबाइल)"
                  placeholder="10-digit number / 10 अंकों का नंबर"
                  maxLength={10}
                  required
                  error={errors.knownWorker2Mobile?.message}
                  {...register("knownWorker2Mobile")}
                />
              </div>
            </div>
          </FormSection>

          {/* Emergency & Medical */}
          <FormSection title="Emergency & Medical Information (आपातकालीन एवं चिकित्सा जानकारी)" icon={<Heart className="w-5 h-5" />}>
            <FormInput
              label="Emergency Contact Number (आपातकालीन संपर्क नंबर)"
              placeholder="10-digit number / 10 अंकों का नंबर"
              maxLength={10}
              required
              error={errors.emergencyContact?.message}
              {...register("emergencyContact")}
            />
            <FormTextarea
              label="Medical Conditions - Optional (चिकित्सीय स्थिति - वैकल्पिक)"
              placeholder="Any important medical information / कोई महत्वपूर्ण चिकित्सीय जानकारी जो हमें जाननी चाहिए..."
              error={errors.medicalConditions?.message}
              {...register("medicalConditions")}
            />
          </FormSection>

          {/* Photo Upload */}
          <FormSection title="Passport Size Photo Upload (पासपोर्ट साइज़ फोटो अपलोड)" icon={<FileCheck className="w-5 h-5" />}>
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
                <span className="font-semibold">Declaration (घोषणा):</span> I certify that all the information given above is true and correct to the best of my knowledge and belief. I agree to follow the rules and guidance of Gayatri Parivar. / मैं प्रमाणित करता/करती हूँ कि उपरोक्त दी गई सभी जानकारी मेरी जानकारी और विश्वास के अनुसार सत्य और सही है। मैं गायत्री परिवार के नियमों और मार्गदर्शन का पालन करने के लिए सहमत हूँ।
                <span className="text-destructive ml-1">*</span>
              </label>
            </div>
            {errors.declaration && (
              <p className="text-sm text-destructive mt-2 animate-fade-in">
                {errors.declaration.message}
              </p>
            )}
          </div>

          {/* Submit and Print Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <PrintButton />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[250px] h-14 text-lg font-semibold gradient-saffron hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-glow print:hidden"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting... (जमा हो रहा है...)
                </span>
              ) : (
                "Submit Seva Form (सेवा प्रपत्र जमा करें)"
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