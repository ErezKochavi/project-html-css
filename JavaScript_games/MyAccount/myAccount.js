import Action from "./classes/Action.js"
import ActionsManager from "./classes/ActionsManager.js";
//function inside a module script must be link as window!! (onclick || addEventListener)
window.addActionToManager = function () {
    // get data from form
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;
    let amount = +document.getElementById('amount').value;
    // create the action Object
    let action = new Action(type, description, amount);
    // add the action to actionManger
    manager.addAction(action);
    //update Local Storage
    localStorage.setItem("actions", JSON.stringify(manager.actions));
    showActionsInTable();

    console.log(manager.actions);
    // reset form
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
};
window.deleteActionFromManager = function (actionId) {
    if (confirm("Are You Sure?")) {
        manager.deleteAction(actionId);
        //update Local Storage
        localStorage.setItem("actions", JSON.stringify(manager.actions));
        showActionsInTable();

    }
};
window.updateActionInManager = function (actionId) {
    let newAmount = prompt("Please Enter new amount: ");
    if (newAmount == null || newAmount == "") alert("Something went wrong");
    else {
        manager.updateAction(actionId, +newAmount);
        //update Local Storage
        localStorage.setItem("actions", JSON.stringify(manager.actions));
        showActionsInTable();

    }
};
function showActionsInTable() {
    document.getElementById('actions').innerHTML = '';
    for (let action of manager.actions) {
        document.getElementById('actions').innerHTML += `
        <tr><td class =${action.type == "income" ? "text-success" : "text-danger"}>${action.description}</td><td class =${action.type == "income" ? "text-success" : "text-danger"}>${action.amount}<i class="fa-solid fa-shekel-sign"></i></td><td><a onclick = "updateActionInManager(${action.id})"><i style="cursor: pointer" class="fa-regular fa-pen-to-square"></i></a></td><td>
<a onclick = "deleteActionFromManager(${action.id})"><i style="cursor: pointer" class="fa-regular fa-trash-can"></i></a></td></tr>
        `
    }
}

let manager = new ActionsManager();
console.log(manager.actions);
showActionsInTable();
