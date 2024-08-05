"use client";
import z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";

import {
  Form
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StepOne, StepThree, StepTwo } from "@/components/catProfile/forms/StepsForm";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().optional(),
  breed: z.string().min(1, "Breed is required"),
  birthdate: z.string().optional(),
  vet_clinic: z.string().optional(),
  chip_number: z.string().optional(),
  medical_issues: z.string().optional(),
  fav_foods: z.string().optional(),
  vaccinations: z.string().min(1, "Vaccinations are required"),
  weight: z.string().optional(),
  color: z.string().optional(),
  placeholder: z.string().optional(),
});

export type CatProfileSchema = z.infer<typeof schema>;

export default function Add() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();

  const form = useForm<CatProfileSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CatProfileSchema) => {
    const userId = user?.id;
    const catProfileData = { ...data, userId };

    try {
      const response = await fetch("/api/cat-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(catProfileData),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Profile created:", jsonResponse);
      } else {
        throw new Error("Error creating profile");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const errors = form.formState.errors;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 flex justify-center flex-col gap-4"
      >
        <div className=" tablet:min-h-[calc(70vh-3rem)]">
        {currentStep === 1 && <StepOne form={form} />}
        {currentStep === 2 && <StepTwo form={form} />}
        {currentStep === 3 && <StepThree form={form} />}
        </div>

        <div className="flex justify-center gap-4">
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < 3 && (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button type="submit">
              Save Profile
            </Button>
          )}
        </div>
      
      </form>
    </Form>
  );
}