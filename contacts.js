const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8").then((data) => {
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8").then((data) => {
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
  });
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const data = JSON.parse(contacts);
    const newContacts = data.filter((item) => item.id !== contactId.toString());
    fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
    listContacts();
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const data = JSON.parse(contacts);
    data.push({ name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
    listContacts();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
