'use client'
import React, { useEffect } from 'react'
import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc"
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {

    const router = useRouter()

    const { data:session, status } = useSession()

    useEffect(()=>{
        if(status==='unauthenticated'){
            console.log('error:unauthenticated')
        }
        if(status==='authenticated'){
            console.log(session)
            console.log('error:go to home')
            router.replace('/')
        }
    },[router, status])
    
    const handleGoogleLogin = () => {
        try {
            console.log('login trying')
            signIn('google',{callbackUrl:'/'})
            toast.success('로그인 되었습니다')
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center py-[100px] text-center">
            <div><Toaster/></div>
            <p className="text-center text-[1.2rem] text-gray-900">login</p>
            <div className="my-5">
                <button type="button" onClick={handleGoogleLogin}
                    className="flex flex-row border border-gray-500 text-[.9rem] text-gray-800 justify-center items-center gap-3 font-light rounded-lg w-[250px] px-3 py-3 hover:shadow-sm hover:font-medium"><FcGoogle fontSize="1.2rem" />구글 로그인</button>
            </div>
        </div>
    )
}

export default Login