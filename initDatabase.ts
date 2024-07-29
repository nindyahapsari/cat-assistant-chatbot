"use client";
// initializeDatabase.ts
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  const { error } = await supabase.rpc("pg_execute", {
    sql: `
      CREATE TABLE IF NOT EXISTS cat_profiles (
        userId TEXT NOT NULL,
        name TEXT NOT NULL,
        age TEXT,
        breed TEXT NOT NULL,
        birthdate TEXT,
        vetClinic TEXT,
        chipNumber TEXT,
        medicalIssues TEXT,
        favFood TEXT,
        vaccinations TEXT NOT NULL,
        weight TEXT,
        color TEXT
      );
    `,
  });

  if (error) {
    console.error("Error creating table:", error.message);
  } else {
    console.log("Table created successfully.");
  }
}

createTable();
