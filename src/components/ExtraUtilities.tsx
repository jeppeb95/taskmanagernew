import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import OpgaveList from './OpgaveList';
import '../styles/ExtraUtilities.css';
import { Task } from '../types/TaskTypes';


function ExtraUtilities() {
  /*State til opgaverne*/
  const [tasks, setTasks] = useState<Task[]>([]);

  /*Hent opgaver fra localStorage ved indlæsning*/
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  /* Tilføj ny opgave og opdater localStorage*/
  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /* Rydde opgavelisten*/
  const handleClearTasks = () => {
    if (window.confirm("Er du sikker på, at du vil rydde opgavelisten?")) {
      setTasks([]);
      localStorage.removeItem('tasks');
    }
  };

  /* Opdater en opgave*/
  const handleUpdateTask = (taskId: string, updatedTask: Task) => {
    const updatedTasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /* Slet opgave funktion*/
  const handleRemoveTask = (id: string) => {
    /*Bekræftelse af sletning*/
    const confirmDelete = window.confirm("Er du sikker på, at du vil slette denne opgave?");
    
    /*Hvis brugeren bekræfter sletning gennemføres denne*/
    if (confirmDelete) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideBar onAddTask={handleAddTask} />
      <div className="ExtraUtilities">
        <OpgaveList
          tasks={tasks}
          onClearTasks={handleClearTasks}
          onUpdateTask={handleUpdateTask}
          onRemoveTask={handleRemoveTask}
          aria-label="Liste over opgaver"
        />
      </div>
    </div>
  );
}

export default ExtraUtilities;
