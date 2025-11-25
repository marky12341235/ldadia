const inputField = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addBtn');
const clearTasksBtn = document.getElementById('removeAllBtn');
const taskContainer = document.getElementById('taskList');

let taskItems = [];

addTaskBtn.addEventListener('click', handleAddTask);
clearTasksBtn.addEventListener('click', clearAllTasks);

function handleAddTask() {
  const newTaskText = inputField.value.trim();
  if (!newTaskText) return;

  const newTask = {
    id: Date.now(),
    text: newTaskText,
    done: false
  };

  taskItems.push(newTask);
  inputField.value = '';
  renderTaskList();
}

function renderTaskList() {
  taskContainer.innerHTML = '';

  taskItems.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check-btn';
    checkbox.checked = task.done;
    checkbox.onclick = () => toggleTaskStatus(task.id);

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;
    if (task.done) {
      text.style.textDecoration = 'line-through';
      text.style.opacity = '0.6';
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '✕';
    deleteButton.onclick = () => removeTask(task.id);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);

    taskContainer.appendChild(li);
  });
}

function toggleTaskStatus(taskId) {
  taskItems = taskItems.map(task =>
    task.id === taskId ? { ...task, done: !task.done } : task
  );
  renderTaskList();
}

function removeTask(taskId) {
  taskItems = taskItems.filter(task => task.id !== taskId);
  renderTaskList();
}

function clearAllTasks() {
  taskItems = [];
  renderTaskList();
}
