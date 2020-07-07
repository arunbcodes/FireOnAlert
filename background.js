var prevTrigScrips = [];

// If you don't want to use storage then you can pass the message from content script and use it here
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(typeof message === 'object' && message.scrips !== undefined) {
        console.log("I got the message from contentScript and the message is");
        console.log(message);

        chrome.tabs.query({url:'https://*.aliceblueonline.com/*'}, function (params) {
            console.log('getting tabs');
            console.log(params);
            console.log(params[0].id);
            chrome.tabs.executeScript(params[0].id, {
                code: "var fireOrderParams = JSON.parse('" + encodeToPassToContentScript(message) + "');"
            }, () => {
                chrome.tabs.executeScript(params[0].id, {file:'fireOrder.js'}, result => {
                    const lastErr = chrome.runtime.lastError;
                    if (lastErr) console.log('tab: ' + params[0].id + ' lastError: ' + JSON.stringify(lastErr));
                });
            });
        });
        console.log("The info present in the tabs key of sender object is: ", sender);
        chrome.browserAction.setPopup({tabId: sender.tab.id, popup: "popup.html"}, function(message, sender, sendResponse) {
            console.log("The pop upi is set using the page action set")
        });

    }
});

function encodeToPassToContentScript(obj){
    console.log('encodeToPassToContentScript');
    console.log(obj);
    console.log('after stringify');
    console.log(JSON.stringify(obj));
    //Encodes into JSON and quotes \ characters so they will not break
    //  when re-interpreted as a string literal. Failing to do so could
    //  result in the injection of arbitrary code and/or JSON.parse() failing.
    return JSON.stringify(obj).replace(/\\/g,'\\\\').replace(/'/g,"\\'")
}


// This will listen to changes in the storage and we can get the value from there..
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (var key in changes) {
//         var storageChange = changes[key];
//         console.log(JSON.parse(storageChange.oldValue)); // You will get the value in json format
//         console.log('Storage key "%s" in namespace "%s" changed. ' +
//         'Old value was "%s", new value is "%s".',
//         key,
//         namespace,
//         storageChange.oldValue,
//         storageChange.newValue);
//     }
// });