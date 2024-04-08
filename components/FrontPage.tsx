import React from "react";
import "./FrontPage.css";
import { useRouter } from "next/navigation";
const FrontPage: React.FC = () => {
    const router = useRouter();
    return (
        <div className="background h-screen flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl text-center mb-3 text-white drop-shadow-md ">Registrations</h1>
            <div className="bg-white w-5/6 h-3/6 rounded drop-shadow-md flex flex-col align-middle space-y-6 items-center justify-center">
                <h2 className="font-bold text-4xl text-center p-3 bg-clip-text text-transparent inline-block bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800 drop-shadow-md">Choose your category</h2>
                <button className="font-semibold border m-5 rounded p-3 w-2/6 bg-blue-500 text-white text-2xl drop-shadow-sm" onClick={() => {
                    router.push("/boy");
                }}>Boys Marathon</button>
                <button className="font-semibold border m-5 rounded p-3 w-2/6 bg-blue-500 text-white text-2xl  drop-shadow-sm" onClick={() => {
                    router.push("/girl");
                }}>Girls Marathon</button>
                <button className="font-semibold border m-5 rounded p-3 w-2/6 bg-blue-500 text-white text-2xl  drop-shadow-sm" onClick={() => {
                    router.push("/walk");
                }}>Walkathon</button>
            </div>
        </div>
    );
}

export default FrontPage;