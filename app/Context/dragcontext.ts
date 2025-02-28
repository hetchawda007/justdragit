import React from "react";

interface Task {
    email: string;
    task: string;
    status: string;
    id: number;
}

interface DragProps {
    dragtask: Task;
    setdragtask: React.Dispatch<React.SetStateAction<Task>>;
}

const dragcontext = React.createContext<DragProps | undefined>(undefined)
export default dragcontext;