'use client'
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { useRouter } from "next/navigation";

type sizeTypes = "sm" | "md" | "lg";

const DeleteModal = ({id}:{id:number}) => {

    const router = useRouter()

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [size, setSize] = useState<sizeTypes>("md");

    const handler = async() => {

          //console.log('delete start')
  
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}`, {
              method:'DELETE'
          })
          router.refresh()
          //console.log('deleted')
    
    }

    const handleOpen = (size:sizeTypes) => {
        setSize(size);
        onOpen();
    };

    return (
        <>
        <div className="flex flex-wrap gap-3">
            <Button onPress={() => handleOpen('sm')}>
                삭제
            </Button>
        </div>
        <Modal isOpen={isOpen} size={size} onClose={onClose}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">삭제</ModalHeader>
                <ModalBody>
                    <p>
                    리스트를 삭제하시겠어요?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                     아니오
                    </Button>
                    <Button color="default" onPress={() => handler()}>
                     삭제
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    );
}

export default DeleteModal;