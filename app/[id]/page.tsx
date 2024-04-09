"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage({ params }: any) {
    const [basedata, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/success?q=${params.id}`);
            const data = await response.json();
            setData(data.message);
        };
        fetchData();
    }, []);
    return (
        <div className="h-screen max:h-screen-auto flex flex-col justify-center items-center bg-gradient-to-br from-orange-500/35 via-blue-300 to-purple-400/40">
            <div className="bg-white rounded-[10px] p-5 flex flex-col justify-between m-2 mr-5 ml-5 items-center">
                {basedata && <h2 className="font-semibold text-green-600 text-xl text-center">Successfully registered!</h2>}
                {!basedata && <h2 className="font-semibold text-red-600 text-xl text-center">Invalid Code!</h2>}
                {basedata && <img src={`data:image/png;base64,${basedata}`} width={250} />}
            </div>
            {basedata && <div className="bg-white rounded-[10px] p-5 flex flex-col justify-between mb-2 mr-5 ml-5 items-center">
                <label className="text-red-500 text-wrap text-left font-semibold text-[1.2rem]"><span className="red">* </span>This should be ready with you when you cross the finish line </label>
                <label className="text-red-500 text-wrap text-left font-semibold text-[1.2rem]"><span className="red">* </span>An email will be sent to you with the QR Code. If possible, take a screenshot of this page</label>
            </div>}
            {basedata && <Link href={"https://chat.whatsapp.com/H8DVoN1forH0PkcQxf7wW3"} >
                <div className="bg-green-500 p-4 rounded-[10px] pr-12 pl-12  flex flex-col justify-between mr-5 ml-5 items-center">

                    <button className="bg-green-500 p-4 rounded-[10px] text-white text-xl font-semibold  text-center">Join the Whatsapp Group for updates</button>

                </div></Link>}
        </div>
    )
}