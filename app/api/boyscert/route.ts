export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "only-no-store"
export const maxDuration = 10


import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { PDFDocument, rgb } from "pdf-lib";
import { participationCertB64 } from "@/utils/image";

import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const supabaseUrl = process.env.S_URL || "";
const supabaseAnonKey = process.env.A_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Participant {
  name: string;
  email: string;
}

// Base64 encoded string of the participate.png image
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

export async function GET() {
  try {
    const { data: participants, error } = await supabase
      .from("users")
      .select("name, email");
    if (error) {
      throw error;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_P,
      },
    });

    for (const participant of participants) {
      const certificatePDF = await generateCertificate(participant);

      await transporter.sendMail({
        from: process.env.GMAIL,
        to: participant.email,
        subject: "Certificate",
        text: `Dear ${participant.name},\n\nPlease find attached your certificate.\n\nBest regards,\nTeam Pathfinder`,
        attachments: [
          {
            filename: "certificate.pdf",
            content: certificatePDF,
          },
        ],
      });
    }

    console.log("Emails sent successfully!");
    return NextResponse.json({ message: "Emails sent successfully!" });
  } catch (error: any) {
    console.error("Error sending emails:", error.message);
    return NextResponse.json({ error: "Internal server error" });
  }
}