export const dynamic = "force-dynamic"
export const revalidate = 0 
export const fetchCache = "only-no-store"


import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config({ path: ".env" })



const supabaseUrl = process.env.S_URL || "";
const supabaseAnonKey = process.env.A_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function GET(req: any) {
    try {
        const { data, error } = await supabase
            .from('boycross')
            .select('name, time')
            .order('time', { ascending: true })
            .limit(20)

        if (error) {
            console.error("Unexpected error:", error);
            return NextResponse.json({ message: "Internal server error" });
        }

        return NextResponse.json({ message: "Data fetched successfully", data });

    } catch (error: any) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ message: "Internal server error" });
    }
}