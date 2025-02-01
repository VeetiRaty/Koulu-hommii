import '../Styles.css';

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber, isEditing }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label>Nimi: </label>
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Syötä nimi"
        />
        <br />
        <label>Numero: </label>
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          placeholder="Syötä puhelinnumero"
        />
      </div>
      <div>
        <br />
        <button className="lisaa-button" type="submit">
          {isEditing ? 'Muokkaa' : 'Lisää'}
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
