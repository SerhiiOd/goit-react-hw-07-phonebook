import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  FormBlock,
  InputBlock,
  InputLabel,
  Input,
  Button,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, addContact } from 'redux/contactsSlice';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const changeName = e => setName(e.target.value);
  const changeNumber = e => setNumber(e.target.value);

  // const handleInputChange = event => {
  //   const { name, value } = event.currentTarget;

  //   switch (name) {
  //     case 'name':
  //       setName(value);
  //       break;
  //     case 'number':
  //       setNumber(value);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact(newContact));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormBlock onSubmit={handleSubmit}>
      <InputBlock>
        <InputLabel>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={changeName}
            placeholder="Name"
          />
        </InputLabel>

        <InputLabel>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={changeNumber}
            placeholder="+0-00-00-00"
          />
        </InputLabel>
      </InputBlock>

      <Button type="submit">Add contact</Button>
    </FormBlock>
  );
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};
