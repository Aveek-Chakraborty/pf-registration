"use client"
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '@/database/db';

// Define the form schema using Zod
const formSchema = z.object({
    name: z.string().min(2).max(50),
    mobileNo: z.string().min(10).max(15),
    uniqueCode: z.string().min(6),
    email: z.string().email(),
    // usn: z.string().min(10).max(10),
});

interface FormData {
    name: string;
    mobileNo: string;
    uniqueCode: string;
    email: string;
    usn: string;
}

// Component
export default function VerifyCodeForm() {
    const [isVerified, setIsVerified] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            mobileNo: '',
            uniqueCode: '',
            email: '',
            usn: '',
        },
    });

    const onSubmit = (data: FormData) => {
        // Verify unique code only when submit button is clicked
        console.log(data);
        const isCodeVerified = verifyCode(data.uniqueCode);
        if (isCodeVerified) {
            setIsVerified(true);
            toast.success('Form submitted successfully');
            console.log(data); // You can handle form submission here
            } else {
            setIsVerified(false);
            toast.error('Wrong unique code');
        }
    };

    // Function to verify the unique code
    function verifyCode(code: string): boolean {
        if (code.length !== 6) {
            return false;
        }

        const codeWithoutChecksum = code.substring(0, 5);
        const providedChecksum = code.charCodeAt(5) - 65;

        let calculatedChecksum = 0;
        for (let i = 0; i < codeWithoutChecksum.length; i++) {
            calculatedChecksum += parseInt(codeWithoutChecksum[i]);
        }
        calculatedChecksum %= 26;

        if (calculatedChecksum !== providedChecksum) {
            return false;
        }

        return true;
    }

    return (
        <div className="h-screen max:h-screen-auto flex justify-center items-center bg-gradient-to-br from-orange-500/35 via-blue-300 to-purple-400/40">
            <div className="bg-white p-8 rounded-xl shadow-lg w-5/6 h-5/7">
                <h2 className="text-4xl font-semibold mb-4 text-center ">Marathon 15.0 Registration</h2>
                <form className="flex flex-col justify-center" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" id="name" name="name" className="form-input border w-full h-10 rounded-lg" {...form.register("name")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2 ">Mobile Number</label>
                        <input type="text" id="mobile" name="mobile" className="form-input border w-full h-10 rounded-md"  {...form.register("mobileNo")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-gray-700 font-semibold mb-2 ">Unique Code</label>
                        <input type="text" id="code" name="code" className="form-input border w-full h-10 rounded-md"  {...form.register("uniqueCode")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                        <input type="email" id="email" name="email" className="form-input border w-full h-10 rounded-md"  {...form.register("email")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="usn" className="block text-gray-700 font-semibold mb-2">USN</label>
                        <input type="text" id="usn" name="usn" className="form-input border w-full h-10 rounded-md" {...form.register("usn")} />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 self-center">Submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}
