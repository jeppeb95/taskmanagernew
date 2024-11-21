import React from 'react';

/*Definerer props for TaskHeader-komponenten */
interface TaskHeaderProps {
  setSortCriteria: (criteria: string) => void;
}

function TaskHeader({ setSortCriteria }: TaskHeaderProps) {
  return (
    /* Usynlig container til overskrifter/sorteringsknapper */
    <div className='headlines-container'>
      <ul>
        <li className='description-element'>Overskrift</li>

        {/* Knap til at sortere opgaver efter dato kalder på SortCriteria fra OpgaveList */}
        <li>
          <button
            onClick={() => setSortCriteria("dato")}
            aria-label="Sortér opgaver efter dato"
          >
            Dato
          </button>
        </li>

        {/* Knap til at sortere opgaver efter type kalder på SortCriteria fra OpgaveList */}
        <li>
          <button
            onClick={() => setSortCriteria("type")}
            aria-label="Sortér opgaver efter type"
          >
            Type
          </button>
        </li>

        {/* Knap til at sortere opgaver efter prioritet kalder på SortCriteria fra OpgaveList */}
        <li>
          <button
            onClick={() => setSortCriteria("prioritet")}
            aria-label="Sortér opgaver efter prioritet"
          >
            Prioritet
          </button>
        </li>
      </ul>
    </div>
  );
}

export default TaskHeader;
