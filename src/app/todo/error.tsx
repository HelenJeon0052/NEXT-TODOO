'use client'
import React, { useEffect } from 'react'



const Error = ({error, reset}:{
    error:Error&{digest?:string}
    reset:()=>void
    }) => {

        useEffect(()=>{
            console.error(error.message)
        },[error])

        return (
            <div className="h-screen text-center mx-auto">
                <p className="font-semibold text-[1.2rem] text-gray-800">/todo:페이지 로딩에 문제가 발생했어요</p>
                <button onClick={()=>reset()}
                    className="w-[120px] p-3 text-center rounded-lg bg-[#3f51b5] text-white font-light text-[.9rem] hover:shadow-sm">
                    다시 시도하기
                </button>
            </div>
        )
}

export default Error