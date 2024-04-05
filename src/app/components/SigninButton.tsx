"use client"
import React from 'react'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@nextui-org/react'

const SigninButton = () => {
    const { data: session } = useSession()
    return (
        <div className='flex items-center gap-2'>
            {
                session && session.user ? (
                    <>
                        <p>{session.user.name}</p>
                        <p>{session.user.email}</p>
                        {/* <Link
                            className='text-sky-500 hover:text-sky-600 transition-colors'
                            href={"/api/auth/signout"}
                        >Sign Out</Link> */}
                        <Button as={Link} color="secondary"  variant="flat" href={"/api/auth/signout"}>Sign Out</Button>                        
                    </>
                ) : (
                    <>
                        <Button as={Link} color="primary"  variant="flat" href={"/api/auth/signin"}>Sign In</Button>
                        <Button as={Link} color="primary"  variant="flat" href={"/auth/signup"}>Sign Up</Button>
                    </>
                )
            }
        </div>
    )
}

export default SigninButton