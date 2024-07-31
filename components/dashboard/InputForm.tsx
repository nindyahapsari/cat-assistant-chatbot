"use client";
import { UseFormReturn } from "react-hook-form";
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

type InputFormProps = {
  form: UseFormReturn;
  name: string;
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
        name={registerName}
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
