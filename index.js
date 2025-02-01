const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// CORS - salli yhteydet eri domaineista ja porteista
app.use(cors());

// Muunna JSON-merkkijono JSON-objektille (pyynnöstä)
app.use(express.json());

// MongoDB Atlas -pilviyhteys (korvaa <tässä salasana> oikealla salasanalla)
const mongoDB = 'mongodb+srv://veetiraty:Severi456@cluster0.g5rj0ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Yhdistäminen MongoDB:hen Mongoose-kirjaston avulla
mongoose.connect(mongoDB)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// ** Mongoose Schema ja Model **

// Todo-skeema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },   // Tehtävän teksti on pakollinen
  completed: { type: Boolean, default: false } // Tehtävän tila, oletuksena false
});

// Todo-malli
const Todo = mongoose.model('Todo', todoSchema, 'todos');

// ** Todo-reitit **

// Luo uusi todo (POST /todos)
app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text ) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const todo = new Todo({
      text: text
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);  // Palauttaa luodun tehtävän JSON-muodossa
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT-reitti palvelimen puolella
app.put('/todos/:id', async (request, response) => {
  // Haetaan päivityspyynnön runko (request.body), jossa on uusi tehtäväteksti
  const { text } = request.body;

  if (!text) {
    return response.status(400).json({ message: 'Text is required' });
  }

  // Luodaan päivitettävä tehtäväobjekti
  const todo = {
      text: text
  };

  // Etsitään tehtävä tietokannasta ID:n perusteella ja päivitetään sen tiedot
  const filter = { _id: request.params.id }; // Hae tehtävä ID:llä

  try{
    const updatedTodo = await Todo.findOneAndUpdate(filter, { text }, { new: true });
    if (!updatedTodo) {
      return response.status(404).json({ message: 'Todo not found' });
    }
    response.json(updatedTodo);

    
  } catch (error) {
    console.error('Error updating todo:', error);
    response.status(500).json({ message: 'Server error' });
  }
});


// Hae kaikki todos (GET /todos)
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find(); // Hakee kaikki tehtävät tietokannasta
    res.json(todos); // Palauttaa kaikki tehtävät JSON-muodossa
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Hae todos by id (GET /todos/<id>)
app.get('/todos/:id', async (request, response) => {
    const todo = await Todo.findById(request.params.id)
    if (todo) response.json(todo)
    else response.status(404).end()
  });
  
// Poista todos (Delete /todos/<id>)
app.delete('/todos/:id', async (request, response) => {
  const deletedTodo = await Todo.findByIdAndDelete(request.params.id)
  if (deletedTodo) response.json(deletedTodo)
  else response.status(404).end()
});

// Sovellus kuuntelee porttia 3000
app.listen(port, () => {
  console.log(`Yhdistetään portissa ${port}`);
});
