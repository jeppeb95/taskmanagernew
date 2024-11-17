import React, { useState } from 'react';
import './OpgaveInput.css';


/* Funktion der åbner state til at holde værdierne i formularen */
function OpgaveInputPopUp({ isOpen, onClose, onAddTask }) {
    const [formValues, setFormValues] = useState({
        taskTitle: '',
        priority: '',
        dueDate: '',
        taskType: '',
        taskDescription: ''
    });

    /* Opdaterer state, når brugeren ændrer værdier i formularfelterne */
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        });
    };
    
    /* Håndterer formularens afsendelse */
    const handleSubmit = (e) => {
        e.preventDefault();

        /*Opretter opgaven med et ID ved hjælp af Date.now() funktionen*/
        const taskWithId = {
            ...formValues,
            id: Date.now() /* Date.now funktionen giver id ud fra tid*/
        };

        onAddTask(taskWithId);  /*Sender opgaven til forældrekomponenten*/
        setFormValues({ taskTitle: '', priority: '', dueDate: '', taskType: '', taskDescription: '' });
        onClose();  /*Lukker popup efter tilføjelse*/
    };

    return (
        isOpen && (
            /*Formular og felter i popup*/
            <div className="OpgaveInputPopUp">
                <h2>Tilføj opgave</h2>
                <form onSubmit={handleSubmit}>
                    <div className='fields-container'>
                        <div className='field-wrapper'>
                            <label htmlFor="priority">Prioritet</label>
                            <select 
                            id="priority" 
                            value={formValues.priority} 
                            onChange={handleChange} 
                            required 
                            aria-label="Vælg opgavens prioritet">
                                <option value="" disabled hidden>Vælg prioritet</option>
                                <option value="Lav">Lav</option>
                                <option value="Middel">Middel</option>
                                <option value="Høj">Høj</option>
                            </select>
                        </div>

                        <div className='field-wrapper'>
                            <label htmlFor="dueDate">Forfaldsdato</label>
                            <input 
                            type="date" 
                            id="dueDate" 
                            value={formValues.dueDate} 
                            onChange={handleChange} 
                            required
                            aria-label="Vælg opgavens forfaldsdato"
                             />
                        </div>
                    </div>

                    <label htmlFor="taskType">Opgavetype</label>
                    <select 
                    id="taskType" 
                    value={formValues.taskType} 
                    onChange={handleChange} 
                    required
                    aria-label="Vælg opgavens type">
                        <option value="" disabled hidden>Vælg opgavetype</option>
                        <option value="Personlige opgaver">Personlige opgaver</option>
                        <option value="Arbejdsopgaver">Arbejdsopgaver</option>
                        <option value="Studieopgaver">Studieopgaver</option>
                        <option value="Økonomi">Økonomi</option>
                        <option value="Sociale aktiviteter">Sociale aktiviteter</option>
                    </select>

                    <label htmlFor="taskTitle">Overskrift på opgaven</label>
                    <input 
                    type="text" 
                    id="taskTitle"   
                    placeholder="Opgavens overskrift" 
                    value={formValues.taskTitle} 
                    onChange={handleChange} 
                    required
                    aria-label="Skriv opgavens overskrift"
                    />

                    <label htmlFor="taskDescription">Beskrivelse af opgaven</label>
                    <textarea 
                    id="taskDescription"   
                    placeholder="Beskrivelse af opgaven" 
                    value={formValues.taskDescription} 
                    onChange={handleChange} 
                    rows="5"
                    aria-label="Skriv beskrivelse af opgaven"
                    ></textarea>

                    {/*Knap der opretter opgaven med de indtastede data*/}
                    <div className='button-container'>
                        <button 
                        type="submit" 
                        className="global-button form-btn"
                        aria-label="Opret opgave"
                        >
                            Opret opgave
                        </button>

                        {/*Knap der lukker popup*/}
                        <button 
                        type="button" 
                        onClick={onClose} 
                        className="global-button form-btn"
                        aria-label="Luk popup"
                        >
                            Luk
                        </button>
                    </div>
                </form>
            </div>
        )
    );
}

export default OpgaveInputPopUp;
