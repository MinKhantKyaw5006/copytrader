import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({children}: {children: ReactNode}) => {

    const session = await auth();
    if(!session) redirect("/sign-in");
    
  return <main>
    <div className='mx-auto max-w-7xl'>
        header
        <div className='mt-20 pb-20'>
            {children}
        </div>
    </div>
  </main>
}

export default layout