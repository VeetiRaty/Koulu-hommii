const express = require('express');
// kaikki turhat välit poistettu, CRLF muutettu LF
const app = express();
// const bodyParser = ('Olen turha'); //turha

const data = [
  { id: 1, name: 'Alisa', age: 25 }, // "" vaihdettu ''
  { id: 2, name: 'Paavo', age: 30 },
];

// Käyttäjän hakeminen
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = data.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Käyttäjää ei löydy');
  }
});

// Käyttäjän luominen
app.post('/users', (req, res) => { // "" vaihdettu ''
  const newUser = {
    id: generateId(), // Tämä voi käyttää myös `generateId()`
    name: req.body.name,
    age: req.body.age,
  };
  data.push(newUser);
  res.json(newUser);
});

// Käyttäjän päivittäminen
app.put('/users/:id', (req, res) => { // "" vaihdettu ''
  const id = Number(req.params.id);

  const user = data.find((user) => user.id === id); // == vaihdettu === ja (user) vaihdettu (user

  if (!user) {
    res.status(404).send('Käyttäjää ei löydy');
    return;
  }

  user.name = req.body.name || user.name;
  user.age = req.body.age || user.age;
  res.json(user);
});

// Uniikin ID:n generointi
let idCounter = 1; // parempi id generointi
const generateId = () => idCounter++;

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // korjattu turha { ja lopusta puuttuu )
