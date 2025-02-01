const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

// morgan
morgan.token('body', (req) => JSON.stringify(req.body), // Palautetaan JSON-stringinä
);

// morgan loggaus
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let henkilot = [
  { id: 1, name: 'Jouni Dolonen', number: '040-1234567' },
  { id: 2, name: 'Jaana Dolonen', number: '040-2345678' },
  { id: 3, name: 'Jaakko Seppä', number: '050-3456789' },
  { id: 4, name: 'Jaani Jansson', number: '050-4567890' },
];

// ---API-REITIT---

// Henkilöt listan reitti
app.get('/api/henkilot', (req, res) => {
  res.json(henkilot);
});

app.post('/test', (req, res) => {
  res.json({ message: 'Data received', data: req.body });
});

// Reitti info sivulle
app.get('/info', (req, res) => {
  const currentDate = new Date();
  const info = `<p>Puhelinluettelossa on ${henkilot.length} henkilön tiedot</p>
    <p>${currentDate}</p>`;
  res.send(info);
});

// Reitti yhden henkilön hakuun
app.get('/api/henkilot/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = henkilot.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Henkilöä ei löydy' });
  }
});

// Reitti puhelinnumerotiedon poistamiseksi
app.delete('/api/henkilot/:id', (req, res) => {
  const id = Number(req.params.id);
  henkilot = henkilot.filter((p) => p.id === id);

  res.status(204).end();
});

// Reitti uuden henkilön luomiseen
app.post('/api/henkilot', (req, res) => {
  const { body } = req;

  // Varmistetaan että nimi ja numero on annettu
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Nimi tai numero puuttuu' });
  }

  // nimen unikkuuden tarkistus
  const nameExist = henkilot.some((p) => p.name === body.name);
  if (nameExist) {
    return res.status(400).json({ error: 'Nimi on jo luettelossa' });
  }

  const newPerson = {
    id: Math.max(...henkilot.map((h) => h.id)) + 1,
    name: body.name,
    number: body.number,
  };

  henkilot.push(newPerson);
  return res.status(201).json(newPerson);
});

// Portti
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
