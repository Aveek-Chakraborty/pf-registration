// "use client"

// import React, { useEffect, useState } from 'react';
// import { supabase } from '@/supabaseClient'; 
// import nodemailer from 'nodemailer'; 

// interface Participant {
//   name: string;
//   email: string;
// }

// const CertificateGenerator: React.FC = () => {
//   const [participants, setParticipants] = useState<Participant[]>([]);

//   useEffect(() => {
//     const fetchParticipants = async () => {
//       try {
//         const { data, error } = await supabase.from('users').select('name, email');
//         if (error) {
//           throw error;
//         }
//         if (data) {
//           setParticipants(data);
//         }
//       } catch (error: any) {
//         console.error('Error fetching participants:', error.message);
//       }
//     };

//     fetchParticipants();
//   }, []);

//   const generateCertificate = async (participant: Participant): Promise<string> => {
//     const canvas = document.createElement('canvas');
//     canvas.width = 800;
//     canvas.height = 600;
//     const ctx = canvas.getContext('2d');

//     if (ctx) {
//       const image = new Image();
//       image.src = 'public\\Untitled-1.png';
      
//       await new Promise(resolve => {
//         image.onload = () => {
//           ctx.drawImage(image, 0, 0, 800, 600);
//           ctx.font = '36px Arial';
//           ctx.fillStyle = '#000';
//           ctx.textAlign = 'center';
//           ctx.fillText(participant.name, 400, 300);
//           resolve(undefined);
//         };
//       });

//       return canvas.toDataURL(); 
//     } else {
//       throw new Error('Canvas context is null');
//     }
//   };

//   const sendEmails = async () => {
//     try {
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.GMAIL, 
//           pass: process.env.GMAIL_P, 
//         },
//       });

//       for (const participant of participants) {
//         const certificateDataURL = await generateCertificate(participant);
        
//         await transporter.sendMail({
//           from: process.env.GMAIL, 
//           to: participant.email, 
//           subject: 'Certificate', 
//           text: `Dear ${participant.name},\n\nPlease find attached your certificate.\n\nBest regards,\nPathfinder`, 
//           attachments: [
//             {
//               filename: 'certificate.png',
//               content: certificateDataURL.split(';base64,').pop(), 
//               encoding: 'base64',
//             },
//           ],
//         });
//       }
//       console.log('Emails sent successfully!');
//     } catch (error:any) {
//       console.error('Error sending emails:', error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={sendEmails}>Send Certificates</button>
//     </div>
//   );
// };

// export default CertificateGenerator;
