"use client"
import React, { useState, ChangeEvent, FormEvent, use, useEffect } from 'react';
import { PDFDocument, PDFImage, StandardFonts, rgb } from "pdf-lib";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Page: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showData, setShowData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [certBytes, setPdfBytes] = useState<ArrayBuffer>();

    useEffect(() => {
        const fetchImg = async () => {
            const certUrl = process.env.NEXT_PUBLIC_CERT_URL as string;
            console.log(certUrl)
            const certBuffer = await fetch(certUrl).then(img => img.arrayBuffer())
            console.log(certBuffer)
            setPdfBytes(certBuffer)
        }

        fetchImg();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/getcert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const codee = await response.json()
            if (codee.data.length > 0) {
                setName(codee.data[0].name);
                setShowData(true);
                // toast.success('Match found successfully!!');
            } else {
                console.error('Error sending data to the backend');
                toast.error("Match not found of unique code");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const generatePdf = async (data: string) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([3508, 2456]);

        const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
        const fontSize = 100;
        page.setFont(font);

        const textWidth = font.widthOfTextAtSize(data, fontSize);
        const { width, height } = page.getSize();


        const certImage = await pdfDoc.embedPng(certBytes as ArrayBuffer);
        page.drawImage(certImage, {
            x: 0,
            y: 0,
            height: 2456,
            width: 3508,
        });

        page.drawText(data, {
            x: (page.getWidth() - textWidth) / 2,
            y: 1415,
            size: 100,
            color: rgb(0, 0, 0),
            font,
        });
        const pdfBytes = await pdfDoc.save();
        return pdfBytes
    }

    const generatePDF = async (data: string) => {
        setLoading(true);
        try {
            const pdfBytes = await generatePdf(data);

            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'CertificateOfParticipation.pdf';
            link.click();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error generating PDF:', error);
            setError('Failed to generate PDF');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen max:h-screen-auto flex justify-center items-center bg-gradient-to-br from-orange-500/35 via-blue-300 to-purple-400/40'>
            <div className='bg-white p-8 rounded-xl shadow-lg h-5/7 flex flex-col justify-center items-center'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Unique Code<span className=" text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your unique code"
                            value={code}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                    {showData && (
                        <button onClick={() => { generatePDF(name) }} disabled={loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded">
                            {loading ? 'generating...' : 'Generate Certificate'}
                        </button>
                    )}
                </form>
                <ToastContainer />
            </div>

        </div>
    );
};

export default Page;


