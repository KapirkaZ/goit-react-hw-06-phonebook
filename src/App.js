import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import ContactForm from "./components/ContactForm/ContactForm";
import Container from "./components/Container/Container";

export default class App extends Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  gatheredData = (data) => {
    const newData = data;
    return newData;
  };

  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(task.name);

    if (searchSameName) {
      alert(`${task.name} is already in contacts`);
    } else if (task.name.length === 0) {
      alert("Fields must be filled!");
    } else {
      const contact = {
        ...task,
        id: uuidv4(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContact = (nameId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((name) => name.id !== nameId),
    }));
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredNames = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const filteredNames = this.getFilteredNames();

    return (
      <Container>
        <h1>Phonebook</h1>

        <ContactForm onAddContact={this.addContact} />
        <h1>Contacts</h1>

        <Filter value={filter} onChangeFilter={this.changeFilter} />

        <ContactList
          contacts={filteredNames}
          onRemoveContact={this.removeContact}
        />
      </Container>
    );
  }
}
