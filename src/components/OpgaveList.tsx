import React, { useState } from 'react';
import '../styles/OpgaveList.css';
import SortButtons from './SortButtons';
import OpgaveItem from './OpgaveItem';
import { Task } from '../types/TaskTypes';

/*Definere de props som modtages og behandles i OpgaveList*/
interface OpgaveListProps {
  tasks: Task[];
  onClearTasks: () => void;
  onUpdateTask: (taskId: string, updatedTask: Task) => void;
  onRemoveTask: (taskId: string) => void;
}

/* OpgaveList-komponenten håndterer opgavelisten, herunder visning, opdatering, sletning og oprydning af opgaver. */
const OpgaveList: React.FC<OpgaveListProps> = ({
  tasks,
  onClearTasks,
  onUpdateTask,
  onRemoveTask,
}) => {
  
  /* State til håndtering af redigering */
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  /* State til lagring af den redigerede opgaves data */
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  /* State til sortering og filtrering af opgaver */
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);

  /* Filtrering af opgaverne */
  const filteredTasks = tasks.filter(task => {
    const matchesType = filterType ? task.taskType === filterType : true;
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    const matchesDate = filterDate ? new Date(task.dueDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
    return matchesType && matchesPriority && matchesDate;
  });

  /* Sorter opgaverne baseret på det valgte kriterium */
  const sortedTasks = [...filteredTasks].sort((a, b) => {
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

  /* Opdel opgaverne i completed og ikke-completed */
  const nonCompletedTasks = sortedTasks.filter(task => !task.completed);
  const completedTasks = sortedTasks.filter(task => task.completed);

  /* Kombiner opgaverne, så completed opgaver kommer til sidst */
  const tasksToDisplay = [...nonCompletedTasks, ...completedTasks];

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

      {/* Filtreringsdropdowns */}
      <select
        onChange={(e) => setFilterType(e.target.value)}
        value={filterType || ''}
        aria-label="Filtrer opgaver efter type"
        className="filter-dropdown"
      >
        <option value="">Alle typer</option>
        <option value="Personlige opgaver">Personlige opgaver</option>
        <option value="Arbejdsopgaver">Arbejdsopgaver</option>
        <option value="Studieopgaver">Studieopgaver</option>
        <option value="Økonomi">Økonomi</option>
        <option value="Sociale aktiviteter">Sociale aktiviteter</option>
        <option value="Øvrige">Øvrige</option>
      </select>

      <select
        onChange={(e) => setFilterPriority(e.target.value)}
        value={filterPriority || ''}
        aria-label="Filtrer opgaver efter prioritet"
        className="filter-dropdown"
      >
        <option value="">Alle prioriteringer</option>
        <option value="Høj">Høj</option>
        <option value="Middel">Middel</option>
        <option value="Lav">Lav</option>
      </select>

      <input
        type="date"
        onChange={(e) => setFilterDate(e.target.value)}
        value={filterDate || ''}
        aria-label="Filtrer opgaver efter dato"
        className="filter-input"
      />

      {/* Den øverste bjælke med overskrift og sorteringsfunktionalitet */}
      <div className="headlines-container">
        <ul>
          <li className="description-element" aria-label="Opgaveoverskrift">
            Overskrift
          </li>
          <li>
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
            <button onClick={() => setSortCriteria('prioritet')} aria-label="Sortér efter prioritet">
              Prioritet
            </button>
          </li>
        </ul>
      </div>

      <ul className="tasks-list">
        {tasksToDisplay.map((task) => (
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
        aria-label="Slet alle opgaver"
      >
        Ryd opgavelisten
      </button>
    </main>
  );
};

export default OpgaveList;
