import React from 'react';

/*Definerer props for Sortbuttons-komponenten */
interface SortButtonsProps {
  setSortCriteria: (criteria: string) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ setSortCriteria }) => {
  return (
    <div className="sort-buttons">
      <p>Sortér efter: </p>
    {/* Container der indeholder sorteringsknapperne kalder på SortCriteria fra OpgaveList*/}
      <div className="sort-buttons-container">
    {/* Knap til at sortere efter dato */}
        <button
          onClick={() => setSortCriteria('dato')}
          className="global-button"
          aria-label="Sortér efter dato"
        >
          Dato
        </button>
     {/* Knap til at sortere efter prioritet kalder på SortCriteria fra OpgaveList */}
        <button
          onClick={() => setSortCriteria('prioritet')}
          className="global-button"
          aria-label="Sortér efter prioritet"
        >
          Prioritet
        </button>
    {/* Knap til at sortere efter type, kalder på SortCriteria fra OpgaveList*/}
        <button
          onClick={() => setSortCriteria('type')}
          className="global-button"
          aria-label="Sortér efter type"
        >
          Type
        </button>
      </div>
    </div>
  );
};

export default SortButtons;
