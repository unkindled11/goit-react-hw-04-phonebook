import { Component } from "react";
import { nanoid } from "nanoid";

import Form from "./Form";
import ContactList from "./ContactList/ContactList";
import Filter from './Filter';

import styles from "./myNumbers.module.css";


class MyNumbers extends  Component {
     state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    };
    
    componentDidMount() {
        const data = localStorage.getItem("contacts");
        const contacts = JSON.parse(data);
        if (contacts?.length) {
            this.setState({
                contacts: contacts
            });
        }
    }
         
    componentDidUpdate(prevProps, prevState) {
         if (prevState.contacts.length !== this.state.contacts.length) {
        const contacts = JSON.stringify(this.state.contacts);
             localStorage.setItem("contacts", contacts);
             }
    }
  

    addNumber = (data) => {
        const { contacts } = this.state;
        const dublicate = contacts.find(item => item.name === data.name);
        if (dublicate) {
            alert(`${data.title} is already in number list`);
            return;
        }

        this.setState(prevState => {
            const { contacts } = prevState;
            const { name, number } = data;
            const NewNumber = {
                id: nanoid(),
                name,
                number,
            };
            return {
                contacts: [...contacts, NewNumber],
                title: '',
                author: '',
            }
        });
    }

    deleteNumber = (id) => {
        this.setState(({ contacts }) => ({
            contacts: contacts.filter(item => item.id !== id)
        }));
    }

    changeFilter = ({target}) => {
        this.setState({
            filter: target.value
        })
    }

     getFilteredNumbers() {
         const { filter, contacts }= this.state;
        if(!filter){
            return contacts;
         }
         const filterText = filter.toLowerCase();
         const filteredNumbers = contacts.filter(({ name }) => {
             const result = name.toLowerCase().includes(filterText);
             return result;
         });
        return filteredNumbers;
    }

    render() {
         const {filter} = this.state;
        const { addNumber, deleteNumber, changeFilter } = this;
         const filteredContacts = this.getFilteredNumbers();
        
        return (
       <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <Form onSubmit={addNumber} />

        <h2 className={styles.title}>Contacts</h2>

        <Filter onChange={changeFilter} filter={filter} />

        <ContactList
          contacts={filteredContacts}
          deleteNumber={deleteNumber}
        />
      </div>
        )
    }
}


export default MyNumbers;