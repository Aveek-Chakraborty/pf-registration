export const dynamic = "force-dynamic"
export const revalidate = 0 
export const fetchCache = "only-no-store"
export const maxDuration = 10


import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { PDFDocument, rgb } from "pdf-lib";
import { participationCertB64 } from "@/utils/image";
import { set } from "react-hook-form";

const supabaseUrl = process.env.NEXT_PUBLIC_S_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_A_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Participant {
  name: string;
  email: string;
}


const participateImageBase64 = participationCertB64;

async function generateCertificate(participant: Participant): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([3508, 2456]);

  const font = await pdfDoc.embedFont("Helvetica-Bold");
  const textWidth = font.widthOfTextAtSize(participant.name, 100);

  const pngImage = await pdfDoc.embedPng(Buffer.from(participateImageBase64, "base64"));

  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: 3508,
    height: 2456,
  });

  page.drawText(participant.name, {
    x: (page.getWidth() - textWidth) / 2,
    y: 1415,
    size: 100,
    color: rgb(0, 0, 0),
    font,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

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