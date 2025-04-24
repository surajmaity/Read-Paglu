# Bionic Reading Chrome Extension

A Chrome extension that enhances reading speed and comprehension by bolding the first half of words, making it easier for your brain to process text.

## Features

- **Bionic Reading**: Automatically bolds the first half of words to improve reading speed and comprehension
- **Easy Toggle**: Simple on/off switch to enable/disable the feature
- **Persistent Settings**: Remembers your preference across browser sessions
- **Works on All Websites**: Compatible with any webpage
- **Dynamic Content Support**: Works with dynamically loaded content
- **Clean, Modern UI**: Dark theme with a sleek, user-friendly interface

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon should appear in your Chrome toolbar

## Usage

1. Click the extension icon in your Chrome toolbar
2. Toggle the switch to enable/disable Bionic Reading
3. The feature will be applied to the current webpage
4. Your preference will be saved and applied automatically to new pages

## How It Works

The extension uses a technique called "Bionic Reading" which:
- Bolds the first half of each word
- Makes it easier for your brain to process text
- Improves reading speed and comprehension
- Works with both static and dynamic content

## Technical Details

- Built with vanilla JavaScript
- Uses Chrome Extension Manifest V3
- Implements content script injection
- Handles dynamic content updates
- Persists user preferences using Chrome Storage API

## Development

### Project Structure
```
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

### Key Files
- `manifest.json`: Extension configuration
- `popup/popup.html`: Extension popup interface
- `popup/popup.js`: Core functionality
- `popup/styles.css`: UI styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the Bionic Reading technique
- Built with Chrome Extension APIs
- Uses modern web development practices
