import './SideBar.css';
import { useState } from 'react';
import OpgaveInputPopUp from './OpgaveInputPopUp';

/*Definerer prop-typen for SideBar-komponenten */
interface SideBarProps {
  onAddTask: (task: any) => void;
}

/* SideBar komponent til at vise en blaa sidebar med en knap til at tilføje opgaver */
const SideBar: React.FC<SideBarProps> = ({ onAddTask }) => {
            /* State til at håndtere visningen af popup*/
  const [isPopupOpen, setIsPopupOpen] = useState(false);

       /* Funktion der åbner og lukker popuppen*/
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <aside className="SideBar">
        {/* Overlay som vises når popup er blevet åbnet */}
      {isPopupOpen && <div className="overlay" onClick={togglePopup} aria-label="Luk popup"></div>}
     {/* Knap til at åbne popup for at tilføje opgaver */}
      <div className="buttonContainer">
        <button className="plusButton" onClick={togglePopup} aria-label="Tilføj ny opgave">
          <span></span>
          <span className="vertikal"></span>
        </button>
        <p>Tilføj opgave</p>
      </div>
    {/* Separator/divider mellem knappen og popup'en */}
      <div className="seperator"></div>
      <div className="circle-bg"></div>
    {/* Popup komponenten der vises når isPopupOpen er sat til true */}
      <OpgaveInputPopUp isOpen={isPopupOpen} onClose={togglePopup} onAddTask={onAddTask} />
    </aside>
  );
};

export default SideBar;
