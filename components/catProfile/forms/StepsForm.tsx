import { UseFormReturn } from "react-hook-form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { CatProfileSchema } from "@/app/cat-profile/edit/page";

import InputForm from "@/components/dashboard/InputForm";


const firstForm = [
  {
    name: "Name",
    placeholder: "Whisker",
    required: true,
  },
  {
    name: "Age",
    placeholder: "10",
    required: false,
  },
  {
    name: "City",
    placeholder: "Berlin",
    required: false,
  },
  {
    name: "Breed",
    placeholder: "Domestic Short Hair",
    required: true,
  },
  {
    name: "Vaccinations",
    placeholder:
      "Tollwut, Katzenschnupfen, Leukose (in german) - Rabies, Feline viral rhinotracheitis, Feline leukemia",
    required: true,
  },
];
  
  const secondForm = [
    {
      name: "Birthdate",
      placeholder: "01.10.2016 or -",
      required: false,
    },
    {
      name: "Vet Clinic",
      placeholder: "Neukölln vet clinic, Berlin",
      required: false,
    },
    {
      name: "Chip Number",
      placeholder: "XB123456",
      required: false,
    },
    {
      name: "Medical Issues",
      placeholder: "Overweight, needs diet food, eye infection",
      required: false,
    },
    {
      name: "Fav Foods",
      placeholder: "Mac (german brand), cheese, and tuna, but not together",
      required: false,
    },
  ];
  
  const thirdForm = [
    {
      name: "Weight",
      placeholder: "4kg",
      required: false,
    },
    {
      name: "Color",
      placeholder: "Dark tiger stripes",
      required: false,
    },
  ];

  type CatProfileForm = {
    form: UseFormReturn<CatProfileSchema>;
  };


export const StepOne = ({ form }: CatProfileForm) => (
    <Card className="max-h-screen h-full flex flex-col justify-center items-center py-4 overflow-y-scroll">
    <CardHeader>
      <CardTitle>Add Cat Profile</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-row flex-wrap justify-start gap-8 ">
      {firstForm.map(({ name, placeholder, required }) => {
        return (
          <InputForm
            key={name}
            name={name as keyof CatProfileSchema}
            placeholder={placeholder}
            form={form}
            required={required}
          />
        );
      })}
    </CardContent>
  </Card>
  );
  
export const StepTwo = ({form}: CatProfileForm) => (
    <Card className="max-h-screen h-full flex flex-col justify-center items-center py-4 overflow-y-scroll">
    <CardHeader>
      <CardTitle>Add Cat Profile</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-row flex-wrap justify-start gap-8 ">
      {secondForm.map(({ name, placeholder }) => {
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
  </Card>
  );
  
  
 export const StepThree = ({form}: CatProfileForm) => (
    <Card className="max-h-screen h-full flex flex-col justify-center items-center py-4 overflow-y-scroll">
    <CardHeader>
      <CardTitle>Add Cat Profile</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-row flex-wrap justify-start gap-8 ">
      {thirdForm.map(({ name, placeholder }) => {
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
  </Card>
  );