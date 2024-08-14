document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        todos.forEach(todo => {
            createTodoElement(todo);
        });
    }
    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    function createTodoElement(todo) {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo('${todo.id}')">Delete</button>
        `;
        todoList.appendChild(todoItem);
    }
    function addTodo() {
        const text = input.value.trim();
        if (text === '') return;

        const id = Date.now().toString();
        const todo = { id, text };

        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        saveTodos(todos);
        createTodoElement(todo);
        input.value = '';
    }
    window.deleteTodo = function (id) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.id !== id);
        saveTodos(todos);
        loadTodos();
    };
    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    loadTodos();
});