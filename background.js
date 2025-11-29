// This script runs in the background and handles copying the Markdown link when the extension is clicked

// When the extension is installed or updated, create the context menu.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copyLinkAsMarkdown",
        title: "Copy Link as Markdown",
        contexts: ["page", "link"]
    });
});

// Helper function to copy text to clipboard via the page context
async function copyToClipboard(tabId, text) {
    await chrome.scripting.executeScript({
        target: { tabId },
        func: (text) => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        },
        args: [text]
    });
}

// Listen for clicks on the context menu item.
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "copyLinkAsMarkdown") {
        const url = info.linkUrl ? info.linkUrl : tab.url;
        const title = tab.title;
        const markdown = `[${title}](${url})`;
        await copyToClipboard(tab.id, markdown);
    }
});

chrome.commands.onCommand.addListener(async (command) => {
    if (command === "copy_link_as_markdown") {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length === 0) return;

        const tab = tabs[0];
        const markdown = `[${tab.title}](${tab.url})`;
        await copyToClipboard(tab.id, markdown);
    }
});
