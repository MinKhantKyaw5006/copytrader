    "use client";
    import React from 'react'
    import { zodResolver } from '@hookform/resolvers/zod';
    import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
    import { ZodType } from 'zod';
    import { Button } from "@/components/ui/button"
    import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    } from "@/components/ui/form"
    import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';



    interface Props<T extends FieldValues>{
        schema: ZodType<T>;
        defaultValues: T;
        onSubmit: (data: T) => Promise<{success: boolean, error?: string}>;
        type: "SIGN_IN" | "SIGN_UP";
    }

    const AuthForm = <T extends FieldValues> ({
        type, 
        schema, 
        defaultValues, 
        onSubmit
    }: Props<T>) => {
        const router = useRouter();
        const isSignIn = type === "SIGN_IN";

            // 1. Define your form.
        const form: UseFormReturn<T> = useForm({
            resolver: zodResolver(schema),
            defaultValues: defaultValues as DefaultValues<T>,
    })
    
        // 2. Define a submit handler.
        const handleSubmit: SubmitHandler<T>= async (data) => {
            const result = await onSubmit(data);

            if(result.success){
                toast(`${isSignIn ? "Signed in" : "Signed up"}`, {
                    description: isSignIn
                      ? "You have successfully signed in."
                      : "You have successfully signed up.",
                  });
                  router.push("/");
            }else{
                toast(`Error ${isSignIn ? "signing in" : "signing up"}`, {
                    description: result.error ?? "An error occurred.",
                    className: "bg-destructive text-destructive-foreground", // or use variant styling if you made custom
                  });
            }
        }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-black'>
                {isSignIn ? 'Welcome back to copy trader': 'Create your copy trader account'}
            </h1>
            <p className='text-black'>
                {isSignIn ? "start your copy trading today" : "Please create an account to start copy trading"}
            </p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                {Object.keys(defaultValues).map((field)=>(
                                    <FormField
                                    key={field}
                                    control={form.control}
                                    name= {field as Path<T>}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                        <FormControl>
                                            <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} />
                                        </FormControl>
                                       
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                ))}

                <Button type="submit">{isSignIn ? 'Sign In': 'Sign Up'}</Button>
            </form>
            </Form>

            <p >
                {isSignIn ? "New to copy trading?" : "Already have an account?"}
                <Link href={isSignIn ? '/sign-up' : '/sign-in'}>{isSignIn ? "Create an account" : "Sign in"}</Link>
            </p>
        </div>
       
    )
    
    }

    export default AuthForm