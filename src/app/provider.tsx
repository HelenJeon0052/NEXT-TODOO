'use client'
import * as React from "react";
import { SessionProvider } from 'next-auth/react'

import { HeroUIProvider } from "@heroui/react"
import NavBar from '@/app/components/NavBar'

export function Providers ({children}:{children:React.ReactNode}) {
  return (
    <HeroUIProvider>
    <SessionProvider>
        {children}
    </SessionProvider>
    </HeroUIProvider>
  );
}

export const NextLayout = ({ children }:{ children: React.ReactNode }) => {
  return (
    <>

    <NavBar/>
    {children}

    </>
  )
}