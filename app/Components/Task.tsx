import React, { useState, useContext, useEffect } from 'react'
import dragcontext from '../Context/dragcontext'
import context from '../Context/context'
import { motion } from 'motion/react'
import deletecontext from '../Context/deletecontext'
import { updateTasks } from '@/Server/useractions'
import { deleteTasks } from '@/Server/useractions'
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface TaskProps {
    item: {
        email: string,
        task: string,
        status: string,
        id: number
    }
}

const Task: React.FC<TaskProps> = ({ item }) => {
    const deletetask = useContext(deletecontext)
    const [visibility, setVisibility] = useState(false)
    const value = useContext(context)
    const dragcontexttask = useContext(dragcontext)
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        const getsession = async () => {
            const Session = await getSession();
            setSession(Session)
        }
        getsession();
    }, [])

    const D_start = () => { }

    const D_end = async () => {
        if ((item.id !== dragcontexttask?.dragtask?.id || item.status !== dragcontexttask?.dragtask?.status) && dragcontexttask?.dragtask !== undefined && !deletetask?.deletetask) {
            const newTasks = value?.Tasks.map((task) =>
                task === item ? { ...task, status: dragcontexttask?.dragtask.status, id: dragcontexttask.dragtask.id } :
                    task.status === dragcontexttask?.dragtask.status && task.id >= dragcontexttask?.dragtask.id ? { ...task, id: task.id + 1 } : task
            );
            if (newTasks) {
                value?.setTasks(newTasks);
            } else {
                console.log('newTasks is undefined');
            }
            await updateTasks({ id: dragcontexttask?.dragtask.id, status: dragcontexttask?.dragtask.status, item: item, email: `${session?.user?.email}` })
        }
        if (deletetask?.deletetask) {
            const newtasks = value?.Tasks.filter((task) => task !== item);
            const updatedTasks = newtasks?.map((task) => 
                task.status === item.status && task.id >= item.id ? { ...task, id: task.id + 1 } : task
            );
            if (updatedTasks) { value?.setTasks(updatedTasks); }
            await deleteTasks({ email: `${session?.user?.email}`, id: item.id || 2, status: item.status || "Current" });
            deletetask.setdeletetask?.(false);
        }
    };
    const D_enter = () => {
        setVisibility(true);
    }

    const D_leave = () => {
        setVisibility(false);
        dragcontexttask?.setdragtask(item)
    }

    return (
        <React.Fragment>
            <div style={
                {
                    opacity: visibility === false ? 0 : 1,
                }
            } className="h-[2px] w-full bg-purple-500"></div>
            <motion.div layout draggable onDragLeave={D_leave} onDragStart={D_start} onDragEnd={D_end} onDragEnter={D_enter} className="bg-neutral-800 overflow-hidden w-full my-[2px] cursor-grab py-3 px-3 whitespace-pre-wrap active:border-neutral-800 pr-6 border border-neutral-600 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
                {item.task}
            </motion.div>
        </React.Fragment>
    )
}

export default Task