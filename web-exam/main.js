async function downloadRoutesDoutes() {

    const response = await fetch("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=7943790e-5dfa-4f52-b922-e9bd05e02d87");
    const data = await response.json();

    return data;
  }
  
    async function main() {

        const routesData = await downloadRoutesDoutes();
        let currentPage = 1;
        let routesPerPage = 10;
  
        function displayRoutesTable(routesD, routesPP, page) {
            const routeTable = document.querySelector('.table-route-list');
            routeTable.innerHTML = "";
            page--;
        
            const start = routesPP * page;
            const end = start + routesPP;
            const paginatedData = routesD.slice(start, end);
        
            paginatedData.forEach((el) => {
        
                let routeRow = document.createElement('div');//row
                routeRow.classList.add("row", "border-bottom", "border-end");
                routeTable.appendChild(routeRow);

                let routeName = document.createElement('div');//name
                routeName.classList.add("col-2","border-start", "border-end", "text-center");
                routeName.innerText = el.name;
                routeRow.appendChild(routeName);
                
                let routeDescription = document.createElement('div');//description
                routeDescription.classList.add("col-4");
                let descriptionText = document.createElement("p");
                descriptionText.classList.add("muted");
                if (el.description.length > 150) {
                    let descriptionTT = document.createElement("a");
                    descriptionTT.setAttribute("data-bs-toggle", "tooltip");
                    descriptionTT.setAttribute("data-bs-title", el.description);
                    descriptionTT.innerText = el.description.slice(0,150) + "...";
                    descriptionText.appendChild(descriptionTT);
                } else {
                    descriptionText.innerText = el.description;
                }
                routeDescription.appendChild(descriptionText);
                routeRow.appendChild(routeDescription);

                let mainObjects = document.createElement('div');//objects
                mainObjects.classList.add("col-4", "border-start");
                let mainObjectsList = el.mainObject.split("-");
                let counter = 1;
                for (let object of mainObjectsList) {
                    let oneObject = document.createElement("p");
                    oneObject.innerText = String(counter) + ") " + object;
                    counter++;
                    mainObjects.appendChild(oneObject);
                }
                routeRow.appendChild(mainObjects);

                let divForBnt = document.createElement("div");//button
                divForBnt.classList.add("col-2", "text-center", "border-start");
                let btnForSelect = document.createElement('button');
                btnForSelect.classList.add("btn", "btn-outline-info", "mt-3");
                btnForSelect.innerText = "Выбрать";
                divForBnt.appendChild(btnForSelect);
                routeRow.appendChild(divForBnt);
            })

            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        }
    
        function displayPagination(routesD, routesPP) {

            const paginationEl = document.querySelector('.pagination-btns');
            const pagesCount = Math.ceil(routesD.length / routesPP);
            const divEl = document.createElement("div");
            divEl.classList.add('w-50', "mx-auto", "py-4");
        
            for (let i = 0; i < pagesCount; i++) {
                const spanEl = displayPaginationBtn(i + 1);
                divEl.appendChild(spanEl);
            }
            paginationEl.appendChild(divEl);
        }
    
        function displayPaginationBtn(page) {

            const spanEl = document.createElement("span");
            spanEl.classList.add('p-2', 'mx-2', 'border', 'border-warning');
            spanEl.innerText = page
        
            if (currentPage == page) spanEl.classList.add('text-danger',);
        
            spanEl.addEventListener('click', () => {
                currentPage = page;
                displayRoutesTable(routesData, routesPerPage, currentPage);
        
                let currentItemLi = document.querySelector('span.text-danger');
                currentItemLi.classList.remove('text-danger');
        
                spanEl.classList.add('text-danger');
            })
        
            return spanEl;
        }

        function searchingByName(routesD, searchValueName) {
            let nameOfObj;
            let selectedObj = document.querySelector("#objSelect").value
            if(selectedObj != "default" && selectedObj != "notselected") {
                nameOfObj = document.querySelector("#objSelect").value;
            } else {
                nameOfObj = "";
            }
            let searchArr = [];
            for (let el of routesD) {
                if (el.name.includes(searchValueName) && el.mainObject.includes(nameOfObj)) {
                    searchArr.push(el);
                }
            }
            displayRoutesTable(searchArr, routesPerPage, currentPage);
            return searchArr;
        }
        
        function searchingByNameHandler(event) {
            searchingByName(routesData, document.querySelector("#searchByNameR").value);
            console.log(document.querySelector("#searchByNameR").value);
        }

        function searchingByObj(routesD, nameOfObj) {

            if (nameOfObj == "notselected") {
                displayRoutesTable(routesData, routesPerPage, currentPage);
                return;
            }

            let searchValueName;
            if (document.querySelector("#searchByNameR").value != "") {
                searchValueName = document.querySelector("#searchByNameR").value;
            } else {
                searchValueName = "";
            }
            let searchArr = [];
            for (let el of routesD) {
                if (el.mainObject.includes(nameOfObj) && el.name.includes(searchValueName)) {
                    searchArr.push(el); 
                }
            }
            //console.log(searchArr);
            displayRoutesTable(searchArr, routesPerPage, currentPage);
            return searchArr;
        }
        
        function searchingByObjHandler(event) {
            searchingByObj(routesData, event.target.value);
        }

        function addObjToSelect(routesD) {

            let objectSelector = document.querySelector("#objSelect");
            for (let el of routesD) {
                let objectList = el.mainObject.split("-");
                for (let object of objectList) {
                    let newOption = document.createElement("option");
                    newOption.innerText = object;
                    objectSelector.appendChild(newOption);
                }
            }
        }


    
        displayRoutesTable(routesData, routesPerPage, currentPage);
        displayPagination(routesData, routesPerPage);
        addObjToSelect(routesData);
        document.querySelector("#searchByNameR").oninput = searchingByNameHandler;
        document.querySelector("#objSelect").onchange = searchingByObjHandler;
        
    }


  
main();