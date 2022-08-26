import PropTypes from 'prop-types';
import s from "./contactList.module.css"

const ContactList = ({options, onDeleteContact}) => {
    return (
    <ul className={s.phonebookList}>
        {options.map((element) => (
        <li key={element.data.id} className={s.phonebookListItem}>
            <span className={s.phonebookListData}>{element.data.name}: {element.data.number}</span>
            <button className={s.phonebookListButton} type='button' onClick={() => onDeleteContact(element.data.id)}>Delete</button>
            </li>
))}
    </ul>
    )
}
export default ContactList;

ContactList.defaultProps = {
    contacts: [],
}

ContactList.propTypes = {
    onDeleteContact: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            number: PropTypes.string,
            licence: PropTypes.bool,
            })
    ),
    }