const scriptName = "background.js: ";

// let serverSocket = new WebSocket("ws://127.0.0.1:9003");
// serverSocket.onerror = function (event) {
//     console.error("WebSocket error observed:", event);
// };

// serverSocket.onmessage = function (event) {
//     console.log(scriptName, "serverSocket on message received");
//     chrome.tabs.query({ active: true, currentWindow: true },
//         function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, { "sender": "background", "action": "receiveMessage", "msgStr": event.data }, function (response) { });
//         });
// };

chrome.runtime.onInstalled.addListener(() => {
    // Server-client communication code here
    chrome.runtime.onMessage.addListener(function (msgStr, sender, sendResponse) {
        // console.log(scriptName, "Received message from content.js");
        // serverSocket.send(msgStr);
        // sendResponse("Message: " + msgStr + " sent to server.");
    });
});

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        chrome.tabs.query({ active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { "sender": "background", "action": "receiveMessage", "clickableIds": request.clickableIds }, function (response) { });
            });
        console.log(request.clickableIds);
    });