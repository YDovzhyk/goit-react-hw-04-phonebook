import { Component } from "react";
import shortid from "shortid";
import PropTypes from 'prop-types';

import s from "./contactForm.module.css";


class ContactForm extends Component {
    
    static defaultProps = {
        onsubmit: () => {}
    }

    static propTypes = {
        onSubmit: PropTypes.func,
    }
    
    state = {
        id: '',
        name: '',
        number: '',
        licence: false,
        }

    // Генерим індивідуальні id для Label щоб зв'язати з Input
    nameInputId = shortid.generate();
    numberInputId = shortid.generate();
    licenceId = shortid.generate();

    // Контролюємо введене значення по name пов'язуємо з значенням value
    handleInputChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ 
            [name]: value,
        });
    };
    // На подію Submit ми ми передаэмо значення props в Арр та скидаємо значення форми
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };
    
    // Reset форми записуэмо початковий її стан
    reset = () => {
        this.setState({name: '', number: '', licence: false});
    };

    // Для обробки стану checkbox та отримуємо унікальний id контакту
    handleLicenceChange = e => {
        this.setState({licence: e.currentTarget.checked});
        this.setState({id: shortid.generate()});
    };

render() {
    return (
        <form onSubmit={this.handleSubmit} className={s.phoneForm}>
            <label htmlFor={this.nameInputId}>
                Name
                <input
                    className={s.phoneInputName}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    id={this.nameInputId}
                    required
                />
            </label>

            <label htmlFor={this.numberInputId}>
                Number
                <input
                    className={s.phoneInputNumber}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    value={this.state.number}
                    onChange={this.handleInputChange}
                    id={this.numberInputId}
                    required
                />
                </label>

                <label>
                    <input
                    className={s.phoneInputLicence}
                    id={this.licenceId}
                    value={this.state.id}
                    type="checkbox"
                    name="licence"
                    checked={this.state.licence}
                    onChange={this.handleLicenceChange}
                    />
                    <span className={s.licenceText}>I agree to the terms of use</span>
                </label>

                {/* disabled в button зависит от состояния в checkbox */}
                <button type='submit' className={s.phoneFormButton} disabled={!this.state.licence}>Add contact</button>
            </form>
    )
}
}

export default ContactForm;