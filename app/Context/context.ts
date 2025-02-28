import { createContext } from "react";
interface Task {
  email : string,
  task: string;
  status: string;
  id: number;
}
interface ContextType {
  Tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const context = createContext<ContextType | undefined>(undefined);

export default context;