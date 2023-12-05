export default class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        let task = new Task(description);
        this.tasks.push(task);
    }

    deleteTask(taskId) {
        let taskToDelete = this.tasks.findIndex((task) => task.id == taskId);
        this.tasks.splice(taskToDelete, 1);
    }

    updateTaskDescription(taskId, newValue) {
        let taskToUpdate = this.tasks.findIndex((task) => task.id == taskId);
        if (taskToUpdate !== -1) {
            this.tasks[taskToUpdate].description = newValue;
        }
    }

    completeTask(taskId) {
        let taskComplete = this.tasks.findIndex((task) => task.id == taskId);
        if (taskComplete !== -1) {
            this.tasks[taskComplete].status = true;
        }
    }
}