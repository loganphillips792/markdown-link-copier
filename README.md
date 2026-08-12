# markdown-link-copier

Quickly copy and format a link to paste into a Markdown file.

Format: `[Title of Webpage](Link of Webpage)`

# Usage

1. Go to `chrome://extensions`
2. `Load Unpacked`
3. `Select folder`

Then either:

- Right-click a page or link and choose **Copy Link as Markdown**
- Press the keyboard shortcut to copy the current tab

# Keyboard shortcut

|Platform|Shortcut|
|-|-|
|macOS|`Option+Shift+M` (`⌥⇧M`)|
|Windows / Linux|`Alt+Shift+M`|

Chrome maps `Alt` to `Option` on macOS, so both platforms share the one
`Alt+Shift+M` binding in `manifest.json`.

To change it, go to `chrome://extensions/shortcuts`.

Note: the shortcut always copies the **current page**. Copying a specific link
requires the right-click menu, since a keyboard shortcut has no way to know
which link you mean.