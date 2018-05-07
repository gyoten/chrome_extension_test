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
    if(request.list.length > 0) {
        copy(request.list.join("\n"));
        notify(request.list);
    }
};

const notify = (list) => {
    chrome.notifications.create('', {
        'type': 'basic',
        'title': 'Asana Extension',
        'message': `Copied ${list.length} tasks!`,
        'iconUrl' : './for_asana.png'
    })
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

