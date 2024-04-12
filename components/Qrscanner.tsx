"use client";
import React from "react";
import Link from "next/link";

const Qrscanner = () => {
  return (
    <div>
      <Link href="https://pf-qr-scanner.web.app/">
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          QR Scanner
        </button>
      </Link>
    </div>
  );
};

export default Qrscanner;
