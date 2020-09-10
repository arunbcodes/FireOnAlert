var alertContentArray = [];
var alertContentSet = new Set();

class Scrip {
    constructor(scripName, scripEntryPrice, scripQty, orderTriggeredTime, buyOrSell) {
        this.scripName = scripName;
        this.scripEntryPrice = scripEntryPrice;
        this.scripQty = scripQty;
        this.orderTriggeredTime = orderTriggeredTime;
        this.buyOrSell = buyOrSell;
    }
}

function streakPageObjects() {
    return {
        selectors: {
            notificationParentDiv: '//*[@id="root"]/div[1]/header/div/div[4]/div/div/div[2]',
            notificationDiv: '//*[@id="root"]/div[1]/header/div/div[4]/div/div/div[2]/div',
            notificationRowBuySellText: 'div/div/div[1]/div/span',
            notificationRowScripName: 'div/div/div[1]/div[2]/p[1]',
            notificationRowScripEntryPrice: 'div/div/div[2]/div[2]/p[1]',
            notificationRowScripQty: 'div/div/div[2]/div[2]/div/div/p[2]',
            notificationRowOrderTriggeredTime: 'div/div/div[2]/div[2]/div/p[1]'
        },
        getNode: (xpathExpression, contextNode = document, namespaceResolver = null, resultType = XPathResult.FIRST_ORDERED_NODE_TYPE, result = null) => {
            return document.evaluate(xpathExpression, contextNode, namespaceResolver, resultType, result);
        }
    }
}

window.addEventListener("load", function load(event) {
    var jsInitCheckTimer = setInterval(checkForJS_Finish, 500);
    let pageObjects = streakPageObjects();


    function checkForJS_Finish() {
        let noNotificationParentDiv = pageObjects.getNode(pageObjects.selectors.notificationParentDiv).singleNodeValue;
        console.log(noNotificationParentDiv);
        if (noNotificationParentDiv) {
            clearInterval(jsInitCheckTimer);
            window.removeEventListener("load", load, false); //remove listener, no longer needed
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            const config = {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true,
            };

            const callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        // console.log('A child node has been added or removed.');
                        if (mutation.target && [...mutation.addedNodes].length) {
                            let alertIterator = pageObjects.getNode(pageObjects.selectors.notificationDiv, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
                            if (noNotificationParentDiv) {
                                console.log(`A child node ${mutation.target} has been added!`, mutation.target);
                                console.log(`A child node with test has been added!`, noNotificationParentDiv);
                                try {
                                    // let i = 0;//alertIterator.snapshotLength -1;
                                    for (let i = 0; i < alertIterator.snapshotLength; i++) {
                                        let alertText = pageObjects.getNode(pageObjects.selectors.notificationRowBuySellText, alertIterator.snapshotItem(i)).singleNodeValue.textContent;
                                        console.log("alertText");
                                        console.log(alertText);
                                        if (alertText === 'BUY ALERT' || alertText === 'SELL ALERT' || alertText === 'COMPLETE') {
                                            let scripName = pageObjects.getNode(pageObjects.selectors.notificationRowScripName, alertIterator.snapshotItem(i)).singleNodeValue;
                                            let scripEntryPrice = pageObjects.getNode(pageObjects.selectors.notificationRowScripEntryPrice, alertIterator.snapshotItem(i)).singleNodeValue;
                                            let scripQty = pageObjects.getNode(pageObjects.selectors.notificationRowScripQty, alertIterator.snapshotItem(i)).singleNodeValue;
                                            let orderTriggeredTime = pageObjects.getNode(pageObjects.selectors.notificationRowOrderTriggeredTime, alertIterator.snapshotItem(i)).singleNodeValue;
                                            if (scripName && scripEntryPrice && scripQty && orderTriggeredTime) {
                                                let longOrShort = alertText.includes('BUY') ? 'BUY' : 'BUY';
                                                let scrip1 = new Scrip(scripName.textContent, scripEntryPrice.textContent, scripQty.textContent, orderTriggeredTime.textContent, longOrShort);
                                                alertContentSet.add(JSON.stringify(scrip1));
                                                // alertContentArray.push(scrip1);
                                            }
                                        }
                                    }
                                    alertContentArray = Array.from(alertContentSet);
                                    console.log(alertContentArray);
                                    // You can either store the values in the local storage as below

                                    // let jsonifiedAlertContentArray = JSON.stringify(alertContentArray);
                                    // chrome.storage.local.set({"scrips": jsonifiedAlertContentArray}, function() {
                                    //     console.log('Value is set to ' + jsonifiedAlertContentArray);
                                    // });

                                    // chrome.storage.local.get(['scrips'], function(result) {
                                    //     try {
                                    //         console.log(JSON.parse(result.scrips));
                                    //     } catch (ex) {
                                    //         console.error(ex);
                                    //     }
                                    // });
                                    //[or]
                                    // pass the message to background script like below
                                    if(typeof chrome.app.isInstalled!=='undefined') {
                                        chrome.runtime.sendMessage({scrips: alertContentArray});
                                    }
                                } catch (e) {
                                    // alert('Error: Document tree modified during iteration ' + e);
                                    console.log('Error occurred while iterating alert div ' + e);
                                }
                            }
                        }
                    }
                }
            };
            const observer = new MutationObserver(callback);
            console.log("going to observe", noNotificationParentDiv);
            observer.observe(noNotificationParentDiv, config);
        }
    }
}, false);


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (typeof message === 'object' && message.action === "getContentForPopup") {
        console.log("The message that is sent to pop up is");
        console.log(alertContentArray);
        console.log("The info present in the tabs key of sender object is: ", sender);
        // return sendResponse({scrips: JSON.stringify(alertContentArray)});
        return sendResponse({scrips: alertContentArray});
        // return true;
    }
});


// chrome.runtime.onMessage.addListener(handler);

// function handler() {
//     heartbeat(
//         function(message, sender, sendResponse) { //heartbeat success
//             if(typeof message === 'object' && message.type === "getScripData") {
//                 // chrome.pageAction.show(sender.tab.id);
//                 console.log("The message that is sent to pop up is");
//                 console.log(alertContentArray);
//                 console.log("The info present in the tabs key of sender object is: ", sender);
//             }
//         },
//         function(){ // heartbeat failure
//             someEvent.removeListener(handler);
//             console.log("Couldn't contact background script. The content script has become orphaned!");
//         }
//     );
// }

// function heartbeat(success, failure) {
//     chrome.runtime.sendMessage({heartbeat: true}, function(reply){
//         if(chrome.runtime.lastError){
//             failure();
//         } else {
//             success();
//         }
//     });
// }