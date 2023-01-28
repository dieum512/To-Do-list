/* eslint-disable import/prefer-default-export */

export const update = () => {
  const checkbox = document.querySelectorAll('.check-box');

  const checkBoxArr = Array.from(checkbox);
  checkBoxArr.forEach((checktodo) => {
    checktodo.addEventListener('click', (e) => {
      const parent = e.target.parentElement;

      const editinput = parent.querySelector('.text');

      const todos = JSON.parse(localStorage.getItem('List'));

      const index = todos.findIndex((item) => item.index.toString() === e.target.id);
      if (e.target.checked) {
        todos[index].completed = true;
        localStorage.setItem('List', JSON.stringify(todos));
        editinput.style.textDecoration = 'line-through';
      } else {
        todos[index].completed = false;
        localStorage.setItem('List', JSON.stringify(todos));
        editinput.style.textDecoration = 'none';
      }
    });
  });
};
