'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

import { IoIosRefresh } from "react-icons/io"

const Refresbtn = () => {
  
    const router = useRouter()

    const handleRefresh = () => {
      router.refresh()
    }
    
    return (
        <>
          <button type="button" className="rounded-md border border-gray-300 min-w-[50px] py-3 bg-white flex justify-center items-center"
              onClick={handleRefresh}>
                <IoIosRefresh fontSize="1.2rem"/>
          </button>
        </>
    )
}

export default Refresbtn