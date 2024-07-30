import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { v4 as uuid } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const schema = z.object({
  id: z.string().transform(() => uuid()),
  name: z.string().min(1),
  age: z.string().optional(),
  breed: z.string().min(1),
  birthdate: z.string().optional(),
  vet_clinic: z.string().optional(),
  chip_number: z.string().optional(),
  medical_issues: z.string().optional(),
  fav_foods: z.string().optional(),
  vaccinations: z.string().min(1),
  weight: z.string().optional(),
  color: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = schema.parse(data);

    // Check if the id already exists in the table
    const { data: existingData, error: fetchError } = await supabase
      .from("cat_profiles")
      .select("id")
      .eq("id", validatedData.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    let responseMessage = "Profile created successfully";

    if (existingData) {
      // Update the existing row
      const { error: updateError } = await supabase
        .from("cat_profiles")
        .update(validatedData)
        .eq("id", validatedData.id);

      if (updateError) throw updateError;

      responseMessage = "Profile updated successfully";
    } else {
      // Insert a new row
      const { error: insertError } = await supabase
        .from("cat_profiles")
        .insert([validatedData]);

      if (insertError) throw insertError;
    }

    return NextResponse.json({
      message: responseMessage,
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
