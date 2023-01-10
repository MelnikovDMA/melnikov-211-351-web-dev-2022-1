async function downloadDataRouts() {
    let url = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=7943790e-5dfa-4f52-b922-e9bd05e02d87");
    try {
        let response = await fetch(finalURL);
        let data = await response.json();

        addRoutesToMainTable(data, page);
        addObjectsToSelect(data);

        return data;
    }
    catch(error) {
        showMessage("warning", error.message);
    }
}

function addRoutesToTable(data, page = 1) {
    let routerTable = document.querySelector("#tableRouteList");
    routerTable.innerHTML = "";
    let text = document.createElement('p');
    let cutData = data.slice(page*10-10,page*10);
    for (let record of cutData) {

        let routerRow = document.createElement('div');//row
        routerRow.classList.add("row", "border-bottom", "border-start", "border-end");
        mainTable.appendChild(routerRow);

        let routerName = document.createElement('div');//name
        routerName.classList.add("col-2", "border-end", "text-center");
        routerName.innerText = record.name;
        routerRow.appendChild(routerName);
        
        let routerDescription = document.createElement('div');//description
        routerDescription.classList.add("col-4", "border-end");
        let descriptionText = document.createElement("p");
        if (record.description.length > 150) {
            let descriptionTT = document.createElement("a");
            descriptionTT.setAttribute("data-bs-toggle", "tooltip");
            descriptionTT.setAttribute("data-bs-title", record.description);
            descriptionTT.innerText = record.description.slice(0,100) + "...";
            descriptionText.appendChild(descriptionTT);
        } else {
            descriptionText.innerText = record.description;
        }
        routerDescription.appendChild(descriptionText);
        routerRow.appendChild(routerDescription);

        let mainObjects = document.createElement('div');//objects
        mainObjects.classList.add("col-4", "border-end");
        let mainObjectList = record.mainObject.split("-");
        for (let object of mainObjectList) {
            let oneObject = document.createElement("p");
            oneObject.innerText = object;//доделать
            mainObjects.appendChild(oneObjectRecord);
        }
    }
}
