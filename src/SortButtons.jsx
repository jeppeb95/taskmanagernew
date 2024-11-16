import React from 'react';

function SortButtons({ setSortCriteria }) {
    return (
        <div className="sort-buttons">
            <p>Sortér efter: </p>
            <div className='sort-buttons-container'>
                <button onClick={() => setSortCriteria("dato")} className="global-button">Dato</button>
                <button onClick={() => setSortCriteria("prioritet")} className="global-button">Prioritet</button>
                <button onClick={() => setSortCriteria("type")} className="global-button">Type</button>
            </div>
        </div>
    );
}

export default SortButtons;
