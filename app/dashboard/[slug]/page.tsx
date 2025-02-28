"use client"
import { FiTrash } from "react-icons/fi"
import { FaFire } from "react-icons/fa"
import { motion } from "motion/react"
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import context from "@/app/Context/context";
import Taskwrapper from "@/app/Components/Taskwrapper";
import dragcontext from "@/app/Context/dragcontext";
import deletecontext from "@/app/Context/deletecontext";
import { getTasks } from "@/Server/useractions";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface TaskProps {
    email: string,
    task: string,
    status: string,
    id: number
}

const Page = () => {

    const [dragtask, setdragtask] = useState<TaskProps>({ task: '', status: '', id: 0, email: '' })
    const [deletetask, setdeletetask] = useState<boolean>(false)
    const [deleteelement, setdeleteelement] = useState<boolean>(false)
    const [session, setSession] = useState<Session | null>(null)
    const D_enter = () => {
        setdeleteelement(true)
    }
    const D_Leave = () => {
        setdeletetask(true)
        setdeleteelement(false)
    }


    const [Tasks, setTasks] = useState<TaskProps[]>([])
    useEffect(() => {
        const sessionverify = async () => {
            const Session = await getSession();
            if (!Session) {
                redirect('/login')
            } else {
                setSession(Session)
                const tasksResponse = await getTasks(`${Session?.user?.email}`);
                setTasks(tasksResponse)
            }
        }
        sessionverify();
    }, [])

    return (
        <deletecontext.Provider value={{ deletetask, setdeletetask }}>
            <dragcontext.Provider value={{ dragtask, setdragtask }}>
                <context.Provider value={{ Tasks, setTasks }}>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <div className="text-white flex justify-center items-center gap-6 mt-10 w-full">
                            {session?.user?.name ? <> <img className="rounded-full w-14" src={`${session?.user?.image}`} alt="userimage" />
                                <div className="flex flex-col gap-1">
                                    <div className="text-2xl leading-none font-bold">Welcome {session?.user?.name}</div>
                                    <div className="text-lg leading-none text-neutral-300 font-semibold">{session?.user?.email}</div>
                                </div>
                                <motion.button type="button" onClick={() => signOut()} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >Logout
                                </motion.button></>
                                : <div className="flex gap-5">
                                    <Skeleton circle={true} height={60} width={60} />
                                    <Skeleton height={55} width={320} />
                                </div>}
                        </div>
                        <div className="flex text-white min-h-screen gap-5 p-32 h-[92vh] w-full justify-center items-center">
                            <Taskwrapper status="Current" />
                            <Taskwrapper status="Inprogress" />
                            <Taskwrapper status="Completed" />
                            <IconContext.Provider value={{ color: "#6e6e6e", size: "2em" }}>
                                {deleteelement === false && <div onDragEnter={D_enter} className="w-[25%] h-72 border self-start bg-[#262626] border-neutral-600 flex justify-center items-center rounded-lg">
                                    <FiTrash />
                                </div>}
                            </IconContext.Provider>
                            <IconContext.Provider value={{ color: "red", size: "2em" }}>
                                {deleteelement === true && <div onDragLeave={D_Leave} className="w-[25%] h-72 border self-start bg-red-950 border-red-600 flex justify-center items-center rounded-lg">
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: [0, 5, -5, 0] }}
                                        transition={{ repeat: Infinity, ease: "easeInOut", duration: 1 }}
                                    >
                                        <FaFire />
                                    </motion.div>
                                </div>}
                            </IconContext.Provider>
                        </div >
                    </SkeletonTheme>
                </context.Provider>
            </dragcontext.Provider>
        </deletecontext.Provider>
    )
}

export default Page