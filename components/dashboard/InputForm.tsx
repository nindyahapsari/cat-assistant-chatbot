import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CatProfileSchema } from "@/app/[userId]/cat-profile/edit/page";

type InputFormProps = {
  register: UseFormRegister<CatProfileSchema>;
  errors: FieldErrors<CatProfileSchema>;
  name: string;
  placeholder?: string;
};

export default function InputForm({
  register,
  errors,
  name,
  placeholder,
}: InputFormProps) {
  function spaceSeparatedToUnderscore(name: string): string {
    return name.replace(/\s+/g, "_").toLowerCase();
  }

  const registerName = spaceSeparatedToUnderscore(name);
  return (
    <div className="flex flex-row justify-between items-center gap-4 p-4">
      <Label htmlFor={name}>{name}:</Label>
      <Input
        className="max-w-xl"
        placeholder={placeholder}
        {...register(registerName as keyof CatProfileSchema)}
      />
      {errors[name as keyof CatProfileSchema] && (
        <span>{errors[name as keyof CatProfileSchema]?.message}</span>
      )}
    </div>
  );
}
