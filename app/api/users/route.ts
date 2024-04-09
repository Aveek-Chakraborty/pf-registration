import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import fs from "fs";


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

    const qrData = `name:${formdata.name}-uc:${formdata.unique_code}`;
    const qrCodePath = `qrCode_${Date.now()}.png`;
    await QRCode.toFile(qrCodePath, qrData);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL || '',
        pass: process.env.GMAIL_P || ''
      }
    });


    const mailOptions = {
      from: 'pfmarathon15.0@gmail.com',
      to: formdata.email,
      subject: 'Thank You for Participating!',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .header h2 {
                color: #007bff;
              }
              .message {
                margin-bottom: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Participating!</h2>
              </div>
              <div class="message">
                <p>Hello ${formdata.name},</p>
                <p>Thank you for participating in our event. We appreciate your contribution.</p>
                <p>As a proof of your participation, please find your QR Code attached to this email.</p>
              </div>
              <div class="footer">
                <p>Best Regards,</p>
                <p>Pathfinder</p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: 'qrCode.png',
          path: qrCodePath
        }
      ]
    };

    if (qrCodePath) {
      const qrBuffer = fs.readFileSync(qrCodePath);
      const qrB64 = qrBuffer.toString("base64");
      formdata.qrcodedata = qrB64;
    }
    const { data, error } = await supabase.from("users").insert(formdata);
    await supabase.from("master").insert(formdata);
    
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      fs.unlinkSync(qrCodePath);
      if (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
      }
    });


    

    let usn = formdata.usn
    if (formdata.usn && (usn[1] == 'S' || usn[1] == 's') && (usn[2] == 'i' || usn[2] == 'I')) {
      const { data, error } = await supabase.from("sit").insert(formdata);
    }

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