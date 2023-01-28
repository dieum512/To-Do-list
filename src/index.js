/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */

import './style.css';
import { dragDrop } from './dragtask.js';
import { update } from './update.js';
import {
  addTodo, editTask, removeElement,
} from './addandremove.js';

export const list = document.querySelector('.to-do-list');
export const form = document.getElementById('form');
export const clearAll = document.querySelector('#clear-btn');
export const arr = JSON.parse(localStorage.getItem('List')) || [];
const refresh = document.querySelector('.refresh');

refresh.addEventListener('click', () => {
  location.reload();
});

arr.forEach((task) => {
  list.innerHTML += `
  <li class="item" draggable="true">
    <div class="check">
      <input type="checkbox" class="check-box" name="checkbox" id= "${
  task.index
}" ${task.completed ? 'checked' : ''}>
      <form id="edit-form">
        <input type="text" class="text ${
  task.completed
}" id= ${task.index} value="${task.name}">
      </form>
    </div>
    <i class="uil uil-trash-alt trash"></i>
  </li>`;
});

export const editForm = document.querySelectorAll('#edit-form');
export const editFormArr = Array.from(editForm);
export const editInput = document.querySelectorAll('.text');
export const editInputArr = Array.from(editInput);

export const trash = document.querySelectorAll('.trash');
export const task = document.querySelectorAll('.item');

editTask();
window.addEventListener('load', () => {
  addTodo();
  dragDrop();
  update();
});

// clearCompleted();

removeElement(task, trash);