function init() {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Ladataan tehtävälista palvelimelta, odota...'
    loadTodos()
    
  }

async function loadTodos() {
  let response = await fetch('http://localhost:3000/todos')
  let todos = await response.json()
    console.log(todos)
  showTodos(todos)
}


// Painikkeen tilan vaihtaminen
function changeButton(id = null) {
  let button = document.getElementById('submitButton');
  if (button.innerHTML === "Lisää") {
      button.innerHTML = "Tallenna";
      button.className = "editbutton";
      button.setAttribute("onclick", `updateTodo("${id}")`);
  } else {
      button.innerHTML = "Lisää";
      button.className = "addbutton";
      button.setAttribute("onclick", "addTodo()");
    }
  }

// Tehtävän päivittäminen
async function updateTodo(id) {
  let newTodo = document.getElementById('newTodo'); // Haetaan päivitetty teksti
  const data = { 'text': newTodo.value.trim() }; // Muodostetaan JSON-data lähetettäväksi

  if(!data.text) {
    alert("Tehtävä ei voi olla tyhjä!");
    return;
  }
  
  console.log("Päivitetään tehtävä ID:", id, "Uusi teksti:", data.text); // Lokiviesti

  try {
  // Muodostetaan URL, johon tehtävä päivitetään, käyttämällä tehtävän ID:tä
  let url = "http://localhost:3000/todos/" + id;
  
  // Lähetetään PUT-pyyntö palvelimelle, joka päivittää tehtävän
  const response = await fetch(url, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // Lähetetään päivitetty teksti palvelimelle
  });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.message || 'Virhe päivitettäessä tehtävää');
    return;
  }
  
  // Päivitetään tehtävälista, jotta muutokset näkyvät käyttöliittymässä
  loadTodos();

  // Tyhjennetään tekstikenttä ja päivitetään painikkeen toiminto takaisin lisäystilaan
  let infoText = document.getElementById('infoText');
  infoText.innerHTML = '';
  newTodo.value = ''; // Tyhjennä tekstikenttä
  changeButton(); // Vaihdetaan painike takaisin lisäystilaan
  location.reload();
} catch (error) {
  console.error('Virhe päivitettäessä tehtävää:', error);
  alert('Palvelinvirhe. Yritä uudelleen.');
}
}

// Muokkaa-painikkeen funktio: Lataa muokattava tehtävä tekstikenttään ja vaihda painikkeen toiminto muokkaustilaan
function editTodo(id, text) {
  let newTodo = document.getElementById('newTodo');
  newTodo.value = text; // Laita muokattava teksti tekstikenttään
  changeButton(id); // Vaihda painikkeen toiminto muokkaustilaan
}


function createTodoListItem(todo) {
  // luodaan uusi LI-elementti
  let li = document.createElement('li')
    // luodaan uusi id-attribuutti
  let li_attr = document.createAttribute('id')
    // kiinnitetään tehtävän/todon id:n arvo luotuun attribuuttiin 
  li_attr.value= todo._id
    // kiinnitetään attribuutti LI-elementtiin
  li.setAttributeNode(li_attr)
    // luodaan uusi tekstisolmu, joka sisältää tehtävän/todon tekstin
  let text = document.createTextNode(todo.text)
    // lisätään teksti LI-elementtiin
  li.appendChild(text)
    // lisätään editointimahdollisuus
  let edit = document.createElement('span')
  let edit_attr = document.createAttribute('class')
  edit_attr.value = 'edit'
  edit.setAttributeNode(edit_attr)
  let edit_btn = document.createTextNode('   Muokkaa ')
  edit.appendChild(edit_btn)
  edit.onclick = function() { editTodo(todo._id, todo.text) } 
  li.appendChild(edit)
    // luodaan uusi SPAN-elementti, käytännössä x-kirjan, jotta tehtävä saadaan poistettua
  let span = document.createElement('span')
    // luodaan uusi class-attribuutti
  let span_attr = document.createAttribute('class')
    // kiinnitetään attribuuttiin delete-arvo, ts. class="delete", jotta saadaan tyylit tähän kiinni
  span_attr.value = 'delete'
    // kiinnitetään SPAN-elementtiin yo. attribuutti
  span.setAttributeNode(span_attr)
    // luodaan tekstisolmu arvolla x
  let x = document.createTextNode(' x ')
    // kiinnitetään x-tekstisolmu SPAN-elementtiin (näkyville)
  span.appendChild(x)
    // määritetään SPAN-elementin onclick-tapahtuma kutsumaan removeTodo-funkiota
  span.onclick = function() { removeTodo(todo._id) }
    // lisätään SPAN-elementti LI-elementtin
  li.appendChild(span)
    // palautetaan luotu LI-elementti
    // on siis muotoa: <li id="mongoIDXXXXX">Muista soittaa...<span class="remove">x</span></li>
  return li
}
  
// Näytä tehtävä merkinnät
function showTodos(todos) {
  let todosList = document.getElementById('todosList')
  let infoText = document.getElementById('infoText')
  // no todos
  if (todos.length === 0) {
    infoText.innerHTML = 'Ei tehtäviä'
  } else {    
    todos.forEach(todo => {
        let li = createTodoListItem(todo)        
        todosList.appendChild(li)
    })
    infoText.innerHTML = ''
  }
}

// Luo tehtävä merkintä
async function addTodo() {
  let newTodo = document.getElementById('newTodo')
  const data = { 'text': newTodo.value.trim() }
  
  if(!data.text) {
    alert("Tehtävä ei voi olla tyhjä!")
    return;
  }

try {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.message || 'Virhe lisättäessä tehtävää');
    return;
  }

  let todo = await response.json()
  let todosList = document.getElementById('todosList')
  let li = createTodoListItem(todo)
  todosList.appendChild(li)

  let infoText = document.getElementById('infoText')
  infoText.innerHTML = ''
  newTodo.value = ''
} catch (error) {
  console.error('Virhe lisätessä tehtävää:');
  alert('Palvelinvirhe. Yritä uudelleen');

}
}

// Poista tehtävä merkintä
async function removeTodo(id) {
  try {
  const response = await fetch('http://localhost:3000/todos/'+id, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.message || 'Virhe poistettaessa tehtävää');
    return;
  }

  //let responseJson = await response.json()
  let li = document.getElementById(id)
  if (li) {
  li.parentNode.removeChild(li)
  }

  let todosList = document.getElementById('todosList')
  if (!todosList.hasChildNodes()) {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Ei tehtäviä'
  }
} catch (error) {
  console.error('Virhe poistettaessa tehtävää:', error);
  alert('Palvelinvirhe. Yritä uudelleen.');
}
}