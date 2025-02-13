import React from 'react'
import TodoList from '@/app/components/TodoList'
import AddItem from '@/app/components/AddItem'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Refreshbtn from '@/app/components/Refresbtn'

interface iItemProps  {
    id:number
    title:string
    category:string
    status:string
    desc:string
    userId:string
    createdAt:string
}

interface iProps {
    id:number
}

const TodoPage = async() => {
    const data:iItemProps[]=await getData()

    if (!data) {
        redirect('/login')
    }

    return (
        <div className="flex flex-col items-center justify-between px-24 py-36 mx-auto w-[800px]">
            <p className="text-[2rem] text-gray-900 font-medium text-center mb-2">TodoList</p>
            <div className="my-6 min-w-[630px] flex flex-col justify-center items-center">
                <Refreshbtn/>
                <AddItem/>
                <TodoList data={data ?? []}/>
            </div>
        </div>
  )
}

export default TodoPage

async function getData() {
    try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`,{
            method: "GET",
            headers: headers()
          })

        if(!res.ok) {
            throw new Error('failed fetching')
        }

        console.log('/todo, response')
        console.log(res)
    
        return res.json()
    }
    catch(e) {
        console.error(e)
    }
}