import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import OpgaveList from './OpgaveList';
import './App.css';

function App() {
  /*State til opgaverne*/
  const [tasks, setTasks] = useState([]);

  /*Hent opgaver fra localStorage ved indlæsning*/
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  /* Tilføj ny opgave og opdater localStorage*/
  const handleAddTask = (newTask) => {
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
  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /* Slet opgave knap*/
  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

  return (
    <div style={{ display: 'flex' }}>
      <SideBar onAddTask={handleAddTask} />
      <div className="App">
      <OpgaveList 
          tasks={tasks} 
          onClearTasks={handleClearTasks} 
          onUpdateTask={handleUpdateTask} 
          onRemoveTask={handleRemoveTask}  
        />      
        </div>
    </div>
  );
}

export default App;
