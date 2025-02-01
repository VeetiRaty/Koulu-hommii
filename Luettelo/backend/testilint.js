const express = require('express');
// puolipiste pois, jokaisella rivillä tää rivinvaihto tyyli CR:stä LF
const app = express();
// const bodyParser = require('body-parser')//turhavälii

app.use(express.json());

let henkilot = [
  { id: 1, name: 'Jouni Dolonen', number: '123-456' }, // turhavälii tabullaattoril et kaks spacea, //näiden "" sijaan käytetään ''
  { id: 2, name: 'Jaana Dolonen', number: '987-654' }, // turhavälii tabullaattoril et kaks spacea
];

app.get('/api/henkilot', (req, res) => {
  res.json(henkilot); // turhavälii tabullaattoril et kaks spacea,
});

app.get('/api/henkilot/:id', (req, res) => {
  const id = Number(req.params.id); // turhavälii tabullaattoril et kaks spacea
  const person = henkilot.find((person) => person.id === id); // turhavälii tabullaattoril et kaks spacea, pitäs olla === eikä ==

  if (person) { // turhavälii tabullaattoril et kaks spacea
    res.json(person); // turhavälii tabullaattoril
  } else { // turhavälii tabullaattoril et kaks spacea
    res.status(404).end(); // turhavälii tabullaattoril
  } // turhavälii tabullaattoril et kaks spacea
});

app.post('/api/henkilot', (req, res) => {
  const { body } = req; // turhavälii tabullaattoril et kaks spacea

  if (!body.name || !body.number) { // Käytetään if-lauseessa selittämätöntä logiikkaa //turhavälii tabullaattoril et kaks spacea
    return res.status(400).json({ error: 'nimi tai numero puuttuu' }); // turhavälii tabullaattoril
  } // turhavälii tabullaattoril et kaks spacea

  const newPerson = { // turhavälii tabullaattoril et kaks spacea
    id: Math.floor(Math.random() * 1000), // Epäjohdonmukainen tapa generoida ID, korjaa tämä //turhavälii tabullaattoril
    name: body.name, // turhavälii tabullaattoril
    number: body.number, // turhavälii tabullaattoril
  }; // turhavälii tabullaattoril et kaks spacea

  henkilot = henkilot.concat(newPerson); // turhavälii tabullaattoril et kaks spacea
  res.json(newPerson); // turhavälii tabullaattoril et kaks spacea
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // turha aalotsulku vidhuun, '' näiden lisäys ilmoitukseen, turha väli pois
