function downloadData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://cat-facts-api.std-900.ist.mospolytech.ru/facts");
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = function() {
        // console.log(xhr.status);
        console.log(xhr.response);
        // console.log(JSON.parse(xhr.response));
        renderRecords(xhr.response.records);
    }
}

function createAuthor(user) {
    let author = document.createElement("div");
    author.className = "author";
    author.textContent = user.name.first + " " + user.name.last;
    return author;
}

function createUpvotes(record) {
    let upvotes = document.createElement("div");
    upvotes.className = "upvotes";
    upvotes.textContent = record.upvotes;
    return upvotes;
}

function createItemContent(record) {
    let content = document.createElement("div");
    content.className = "item-content";
    content.textContent = record.text;
    return content;
}

function createItemFooter(record) {
    let footer = document.createElement("div");
    footer.className = "item-footer";
    footer.append(createAuthor(record.user));
    footer.append(createUpvotes(record));
    return footer;
}

function createListItemElem(record) {
    let div = document.createElement("div");
    div.className = "list-item";
    div.append(createItemContent(record));
    div.append(createItemFooter(record));
    //div.textContent = record.text;
    return div;
}

function renderRecords(records) {
    let factsList = document.querySelector(".facts-list");
    factsList.innerHTML = "";
    for (let record of records) {
        factsList.append(createListItemElem(record));
        
    }
}

window.onload = function() {
    downloadData();
}