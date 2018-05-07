/**
 * Task Domain Class
 */
class Task {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }

    toMarkdown() {
        return `- [ ] [${this.title}](${this.url})`;
    }

    // Serializer
    static fromDOM(element) {
        const textarea = element.querySelector("textarea");
        if (!textarea) {
            return;
        }
        const { id, value } = textarea;
        const url = Task.parseUrl(id);
        if (!value || !url) {
            return;
        }
        return new Task(value, url);
    }

    // Parser
    static parseUrl(id) {
        try {
            const seperated = id.split("_");
            const taskId = seperated.pop();
            const pageId = seperated.shift().replace(/[^0-9]/g, "");
            return `https://app.asana.com/0/${pageId}/${taskId}`;
        } catch (_error) {
        }
    }

}

/**
 * fetch Task instances and
 * send markdown list to background
 */
const fetchTasks = () => {
    const tasks = Array.from(document.querySelectorAll(".TaskRow--highlighted, .TaskRow--focused")).map(dom => {
        return Task.fromDOM(dom);
    });
    chrome.runtime.sendMessage({list: tasks.map(task => task.toMarkdown())});
};

/**
 * start content script
 */
const start = () => {
    chrome.runtime.onMessage.addListener(fetchTasks);
};

// Here We Go!
start();