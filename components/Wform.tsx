"use client"
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    mobile_no: z.string().min(10).max(15),
    unique_code: z.string().min(6),
    email: z.string().email(),

});

interface FormData {
    name: string;
    mobile_no: string;
    unique_code: string;
    email: string;
}


export default function Wform() {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            mobile_no: '',
            unique_code: '',
            email: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        const isCodeVerified = verifyCode(data.unique_code);
        if (isCodeVerified) {
            setIsVerified(true);
            try {
                const response = await fetch('/api/walk', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                if (result.message === 'Data saved successfully') {
                    router.push(`/${data.unique_code}`);
                    setIsDisabled(true)
                } else {
                    toast.error(result.message || 'An error occurred');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                toast.error('An error occurred. Please try again later.');
            }
        } else {
            setIsVerified(false);
            toast.error('Wrong unique code');
        }

    };


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
                <h2 className="text-4xl font-semibold mb-4 text-center ">Walkathon 15.0 Registration</h2>
                <form className="flex flex-col justify-center" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name <span className=' text-red-700'>*</span></label>
                        <input type="text" id="name" name="name" required className="form-input border w-full h-10 rounded-lg" {...form.register("name")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2 ">Mobile Number <span className=' text-red-700'>*</span></label>
                        <input type="text" id="mobile" name="mobile" required className="form-input border w-full h-10 rounded-md"  {...form.register("mobile_no")}  />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-gray-700 font-semibold mb-2 ">Unique Code <span className=' text-red-700'>*</span></label>
                        <input type="text" id="code" name="code" required className="form-input border w-full h-10 rounded-md"  {...form.register("unique_code")}  />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address<span className=' text-red-700'>*</span></label>
                        <input type="email" id="email" name="email" required className="form-input border w-full h-10 rounded-md"  {...form.register("email")}  />
                    </div>
                    
                    {isDisabled && 
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 self-center">Submit</button>}
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}
