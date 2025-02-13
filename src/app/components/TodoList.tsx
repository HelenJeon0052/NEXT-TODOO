'use client'
import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@heroui/react";

import EditModal from '@/app/components/EditModal'
import DeleteModal from '@/app/components/DeleteModal'
import style from '@/styles/comp.module.css'

const columns = [
    {label: 'title'},
    {label: 'category'},
    {label: 'status'},
    {label: 'edit'},
    {label: 'delete'},
];


interface iItemProps  {
    id:number
    title:string
    category:string
    status?:string
    desc?:string
    createdAt?:string
}

interface iProps {
    data:iItemProps[]
}

const TodoList = ({data}:{data:iItemProps[]}) => {
  return (
    <div className="w-full">

        <Table aria-label="simple table" className={style.table}>
            <TableHeader className="text-gray-800">
                <TableColumn>{columns[0].label}</TableColumn>
                <TableColumn>{columns[1].label}</TableColumn>
                <TableColumn>{columns[2].label}</TableColumn>
                <TableColumn>{columns[3].label}</TableColumn>
                <TableColumn>{columns[4].label}</TableColumn>
            </TableHeader>
            <TableBody emptyContent="no data">
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{getKeyValue(item, columns[0].label)}</TableCell>
                        <TableCell>{getKeyValue(item, columns[1].label)}</TableCell>
                        <TableCell>{getKeyValue(item, columns[2].label)}</TableCell>
                        <TableCell><EditModal id={item.id}/></TableCell>
                        <TableCell><DeleteModal id={item.id}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default TodoList