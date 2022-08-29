import PropTypes from 'prop-types';
import s from "./contactList.module.css"

const ContactList = ({options, onDeleteContact}) => {
    return (
    <ul className={s.phonebookList}>
        {options.map((element) => (
        <li key={element.idName} className={s.phonebookListItem}>
            <span className={s.phonebookListData}>{element.name}: {element.number}</span>
            <button className={s.phonebookListButton} type='button' onClick={() => onDeleteContact(element.idName)}>Delete</button>
            </li>
))}
    </ul>
    )
}
export default ContactList;

ContactList.defaultProps = {
    contacts: [],
    onDeleteContact: () => {},
}

ContactList.propTypes = {
    onDeleteContact: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        idName: PropTypes.string,
        idNumber: PropTypes.string,
        idLicence: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
        })
    ),
}