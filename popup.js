var scripsInPopup;

document.addEventListener("DOMContentLoaded", function(event){
    var resultsButton = document.getElementById("firedScrips");
    getResults();
});

function getResults(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getContentForPopup" }, function (response) {
            showResults(response.scrips);
        });
    });
}

function showResults(results) {
    var resultsElement = document.getElementById("firedScripsTable");
    // JSON.parse(results).forEach(element1 => {
    results.forEach(element1 => {
        let element = JSON.parse(element1);
        let scripRow = document.createElement('tr');

        scripName = document.createElement('td');
        scripName.appendChild(document.createTextNode(element.scripName));

        scripEntryPrice = document.createElement('td');
        scripEntryPrice.appendChild(document.createTextNode(element.scripEntryPrice));

        scripQty = document.createElement('td');
        scripQty.appendChild(document.createTextNode(element.scripQty));

        orderTriggeredTime = document.createElement('td');
        orderTriggeredTime.appendChild(document.createTextNode(element.orderTriggeredTime));

        scripRow.appendChild(scripName);
        scripRow.appendChild(scripEntryPrice);
        scripRow.appendChild(scripQty);
        scripRow.appendChild(orderTriggeredTime);

        resultsElement.appendChild(scripRow);
    }); 
}