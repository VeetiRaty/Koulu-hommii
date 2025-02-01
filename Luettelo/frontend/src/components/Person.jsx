import '../styles.css';


const Persons = ({ personsToShow, handleDelete }) => {
    return (
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            <p>{person.name} - {person.number} <button className="poista-button" onClick={() => handleDelete(person.id)}>Poista</button>
          </p>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Persons;
  