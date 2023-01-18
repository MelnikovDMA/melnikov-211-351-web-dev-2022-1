const dataUrl = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api";
const apiKey = "7943790e-5dfa-4f52-b922-e9bd05e02d87";

let idForFilter;

async function downloadRoutesData() {

    let routesUrl = new URL(dataUrl + "/routes");
    routesUrl.searchParams.append("api_key", apiKey);

    let response = await fetch(routesUrl);
    let data = await response.json();

    return data;
  }

async function downloadGuidesData(id) {

    let guidesUrl =  new URL(`${dataUrl}/routes/${id}/guides`);
    guidesUrl.searchParams.append("api_key", apiKey);

    let response = await fetch(guidesUrl);
    let data = await response.json();

    return data;
}


  
async function main() {

    let guidesData;

    const routesData = await downloadRoutesData();
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
        
            let routeRow = document.createElement('div'); // row
            routeRow.classList.add("row", "border-bottom", "border-end");
            routeTable.appendChild(routeRow);

            let routeName = document.createElement('div'); // name
            routeName.classList.add("col-2","border-start", "border-end", "text-center", "pt-5");
            routeName.innerText = el.name;
            routeRow.appendChild(routeName);
                
            let routeDescription = document.createElement('div'); // description
            routeDescription.classList.add("col-4", "pt-3");
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

            let mainObjects = document.createElement('div'); // objects
            mainObjects.classList.add("col-4", "border-start", "pt-3");
            let mainObjectsList = el.mainObject.split("-");
            let counter = 1;
            for (let object of mainObjectsList) {
                let oneObject = document.createElement("p");
                oneObject.innerText = String(counter) + ") " + object;
                counter++;
                mainObjects.appendChild(oneObject);
            }
            routeRow.appendChild(mainObjects);

            let routeDivForBnt = document.createElement("div"); // button
            routeDivForBnt.classList.add("col-2", "text-center", "border-start");
            let routeBtnForSelect = document.createElement('button');
            routeBtnForSelect.classList.add("btn", "btn-outline-info", "mt-4");
            routeBtnForSelect.innerText = "Выбрать";
            routeDivForBnt.appendChild(routeBtnForSelect);
            routeRow.appendChild(routeDivForBnt);
            routeBtnForSelect.setAttribute("route-Id", el.id);
            routeBtnForSelect.addEventListener('click', () => {
                document.querySelector("#headOfTableGuides").hidden = false;
                idForFilter = el.id;
                document.querySelector("#nameRouteForGuides").innerText = el.name;
                downloadGuidesData(el.id).then(resData => {
                    guidesData = resData;
                    displayGuidesTable(guidesData);
                    addLangToSelect(el.id)

                
                })

            })

        })

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
    
    function displayPagination(routesD, routesPP) {

        const paginationEl = document.querySelector('.pagination-btns');
        const pagesCount = Math.ceil(routesD.length / routesPP);
        const divEl = document.createElement("div");
        divEl.classList.add("py-4", "mx-auto", "w-50");
        
        for (let i = 0; i < pagesCount; i++) {
            const spanEl = displayPaginationBtn(i + 1);
            divEl.appendChild(spanEl);
        }
        paginationEl.appendChild(divEl);
    }
    
    function displayPaginationBtn(page) {

        const spanEl = document.createElement("span");
        spanEl.classList.add("pagination-btn");
        spanEl.innerText = page;
        
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
        let selectedObj = document.querySelector("#objSelect").value;
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

    function displayGuidesTable(guidesD) {
        
        const guidesTable = document.querySelector('.table-guides-list');
        guidesTable.innerHTML = "";

        guidesD.forEach((el) => {
            let guideRow = document.createElement('div'); // row
            guideRow.classList.add("row", "border-bottom", "border-end");
            guidesTable.appendChild(guideRow);

            let guideAvatar = document.createElement('div'); // avatar
            guideAvatar.classList.add("col-1","border-start", "border-end", "align-items-center");
            let avatarImg = document.createElement("img");
            avatarImg.classList.add("img-fluid");
            avatarImg.src = "images/avatar.png";
            guideAvatar.appendChild(avatarImg);
            guideRow.appendChild(guideAvatar);
            
            let guideFio = document.createElement('div'); // FIO
            guideFio.classList.add("col-3", "border-end", "text-center", "pt-4");
            guideFio.innerText = el.name;
            guideRow.appendChild(guideFio);

            let guideLangs = document.createElement('div'); // languages
            guideLangs.classList.add("col-2", "border-end", "text-center", "pt-4");
            guideLangs.innerText = el.language;
            guideRow.appendChild(guideLangs);

            let guideJobExp = document.createElement('div'); // experience
            guideJobExp.classList.add("col-2", "border-end", "text-center", "pt-4");
            guideJobExp.innerText = el.workExperience;
            guideRow.appendChild(guideJobExp)

            let guideCost = document.createElement('div'); // cost per hour
            guideCost.classList.add("col-2", "text-center", "pt-4");
            guideCost.innerText = el.pricePerHour;
            guideRow.appendChild(guideCost);

            let guidesDivForBnt = document.createElement("div"); // button
            guidesDivForBnt.classList.add("col-2", "text-center", "border-start");
            let guidesBtnForSelect = document.createElement('button');
            guidesBtnForSelect.classList.add("btn", "btn-outline-info", "mt-3");
            guidesBtnForSelect.innerText = "Выбрать";
            guidesDivForBnt.appendChild(guidesBtnForSelect);
            guideRow.appendChild(guidesDivForBnt);
            guidesDivForBnt.setAttribute("data-bs-toggle", "modal");
            guidesDivForBnt.setAttribute("data-bs-target", "#modalForOrder");
            guidesDivForBnt.addEventListener('click', () => {
                document.querySelector("#nameOfGuideModal").innerText = el.name;
                document.querySelector("#nameOfRouteModal").innerText = document.querySelector("#nameRouteForGuides").innerText;
                document.querySelector("#guideId").value = el.id;
                document.querySelector("#routeId").value = el.route_id;
            })

        })
    }

    function addLangToSelect(whichId) {

        let languageSelect = document.querySelector("#langSelect");
        downloadGuidesData(whichId).then(resData => {
        for (let el of resData) {
            let newOption = document.createElement("option");
            newOption.innerText = el.language;
            languageSelect.appendChild(newOption);
        }
        })

    }

    function filterForGuides(whichId) {

        let jobExpFrom = document.querySelector("#expFrom");
        let jobExpTo = document.querySelector("#expTo");

        let guideLanguage;
    
        if (document.querySelector("#langSelect").value != "default") {
            guideLanguage = document.querySelector("#langSelect").value;
        } else {
            guideLanguage = "";
        }
    
        downloadGuidesData(whichId).then(resData => {
            let resDataArr = [];
            
            for (let el of resData) {
                if (jobExpFrom.value == "" && jobExpTo.value == "") {
                    if (el.language.includes(guideLanguage)) resDataArr.push(el);
                }
                else if (jobExpFrom.value == "") {
                    if (el.workExperience <= jobExpTo.value && el.language.includes(guideLanguage)) resDataArr.push(el);
                }
                else if (jobExpTo.value == "") {
                    if (el.workExperience >= jobExpFrom.value && el.language.includes(guideLanguage)) resDataArr.push(el);
                }
                else if  (el.workExperience >= jobExpFrom.value && el.workExperience <= jobExpTo.value && el.language.includes(guideLanguage)) resDataArr.push(el);
            }
            displayGuidesTable(resDataArr);
        });
    }

    function filterForGuidesHandler(event) {
        filterForGuides(idForFilter);
    }

    async function addingOrgerToApiHandler(event) {
        let draftOffer = document.querySelector("#draftOfOffer");
        draftElements = draftOffer.elements;

        let cost = document.querySelector("#price").innerHTML;

        let form = document.createElement("form");
        let dataFromModal = new FormData(form);

        dataFromModal.append("guide_id", draftElements["guideId"].value);
        dataFromModal.append("route_id", draftElements["routeId"].value);
        dataFromModal.append("date", draftElements["date"].value);
        dataFromModal.append("time", draftElements["time"].value);
        dataFromModal.append("duration", draftElements["duration"].value);
        dataFromModal.append("persons", draftElements["persons"].value);
        dataFromModal.append("price", price);



        let offersUrl = new URL(datatUrl + "/orders");
        offersUrl.searchParams.append("api_key", apiKey);

        let res = await fetch(offerUrl, {
            method: 'POST',
            body: dataFromModal
        });
        let data = await res.json();
    }


    const map = new mapgl.Map('mapContainer', {
        center: [37.61938696289053, 55.75135224786582],
        zoom: 13,
        key: '23d37e69-27c4-4c33-b946-c75295829643',
        style: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b'
    });



    displayRoutesTable(routesData, routesPerPage, currentPage);
    displayPagination(routesData, routesPerPage);
    addObjToSelect(routesData);
    document.querySelector("#searchByNameR").oninput = searchingByNameHandler;
    document.querySelector("#objSelect").onchange = searchingByObjHandler;
    document.querySelector("#langSelect").onchange = filterForGuidesHandler;
    document.querySelector("#expFrom").onchange = filterForGuidesHandler;
    document.querySelector("#expTo").onchange = filterForGuidesHandler;
    document.querySelector("#submitionOfOrder").addEventListener("click", addingOrgerToApiHandler)

}

main();