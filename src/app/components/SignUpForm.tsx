"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import 'animate.css';

import {
    EyeIcon,
    EyeSlashIcon,
    KeyIcon
} from "@heroicons/react/20/solid";


/* Schemas */

import {z} from 'zod'
import validator from 'validator'

const FormSchema = z.object({
    name:z
    .string()
    .min(2,"Name must be atleast 2 characters")
    .max(45,"Name must be less than 45 characters")
    .regex(new RegExp('^[a-zA-Z ]*$'),"No special character allowed!"),
    email: z.string().email("Invalid email address, please enter a valid email address"),
    phone: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(30, "Password must be less than 30 characters"),
    confirmPassword: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(30, "Password must be less than 30 characters"),
    acceptTerms: z.literal(true,{
        errorMap:()=>({
            message:"Please accept the terms and conditions"
        }),
    })
}).refine(data=>data.password===data.confirmPassword,{
    message:"Passwords do not match",
    path:["password", "confirmPassword"]
})

export const SignUpForm = () => {

    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);
 




    return (

        <section className="min-h-screen flex items-stretch text-white ">
            <div className="lg:flex w-1/2 hidden bg-gray-500 relative items-center bg-[url('/img/hero-skate.jpg')]">
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide animate__animated animate__backInLeft">¡Regístrate y comparte tus mejores trucos!</h1>
                    <p className="text-3xl my-4 animate__animated animate__backInUp"> ¡Es hora de mostrar tu talento en lo que amas!</p>
                </div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 " >
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center bg-[url('/img/hero-skate.jpg')]">
                    <div className="absolute bg-black opacity-90 inset-0 z-0  bg-gradient-to-r from-slate-900 to-slate-900"></div>
                </div>
                <div className="w-full py-6 z-20 flex flex-col justify-items-center animate__animated animate__backInRight">
                    <div className="w-full px-24 z-10 lg:hidden">
                        <p className="text-3xl my-4"> ¡Es hora de mostrar tu talento!</p>
                    </div>
                    <div className="py-6 space-x-2">
                        <span className="w-10 h-10  lg:w-14 lg:h-14 items-center justify-center inline-flex rounded-full font-bold text-lg lg:text-2xl border-2 border-red-600">G+ </span>
                    </div>
                    <p className="text-gray-100">
                        or use email your account
                    </p>

                    <form action="" className="sm:w-2/3 w-full mt-5 mx-auto">
                        <div className="w-full flex flex-row flex-wrap my-5 px-auto gap-4 justify-center">
                            <div className="w-full flex flex-row justify-center">
                                <Input
                                    className="col-span-2 max-w-[220px] md:max-w-[440px] lg:max-w-[600px]"
                                    variant="bordered"
                                    label="Name"
                                />
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center">
                                <Input
                                    className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                                    variant="bordered"
                                    label="Email"
                                />
                                <Input
                                    className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                                    variant="bordered"
                                    label="Phone"
                                />
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center">
                                <Input
                                    className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                                    label="Password"
                                    variant="bordered"
                                    type={isVisiblePass ? "text" : "password"}
                                    endContent={
                                        isVisiblePass ?
                                            <EyeSlashIcon
                                                className="w-4 cursor-pointer"
                                                onClick={toggleVisblePass}
                                            /> :
                                            <EyeIcon
                                                className="w-4 cursor-pointer"
                                                onClick={toggleVisblePass}
                                            />
                                    }
                                />
                                <Input
                                    className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                                    label="Password"
                                    variant="bordered"
                                    type={isVisiblePass ? "text" : "password"}                                    
                                />
                            </div>
                        </div>
                        <Checkbox>
                            I Accept the <Link href={"/tems"}>Terms</Link>
                        </Checkbox>
                        {/* <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                            <a href="#">Forgot your password?</a>
                        </div> */}
                        <div className="flex justify-center col-span-2 mt-5">
                            <Button className="" color="primary" variant="flat" size="lg" >Sign in</Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}