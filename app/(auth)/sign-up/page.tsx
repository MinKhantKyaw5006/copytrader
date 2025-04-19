"use client";

import AuthForm from '@/components/AuthForm'

import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => (
    <AuthForm
    type = "SIGN_UP"
    schema = {signUpSchema}
    defaultValues ={{
        email: '',
        password: '',
        fullName: '',
    }}
    onSubmit={()=>{}}
    />
)
export default page