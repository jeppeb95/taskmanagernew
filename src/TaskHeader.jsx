import React from 'react';

function TaskHeader({ setSortCriteria }) {
  return (
    <div className='headlines-container'>
      <ul>
        <li className='description-element'>Overskrift</li>
        <li><button 
        onClick={() => setSortCriteria("dato")}
        aria-label="Sortér opgaver efter dato"
        >Dato
        </button>
        </li>
        <li><button 
        onClick={() => setSortCriteria("type")}
        aria-label="Sortér opgaver efter type"
        >Type
        </button>
        </li>
        <li><button 
        onClick={() => setSortCriteria("prioritet")}
        aria-label="Sortér opgaver efter proritet"
        >Prioritet
        </button>
        </li>
      </ul>
    </div>
  );
}

export default TaskHeader;
