"use client"


import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the form schema using Zod
const formSchema = z.object({
    name: z.string().min(2).max(50),
    mobileNo: z.string().min(10).max(15),
    uniqueCode: z.string().min(6).max(6),
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Marathon 15.0 Registration</h2>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" {...form.register("name")} />
                        </div>
                        <div>
                            <label htmlFor="mobileNo" className="sr-only">Mobile No</label>
                            <input id="mobileNo" name="mobileNo" type="text" autoComplete="tel" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mobile No" {...form.register("mobileNo")} />
                        </div>
                        <div>
                            <label htmlFor="uniqueCode" className="sr-only">Unique Code</label>
                            <input id="uniqueCode" name="uniqueCode" type="text" autoComplete="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Unique Code" {...form.register("uniqueCode")} />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" {...form.register("email")} />
                        </div>
                        <div>
                            <label htmlFor="usn" className="sr-only">USN</label>
                            <input id="usn" name="usn" type="text" autoComplete="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="USN" {...form.register("usn")} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.707.293l-7 7a1 1 0 000 1.414l7 7a1 1 0 001.414-1.414L4.414 10 9 5.414A1 1 0 008 4a1 1 0 00-.707.293z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M10 0a1 1 0 00-.707.293l-7 7a1 1 0 000 1.414l7 7a1 1 0 001.414-1.414L5.414 10 10 5.414A1 1 0 009 4a1 1 0 00-.707.293z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
