import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import OpgaveList from './OpgaveList';
import './App.css';


function App() {
  /*State der bruges til at holde styr på opgaverne */
    const [tasks, setTasks] = useState([]);

    /* Henter opgaver fra localStorage når siden indlæses */
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          /*Opdaterer state med de gemte opgaver */
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    /* Gemmer opgaverne i localStorage ved tilføjelse af en ny opgave så de ikke forsvinder igen */
    const handleAddTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); /* Opdaterer localStorage */
    };

    /* Funktion der kan rydde opgavelisten */
    const handleClearTasks = () => {
          /*Bekræftelsesbesked før brugeren rydder listen */
        const confirmClear = window.confirm("Er du sikker på, at du vil rydde opgavelisten?");
        if (confirmClear) {
            setTasks([]); 
            localStorage.removeItem('tasks'); /* Fjerner opgaverne fra localStorage*/
        }
    };

    return (
        <div style={{ display: 'flex' }}>
                    {/* Renderer SideBar giver den funktionalitet til at tilføje opgaver */}
            <SideBar onAddTask={handleAddTask} />
            <div className="App">
                                  {/* Renderer OpgaveList og giver den funktionalitet til at rydde listen */}
                <OpgaveList tasks={tasks} onClearTasks={handleClearTasks} />
            </div>
        </div>
    );
}

export default App;
