import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import ContactForm from "./Phonebook/ContactForm/ContactForm";
import Filter from "./Phonebook/Filter/Filter";
import ContactList from "./Phonebook/ContactList/ContactList";

import s from "../components/Phonebook/ContactList/contactList.module.css"

export const App = () => {

    const [contacts, setContacts] = useState(() => {
        const value = JSON.parse(localStorage.getItem("contacts")); 
        return value || [];
    });
    const [filter, setFilter] = useState("");

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const formSubmitHandler = (data) => {
        console.log(data)
        if(contacts.find((element) => element.name === data.name)) {
            return alert (`${data.name} is alredy in contact`);
        }
        setContacts(prevContacts => {
            const newContact = {
                ...data,
            };
            return [...prevContacts, newContact];
        })
    };

    const deleteContact = (contactId) => {
        setContacts(prevContacts =>
            prevContacts.filter((element) => element.idName !== contactId),
        )};


    const changeFilter = e => {
        setFilter(e.currentTarget.value)
    };

    const getFiltredContacts = () => {
        if(!filter) {
            return contacts;
        }
        
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((element) =>
    element.name.toLowerCase().includes(normalizedFilter));
    }

    const filtredContacts = getFiltredContacts();

    return (
        <div className={s.phonebook}>
                <h2 className={s.phonebookTitle}>Phonebook</h2>
                <ContactForm onSubmit={formSubmitHandler} />
                <h2 className={s.phonebookTitle}>Contacts</h2>
                <div className={s.contact}>
                    <Filter value={filter} onChange={changeFilter}/>
                    <ContactList options={filtredContacts} onDeleteContact={deleteContact}/>
                </div>
            </div>
    )
}

export default App;

App.defaultProps = {
    data: {},
}

App.propTypes = {
    contactId: PropTypes.string,
    data: PropTypes.shape({
        idName: PropTypes.string,
        idNumber: PropTypes.string,
        idLicence: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
        }),
}