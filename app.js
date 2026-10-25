//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0];
var incompleteTaskHolder = document.getElementById('incompleteTasks');
var completedTasksHolder = document.getElementById('completed-tasks');

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  var deleteButtonImg = document.createElement('img');

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

var addTask = function () {
  if (!taskInput.value) return;
  var task = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, taskCompleted);

  taskInput.value = '';
};

var editTask = function () {
  var task = this.parentNode;
  var editInput = task.querySelector('input[type=text]');
  var label = task.querySelector('label');
  var editButton = task.querySelector('.edit');
  var containsClass = task.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  task.classList.toggle('editMode');
};

var deleteTask = function () {
  var task = this.parentNode;
  var list = task.parentNode;

  list.removeChild(listItem);
};

var completeTask = function () {
  var task = this.parentNode;
  completedTasksHolder.appendChild(task);
  bindTaskEvents(task, incompleteTask);
};

var incompleteTask = function () {
  var task = this.parentNode;
  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, completeTask);
};

addButton.addEventListener('click', addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');

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
