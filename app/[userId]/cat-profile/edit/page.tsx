"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { v4 as uuid } from "uuid";
import { Table, TableBody } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/dashboard/InputForm";
import { useState } from "react";

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

const editOneForm = [
  {
    name: "Name",
    placeholder: "Whisker",
  },
  {
    name: "Age",
    placeholder: "10",
  },
  {
    name: "City",
    placeholder: "Berlin",
  },
  {
    name: "Breed",
    placeholder: "Domestic Short Hair",
  },
  {
    name: "Vaccinations",
    placeholder:
      "Tollwut, Katzenschnupfen, Leukose (in german) - Rabies, Feline viral rhinotracheitis, Feline leukemia",
  },
];

const editTwoForm = [
  {
    name: "Birthdate",
    placeholder: "01.10.2016 or -",
  },
  {
    name: "Vet Clinic",
    placeholder: "Neukölln vet clinic, Berlin",
  },
  {
    name: "Chip Number",
    placeholder: "XB123456",
  },
  {
    name: "Medical Issues",
    placeholder: "Overweight, needs diet food, eye infection",
  },
  {
    name: "Fav Foods",
    placeholder: "Mac (german brand), cheese, and tuna, but not together",
  },
];

const editThreeForm = [
  {
    name: "Weight",
    placeholder: "4kg",
  },
  {
    name: "Color",
    placeholder: "Dark tiger stripes",
  },
];

export default function Edit() {
  const [currentForm, setCurrentForm] = useState(editOneForm);

  const form = useForm<CatProfileSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CatProfileSchema) => {
    const catProfileData = { ...data, id: uuid() };

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 flex flex-col gap-4"
      >
        <div className="flex gap-4">
          <Button type="button" onClick={() => setCurrentForm(editOneForm)}>
            Edit One
          </Button>
          <Button type="button" onClick={() => setCurrentForm(editTwoForm)}>
            Edit Two
          </Button>
          <Button type="button" onClick={() => setCurrentForm(editThreeForm)}>
            Edit Three
          </Button>
        </div>
        <Card className="max-h-screen h-full flex flex-col justify-center items-center py-4 overflow-y-scroll">
          <CardHeader>
            <CardTitle>Edit Cat Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row flex-wrap justify-start gap-8 ">
            {currentForm.map(({ name, placeholder }) => {
              return (
                <InputForm
                  key={name}
                  name={name as keyof CatProfileSchema}
                  placeholder={placeholder}
                  form={form}
                />
              );
            })}
          </CardContent>
          <CardFooter>
            <Button className="my-8 mx-auto" type="submit">
              Save Profile
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
