import React from 'react';

function OpgaveItem({
    task,
    editingIndex,
    editedTask,
    onCompleteTask,
    onEditClick,
    onInputChange,
    onSaveClick,
    onRemoveTask
}) {
    return (
        <li
            className={`task-ul ${task.completed ? 'completed' : ''}`}  /*Tilføj 'completed' klasse, når opgaven er fuldført*/
        >
            {editingIndex === task.id ? (  /* Brug task.id i stedet for index */
                <>
                    {/* Inputfelter til redigering af opgave */}
                    <input
                        type="text"
                        name="taskTitle"
                        value={editedTask.taskTitle}
                        onChange={onInputChange}
                        aria-label="Rediger opgavens titel"
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={editedTask.dueDate}
                        onChange={onInputChange}
                        aria-label="Rediger opgavens forfaldsdato"
                    />
                    <select
                        name="taskType"
                        value={editedTask.taskType}
                        onChange={onInputChange}
                        aria-label="Vælg opgavens type"
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
                        onChange={onInputChange}
                        aria-label="Vælg prioritet"
                    >
                        <option value="Høj">Høj</option>
                        <option value="Middel">Middel</option>
                        <option value="Lav">Lav</option>
                    </select>
                    <div className='btn-wrapper'>
                        <button 
                        onClick={onSaveClick} 
                        className='save-btn global-button' 
                        aria-label="Gem opgave">
                            Gem
                            </button>
                        <button 
                        onClick={() => onRemoveTask(task.id)} 
                        className="delete-btn global-button" 
                        aria-label="Slet opgave"> 
                        Slet
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Vis opgaveoplysningerne */}
                    <div className="task-title">{task.taskTitle}</div>
                    <div className='date-class'>
                        <span><img src="svg/date-symbol.svg" alt="Piktogram af en kalender og ur" /></span>{task.dueDate}
                    </div>
                    <div className='type-prio-wrapper'>
                        <div className='type-container'>
                            <div className="type-box">{task.taskType}</div>
                        </div>
                        <div className='priority-container'>
                            <div className={`priority-class ${task.priority.toLowerCase()}`}>
                                {task.priority}
                            </div>
                        </div>
                        <div className='button-ul-wrapper'>
                            {/*Knap der kalder på funktionen der åbner redigering af opgaven*/}
                            <button 
                            onClick={() => onEditClick(task.id)} 
                            className='edit-button button1'
                            aria-label="Rediger opgave">
                                <img src="svg/edit.svg" alt="Rund knap med piktogram der symbolisere redigering" />
                            </button>

                            {/*Knap der kalder på funktionen der markerer opgaven som fuldført*/}
                            <button 
                            onClick={() => onCompleteTask(task.id)} 
                            className='edit-button button2'
                            aria-label="Marker opgave som fuldført">
                                <img src="svg/flueben.svg" alt="Rund knap med flueben" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}

export default OpgaveItem;
