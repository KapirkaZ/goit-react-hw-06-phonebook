import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const addContacts = createAction("contacts/addContact", (name, number) => ({
  payload: {
    contact: {
      id: uuidv4(),
      name,
      number,
    },
  },
}));

const removeContacts = createAction("contacts/removeContact");
const changeFilter = createAction("contacts/changeFilter");

export default { addContacts, removeContacts, changeFilter };
