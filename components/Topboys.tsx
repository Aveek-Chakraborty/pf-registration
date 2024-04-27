"use client"
import React, { useState } from 'react';
import { PageSizes, PDFDocument, rgb, StandardFonts } from 'pdf-lib';


type BoysCrossData = {
  name: string;
  time: string;
};

const BoysCrossComponent: React.FC = () => {
  const [data, setData] = useState<BoysCrossData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showData, setShowData] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/topboys');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData.data);
      setError(null);
      setShowData(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowData(false);
  };


  const generatePdf = async (data: BoysCrossData[]) => {
    const response = await fetch('/api/topboys');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const responseData = await response.json();
    setData(responseData.data);
    setError(null);
    setShowData(true);
    const pdfDoc = await PDFDocument.create();
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const page = pdfDoc.addPage(PageSizes.A2);
    const { width, height } = page.getSize();
    const fontSize = 14;
    const margin = 50;
    const tableWidth = width - 2 * margin;
    let y = height - margin;
    const rowHeight = 25;
    const cellPadding = 10;

    const table = {
      x: margin,
      y,
      rows: data.length + 1,
      cols: 2,
      rowHeight,
      cellPadding,
      tableWidth,
      drawHorizontalLine: (x: number, y: number, length: number) => {
        page.drawLine({
          start: { x, y },
          end: { x: x + length, y },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      },
      writeText: (text: string, x: number, y: number) => {
        page.drawText(text, {
          x,
          y: y - fontSize + 5,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      },
    };

    page.setFont(helveticaBoldFont);
    page.drawText("Boyscross Data", {
      x: table.x,
      y: table.y,
      color: rgb(0, 0, 0),
      size: 30,
      opacity: 1,
    });
    table.y -= rowHeight + 10;
    table.writeText("Name", table.x + table.cellPadding, table.y);
    table.writeText(
      "Time",
      table.x + table.cellPadding + tableWidth / 2,
      table.y
    );

    table.y -= rowHeight + 10;

    page.setFont(helveticaFont);
    data.forEach((participant, idx) => {
      table.writeText(participant.name, table.x + table.cellPadding, table.y);
      table.writeText(
        participant.time,
        table.x + table.cellPadding + tableWidth / 2,
        table.y
      );

      table.y -= rowHeight;
    });

    for (let i = 0; i < table.rows; ++i) {
      const y = table.y + 8 + table.rowHeight * i;
      table.drawHorizontalLine(table.x, y, table.tableWidth);
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  const generatePDF = async (data: BoysCrossData[]) => {
    setLoading(true);
    try {
      const pdfBytes = await generatePdf(data);

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'boyscross_data.pdf';
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
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative m-3 w-1/2 ">
      <div className='flex justify-between'>
        <h1 className="text-xl font-bold mb-4">Boyscross Data</h1>
        {showData && (
          <button onClick={handleClose} className=" bg-red-500 text-white px-2 py-1 rounded-md ">
            Close
          </button>
        )}
      </div>
      {!showData && (
        <button onClick={fetchData} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      )}
      {!showData && (
        <button onClick={() => { generatePDF(data) }} disabled={loading} className="bg-green-500 text-white ml-3 px-4 py-2 rounded-md">
          {loading ? 'generating...' : 'Generate PDF'}
        </button>
      )}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      {showData && (
        <div className="table-container mt-3">
          <table className="table-auto w-full border border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b border-gray-200">{item.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default BoysCrossComponent;
