export const dynamic = "force-dynamic"
export const revalidate = 0 
export const fetchCache = "only-no-store"

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config({ path: ".env" })
const supabaseUrl = process.env.S_URL || "";
const supabaseAnonKey = process.env.A_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    const qdc = await supabase.from("master").select("qrcodedata").eq("unique_code", query).single();
    return NextResponse.json({"message": qdc.data?.qrcodedata})
}