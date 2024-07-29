"use client";
import { useUser } from "@clerk/clerk-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableRow } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/dashboard/InputForm";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().optional(),
  breed: z.string().min(1, "Breed is required"),
  birthdate: z.string().optional(),
  vetClinic: z.string().optional(),
  chipNumber: z.string().optional(),
  medicalIssues: z.string().optional(),
  favFood: z.string().optional(),
  vaccinations: z.string().min(1, "Vaccinations are required"),
  weight: z.string().optional(),
  color: z.string().optional(),
  placeholder: z.string().optional(),
});

export type CatProfileSchema = z.infer<typeof schema>;

const catInfoForm = [
  {
    name: "name",
    placeholder: "Whisker",
  },
  {
    name: "age",
    placeholder: "10",
  },
  {
    name: "city",
    placeholder: "Berlin",
  },
  {
    name: "breed",
    placeholder: "Domestic Short Hair",
  },
  {
    name: "birthdate",
    placeholder: "01.10.2016 or -",
  },
  {
    name: "vetClinic",
    placeholder: "Neukölln vet clinic, Berlin",
  },
  {
    name: "chipNumber",
    placeholder: "XB123456",
  },
  {
    name: "medicalIssues",
    placeholder: "Overweight, needs diet food, eye infection",
  },
  {
    name: "favFood",
    placeholder: "Mac (german brand), cheese, and tuna, but not together",
  },
  {
    name: "vaccinations",
    placeholder:
      "Tollwut, Katzenschnupfen, Leukose (in german) - Rabies, Feline viral rhinotracheitis, Feline leukemia",
  },
  {
    name: "weight",
    placeholder: "4kg",
  },
  {
    name: "color",
    placeholder: "Dark tiger stripes",
  },
];

export default function Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { user } = useUser();

  const onSubmit = async (data: CatProfileSchema) => {
    console.log("data", data);
    try {
      const response = await fetch("/api/cat-profile", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      console.log("Profile created:", jsonResponse);
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
