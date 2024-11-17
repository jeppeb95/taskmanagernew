import React from 'react';

function SortButtons({ setSortCriteria }) {
    return (
        <div className="sort-buttons">
            <p>Sortér efter: </p>
            <div className='sort-buttons-container'>
                <button 
                onClick={() => setSortCriteria("dato")} 
                className="global-button"
                aria-label="Sortér efter dato"
                >Dato
                </button>
                <button 
                onClick={() => setSortCriteria("prioritet")} 
                className="global-button"
                aria-label="Sortér efter prioritet">
                    Prioritet
                    </button>
                <button 
                onClick={() => setSortCriteria("type")} 
                className="global-button"
                aria-label="Sortér efter type"
                >Type</button>
            </div>
        </div>
    );
}

export default SortButtons;
