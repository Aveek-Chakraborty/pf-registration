import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
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
    const page = pdfDoc.addPage([800, 600]);

    const font = await pdfDoc.embedFont('Helvetica');

    const pngImageBytes = fs.readFileSync('public/participate.png');
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
    });

    page.drawText(participant.name, {
        x: 400,
        y: 300,
        size: 36,
        color: rgb(0, 0, 0),
        font,
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
}

export async function GET() {
    try {
        const { data: participants, error } = await supabase.from('users').select('name, email');
        if (error) {
            throw error;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
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
    } catch (error:any) {
        console.error('Error sending emails:', error.message);
        return NextResponse.json({ error: 'Internal server error' });
    }
}
