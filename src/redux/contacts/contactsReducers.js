import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import contactsActions from "./contactsActions";

import errorMessage from "../../components/Notification/Notification";

const INITIAL_DATA = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const addContacts = (state, action) => {
  const names = state.map((item) => item.name.toLowerCase());
  const isNotUniqueContact = names.includes(
    action.payload.contact.name.toLowerCase().trim()
  );

  if (isNotUniqueContact) {
    errorMessage(action.payload.contact.name);
    return state;
  } else {
    return [...state, action.payload.contact];
  }
};

const removeContacts = (state, action) => {
  return state.filter(({ id }) => id !== action.payload);
};

const items = createReducer(INITIAL_DATA, {
  [contactsActions.addContacts]: addContacts,
  [contactsActions.removeContacts]: removeContacts,
});

const filter = createReducer("", {
  [contactsActions.changeFilter]: (state, action) => action.payload,
});

export default combineReducers({
  items,
  filter,
});
