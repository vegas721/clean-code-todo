//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createCheckBoxTaskElement = function () {
  const checkBox = document.createElement('input');

  checkBox.type = 'checkbox';

  return checkBox;
};

const createLabelTaskElement = function (text) {
  const label = document.createElement('label');

  label.innerText = text;
  label.className = 'task';

  return label;
};

const createEditInputTaskElement = function () {
  const input = document.createElement('input');

  input.type = 'text';
  input.className = 'task';

  return input;
};

const createEditButtonTaskElement = function () {
  const button = document.createElement('button');

  button.innerText = 'Edit';
  button.className = 'edit';

  return button;
};

const createDeleteButtonTaskElement = function () {
  const button = document.createElement('button');
  const buttonImg = document.createElement('img');

  button.className = 'delete';
  buttonImg.src = './remove.svg';
  button.appendChild(buttonImg);

  return button;
};

const createNewTaskElement = function (taskString) {
  const task = document.createElement('li');

  task.appendChild(createCheckBoxTaskElement());
  task.appendChild(createLabelTaskElement(taskString));
  task.appendChild(createEditInputTaskElement());
  task.appendChild(createEditButtonTaskElement());
  task.appendChild(createDeleteButtonTaskElement());

  return task;
};

const addTask = function () {
  if (!taskInput.value) return;
  const task = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, completeTask);

  taskInput.value = '';
};

const editTask = function () {
  const task = this.parentNode;
  const editInput = task.querySelector('input[type=text]');
  const label = task.querySelector('label');
  const editButton = task.querySelector('.edit');
  const containsClass = task.classList.contains('edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  task.classList.toggle('edit-mode');
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
