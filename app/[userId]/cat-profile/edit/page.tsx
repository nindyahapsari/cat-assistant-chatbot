"use client";
import { useUser } from "@clerk/clerk-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string(),
  breed: z.string().min(1, "Breed is required"),
  birthdate: z.string().optional(),
  vetClinic: z.string().optional(),
  chipNumber: z.string().optional(),
  medicalIssues: z.string().optional(),
  favFood: z.string().optional(),
  vaccinations: z.string().min(1, "Vaccinations are required"),
  weight: z.string().optional(),
  color: z.string().optional(),
});

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
    name: "Chip number",
    placeholder: "XB123456",
  },
  {
    name: "Medical Issues",
    placeholder: "Overweight, needs diet food, eye infection",
  },
  {
    name: "Fav Food",
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
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { user } = useUser();

  const handleOnSubmit = async (data) => {
    try {
      const response = await fetch("/api/cat-profile", {
        method: "POST",
        body: {
          userId: user?.id,
          ...data,
        },
      });
      console.log("Profile created:", response);
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
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Table>
              {catInfoForm.map((form) => {
                return (
                  <TableRow key={form.name}>
                    <div className="flex flex-row justify-between items-center gap-4 p-4">
                      <Label htmlFor={form.name}>{form.name}:</Label>
                      <Input
                        className="max-w-xl"
                        placeholder={form.placeholder}
                        {...register(form.name.toLowerCase())}
                      />
                    </div>
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
