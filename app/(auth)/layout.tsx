import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({children}: {children: ReactNode}) => {
    const session = await auth();
    if(session) redirect("/");
    
  return (
    <main>{children}</main>
  )
}

export default layout