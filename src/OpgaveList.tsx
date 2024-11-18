import React, { useState } from 'react';
import './OpgaveList.css';
import SortButtons from './SortButtons';
import OpgaveItem from './OpgaveItem';
import { Task } from './types/TaskTypes';

/*Definerer prop-typen for OpgaveList-komponenten */
interface OpgaveListProps {
  tasks: Task[];
  onClearTasks: () => void;
  onUpdateTask: (taskId: string, updatedTask: Task) => void;
  onRemoveTask: (taskId: string) => void;
}

const OpgaveList: React.FC<OpgaveListProps> = ({
  tasks,
  onClearTasks,
  onUpdateTask,
  onRemoveTask,
}) => {
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);

    /* Funktion der sorterer opgaverne ud fra dato, prioritet og type samt efter om de er markeret som completed*/
    const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    /*Sorter derefter for enten dato, prioritet eller type alt efter hvad der vælges*/
    if (sortCriteria === 'dato') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortCriteria === 'prioritet') {
      const priorityOrder: { [key: string]: number } = { Høj: 1, Middel: 2, Lav: 3 };
      return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
    } else if (sortCriteria === 'type') {
      return (a.taskType || '').localeCompare(b.taskType || '');
    }
    return 0;
  });

    /* Funktion til at markere opgaven som fuldført */
    const handleCompleteTask = (taskId: string) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      onUpdateTask(taskId, updatedTask);
    }
  };

    /* Åbn redigering af opgave */
    const handleEditClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingIndex(taskId);
      setEditedTask(task);
    }
  };

    /* Håndter ændringer i inputfelterne */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

    /* Gem de redigerede ændringer */
    const handleSaveClick = () => {
    if (editedTask.id) {
      onUpdateTask(editedTask.id, editedTask as Task);
      setEditingIndex(null);
    }
  };

  return (
    <main>
      <h3 aria-label="Liste med opgaver">Opgaveliste</h3>
        {/* Sorteringsknapper */}
      <SortButtons setSortCriteria={setSortCriteria} aria-label="Sortér opgaver" />
        {/* Den øverste bjælke med overskrift og sorteringsfunktionalitet */}
      <div className="headlines-container">
        <ul>
          <li className="description-element" aria-label="Opgaveoverskrift">
            Overskrift
          </li>
          <li>
            {/* Knapper der kalder på SortCriteria og sortere efter henholdsvis, dato, type og prioritet */}
            <button onClick={() => setSortCriteria('dato')} aria-label="Sortér efter dato">
              Dato
            </button>
          </li>
          <li>
            <button onClick={() => setSortCriteria('type')} aria-label="Sortér efter type">
              Type
            </button>
          </li>
          <li>
            <button onClick={() => setSortCriteria('prioritet')} aria-label="Sortér efter proritet">
              Prioritet
            </button>
          </li>
        </ul>
      </div>
      <ul className="tasks-list">
        {sortedTasks.map(task => (
          <OpgaveItem
            key={task.id}
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
      <button
        className="clearButton global-button"
        onClick={onClearTasks}
        aria-label="Ryd opgavelisten"
      >
        Ryd opgaveliste
      </button>
    </main>
  );
};

export default OpgaveList;
