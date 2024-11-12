import React, { useState } from 'react';
import './OpgaveList.css';

function OpgaveList({ tasks, onClearTasks, onUpdateTask, onRemoveTask }) { 
    const [editingIndex, setEditingIndex] = useState(null); /* Indeks for den opgave, der redigeres */
    const [editedTask, setEditedTask] = useState({}); /* Holder data for redigeringen*/

    /*Åbn redigering af opgave*/
    const handleEditClick = (index, task) => {
        setEditingIndex(index);
        setEditedTask(task); /* Kopier opgavens data til redigering */
    };

    /*Håndter ændringer i inputfelterne*/
    const handleInputChange = (e) => {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value,
        });
    };

    /*Gem de redigerede ændringer*/
    const handleSaveClick = () => {
        onUpdateTask(editingIndex, editedTask); /*Opdater opgaven*/
        setEditingIndex(null); /* Stop redigering */
    };

    return (
        <div>
            <h3>Opgaveliste</h3>
            <div className='headlines-container'>
                <ul>
                    <li className='description-element'>Overskrift</li>
                    <li>Dato</li>
                    <li>Type</li>
                    <li>Proritet</li>
                </ul>
            </div>
            <ul className="tasks-list">
                {tasks.map((task, index) => (
                    <li className="task-ul" key={index}>
                        {editingIndex === index ? (
                            /*Vis inputfelter til redigering*/
                            <>
                                <input
                                    type="text"
                                    name="taskTitle"
                                    value={editedTask.taskTitle}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={editedTask.dueDate}
                                    onChange={handleInputChange}
                                />
                                <select
                        name="taskType"
                        value={editedTask.taskType}
                        onChange={handleInputChange}
                    >
                       <option value="Personlige opgaver">Personlige opgaver</option>
                        <option value="Arbejdsopgaver">Arbejdsopgaver</option>
                        <option value="Studieopgaver">Studieopgaver</option>
                        <option value="Økonomi">Økonomi</option>
                        <option value="Sociale aktiviteter">Sociale aktiviteter</option>
                    </select>
                               <select
                        name="priority"
                        value={editedTask.priority}
                        onChange={handleInputChange}
                    >
                        <option value="Høj">Høj</option>
                        <option value="Middel">Middel</option>
                        <option value="Lav">Lav</option>
                    </select>   
                    <div className='btn-wrapper'>
                                <button onClick={handleSaveClick} className='save-btn'>Gem</button>
                                <button onClick={() => onRemoveTask(index)} className="delete-btn">
                            Slet
                        </button>
                        </div>
                            </>
                        ) : (
                            /*Vis opgaveoplysningerne*/
                            <>
                                <div className="task-title">{task.taskTitle}</div>
                                <div className='date-class'><span><img src="svg/date-symbol.svg" alt="Piktogram af en kalender og ur" /></span>{task.dueDate}</div>
                                <div className='type-prio-wrapper'>
                                    <div className='type-container'><div className="type-box">{task.taskType}</div></div>
                                    <div className='priority-container'><div className={`priority-class ${task.priority.toLowerCase()}`}>
                                        {task.priority}
                                    </div></div>
                                    <button onClick={() => handleEditClick(index, task)} className='edit-button'><img src="svg/edit.svg" alt="" /></button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <button className="clearButton" onClick={onClearTasks}>Ryd opgaveliste</button>
        </div>
    );
}

export default OpgaveList;
