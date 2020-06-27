var prevTrigScrips = [];
// When the extension is installed or upgraded ...
// chrome.runtime.onInstalled.addListener(function() {
//   // Replace all rules ...
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // With a new rule ...
//         chrome.declarativeContent.onPageChanged.addRules([
//         {
//             // That fires when a page's URL contains a 'g' ...
//             conditions: [
//                 new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: { urlContains: 'streak' },
//                 })
//             ],
//             // And shows the extension's page action.
//             actions: [ new chrome.declarativeContent.ShowPageAction() ]
//         }
//         ]);
//     });
// });
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
//     console.log("tabinfo object");
//     console.log(tabInfo);
    
//     chrome.browserAction.setPopup({tabId, popup: "popup.html"}, function(message, sender, sendResponse) {
//         console.log("The pop upi is set using the page action set")
//     });
// });

// If you don't want to use storage then you can pass the message from content script and use it here
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(typeof message === 'object' && message.scrips !== undefined) {
        // chrome.pageAction.show(sender.tab.id);
        console.log("I got your message and the message is");
        message.scrips.forEach(element => {
            console.log(JSON.parse(element));
            if(!prevTrigScrips.includes(element.scripName)){
                prevTrigScrips.push(element.scripName);
            }
        });
        console.log("The info present in the tabs key of sender object is: ", sender);
        chrome.browserAction.setPopup({tabId: sender.tab.id, popup: "popup.html"}, function(message, sender, sendResponse) {
            console.log("The pop upi is set using the page action set")
        });

    }
});


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