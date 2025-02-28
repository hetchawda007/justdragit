"use client"
import React from 'react'
import Image from 'next/image'
import { useEffect} from 'react'
import { motion } from "motion/react"
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Page = () => {

    useEffect(() => {
        const func = async () => {
            const session = await getSession()
            if (session) {
                redirect(`/dashboard/${session?.user?.name}`)
            }
        }
        func()
    }, [])

    const handlesignin = async () => {
        console.log('login')
        signIn('google')
    }

    return (
        <>
        
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className='flex flex-col items-center justify-center'>
                <motion.div className='flex items-center mt-20 mb-8 gap-5 cursor-pointer'
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    drag
                    dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    dragElastic={0.5}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                >
                    <Image className='size-16' src="/logo.png" alt="logo" width={500} height={500} />
                    <h1 className='text-4xl text-white font-bold'>Just Drag It</h1>
                </motion.div>
                <h2 className='text-white text-2xl font-semibold'>Login to get started :)</h2>
                <motion.button onClick={handlesignin} type="button" className="text-gray-900 bg-white hover:bg-gray-100 mt-20 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-6 py-3 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="size-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                    </svg>
                    Login with Google
                </motion.button>
            </div>
        </>
    )
}

export default Page