/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
// import _ from 'lodash';
import './style.css';

// select the form element
const form = document.querySelector('.first-form');
const todoInput = document.querySelector('.add-task');
const todoList = document.querySelector('.to-do-list');

// variables
let listTodos = JSON.parse(localStorage.getItem('listTodos')) || [];

// FIRST RENDRER
renderTodo();

// submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
  renderTodo();
  localStorage.setItem('listTodos', JSON.stringify(listTodos));
  // RESET FORM
  form.reset();
});

// add a to do
function addTodo() {
  const todoValue = todoInput.value;

  // check if empty to do
  const isEmpty = todoValue === '';

  // CHEK FOR DUPLICATE TO DO
  const isDupplicated = listTodos.some((todo) => todo.description.toUpperCase() === todoValue.toUpperCase());

  if (isEmpty) {
    alert('The to do\'s task is empty');
  } else if (isDupplicated) {
    alert('The to do task already exist');
  } else {
    const todo = {
      description: todoValue,
      completed: false,
      index: listTodos.length + 1,
    };

    listTodos.push(todo);
  }
}

// RENDER TODO
function renderTodo() {
  // CLEAR ELEMENT BEFORE THE RE-RENDER
  todoList.innerHTML = '';

  // RENDER TODO
  listTodos.forEach((todo, index) => {
    todoList.innerHTML += `
  <li>
    <div class="todo" id=${index}>
      <div class="task-div">
        <input type="checkbox" />
        <p>${todo.description}</p>
      </div>
      <i class="fa-solid fa-trash" data-action="delete"></i>
    </div>
  </li>`;
  });
}

// ADD EVENT LISTNER FOR ALL TODOS
todoList.addEventListener('click', (e) => {
  const { target } = e;
  const { parentElement } = target;

  if (parentElement.className !== 'todo') return;

  // TO DO ID
  const todo = parentElement;
  const todoId = Number(todo.id);

  // TARGET ACTION
  const { action } = target.dataset;

  action === 'delete' && deleteTodo(todoId);
});

// DELETE TODO
function deleteTodo(todoId) {
  listTodos = listTodos.filter((todo, index) => index !== todoId);

  // RE RENDER
  renderTodo();
  localStorage.setItem('listTodos', JSON.stringify(listTodos));
}