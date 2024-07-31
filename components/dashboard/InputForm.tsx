"use client";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { CatProfileSchema } from "@/app/cat-profile/edit/page";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormFields = {
  name: string;
  breed: string;
  vaccinations: string;
  color?: string;
  age?: string;
  birthdate?: string;
  vet_clinic?: string;
  chip_number?: string;
  medical_issues?: string;
  fav_foods?: string;
  weight?: string;
  placeholder?: string;
};

type InputFormProps = {
  form: UseFormReturn<FormFields>;
  name: keyof FormFields;
  placeholder?: string;
};

export default function InputForm({ form, name, placeholder }: InputFormProps) {
  function spaceSeparatedToUnderscore(name: string): string {
    return name.replace(/\s+/g, "_").toLowerCase();
  }

  const registerName = spaceSeparatedToUnderscore(name);
  return (
    <div className="my-8">
      <FormField
        control={form.control}
        name={registerName as keyof FormFields}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{name}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
