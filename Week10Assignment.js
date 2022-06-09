class Item {
    constructor (name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class Store {
    constructor (id, name) {
        this.id = id;
        this.name = name;
        this.items = [];
    }

    addItem (item) {
        this.items.push(item);
    }

    deleteItem (item) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }
}

let stores = [];
let storeId = 0;

onClick('new-store',  () => {
    stores.push(new Store(storeId++, getValue('new-store-name')));
    drawDOM();
});

function onClick (id, action) {
    let element = document.getElementById (id);
    element.addEventListener ('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let storeDiv = document.getElementById('stores');
    clearElement(storeDiv);
    for (store of stores) {
        let table = createStoreTable(store);
        let title = document.createElement('h2');
        title.innerHTML = store.name;
        title.appendChild(createDeleteStoreButton(store));
        storeDiv.appendChild(title);
        storeDiv.appendChild(table);
        for (item of store.items) {
            createItemRow(store, table, item);
        }
    }
}

function createItemRow(store, table, item) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = item.name;
    row.insertCell(1).innerHTML = item.quantity;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton (store, item));
}

function createDeleteRowButton(store, item) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Item';
    btn.onclick = () => {
        let index = store.items.indexOf(item);
        store.items.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteStoreButton(store) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Store';
    btn.onclick = () => {
        let index = stores.indexOf(store);
        stores.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewItemButton(store) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        store.items.push(new Item(getValue(`name-input-${store.id}`), getValue(`quantity-input-${store.id}`)));
        drawDOM();
    };
    return btn;
}

function createStoreTable(store) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped',);
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let quantityColumn = document.createElement('th');
    nameColumn.innerHTML = 'Item';
    quantityColumn.innerHTML = 'Quantity';
    row.appendChild(nameColumn);
    row.appendChild(quantityColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let quantityTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${store.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let quantityInput = document.createElement('input');
    quantityInput.setAttribute('id', `quantity-input-${store.id}`);
    quantityInput.setAttribute('type', 'text');
    quantityInput.setAttribute('class', 'form-control');
    let newItemButton = createNewItemButton(store);
    nameTh.appendChild(nameInput);
    quantityTh.appendChild(quantityInput);
    createTh.appendChild(newItemButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(quantityTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

