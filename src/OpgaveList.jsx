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
            <ul class="tasks-list">
    {tasks.map((task, index) => (
        <li className="task-ul" key={index}>
            <div className="task-title">{task.taskTitle}</div>
            <div className='date-class'><span><img src="svg/date-symbol.svg" alt="Piktogram af en kalender og ur" /></span>{task.dueDate}</div>
            <div className='type-prio-wrapper'>
            <div className='type-container'><div className="type-box">{task.taskType}</div></div>
            <div className='priority-container'><div className={`priority-class ${task.priority.toLowerCase()}`}>
    {task.priority}
</div>
</div>
            </div>
            <div className="task-description">{task.taskDescription}</div>
        </li>
    ))}
</ul>

            <button className="clearButton" onClick={onClearTasks}>
                Ryd opgaveliste
            </button>
        </div>
    );
}

export default OpgaveList;
