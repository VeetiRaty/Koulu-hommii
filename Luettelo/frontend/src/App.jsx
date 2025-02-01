import { useState } from 'react';
import './Styles.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Person';
import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const style = {
    color: type === 'success' ? 'green' : type === 'error' ? 'red' : 'blue',
    backgroundColor: '#f0f0f0',
    border: `2px solid ${type === 'success' ? 'green' : type === 'error' ? 'red' : 'blue'}`,
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return <div style={style}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
};

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Jouni Dolonen', number: '040-1234567' },
    { id: 2, name: 'Jaana Dolonen', number: '040-2345678' },
    { id: 3, name: 'Jaakko Seppä', number: '050-3456789' },
    { id: 4, name: 'Jaani Jansson', number: '050-4567890' },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isEditing, setIsEditing] = useState(false); // Tila muokkausmoodille
  const [editId, setEditId] = useState(null); // Muokattavan henkilön ID

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const handleInputChange = (name) => {
    setNewName(name);

    const existingPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase());
    if (existingPerson) {
      setIsEditing(true);
      setEditId(existingPerson.id); // Asetetaan muokattavan henkilön ID
      setNewNumber(existingPerson.number); // Esitäytä numero, lowkey ehkäturha mutta ennyt tiiä jos on useempi numero mut jos sit on sillee et molemmat alkaa Jaa nii sit ärsyttää kumittaa
    } else {
      setNewNumber(''); // Toi sittenki korjaa sen jos muuttuu nimi nii SetNewnumber kenttä muuttuu tyhjäksi
      setIsEditing(false);
      setEditId(null);
    }
  };

  const addOrEditPerson = (event) => {
    event.preventDefault();

    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Nimi ja numero eivät voi olla tyhjiä.');
      return;
    }

    if (isEditing) {
      // Muokkaa olemassa olevaa henkilöä
      const updatedPersons = persons.map(person =>
        person.id === editId ? { ...person, number: newNumber } : person
      );
      setPersons(updatedPersons);
      showNotification(`${newName} numero päivitetty!`, 'info');
    } else {
      // Lisää uusi henkilö
      if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
        alert(`${newName} on jo lisätty puhelinluetteloon.`);
        return;
      }

      const newPerson = { id: persons.length + 1, name: newName, number: newNumber };
      setPersons([...persons, newPerson]);
      showNotification(`${newName} lisätty onnistuneesti!`, 'success');
    }

    // Tyhjennä lomake ja palauta alkuperäinen tila
    setNewName('');
    setNewNumber('');
    setIsEditing(false);
    setEditId(null);
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Haluatko varmasti poistaa henkilön ${personToDelete.name}?`)) {
      setPersons(persons.filter(person => person.id !== id));
      showNotification(`${personToDelete.name} poistettu onnistuneesti!`, 'error');
    }
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="osio">
      <Notification message={notification.message} type={notification.type} />
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>{isEditing ? 'Muokkaa henkilöä' : 'Lisää uusi henkilö'}</h3>
      <PersonForm
        addPerson={addOrEditPerson}
        newName={newName}
        setNewName={handleInputChange} // Päivitetty syöte muokkauskselle
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        isEditing={isEditing} // Viedään muokkaustila propina
      />
      <h3>Numerot</h3>
      {personsToShow.length === 0 ? (
        <div className="no-results">Henkilöitä ei löytynyt.</div>
      ) : (
        <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
