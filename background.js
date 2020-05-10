// When the extension is installed or upgraded ...
// chrome.runtime.onInstalled.addListener(function() {
//   // Replace all rules ...
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // With a new rule ...
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         // That fires when a page's URL contains a 'g' ...
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { urlContains: 'streak' },
//           })
//         ],
//         // And shows the extension's page action.
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//       }
//     ]);
//   });
// });

// chrome.webNavigation.onCompleted.addListener(function(details) {
//     if (changeInfo.status == "complete" && tab.active) {
//         MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
//         let test = document.evaluate('//*[@id="root"]/div[1]/header/div/div[4]/div/div/div[2]/div',
//                     document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//     let alertContentSnapshot = null;

//     if (test) {
//         if (test.snapshotItem(0)) {
//             alertContentSnapshot = test.snapshotItem(0).lastChild;
//         }
//     }

//     // const alertContentSnapshot = document;
//     const config = { attributes: true, childList: true, subtree: true };

//     const callback = function(mutationsList, observer) {
//         for (let mutation of mutationsList) {
//             if (mutation.type === "childList") {
//                 console.log("A child node has been added or removed.");
//             } else if (mutation.type === "attributes") {
//                 console.log("The " + mutation.attributeName + " attribute was modified.");
//             }
//             let attributeName1 = mutation.attributeName;
//             console.log("Attribute name " +mutation.attributeName +" changed to " +mutation.target[attributeName1] +" (was " +mutation.oldValue +")");
//         }
//     };

//     const observer = new MutationObserver(callback);
//     if (alertContentSnapshot) {
//         observer.observe(alertContentSnapshot, config);
//     }
// }
// });


// If you don't want to use storage then you can pass the message from content script and use it here
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(typeof message === 'object' && message.scrips !== undefined) {
        // chrome.pageAction.show(sender.tab.id);
        console.log("I got your message and the message is");
        console.log(JSON.parse(message.scrips));
        console.log("The info present in the tabs key of sender object is: ", sender);
    }
});


// This will listen to changes in the storage and we ca get the value from there..
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