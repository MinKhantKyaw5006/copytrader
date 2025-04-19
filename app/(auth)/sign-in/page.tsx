"use client";
import AuthForm from '@/components/AuthForm'

import { signINSchema } from '@/lib/validations'
import React from 'react'

const page = () => (
    <AuthForm
    type = "SIGN_IN"
    schema = {signINSchema}
    defaultValues ={{
        email: '',
        password: '',
    }}
    onSubmit={()=>{}}
    />
)
export default page