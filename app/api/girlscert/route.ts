export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "only-no-store"

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config({ path: ".env" })
import nodemailer from "nodemailer";
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

const supabaseUrl = process.env.S_URL || "";
const supabaseAnonKey = process.env.A_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Participant {
    name: string;
    email: string;
}

async function generateCertificate(participant: Participant): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([3508, 2456]);

    const font = await pdfDoc.embedFont('Helvetica-Bold');
    const textWidth = font.widthOfTextAtSize(participant.name, 100);

    const pngImageBytes = fs.readFileSync('public/participate.png');
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

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
        const { data: participants, error } = await supabase.from('girls').select('name, email');
        if (error) {
            throw error;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_GIRLS,
                pass: process.env.GMAIL_GIRLS_P,
            },
        });

        for (const participant of participants) {
            const certificatePDF = await generateCertificate(participant);

            await transporter.sendMail({
                from: process.env.GMAIL_GIRLS,
                to: participant.email,
                subject: 'Certificate',
                text: `Dear ${participant.name},\n\nPlease find attached your certificate.\n\nBest regards,\nPathfinder`,
                attachments: [
                    {
                        filename: 'certificate.pdf',
                        content: certificatePDF,
                    },
                ],
            });
        }

        console.log('Emails sent successfully!');
        return NextResponse.json({ message: 'Emails sent successfully!' });
    } catch (error: any) {
        console.error('Error sending emails:', error.message);
        return NextResponse.json({ error: 'Internal server error' });
    }
}
