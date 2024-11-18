import React, { useState } from 'react';
import { Task } from './types/TaskTypes';
import './OpgaveItem.css';

/*Definerer prop-typen for OpgaveItem-komponenten*/
interface OpgaveItemProps {
  task: Task;
  editingIndex: string | null;
  editedTask: Partial<Task>;
  onCompleteTask: (taskId: string) => void;
  onEditClick: (taskId: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSaveClick: () => void;
  onRemoveTask: (taskId: string) => void;
}

/*Hovedkomponenten der viser en opgave */
const OpgaveItem: React.FC<OpgaveItemProps> = ({
  task,
  editingIndex,
  editedTask,
  onCompleteTask,
  onEditClick,
  onInputChange,
  onSaveClick,
  onRemoveTask,
}) => {
  /* State der holder øje med om opgavebeskrivelsen er udvidet*/
  const [isExpanded, setIsExpanded] = useState(false);

  /*Funktion der toggler en udvidelse så beskrivelsen bliver synlig */
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li 
      className={`task-ul ${task.completed ? 'completed' : ''} ${isExpanded ? 'expanded' : ''}`}
      onClick={handleToggle} /* Når der klikkes på hele task-ul udvides den*/
    >
      {editingIndex === task.id ? (
        <>
          {/* Inputfelter til redigering af opgave */}
          <label htmlFor="taskTitle">Overskrift på opgaven</label>
          <input
            type="text"
            name="taskTitle"
            value={editedTask.taskTitle || ''}
            onChange={onInputChange}
            aria-label="Rediger opgavens titel"
          />

        <label htmlFor="dueDate">Forfaldsdato</label>
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate || ''}
            onChange={onInputChange}
            aria-label="Rediger opgavens forfaldsdato"
          />

        <label htmlFor="taskType">Opgavetype</label>
          <select
            name="taskType"
            value={editedTask.taskType || ''}
            onChange={onInputChange}
            aria-label="Vælg opgavens type"
          >
            <option value="Personlige opgaver">Personlige opgaver</option>
            <option value="Arbejdsopgaver">Arbejdsopgaver</option>
            <option value="Studieopgaver">Studieopgaver</option>
            <option value="Økonomi">Økonomi</option>
            <option value="Sociale aktiviteter">Sociale aktiviteter</option>
          </select>

          <label htmlFor="priority">Prioritet</label>
          <select
            name="priority"
            value={editedTask.priority || ''}
            onChange={onInputChange}
            aria-label="Vælg prioritet"
          >
            <option value="Høj">Høj</option>
            <option value="Middel">Middel</option>
            <option value="Lav">Lav</option>
          </select>

          <label htmlFor="taskDescription">Beskrivelse af opgaven</label>
          <textarea
            name="taskDescription"
            className='taskDescription-input-edit'
            value={editedTask.taskDescription || ''}
            onChange={onInputChange}
            aria-label="Rediger opgavens beskrivelse"
            placeholder='Rediger opgavebeskrivelse'
          />

          <div className="btn-wrapper">
            <button 
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation(); /* Stopper klik-hændelsen fra at påvirke hele 'task-ul' */
            onSaveClick();
            }}
            className="save-btn global-button" 
            aria-label="Gem opgave">
              Gem
            </button>
            <button
             onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            onRemoveTask(task.id);
            }}
            className="delete-btn global-button"
            aria-label="Slet opgave"
            >
              Slet
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Vis opgaveoplysningerne */}
          <div className="task-title">{task.taskTitle}</div>
          <div className="date-class">
            <span>
              <img src="svg/date-symbol.svg" alt="Piktogram af en kalender og ur" />
            </span>
            {task.dueDate}
          </div>
          <div className="type-prio-wrapper">
            <div className="type-container">
              <div className="type-box">{task.taskType}</div>
            </div>
            <div className="priority-container">
              <div className={`priority-class ${task.priority.toLowerCase()}`}>
                {task.priority}
              </div>
            </div>
            <div className="button-ul-wrapper">
              {/*Knap der kalder på funktionen der åbner redigering af opgaven*/}
              <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation(); /* Stopper klik-hændelsen fra at påvirke hele 'task-ul' */
            onEditClick(task.id); 
             }}                
                className="edit-button button1"
                aria-label="Rediger opgave"
              >
                <img src="svg/edit.svg" alt="Rund knap med piktogram der symbolisere redigering" />
              </button>
              {/*Knap der kalder på funktionen der markerer opgaven som fuldført*/}
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.stopPropagation(); /* Stopper klik-hændelsen fra at påvirke hele 'task-ul' */
                onCompleteTask(task.id);
                }}                
                className="edit-button button2"
                aria-label="Marker opgave som fuldført"
              >
                <img src="svg/flueben.svg" alt="Rund knap med flueben" />
              </button>
            </div>
          </div>
          {/* Task description vises kun når opgaven er udvidet */}
          {isExpanded && <div className="taskDescription">{task.taskDescription}</div>}
        </>
      )}
    </li>
  );
};

export default OpgaveItem;
