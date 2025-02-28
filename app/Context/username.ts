import React, { createContext } from "react";

interface userprops {
    user: string,
    setuser: React.Dispatch<React.SetStateAction<string>>
}

const username = createContext<userprops | undefined>(undefined)
export default username