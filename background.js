/**
 * copy text
 * @param text {string}
 */
const copy = text => {
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = text;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
};

/**
 * ping to content script
 * @param tab
 */
const ping = tab => {
    chrome.tabs.sendMessage(tab.id, {});
};

/**
 * pong from content script
 * @param request
 */
const pong = (request) => {
    copy(request.list.join("\n"));
};

/**
 * start background script
 */
const start = () => {
    chrome.browserAction.onClicked.addListener(ping);
    chrome.runtime.onMessage.addListener(pong);
};

// Here We Go!
start();

