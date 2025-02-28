import React from "react";

interface DeleteProps {
    deletetask: boolean;
    setdeletetask: React.Dispatch<React.SetStateAction<boolean>>;
}

const deletecontext = React.createContext<Partial<DeleteProps | undefined>>(undefined)
export default deletecontext;