"use client";
import AuthForm from '@/components/AuthForm'
import { SignInWithCredentials } from '@/lib/actions/auth';

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
    onSubmit={SignInWithCredentials}
    />
)
export default page