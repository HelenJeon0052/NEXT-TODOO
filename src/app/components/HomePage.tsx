'use client'
import React, { useEffect } from 'react'


import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const HomePage = () => {

  const router = useRouter()
  
  const { data:session, status } = useSession()


  return (
    <div className="h-screen flex flex-col justify-center items-center my-auto gap-3 text-center">
      <p className="text-[2rem] text-grey-800 font-bold mb-2">안녕하세요!</p>
      { 
        status==='unauthenticated' ? (
          <div>
          <p className="mb-5">로그인 부탁드려요</p>
          <button type='button' onClick={()=>router.replace('/login')}
            className="bg-gray-950 rounded-lg text-white font-medium shadow-sm hover:shadow-md p-5 min-w-[150px] delay-150 hover:bg-[#303f9f]">로그인</button>
          </div>
          
        ):(
          <div>
            <p>{/* {session.user?.name} */}</p>
            <button type='button' onClick={()=>router.replace('/todo')}
              className="bg-gray-950 rounded-lg text-white font-medium shadow-sm hover:shadow-md p-3 min-w-[150px] delay-150 hover:bg-[#303f9f]">Todo 페이지</button>
          </div>
        )
      }
    </div>
  )
}


export default HomePage