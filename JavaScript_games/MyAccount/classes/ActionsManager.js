export default class ActionsManager {
    constructor() {
        this.actions = localStorage.getItem("actions") ? JSON.parse(localStorage.getItem("actions")) : [];
        this.balance = 0;
        this.calcBalance();
    }
    get(propName) {
        return this[propName]
    }
    set(propName, newValue) {
        this[propName] = newValue;
    }
    addAction(action) {
        this.actions.push(action);
        this.calcBalance()
    }
    deleteAction(actionId) {
        //find the relevante index
        let indexToDelete = this.actions.findIndex((action) => action.id == actionId)
        //delete with splice
        this.actions.splice(indexToDelete, 1);
        this.calcBalance()
    }
    updateAction(actionId, newAmount) {
        let indexToUpdate = this.actions.findIndex((action) => action.id == actionId);
        this.actions[indexToUpdate].amount = this.actions[indexToUpdate].type == "income" ? newAmount : -newAmount;
        this.calcBalance();
    }

    calcBalance() {
        this.balance = 0;
        for (let action of this.actions) {
            this.balance += action.amount;
        }
        document.getElementById('balance').innerHTML = `Balance: ${this.balance} <i class="fa-solid fa-shekel-sign">`;
    }
}