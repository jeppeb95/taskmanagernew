/*Definerer typen for en opgave */
export interface Task {
    id: string;
    taskTitle: string;
    priority: string;
    dueDate: string;
    taskType: string;
    taskDescription: string;
    completed: boolean;
  }
  
  /*Udelader completed hvis den ikke anvendes i det pågældende komponent */
  export type TaskWithoutCompleted = Omit<Task, 'completed'>;
  