import { Component } from "react";
import PropTypes from 'prop-types';

import ContactForm from "./Phonebook/ContactForm/ContactForm";
import Filter from "./Phonebook/Filter/Filter";
import ContactList from "./Phonebook/ContactList/ContactList";

import s from "../components/Phonebook/ContactList/contactList.module.css"

export class App extends Component {
    state = {
        contacts: [],
        filter: '',
        }
        
        // Після першого рендеру в фунції componentDidMount віправляється запрос в LocalStorage і якщо там щось є перезаписується setState і знову відбувається рендерінг
        componentDidMount() {
            const contacts = JSON.parse(localStorage.getItem("contacts"));
            if(contacts?.length) {
                this.setState({
                    contacts,
                })
            }
        }
        // Після наступних рендерінгів перевіряється чи змінився стан contact і якщо змінився то записуємо зміни в LocalStorage
        componentDidUpdate(prevProps, prevState) {
            const {contacts} = this.state;
            if(prevState.contacts !== contacts) {
                localStorage.setItem("contacts", JSON.stringify(contacts));
            }
        }

// Записуємо нову дату в contacts (зберігаємо минулий стан)
formSubmitHandler = data => {
    if(this.state.contacts.find((element) => element.data.name === data.name)) {
        return alert (`${data.name} is alredy in contact`);
    }
    const listContacts = {
        data,
    };
this.setState(prevState => ({
    contacts: [listContacts, ...prevState.contacts],
}));
};

changeFilter = e => {
    this.setState({filter: e.currentTarget.value});
};

getFiltredContacts = () => {
    const {filter, contacts} = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((element) =>
    element.data.name.toLowerCase().includes(normalizedFilter));
}

deleteContact = contactId => {
    this.setState(prevState => ({
        contacts: prevState.contacts.filter((element) => element.data.id !== contactId),
    }));
};

    render(){
        const filtredContacts = this.getFiltredContacts();

        return (
            <div className={s.phonebook}>
                <h2 className={s.phonebookTitle}>Phonebook</h2>
                <ContactForm onSubmit={this.formSubmitHandler} />

                <h2 className={s.phonebookTitle}>Contacts</h2>
                <div className={s.contact}>
                    <Filter value={this.filter} onChange={this.changeFilter}/>
                    <ContactList options={filtredContacts} onDeleteContact={this.deleteContact}/>
                </div>
            </div>
        )
    }
}

export default App;

App.defaultProps = {
    data: {},
}

App.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
        licence: PropTypes.bool,
        }),
}