import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.S_URL || "";
const supabaseAnonKey = process.env.A_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export async function POST(req: any) {


  const formdata = await req.json();


  try {
    const { data, error } = await supabase.from("walk").insert(formdata);

    if (error) {
      console.error("Error saving form data:", error);
      return NextResponse.json({ message: "Error saving data" });
    }

    return NextResponse.json({ message: "Data saved successfully", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ message: "Internal server error" });
  }

}