const ordersUrl = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders";
const apiKey = "7943790e-5dfa-4f52-b922-e9bd05e02d87";

async function downloadOrders() {
    let offersUrl = new URL(ordersUrl);
    offersUrl.searchParams.append("api_key", apiKey);

    let response = await fetch(offersUrl);
    let data = await response.json();

        return data;
}

async function main() {


    const ordersData = await downloadOrders();
  
    function displayRoutesTable(ordersD) {
        const orderTable = document.querySelector('.table-order-list');
        
        ordersD.forEach((el) => {
        
            let orderRow = document.createElement('div'); // row
            orderRow.classList.add("row", "border-bottom", "border-end");
            orederTable.appendChild(orderRow);

            let orderName = document.createElement('div'); // name
            orderName.classList.add("col-2","border-start", "border-end", "text-center", "oran-text");
            orderName.innerText = el.name;
            orderRow.appendChild(orderName);
                
            let orderCost = document.createElement('div'); // cost
            orderCost.classList.add("col-2","border-start", "border-end", "text-center", "oran-text");
            orderCost.innerText = el.price;
            orderRow.appendChild(orderCost);

            let orderDivForBnt = document.createElement("div"); // button
            orderDivForBnt.classList.add("col-2", "text-center", "border-start");
            let orderBtnForSelect = document.createElement('button');
            orderBtnForSelect.classList.add("btn", "btn-outline-info", "mt-3");
            orderBtnForSelect.innerText = "Подробнее";
            orderDivForBnt.appendChild(orderBtnForSelect);
            routeRow.appendChild(orderDivForBnt);



        })
    }

    displayRoutesTable(ordersData)

}

main();