import React, { useContext, useState, useEffect } from 'react'
import context from '../Context/context';
import { motion } from 'motion/react'
import Task from "./Task";
import { addTasks } from '@/Server/useractions';
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface TaskProps {
    status: string
}

const Taskwrapper: React.FC<TaskProps> = ({ status }) => {
    const [addtask, setAddtask] = useState(true)
    const value = useContext(context)
    const [task, setTask] = useState('')
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        const getsession = async () => {
            const Session = await getSession();
            setSession(Session)
        }
        getsession();
    }, [])

    const handlechange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask(e.target.value)
    }

    const handleadd = async () => {
        value?.setTasks([...value.Tasks, { email: `${session?.user?.email}`, task: task, status: status, id: value?.Tasks.filter((item) => item.status === status).length + 1 }])
        setAddtask(!addtask)
        await addTasks({ email: `${session?.user?.email}`, task: task, status: status, id: (value?.Tasks?.filter((item) => item.status === status).length ?? 0) + 1 })
        setTask('')
    }

    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="flex flex-col w-[25%] h-full items-center">

                {Array.isArray(value?.Tasks) ? (
                    value?.Tasks.length > 0 ? (
                        <div className="flex justify-between items-center w-full mb-5">
                            <div className="text-yellow-200 text-lg font-semibold">{status}</div>
                            <div className="text-neutral-400">
                                {value?.Tasks.filter((item) => item.status === status).length}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center w-full mb-5">
                            <div className="text-yellow-200 text-lg font-semibold">{status}</div>
                            <div className="text-neutral-400">
                                {value?.Tasks.filter((item) => item.status === status).length}
                            </div>
                        </div>
                    )
                ) : (
                    // Show skeleton only while value?.Tasks is undefined (loading state)
                    <div className="mt-2">
                        <Skeleton width={300} height={40} />
                    </div>
                )}

                <div className='w-full'>
                    {Array.isArray(value?.Tasks) ? (
                        value?.Tasks.length > 0 ? (
                            <motion.div layout>
                                {value?.Tasks
                                    .filter((item) => item.status === status)
                                    .sort((a, b) => a.id - b.id)
                                    .map((item) => (
                                        <Task key={item.id} item={item} />
                                    ))}
                            </motion.div>
                        ) : (
                            // Empty state message when no tasks exist
                            <div className="mt-2 text-gray-400">No tasks available.</div>
                        )
                    ) : (
                        // Show skeleton only while value?.Tasks is undefined (loading state)
                        <div className="mt-2">
                            <Skeleton width={300} height={50} count={3} />
                        </div>
                    )}
                    {addtask === true &&
                        <>
                            <div className='w-full'>
                                <button onClick={() => setAddtask(!addtask)} className="outline-none bg-opacity-0 text-neutral-400 text-sm w-fit self-start mt-2 ml-3 hover:text-neutral-200">Add card +</button>
                            </div>
                        </>
                    }

                    {addtask === false && <div className="w-full flex flex-col">
                        <textarea autoFocus={true} onChange={handlechange} value={task} name="current" id="current" placeholder="Add new task..." className="placeholder:text-blue-300 text-yellow-50 mt-1 font-semibold text-sm border-2 border-blue-600 placeholder:font-semibold placeholder:text-sm h-16 w-full pt-3 pl-3 bg-blue-950 rounded-lg focus:outline-none"></textarea>
                        <div className="flex items-center gap-5 self-end mt-3">
                            <button onClick={() => { setAddtask(!addtask) }} className="outline-none bg-opacity-0 text-neutral-400 text-sm w-fit hover:text-neutral-200">Close</button>
                            <button disabled={task.length === 0} onClick={handleadd} className="bg-white px-3 py-1 text-black rounded-lg hover:bg-slate-200 h-fit">Add +</button>
                        </div>
                    </div>}
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default Taskwrapper