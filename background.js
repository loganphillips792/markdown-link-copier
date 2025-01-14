// This script runs in the background and handles copying the Markdown link when the extension is clicked

// When the extension is installed or updated, create the context menu.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copyLinkAsMarkdown",
        title: "Copy Link as Markdown",
        contexts: ["page", "link"]
    });
});

// Listen for clicks on the context menu item.
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyLinkAsMarkdown") {

        // Decide whether it's a link URL or the current tab's URL
        const url = info.linkUrl ? info.linkUrl : tab.url;
        const title = tab.title;

        // Construct the Markdown link
        const markdown = `[${title}](${url})`;

        // Use the Scripting API to copy to clipboard
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (text) => navigator.clipboard.writeText(text),
            args: [markdown]
        });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "copy_link_as_markdown") {
        // Get the active tab in the current window.
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;

            const tab = tabs[0];
            const markdown = `[${tab.title}](${tab.url})`;

            // Use the Scripting API to copy to clipboard
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (text) => navigator.clipboard.writeText(text),
                args: [markdown]
            });
        });
    }
});
