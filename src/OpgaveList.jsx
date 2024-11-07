import React from 'react';
import './OpgaveList.css';

function OpgaveList({ tasks, onClearTasks }) {
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
            <ul>
                {tasks.map((task, index) => (
                    <ul className="task-ul" key={index}>
                        <li className='task-title'>{task.taskTitle}</li>
                        <li>{task.dueDate}</li>
                        <li className='type-li'><div className='type-box'>{task.taskType}</div></li>
                        <li>{task.priority}</li>
                        <li className='task-description'>{task.taskDescription}</li>
                    </ul>
                ))}
            </ul>
            <button className="clearButton" onClick={onClearTasks}>
                Ryd opgaveliste
            </button>
        </div>
    );
}

export default OpgaveList;
