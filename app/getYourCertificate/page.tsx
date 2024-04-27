"use client"
import React, { useState, ChangeEvent, FormEvent, use, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const Page: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showData, setShowData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [certBytes, setPdfBytes] = useState<ArrayBuffer>();

    useEffect(() => {
        const fetchImg = async () => {

            const certUrl = process.env.NEXT_PUBLIC_CERT as string;
            const certBuffer = await fetch(certUrl).then((img) => img.arrayBuffer());
            setPdfBytes(certBuffer);
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
            if (response.ok) {
                setName(codee.data[0].name);
                setShowData(true);
            } else {
                console.error('Error sending data to the backend');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const generatePdf = async (data: string) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([3508, 2456]);

        const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
        const textWidth = font.widthOfTextAtSize(data, 100);

        const pngImage = await pdfDoc.embedPng(certBytes as ArrayBuffer);

        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: 3508,
            height: 2456,
        });

        page.drawText(data, {
            x: (page.getWidth() - textWidth) / 2,
            y: 1420,
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
        <div className='h-screen flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
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
                    <button onClick={() => { generatePDF(name) }} disabled={loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        {loading ? 'generating...' : 'Generate Certificate'}
                    </button>
                )}
            </form>
        </div>
    );
};

export default Page;


