"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Briefcase,
  Building2,
  Calendar as CalendarIcon,
  Plus,
  X,
  Save,
  Linkedin,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";

const validationSchema = yup.object({
  jobTitle: yup.string().required("Job title is required"),
  companyName: yup.string().required("Company name is required"),
  location: yup.string().required("Location is required"),
  experienceType: yup.string().required("Experience type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().when("currentlyWorking", {
    is: false,
    then: (schema) => schema.required("End date is required"),
  }),
  description: yup.string(),
  currentlyWorking: yup.boolean(),
  companyLogo: yup.mixed(),
});

export function ExperienceCard() {
  const { toast } = useToast();
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState<
    "start" | "end" | null
  >(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      companyName: "",
      location: "",
      experienceType: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyWorking: false,
      companyLogo: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        toast({
          title: "Success!",
          description: "Experience has been saved successfully.",
        });
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          variant: "destructive",
          title: "Error",
          description: "Image size should be less than 5MB",
        });
        return;
      }
      formik.setFieldValue("companyLogo", file);
    }
  };

  const handleLinkedInImport = async () => {
    setIsUploading(true);
    try {
      // Here you would integrate with LinkedIn API
      toast({
        title: "LinkedIn Integration",
        description: "This feature will be available soon!",
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to import from LinkedIn",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        // Here you would implement resume parsing logic
        toast({
          title: "Resume Upload",
          description: "Resume parsing will be available soon!",
        });
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to parse resume",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 h-[90vh] overflow-hidden flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-20 bg-gradient-to-r from-primary/5 via-background to-background border-b shrink-0"
        >
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <DialogHeader className="flex flex-row items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-semibold tracking-tight">
                  Add Experience
                </DialogTitle>
                <p className="text-sm text-muted-foreground/80">
                  Share your professional journey and achievements
                </p>
              </div>
            </DialogHeader>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg opacity-70 hover:opacity-100 hover:bg-muted transition-all"
              onClick={() => {
                formik.resetForm();
                setIsDatePickerOpen(null);
              }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
        <ScrollArea className="px-6 h-[calc(90vh-10rem)]">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="py-6 space-y-8"
            onSubmit={formik.handleSubmit}
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 h-12"
                    onClick={handleLinkedInImport}
                    disabled={isUploading}
                  >
                    <Linkedin className="w-4 h-4" />
                    Import from LinkedIn
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 h-12"
                    onClick={() =>
                      document.getElementById("resumeUpload")?.click()
                    }
                    disabled={isUploading}
                  >
                    <FileText className="w-4 h-4" />
                    Parse from Resume
                  </Button>
                </motion.div>
                <input
                  id="resumeUpload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    or fill manually
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              layout
              className="flex items-center justify-center w-full"
            >
              <div className="relative w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  {formik.values.companyLogo ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="aspect-[3/1] w-full rounded-lg border border-border overflow-hidden relative bg-muted/30"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={URL.createObjectURL(
                            formik.values.companyLogo as File
                          )}
                          alt="Company Logo"
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={() =>
                          formik.setFieldValue("companyLogo", null)
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-[3/1] w-full rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/5 hover:bg-muted/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/30 transition-all group"
                    >
                      <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                        <ImageIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-medium">
                          Upload company logo
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SVG, PNG, JPG (max. 5MB)
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </motion.div>

            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="jobTitle"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    Job Title
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            Enter your official job title or role name (e.g.,
                            Senior Software Engineer, Product Manager)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="jobTitle"
                    autoFocus
                    placeholder="e.g. Senior Software Engineer"
                    {...formik.getFieldProps("jobTitle")}
                    className={cn(
                      "transition-all duration-200",
                      formik.errors.jobTitle && formik.touched.jobTitle
                        ? "border-destructive ring-destructive"
                        : "hover:border-primary focus:border-primary focus:ring-primary"
                    )}
                  />
                  {formik.errors.jobTitle && formik.touched.jobTitle && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {formik.errors.jobTitle}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="companyName"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    Company Name
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            Enter the full legal name of the company you worked
                            for
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="e.g. Acme Inc."
                    {...formik.getFieldProps("companyName")}
                    className={cn(
                      "transition-all duration-200",
                      formik.errors.companyName && formik.touched.companyName
                        ? "border-destructive ring-destructive"
                        : "hover:border-primary focus:border-primary focus:ring-primary"
                    )}
                  />
                  {formik.errors.companyName && formik.touched.companyName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {formik.errors.companyName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Location
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            Enter the city and country or specific office
                            location
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. London, United Kingdom"
                    {...formik.getFieldProps("location")}
                    className={cn(
                      "transition-all duration-200",
                      formik.errors.location && formik.touched.location
                        ? "border-destructive ring-destructive"
                        : "hover:border-primary focus:border-primary focus:ring-primary"
                    )}
                  />
                  {formik.errors.location && formik.touched.location && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {formik.errors.location}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="experienceType"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    Experience Type
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            Select the type of employment or work arrangement
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Select
                    value={formik.values.experienceType}
                    onValueChange={(value) =>
                      formik.setFieldValue("experienceType", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "transition-all duration-200",
                        formik.errors.experienceType &&
                          formik.touched.experienceType
                          ? "border-destructive ring-destructive"
                          : "hover:border-primary focus:border-primary focus:ring-primary"
                      )}
                    >
                      <SelectValue placeholder="Select experience type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="part-time">Part-Time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.errors.experienceType &&
                    formik.touched.experienceType && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {formik.errors.experienceType}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    Start Date
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            Select the date when you started this position
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      value={
                        formik.values.startDate
                          ? format(new Date(formik.values.startDate), "PP")
                          : ""
                      }
                      onClick={() => setIsDatePickerOpen("start")}
                      readOnly
                      className="cursor-pointer hover:border-primary focus:border-primary focus:ring-primary"
                      placeholder="Select date"
                    />
                    {isDatePickerOpen === "start" && (
                      <div className="absolute top-full mt-2 z-10">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-popover rounded-md border shadow-lg p-2"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              formik.values.startDate
                                ? new Date(formik.values.startDate)
                                : undefined
                            }
                            onSelect={(date) => {
                              formik.setFieldValue("startDate", date);
                              setIsDatePickerOpen(null);
                            }}
                            initialFocus
                            className="rounded-md"
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>

                {!formik.values.currentlyWorking && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="endDate"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      End Date
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-xs">
                              Select the date when you ended this position, or
                              toggle &quot;I currently work here&quot; if this
                              is your current job
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <div className="relative">
                      <Input
                        id="endDate"
                        value={
                          formik.values.endDate
                            ? format(new Date(formik.values.endDate), "PP")
                            : ""
                        }
                        onClick={() => setIsDatePickerOpen("end")}
                        readOnly
                        className="cursor-pointer hover:border-primary focus:border-primary focus:ring-primary"
                        placeholder="Select date"
                      />
                      {isDatePickerOpen === "end" && (
                        <div className="absolute top-full mt-2 z-10">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-popover rounded-md border shadow-lg p-2"
                          >
                            <Calendar
                              mode="single"
                              selected={
                                formik.values.endDate
                                  ? new Date(formik.values.endDate)
                                  : undefined
                              }
                              onSelect={(date) => {
                                formik.setFieldValue("endDate", date);
                                setIsDatePickerOpen(null);
                              }}
                              initialFocus
                              className="rounded-md"
                            />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 bg-muted/30 p-3 rounded-lg">
                <Switch
                  id="currentlyWorking"
                  checked={formik.values.currentlyWorking}
                  onCheckedChange={(checked) => {
                    formik.setFieldValue("currentlyWorking", checked);
                    if (checked) {
                      formik.setFieldValue("endDate", "");
                    }
                  }}
                  className="data-[state=checked]:bg-primary"
                />
                <Label
                  htmlFor="currentlyWorking"
                  className="text-sm flex items-center gap-2"
                >
                  I currently work here
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Toggle this if this is your current position. This
                          will automatically hide the end date field
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  Description
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent align="start" className="max-w-sm">
                        <div className="space-y-2 text-xs">
                          <p>
                            Describe your role and achievements. Consider
                            including:
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Key responsibilities</li>
                            <li>Major projects or initiatives</li>
                            <li>Quantifiable achievements</li>
                            <li>Technologies or tools used</li>
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your role, responsibilities, and key achievements..."
                  {...formik.getFieldProps("description")}
                  className="min-h-[8rem] max-h-[16rem] resize-y hover:border-primary focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
          </motion.form>
        </ScrollArea>

        <motion.div
          layout
          className="flex justify-end space-x-3 p-6 border-t bg-background/80 backdrop-blur-sm h-20 shrink-0"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                formik.resetForm();
                setIsDatePickerOpen(null);
              }}
              className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              disabled={isUploading}
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => formik.handleSubmit()}
              disabled={isUploading || !formik.isValid || !formik.dirty}
            >
              <Save className="w-4 h-4" />
              Save Experience
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
