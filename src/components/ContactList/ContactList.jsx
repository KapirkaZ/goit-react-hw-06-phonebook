import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import { connect } from "react-redux";
import contactsActions from "../../redux/contacts/contactsActions";

const ContactList = ({ contacts, onRemove }) => (
  <ul className={styles.TaskList}>
    {contacts.map((contact) => (
      <li className={styles.TaskList_item} key={contact.id}>
        {contact.name + ": " + contact.number}
        {
          <span className={styles.buttonstyle}>
            <button
              className={styles.TaskList_button}
              type="button"
              name="delete"
              onClick={() => onRemove(contact.id)}
            ></button>
          </span>
        }
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  onRemove: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

const mapStateToProps = (state) => {
  const { items, filter } = state.contacts;
  const visibleContacts = items.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return {
    contacts: visibleContacts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onRemove: (id) => dispatch(contactsActions.removeContacts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
