'use client'
import React,{ useState, useEffect, FormEventHandler } from 'react'


import { useRouter } from 'next/navigation'
import { Button } from '@heroui/button'
import { Input } from "@heroui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";

interface iItemProps  {
    id:number
    title:string
    category:string
    status?:string
    desc?:string
    createdAt?:string
}

type statusTypes = 'start' | 'on process' |'finish'

type categoryTypes = 'PLAN' | 'DIARY' |'TASK'

const AddItem = () => {

    const router = useRouter()

    const [items, setItems] = useState<[]>([]); // Store the list of items
    const [value, setValue] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [category, setCategory] = useState<categoryTypes>('PLAN')
    const [status, setStatus] = useState<statusTypes>('start')
    const [isLoading, setIsLoading] = useState(false);

    const handler:FormEventHandler<HTMLFormElement> = async(e) => {

        e.preventDefault();
        
        setIsLoading(true);
        console.log(title)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                category: category,
                status: status
            }),
            cache:'no-cache'
        })
        setTitle('');
        router.refresh()
    }

    return (
        <div className="w-full">
            <div className="flex flex-row gap-3">
                { !items ? (<div>loading</div>) : 
                (
                    <form onSubmit={handler} className="w-full flex flex-col items-center justify-between gap-2 mt-5 mb-3">
                        
                        <Input
                            id="name"
                            className=""
                            value={title}
                            label="TITLE"
                            type="text"
                            variant="flat"
                            onChange={(e) => {
                                setTitle(e.target.value)
                                {/*refactoring required*/}
                                {/*setValue(e.target.value.length>0)*/}
                            }}
                        />
                        <div className="flex flex-row gap-3 w-full">
                            <select
                            className="basis-2/5 border rounded-lg border-gray-500 text-gray-800 px-2 py-3 text-[.8rem] h-[56px]"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value as categoryTypes)
                            }}>
                            <option value="PLAN">PLAN</option>
                            <option value="DIARY">DIARY</option>
                            <option value="TASK">TASK</option>
                        </select>
                        <select
                            className="basis-2/5 border rounded-lg border-gray-500 text-gray-800 px-2 py-3 text-[.8rem] h-[56px]"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value as statusTypes)
                            }}>
                            <option value="start">START</option>
                            <option value="on process">ON PROCESS</option>
                            <option value="finish">FINISH</option>
                        </select>
                        
                        <div className="basis-1/5">
                            {
                            //refactoring required
                            title ? (
                                <Button type="submit" className="w-full h-[56px]" disabled={!title}>
                                    확인
                                </Button>
                            )
                            
                            : (
                                //refactoring required
                                <Popover placement="right">
                                    <PopoverTrigger>
                                        <Button type="submit" className="w-full h-[56px] bg-slate-500 text-slate-300" disabled={!title}>
                                        click
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-1">
                                        <div className="text-small font-bold mb-[2px]">타이틀은 필수항목이에요</div>
                                        <div className="text-tiny">타이틀을 넣어주세요</div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
            

                        }
                        </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddItem