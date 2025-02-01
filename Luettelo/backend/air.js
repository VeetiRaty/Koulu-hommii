const express = require('express');

const app = express();

app.use(express.json()); // Middleware JSON datan käsittelyyn

let idCounter = 2; // Parempi id-generointi
const generateId = () => {
  idCounter += 1;
  return idCounter;
};

const data = [
  { id: 1, name: 'Alisa', email: 'alisa@example.com' },
  { id: 2, name: 'Paavo', email: 'paavo@example.com' },
];

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const foundUser = data.find((user) => user.id === parseInt(id, 10)); // Muutetaan id numeroksi

  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(404).send('Käyttäjää ei löydy');
  }
});

// Käyttäjän luonti
app.post('/users', (req, res) => {
  const newUser = {
    id: generateId(),
    name: req.body.name,
    email: req.body.email,
  };

  data.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000, () => {
});
