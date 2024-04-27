export const dynamic = "force-dynamic"
export const revalidate = 0 
export const fetchCache = "only-no-store"
export const maxDuration = 10


import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config({ path: ".env" })


const supabaseUrl = process.env.S_URL || "";
const supabaseAnonKey = process.env.A_KEY || "";



const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function POST(req : Request) {
  try {
    const {code} = await req.json()
    const { data, error } = await supabase
      .from("cross")
      .select()
      .eq('unique_code', code)

    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json({ message: "name sent successfully!",data });
  } catch (error: any) {
    console.error("Error sending emails:", error.message);
    return NextResponse.json({ error: "Internal server error" });
  }
}