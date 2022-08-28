import { useState } from "react";
import shortid from "shortid";
import PropTypes from 'prop-types';
import initialState from "./initialState";

import s from "./contactForm.module.css";

const ContactForm = ({onSubmit}) => {
    const [state, setState] = useState({...initialState});
    const [licence, setLicence] = useState(false);
    
    const handleInputChange = event => {
        const { name, value } = event.currentTarget;
        let idName = shortid.generate();
        let idNumber = shortid.generate();
        let idLicence = shortid.generate();
        setState(prevState => ({
            ...prevState,
            [name]: value,
            idName: idName,
            idNumber: idNumber,
            idLicence: idLicence,
        }))
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({...state});
        setState({...initialState})
        setLicence(false)
    }

    const handleLicenceChange = e => {
        setLicence(e.currentTarget.checked)
    }

    const {idName, idNumber, idLicence, name, number} = state;
    
    return (
        <form onSubmit={handleSubmit} className={s.phoneForm}>
            <label htmlFor={idName}>
                Name
                <input
                    className={s.phoneInputName}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    value={name}
                    onChange={handleInputChange}
                    id={idName}
                    required
                />
            </label>

            <label htmlFor={idNumber}>
                Number
                <input
                    className={s.phoneInputNumber}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    value={number}
                    onChange={handleInputChange}
                    id={idNumber}
                    required
                />
                </label>

                <label>
                    <input
                    className={s.phoneInputLicence}
                    value={idLicence}
                    type="checkbox"
                    name="licence"
                    checked={licence}
                    onChange={handleLicenceChange}
                    />
                    <span className={s.licenceText}>I agree to the terms of use</span>
                </label>

                {/* disabled в button зависит от состояния в checkbox */}
                <button type='submit' className={s.phoneFormButton} disabled={!licence}>Add contact</button>
            </form>
    )
}

export default ContactForm;

ContactForm.defaultProps = {
    onSubmit: () => {}
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func,
}