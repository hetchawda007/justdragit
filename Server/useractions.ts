"use server"
import connectDB from "@/db/connnectDB"
import Tasks from "@/models/Tasks"

type Tasksprops = {
    email: string,
    task: string
    status: string,
    id: number
}

type updateTasksprops = {
    email: string,
    item: Tasksprops
    id: number
    status: string
}

type deleteTasksprops = {
    email: string,
    id: number
    status: string
}

export const getTasks = async (email: string) => {
    await connectDB()
    const tasks = await Tasks.find({ email: email }, { email: 0 })
    console.log(email, tasks);
    return JSON.parse(JSON.stringify(tasks))
}

export const addTasks = async (task: Tasksprops) => {
    await connectDB()
    console.log(task);
    const tasks = await Tasks.create({
        email: task.email,
        task: task.task,
        status: task.status,
        id: task.id
    })
    await tasks.save()
}

export const updateTasks = async (task: updateTasksprops) => {
    await connectDB()
    if (task.item.status !== task.status) {
        console.log(task.item.id + " " + task.item.status, task.id + " " + task.status)
        await Tasks.updateMany({ email: task.email, id: { $gte: task.id }, status: task.status }, { $inc: { id: 1 } })
        await Tasks.updateMany({ email: task.email, id: { $gt: task.item.id }, status: task.item.status }, { $inc: { id: -1 } })
        await Tasks.updateOne({ email: task.email, id: task.item.id, status: task.item.status }, { status: task.status, id: task.id })
    }
    else {
        if (task.item.id > task.id) {
            // Moving up
            const tasks = await Tasks.findOne({ email: task.email, id: task.item.id, status: task.item.status }, { email: 0 })
            console.log(tasks, task.item.id + " " + task.item.status, task.id + " " + task.status)
            await Tasks.updateMany({ email: task.email, id: { $lt: task.item.id, $gte: task.id }, status: task.status }, { $inc: { id: 1 } })
            if (tasks) {
                await Tasks.updateOne({ email: task.email, _id: tasks._id }, { $set: { id: task.id } })
            }
        }
        else if (task.item.id !== task.id - 1 && task.item.id < task.id) {
            // Moving down
            const tasks = await Tasks.findOne({ email: task.email, id: task.item.id, status: task.item.status }, { email: 0 })
            await Tasks.updateMany({ email: task.email, id: { $lt: task.id, $gte: task.item.id }, status: task.status }, { $inc: { id: -1 } })
            if (tasks) {
                await Tasks.updateOne({ email: task.email, _id: tasks._id }, { $set: { id: task.id - 1 } })
            }
        }
    }
}
export const deleteTasks = async (task: deleteTasksprops) => {
    await connectDB()
    await Tasks.deleteOne({ email: task.email, id: task.id, status: task.status })
    console.log(task.id + " " + task.status)
    await Tasks.updateMany({ email: task.email, id: { $gt: task.id }, status: task.status }, { $inc: { id: -1 } })
}