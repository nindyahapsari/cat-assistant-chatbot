"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuid } from "uuid";

import { Table, TableRow } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/dashboard/InputForm";

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

const catInfoForm = [
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
  {
    name: "Vaccinations",
    placeholder:
      "Tollwut, Katzenschnupfen, Leukose (in german) - Rabies, Feline viral rhinotracheitis, Feline leukemia",
  },
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CatProfileSchema>({
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

  console.log("errors", errors);
  return (
    <div className="max-h-screen flex justify-center items-center py-4 overflow-y-scroll">
      <Card className="w-2/3 mt-24">
        <CardHeader>
          <CardTitle>Edit Cat Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table>
              {catInfoForm.map(({ name, placeholder }) => {
                return (
                  <TableRow key={name}>
                    <InputForm
                      errors={errors}
                      register={register}
                      name={name as keyof CatProfileSchema}
                      placeholder={placeholder}
                    />
                  </TableRow>
                );
              })}
              <Button className="my-8 mx-auto" type="submit">
                Save Profile
              </Button>
            </Table>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
