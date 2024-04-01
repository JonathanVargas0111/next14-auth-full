'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { z } from 'zod';
import validator from 'validator';
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Controller, SubmitHandler } from "react-hook-form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrengthGame";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

// Definición del esquema de validación
const FormSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(45, "Name must be less than 45 characters")
        .regex(new RegExp('^[a-zA-Z ]*$'), "No special character allowed!"),
    email: z.string().email("Invalid email address, please enter a valid email address"),
    phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password must be less than 30 characters"),
    confirmPassword: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password must be less than 30 characters"),
    acceptTerms: z.literal(true, {
        errorMap: () => ({
            message: "Please accept all terms",
        }),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
});

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
    const { register, handleSubmit, reset, control, watch, formState: { errors }, } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    })
    const [passStrength, setPassStrength] = useState(0);
    const [passConfirmStrength, setPassConfirmStrength] = useState(0);

    const [isVisiblePass, setIsVisiblePass] = useState(false);

    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id);
        setPassConfirmStrength(passwordStrength(watch().confirmPassword).id);
    }, [watch().password, watch().confirmPassword])

    const toggleVisiblePass = () => setIsVisiblePass((prev) => !prev);

    // Función para guardar el usuario
    const saveUser: SubmitHandler<InputType> = async (data) => {        
        const {acceptTerms, confirmPassword,...user} = data
        try {
            const result = await registerUser(user);
            toast.success("The user registered successfully!");
        } catch (error) {
            toast.error("An error occurred while registering the user!");
            console.error("Error:", error);
        }

    }

    return (
        <form
            onSubmit={handleSubmit(saveUser)}
            className="sm:w-2/3 w-full mt-5 mx-auto"
        >
            <div className="w-full flex flex-row flex-wrap my-5 px-auto gap-4 justify-center">
                <div className="w-full flex flex-row justify-center">
                    <Input
                        isRequired
                        errorMessage={errors.name?.message}
                        isInvalid={!!errors.name}
                        {...register("name")}
                        className="col-span-2 max-w-[220px] md:max-w-[440px] lg:max-w-[600px]"
                        variant="bordered"
                        label="Name"
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center">
                    <Input
                        isRequired
                        errorMessage={errors.email?.message}
                        isInvalid={!!errors.email}
                        {...register("email")}
                        className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                        variant="bordered"
                        label="Email"
                    />
                    <Input
                        isRequired
                        errorMessage={errors.phone?.message}
                        isInvalid={!!errors.phone}
                        {...register("phone")}
                        className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                        variant="bordered"
                        label="Phone"
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center">
                    <Input
                        isRequired
                        errorMessage={errors.password?.message}
                        isInvalid={!!errors.password}
                        {...register("password")}
                        className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                        label="Password"
                        variant="bordered"
                        type={isVisiblePass ? "text" : "password"}
                        endContent={
                            isVisiblePass ?
                                <EyeSlashIcon
                                    className="w-4 cursor-pointer"
                                    onClick={toggleVisiblePass}
                                /> :
                                <EyeIcon
                                    className="w-4 cursor-pointer"
                                    onClick={toggleVisiblePass}
                                />
                        }
                        description={
                            <PasswordStrength passStrength={passStrength} />
                        }
                    />

                    <Input
                        isRequired
                        errorMessage={errors.confirmPassword?.message}
                        isInvalid={!!errors.confirmPassword}
                        {...register("confirmPassword")}
                        className="col-span-2 max-w-[220px] lg:max-w-[300px]"
                        label="Confirm Pass"
                        variant="bordered"
                        type={isVisiblePass ? "text" : "password"}
                        description={
                            <PasswordStrength passStrength={passConfirmStrength} />
                        }
                    />
                </div>
            </div>
            <Controller
                control={control}
                name="acceptTerms"
                render={({ field }) => (
                    <Checkbox
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="text-sm"
                    >
                        I Accept the <Link href={"/tems"}>Terms</Link>
                    </Checkbox>
                )}
            />
            {!!errors.acceptTerms && (
                <p className="text-red-500">{errors.acceptTerms.message}</p>
            )}
            <div className="flex justify-center col-span-2 mt-5">
                <Button type="submit" className="" color="primary" variant="flat" size="lg" >Sign in</Button>
            </div>
        </form>
    )
}

export default SignUpForm;  