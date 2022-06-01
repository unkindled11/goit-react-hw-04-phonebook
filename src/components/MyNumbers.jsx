import { useState, useCallback, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import Form from './Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

import styles from './myNumbers.module.css';

const MyNumbers = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    if (firstRender.current) {
      const data = localStorage.getItem('contacts');
      const result = JSON.parse(data);
      if (result?.length) {
        setContacts(result);
      }
      firstRender.current = data;
    }
  }, []);

  const addContact = newContact => {
    const duplicate = contacts.find(
      contact => contact.name === newContact.name
    );
    if (duplicate) {
      alert(`${newContact.name} уже есть в списке контактов`);
      return;
    }

    setContacts(prevState => {
      const { name, number } = newContact;
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevState, contact];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = useCallback(
    e => {
      setFilter(e.currentTarget.value);
    },
    [setFilter]
  );

  const getFilterContacts = () => {
    if (!filter) {
      return contacts;
    }
    const filterContact = filter.toLowerCase();
    const filteredContact = contacts.filter(({ name }) => {
      const result = name.toLowerCase().includes(filterContact);
      return result;
    });
    return filteredContact;
  };

  const filterContact = getFilterContacts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <Form onSubmit={addContact} />

      <h2 className={styles.title}>Contacts</h2>

      <Filter onChange={changeFilter} filter={filter} />

      <ContactList contacts={filterContact} deleteNumber={deleteContact} />
    </div>
  );
};

export default MyNumbers;
