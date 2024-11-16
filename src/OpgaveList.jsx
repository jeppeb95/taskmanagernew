import React, { useState } from 'react';
import './OpgaveList.css';
import SortButtons from './SortButtons';
import OpgaveItem from './OpgaveItem';

function OpgaveList({ tasks, onClearTasks, onUpdateTask, onRemoveTask }) {
    const [editingIndex, setEditingIndex] = useState(null); /* Indeks for den opgave, der redigeres */
    const [editedTask, setEditedTask] = useState({}); /* Holder data for redigeringen */
    const [sortCriteria, setSortCriteria] = useState(null);

    /* Funktion der sorterer opgaverne ud fra dato, prioritet og type samt efter om de er markeret som completed*/
    const sortedTasks = [...tasks].sort((a, b) => {
        /* Sortere først efter om opgaven er completed */
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
    
        /*Sorter derefter for enten dato, prioritet eller type alt efter hvad der vælges*/
        if (sortCriteria === "dato") {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortCriteria === "prioritet") {
            const priorityOrder = { "Høj": 1, "Middel": 2, "Lav": 3 };
            return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
        } else if (sortCriteria === "type") {
            return (a.taskType || "").localeCompare(b.taskType || "");
        }
    
        return 0;
    });
    

    /* Funktion til at markere opgaven som fuldført */
    const handleCompleteTask = (taskId) => {
        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (taskToUpdate) {
            const updatedTask = { 
                ...taskToUpdate, 
                completed: !taskToUpdate.completed  /* Giver opgaverne completed*/
            };
            onUpdateTask(taskId, updatedTask);  /* Opdater opgaven i forældrekomponenten*/
        }
    };
    

    /* Åbn redigering af opgave */
    const handleEditClick = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        setEditingIndex(taskId);
        setEditedTask(task); /* Kopier opgavens data til redigering */
    };

    /* Håndter ændringer i inputfelterne */
    const handleInputChange = (e) => {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value,
        });
    };

    /* Gem de redigerede ændringer */
    const handleSaveClick = () => {
        onUpdateTask(editedTask.id, editedTask);  /* Bruger task.id til opdatering af opgaven*/
        setEditingIndex(null); /* Stop redigering */
    };
    
    return (
        <div className='list-wrapper'>
            <h3>Opgaveliste</h3>

            {/* Sorteringsknapper */}
            <SortButtons setSortCriteria={setSortCriteria} />

            {/* Den øverste bjælke med overskrift og sorteringsfunktionalitet */}
            <div className='headlines-container'>
                <ul>
                    <li className='description-element'>Overskrift</li>
                    <li><button onClick={() => setSortCriteria("dato")}>Dato</button></li>
                    <li><button onClick={() => setSortCriteria("type")}>Type</button></li>
                    <li><button onClick={() => setSortCriteria("prioritet")}>Prioritet</button></li>
                </ul>
            </div>

            <ul className="tasks-list">
                {sortedTasks.map((task) => (
                    <OpgaveItem
                        key={task.id} /* Brug task.id i stedet for index */
                        task={task}
                        editingIndex={editingIndex}
                        editedTask={editedTask}
                        onCompleteTask={handleCompleteTask}
                        onEditClick={handleEditClick}
                        onInputChange={handleInputChange}
                        onSaveClick={handleSaveClick}
                        onRemoveTask={onRemoveTask}
                    />
                ))}
            </ul>

            {/* Knap der kalder på funktionen der rydder opgavelisten */}
            <button className="clearButton global-button" onClick={onClearTasks}>Ryd opgaveliste</button>
        </div>
    );
}

export default OpgaveList;
