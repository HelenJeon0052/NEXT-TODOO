'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {Avatar, AvatarIcon} from "@heroui/react";
import { LuListTodo } from "react-icons/lu"

const LOGIN_MENUS = [
    {id:1, title:'login', url:'/login'}
]

const LOGOUT_MENUS = [
    {id:1, title:'logout', url:'/', signOut:true}
]

const NavBar = () => {
    const router = useRouter()
    const { data:session, status } = useSession()
    
    useEffect(()=>{
        //console.log(session)
        //console.log(status)
    },[session, status])

    return (
        <div className="w-full shadow-sm bg-white fixed top-0 mx-auto z-50">
            <div className="flex flex-row justify-between px-10 items-center h-[80px]">
                <Link href='/'><LuListTodo fontSize="1.8rem"/></Link>
                {
                    status==='unauthenticated' ? (LOGIN_MENUS?.map((menu)=>(
                        <div key={menu.id} className="flex flex-row gap-2">
                            <span className="_hidden">logged out</span>
                            <button type="button" onClick={()=>router.push('login')}
                                className="rounded-md bg-gray-950 text-white text-[.9rem] px-2 py-2 min-w-20 hover:font-bold hover:shadow-sm delay-150 hover:bg-[#303f9f]">Log in</button>
                        </div>
                    )) 
                    ) : ( LOGOUT_MENUS?.map((menu)=>(
                        <div key={menu.id} className="flex flex-row gap-5 items-center">
                            
                            <Link href='/todo'><span className="hover:underline underline-offset-2">todo</span></Link>

                            <div className="flex flex-row items-center justify-end gap-1">
                                {
                                    session?.user?.email ? (
                                        <span className="text-right text-[.9rem] font-light text-gray-600">{session?.user?.email}</span>
                                    ):(
                                    <span className="text-right text-[.9rem] font-light text-gray-300">안녕하세요</span>
                                )
                                }
                            
                                <Avatar
                                    classNames={{
                                    base: "bg-gradient-to-br from-[#7986cb] to-[#303f9f]",
                                    icon: "text-black/80",
                                    }}
                                    icon={<AvatarIcon />}
                                />
                            </div>

                            <span className="_hidden">logged in</span>
                            <button type="button" onClick={()=>{menu.signOut? signOut():null; router.push(menu.url);}}
                                className="rounded-md bg-gray-950 text-white text-[.9rem] px-2 py-2 min-w-20 hover:font-bold hover:shadow-sm delay-150 hover:bg-[#303f9f]">log out</button>

                        </div>
                    )))
                }
            </div>
        </div>
  )
}

export default NavBar