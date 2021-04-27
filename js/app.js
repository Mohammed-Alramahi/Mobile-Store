'use strict';
let dataFromForm = document.getElementById('info');
dataFromForm.addEventListener('submit', submitter);
function submitter(event) {
    event.preventDefault();
    let userName = event.target.username.value;
    let type = event.target.type.value;
    let addedPhone = new Phone(userName, type);
    addedPhone.render();

}
let phones = [];
if (localStorage.getItem('phone') !== null) {
    let parsedArr = JSON.parse(localStorage.getItem('phone'));
    phones = parsedArr;
}
let Phone = function (userName, phoneType) {
    this.userName = userName;
    this.phoneType = phoneType;
    this.price = 0;
    this.condition = '';
    phones.push(this);

}

Phone.prototype.randomprice = function () {
    let s = Math.floor(Math.random() * (500 - 100) + 100);
    console.log(s);
    return s;
}
Phone.prototype.setPrice = function () {
    this.price = this.randomprice();
}
Phone.prototype.conditionSet = function () {
    this.setPrice();
    if (this.price < 200) {
        this.condition = 'Used';
    }
    else {
        this.condition = 'New';
    }

}
Phone.prototype.setLocalStorage = function () {
    let serializedArr = JSON.stringify(phones);
    localStorage.setItem('phones', serializedArr);
}


let dataTable = document.getElementById('info-table');
Phone.prototype.render = function () {
    this.conditionSet();
    let tableRow = document.createElement('tr');
    let nameCell = document.createElement('td');
    let typeCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let conditionCell = document.createElement('td');

    dataTable.appendChild(tableRow);

    tableRow.appendChild(nameCell);
    tableRow.appendChild(typeCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(conditionCell);

    nameCell.textContent = this.userName;
    typeCell.textContent = this.phoneType;
    priceCell.textContent = this.price;
    conditionCell.textContent = this.condition;
    this.setLocalStorage();
}


function getLocalStorage() {
    let parsedArr = JSON.parse(localStorage.getItem('phones'));
    console.log(parsedArr);
    for (let i = 0; i < parsedArr.length; i++) {
        let tableRow = document.createElement('tr');
        let nameCell = document.createElement('td');
        let typeCell = document.createElement('td');
        let priceCell = document.createElement('td');
        let conditionCell = document.createElement('td');

        dataTable.appendChild(tableRow);

        tableRow.appendChild(nameCell);
        tableRow.appendChild(typeCell);
        tableRow.appendChild(priceCell);
        tableRow.appendChild(conditionCell);

        nameCell.textContent = parsedArr[i].userName;
        typeCell.textContent = parsedArr[i].phoneType;
        priceCell.textContent = parsedArr[i].price;
        conditionCell.textContent = parsedArr[i].condition;
    }


}

getLocalStorage();