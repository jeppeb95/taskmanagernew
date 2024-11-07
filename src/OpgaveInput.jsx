import React, { useState } from 'react';
import './OpgaveInput.css';

function OpgaveInputPopUp({ isOpen, onClose, onAddTask }) {
    const [formValues, setFormValues] = useState({
        taskTitle: '',
        priority: '',
        dueDate: '',
        taskType: '',
        taskDescription: ''
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(formValues); /*Sender opgaven til App.js via prop*/
        setFormValues({ taskTitle: '', priority: '', dueDate: '', taskType: '', taskDescription: '' });
        onClose(); /* Lukker popup efter tilføjelse */
    };

    return (
        isOpen && (
            <div className="OpgaveInputPopUp">
                <h2>Tilføj opgave</h2>
                <form onSubmit={handleSubmit}>
                    <div className='fields-container'>
                        <div className='field-wrapper'>
                            <label htmlFor="priority">Prioritet</label>
                            <select id="priority" value={formValues.priority} onChange={handleChange} required>
                                <option value="" disabled hidden>Vælg prioritet</option>
                                <option value="Lav">Lav</option>
                                <option value="Middel">Middel</option>
                                <option value="Høj">Høj</option>
                            </select>
                        </div>

                        <div className='field-wrapper'>
                            <label htmlFor="dueDate">Forfaldsdato</label>
                            <input type="date" id="dueDate" value={formValues.dueDate} onChange={handleChange} required />
                        </div>
                    </div>

                    <label htmlFor="taskType">Opgavetype</label>
                    <select id="taskType" value={formValues.taskType} onChange={handleChange} required>
                        <option value="" disabled hidden>Vælg opgavetype</option>
                        <option value="Personlige opgaver">Personlige opgaver</option>
                        <option value="Arbejdsopgaver">Arbejdsopgaver</option>
                        <option value="Studieopgaver">Studieopgaver</option>
                        <option value="Økonomi">Økonomi</option>
                        <option value="Sociale aktiviteter">Sociale aktiviteter</option>
                    </select>

                    <label htmlFor="taskTitle">Overskrift på opgaven</label>
                    <input type="text" id="taskTitle" value={formValues.taskTitle} onChange={handleChange} required />

                    <label htmlFor="taskDescription">Beskrivelse af opgaven</label>
                    <textarea id="taskDescription" value={formValues.taskDescription} onChange={handleChange} rows="5"></textarea>

                    <div className='button-container'>
                        <button type="submit">Opret opgave</button>
                        <button type="button" onClick={onClose}>Luk</button>
                    </div>
                </form>
            </div>
        )
    );
}

export default OpgaveInputPopUp;
