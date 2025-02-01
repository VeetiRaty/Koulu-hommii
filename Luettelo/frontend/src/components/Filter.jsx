const Filter = ({ filter, setFilter }) => {
    return (
      <div>
        <label>Haku Puhelinluettelosta: </label> 
        <input value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Anna hakusana"
        />
      </div>
    );
  };
  
  export default Filter;
  