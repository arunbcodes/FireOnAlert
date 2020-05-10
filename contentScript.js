var alertContentArray = [];
class Scrip  {
    constructor(scripName, scripEntryPrice, scripQty, orderTriggeredTime) {
        this.scripName = scripName;
        this.scripEntryPrice = scripEntryPrice;
        this.scripQty = scripQty;
        this.orderTriggeredTime = orderTriggeredTime
    }
}

// message is sent from an extension process
chrome.runtime.sendMessage({msg: "Hello"});


//message is sent from a content script
// chrome.tabs.sendMessage(integer tabId, any message, object options, function responseCallback)


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