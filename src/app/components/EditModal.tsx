'use client'
import React, { useState, ChangeEvent } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Input
  } from "@heroui/react";


import { useRouter } from 'next/navigation'

interface FormTitle {
    title: string; // Or number, depending on your values
}

interface FormData {
    status:string
    option:string
}

interface iItemProps  {
    id:number
    title:string
    category:string
    status?:string
    desc?:string
    createdAt?:string
}



type StatusButtons = 'start' | 'on process' |'finish'

type RadioButtons = 'PLAN' | 'DIARY' |'TASK'

const EditModal = ({id}:{id:number}) => {

    const router = useRouter()

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [items, setItems] = useState<[]>([]);
    const [formData, setFormData] = useState<FormData>({ status: '', option: '' });
    const [selectedOption, setSelectedOption] = useState<RadioButtons>('PLAN');
    const [selectedStatus, setSelectedStatus] = useState<StatusButtons>('start');

        const [formTitle, setFormTitle] = useState<FormTitle>({ title: '' })
        
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFormTitle({ ...formTitle, title: e.target.value })
        }
        
        const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, option: e.target.value });
        }
            
        const handleStatus = (e: ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, status: e.target.value });
        }
        
        const handleSubmit = async(e) => {
            e.preventDefault();

            
            async function fetchData() {
                //let id=11
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}`, {
                    method:'PATCH',
                    body: JSON.stringify({
                        title: formTitle.title,
                        category:formData.option,
                        status: formData.status
                    }), 
                    cache:'no-cache'
                })
            }
            fetchData()
            router.refresh()
        };

    return (
        <>
        <Button className="delay-150 bg-[#303f9f] text-white" onPress={onOpen}>
          포스트 수정하기
        </Button>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">수정하기</ModalHeader>
                <ModalBody>
                    <div className="flex py-2 px-1">
                     <form onSubmit={handleSubmit} className="w-full">
                            <Input
                                endContent={
                                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label='TITLE'
                                placeholder={formTitle.title || 'title'}
                                value={formTitle.title}
                                onChange={handleChange}
                            />

                            <div className="flex flex-col mx-1 my-3">
                                <p className="text-[.9rem] font-light">Category</p>
                                <div className="flex flex-row gap-1">
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            value='PLAN'
                                            checked={formData.option === 'PLAN'}
                                            onChange={handleOptionChange}
                                            className="ml-1"
                                        />
                                        <span className="ml-1">PLAN</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            value='DIARY'
                                            checked={formData.option === 'DIARY'}
                                            onChange={handleOptionChange}
                                        />
                                        <span className="ml-1">DAIRY</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            value='TASK'
                                            checked={formData.option === 'TASK'}
                                            onChange={handleOptionChange}
                                        />
                                        <span className="ml-1">TASK</span>
                                    </label>
                                </div>
                                </div>
                            </div>

                            <div className="flex flex-col mx-1 my-3">
                                <p className="text-[.9rem] font-light">Status</p>
                                <div className="flex flex-row gap-1">
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            value='start'
                                            checked={formData.status === 'start'} // Important: Check the correct radio
                                            onChange={handleStatus}
                                            className="ml-1"
                                        />
                                        <span className="ml-1">START</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            value='on process'
                                            checked={formData.status === 'on process'} // Important: Check the correct radio
                                            onChange={handleStatus}
                                        />
                                        <span className="ml-1">ON PROCESS</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            value='finish'
                                            checked={formData.status === 'finish'} // Important: Check the correct radio
                                            onChange={handleStatus}
                                        />
                                        <span className="ml-1">FINISH</span>
                                    </label>
                                </div>
                                </div>
                            </div>

                            <div className="flex justify-center flex-row gap-3 mt-10">

                                <Button onPress={onClose}>취소</Button>
                                <Button type="submit" onPress={onClose}
                                    className="delay-150 bg-[#303f9f] text-white">확인</Button>
                            
                            </div>
                        </form>
                    </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
}

export default EditModal

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const LockIcon = (props: IconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};