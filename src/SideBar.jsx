import './SideBar.css';
import { useState } from 'react';
import OpgaveInputPopUp from './OpgaveInput';

/* SideBar komponent til at vise en blaa sidebar med en knap til at tilføje opgaver */
function SideBar({ onAddTask }) {
        /* State til at håndtere visningen af popup*/
    const [isPopupOpen, setIsPopupOpen] = useState(false);

     /* Funktion der åbner og lukker popuppen*/
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="SideBar">
                        {/* Overlay som vises når popup er blevet åbnet */}
                        {isPopupOpen && <div className="overlay" onClick={togglePopup}></div>}


                    {/* Knap til at åbne popup for at tilføje opgaver */}
            <div className='buttonContainer'>
                <button className='plusButton' onClick={togglePopup}>
                    <span></span>
                    <span className='vertikal'></span>
                </button>
                Tilføj opgave
            </div>
                        {/* Separator/divider mellem knappen og popup'en */}
            <div className='seperator'></div>

                        {/* Popup komponenten der vises når isPopupOpen er sat til true */}
            <OpgaveInputPopUp isOpen={isPopupOpen} onClose={togglePopup} onAddTask={onAddTask} />
        </div>
    );
}

export default SideBar;
