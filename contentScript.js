var alertContentArray = [];
class Scrip  {
    constructor(scripName, scripEntryPrice, scripQty, orderTriggeredTime) {
        this.scripName = scripName;
        this.scripEntryPrice = scripEntryPrice;
        this.scripQty = scripQty;
        this.orderTriggeredTime = orderTriggeredTime
    }
}

window.addEventListener("load", function load(event){
    // window.removeEventListener("load", load, false); //remove listener, no longer needed
    var jsInitCheckTimer = setInterval(checkForJS_Finish, 500);
    

    function checkForJS_Finish () {
        let noNotificationParentDiv = document.evaluate('//*[@id="root"]/div[1]/header/div/div[4]/div/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        console.log(noNotificationParentDiv);
        if (noNotificationParentDiv) {
            clearInterval (jsInitCheckTimer);
            window.removeEventListener("load", load, false); //remove listener, no longer needed
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            const config = {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true,
            };

            const callback = function(mutationsList, observer) {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        // console.log('A child node has been added or removed.');
                        if (mutation.target && [...mutation.addedNodes].length) {
                            let alertIterator = document.evaluate('//*[@id="root"]/div[1]/header/div/div[4]/div/div/div[2]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            if(noNotificationParentDiv) {
                                console.log(`A child node ${mutation.target} has been added!`, mutation.target);
                                console.log(`A child node with test has been added!`, noNotificationParentDiv);
                                try {
                                    for ( var i=0 ; i < alertIterator.snapshotLength; i++ ){
                                        let scripName = document.evaluate('div/div/div[1]/div[2]/p[1]', alertIterator.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                        let scripEntryPrice = document.evaluate('div/div/div[2]/div[2]/p[1]', alertIterator.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                        let scripQty = document.evaluate('div/div/div[2]/div[2]/div/div/p[2]', alertIterator.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                        let orderTriggeredTime = document.evaluate('div/div/div[2]/div[2]/div/p[1]', alertIterator.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                        if(scripName && scripEntryPrice && scripQty && orderTriggeredTime){
                                            let scrip1 = new Scrip(scripName.textContent, scripEntryPrice.textContent, scripQty.textContent, orderTriggeredTime.textContent);
                                            alertContentArray.push(scrip1);
                                        }
                                    }
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
                                    chrome.runtime.sendMessage({scrips: JSON.stringify(alertContentArray)});
                                }
                                catch (e) {
                                    // alert('Error: Document tree modified during iteration ' + e);
                                    console.log('Error: Document tree modified during iteration ' + e);
                                }
                            }
                        }
                    }
                }
            }
            const observer = new MutationObserver(callback);
            console.log("going to observe",noNotificationParentDiv)
            observer.observe(noNotificationParentDiv, config);
        }
    }
},false);


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(typeof message === 'object' && message.action === "getContentForPopup") {
        console.log("The message that is sent to pop up is");
        console.log(alertContentArray);
        console.log("The info present in the tabs key of sender object is: ", sender);
        return sendResponse({scrips: JSON.stringify(alertContentArray)});
        return true;
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