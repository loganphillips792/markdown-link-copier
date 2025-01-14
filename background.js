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

