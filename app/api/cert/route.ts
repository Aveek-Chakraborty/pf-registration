import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createCanvas, loadImage } from 'canvas';
import nodemailer from "nodemailer";
import PDFDocument from 'pdfkit';
import fs from 'fs';

const supabaseUrl = process.env.S_URL || "";
const supabaseAnonKey = process.env.A_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Participant {
    name: string;
    email: string;
}

async function generateCertificate(participant: Participant): Promise<Buffer> {
  const image = await loadImage('public/participate.png');
  const canvasWidth = 1000; 
  const canvasHeight = (image.height / image.width) * canvasWidth;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  if (ctx) {
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      ctx.font = '36px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(participant.name, canvasWidth / 2, canvasHeight / 2);

      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
          const pdfStream = new PDFDocument({ size: [canvasWidth, canvasHeight]});
          const buffers: Buffer[] = [];
          pdfStream.on('data', (buffer: Buffer) => buffers.push(buffer));
          pdfStream.on('end', () => resolve(Buffer.concat(buffers)));
          pdfStream.on('error', reject);
          pdfStream.image(canvas.toBuffer()  ,0, 0, { width: canvasWidth, height: canvasHeight });  
          pdfStream.end();
      });

      return pdfBuffer;
  } else {
      throw new Error('Canvas context is null');
  }
}


export async function GET() {
    try {
        const { data: participants, error } = await supabase.from('master').select('name, email');
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
            const certificateBuffer = await generateCertificate(participant);

            await transporter.sendMail({
                from: process.env.GMAIL,
                to: participant.email,
                subject: 'Certificate',
                text: `Dear ${participant.name},\n\nPlease find attached your certificate.\n\nBest regards,\nPathfinder`,
                attachments: [
                    {
                        filename: 'certificate.pdf',
                        content: certificateBuffer,
                        contentType: 'application/pdf', 
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
