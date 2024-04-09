"use client";

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
            <div className="bg-white rounded-[10px] p-10 flex flex-col justify-between">
                <h2 className="font-semibold text-green-600 text-xl">Successfully registered!</h2>
                <h4 className="text-center">{params.id}</h4>
                <img src={`data:image/png;base64,${basedata}`}></img>
            </div>
        </div>
    )
}