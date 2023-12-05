import Task from "./classes/task.js";
import TaskManager from "./classes/taskManager.js";


const taskManager = new TaskManager();
let dog = new Task("Walk The Dog");
console.log(dog);


window.createTaskToManager = function () {
    let description = document.getElementById('floatingInput').value;
    taskManager.addTask(description);
    showTask();
};

window.deleteTaskFromManager = function (taskId) {
    if (confirm("Are You Sure?")) {
        taskManager.deleteTask(taskId);
    }
    showTask();
}
window.updateTaskFromManger = function (taskId) {
    let newValue = prompt("Change Your Task Description:");
    if (newValue == null || newValue == "") {
        alert("Can't Leave Task Description Blank!")
    } else {
        taskManager.updateTaskDescription(taskId, newValue);
    }
    showTask();
}
window.finishedTask = function (taskId) {
    alert("Good Job! You Completed A Task!");
    taskManager.completeTask(taskId);
    showTask();
}

function showTask() {
    document.getElementById('finished').innerHTML = '';
    document.getElementById('active').innerHTML = '';

    for (let task of taskManager.tasks) {
        if (task.status) {
            // Task is completed
            document.getElementById('finished').innerHTML += `
                <ul class="list-group">
                    <li class="list-group-item">${task.description}</li>
                </ul>
            `;
        } else {
            // Task is active
            document.getElementById('active').innerHTML += `
                <ul class="list-group">
                    <li class="list-group-item">${task.description}</li>
                </ul>
            `;
        }
    }
};
console.log(taskManager.tasks);
showTask();