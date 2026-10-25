//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const task = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const task = this.parentNode;
  const editInput = task.querySelector('input[type=text]');
  const label = task.querySelector('label');
  const editButton = task.querySelector('.edit');
  const containsClass = task.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  task.classList.toggle('editMode');
};

const deleteTask = function () {
  const task = this.parentNode;
  const list = task.parentNode;

  list.removeChild(task);
};

const completeTask = function () {
  const task = this.parentNode;
  completedTasksHolder.appendChild(task);
  bindTaskEvents(task, incompleteTask);
};

const incompleteTask = function () {
  const task = this.parentNode;
  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, completeTask);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
};

function bindAllTasks(nameHolder, statusTask) {
  for (let i = 0; i < nameHolder.children.length; i++) {
    bindTaskEvents(nameHolder.children[i], statusTask);
  }
}

bindAllTasks(incompleteTaskHolder, completeTask);
bindAllTasks(completedTasksHolder, incompleteTask);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
