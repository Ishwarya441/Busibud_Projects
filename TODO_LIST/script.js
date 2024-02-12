const form = document.getElementById('form');
const input = document.getElementById('input');
const todosBody = document.querySelector('#todos tbody');

let todos = [];

// Function to render todos
function renderTodos() {
  todosBody.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoRow = document.createElement('tr');
    todoRow.innerHTML = `
      <td class="${todo.completed ? 'completed' : ''}">${todo.text}</td>
      <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </td>
    `;

    // Toggle todo completion on click
    todoRow.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
      saveTodos();
    });

    // Edit todo
    const editBtn = todoRow.querySelector('.editBtn');
    editBtn.addEventListener('click', (event) => {
      const newText = prompt('Edit Todo', todo.text);
      if (newText !== null && newText.trim() !== '') {
        todos[index].text = newText.trim();
        renderTodos();
        saveTodos();
      }
      event.stopPropagation();
    });

    // Delete todo
    const deleteBtn = todoRow.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', (event) => {
      todos.splice(index, 1);
      renderTodos();
      saveTodos();
      event.stopPropagation();
    });

    todosBody.appendChild(todoRow);
  });
}

// Add new todo
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    input.value = '';
    renderTodos();
    saveTodos();
  }
});

// Save todos to local storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from local storage
function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodos();
  }
}

// Load todos when the page is loaded
loadTodos();
