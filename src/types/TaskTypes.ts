/*Definerer typer for task */
export interface Task {
    id: string;
    taskTitle: string;
    priority: string;
    dueDate: string;
    taskType: string;
    taskDescription: string;
    completed: boolean;
  }
