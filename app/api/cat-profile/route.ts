import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { v4 as uuid } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const schema = z.object({
  userId: z.string().min(1),
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
  birthday: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = schema.parse(data);

    // Use upsert to insert or update the row
    const { error: upsertError } = await supabase
      .from("cat_profiles")
      .upsert(validatedData);

    if (upsertError) throw upsertError;

    const responseMessage = "Profile created or updated successfully";

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

export async function GET(req: NextRequest & { query: { userId: string } }) {
  console.log("GET request", req.url);

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      throw new Error("User ID is required");
    }

    const { data, error } = await supabase
      .from("cat_profiles")
      .select()
      .eq("userId", userId);

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: unknown) {
    console.error("Error:", error);
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
