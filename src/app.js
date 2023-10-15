const tasks = [
  {
    id: 1,
    title: "Some title 1",
    description: "Some description 1",
    completed: false,
  },
  {
    id: 2,
    title: "Some title 2",
    description: "Some description 2",
    completed: false,
  },
  {
    id: 3,
    title: "Some title 3",
    description: "Some description 3",
    completed: false,
  },
];

function getTasks() {
  return tasks;
}

function getTask(id) {
  let task = tasks.find(task => task.id === id);
  if (task !== undefined) {
    return Promise.resolve(task);
  } else {
    return Promise.reject(`Task with id ${id} does not exist.`);
  }
}

function patchTask(id, body) {
  let srcIndex = tasks.findIndex(task => task.id === id)
  console.log(srcIndex)
  if (srcIndex !== undefined && body) {
    if (body.title) {
      tasks[srcIndex].title = body.title
    }
    if (body.description) {
      tasks[srcIndex].description = body.description
    }
    if (body.completed !== undefined) {
      tasks[srcIndex].completed = body.completed
    }
    return Promise.resolve(true)
  } else {
    return Promise.reject(`Could not find the task with ID ${id}`)
  }
}

function deleteTask(id) {
  const srcIndex = tasks.findIndex(task => task.id === id)
  if (srcIndex !== undefined && srcIndex >= 0) {
    tasks.splice(srcIndex, 1)
    return Promise.resolve(true)
  } else {
    return Promise.reject(`Could not find the task with ID ${id}`)
  }
}

module.exports = { getTasks, getTask, patchTask, deleteTask };
