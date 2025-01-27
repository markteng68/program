{
    "manifest_version": 3,
    "name": "Amazon Order Info Scraper",
    "version": "1.0",
    "permissions": [
      "storage",
      "activeTab",
      "scripting"
    ],
    "host_permissions": [
      "https://www.amazon.com/*"
    ],
    "background": {
      "service_worker": "background.js"
    },
    "action": {
      "default_popup": "popup.html",
      "default_icon": "icon.png"
    },
    "content_scripts": [
      {
        "matches": ["https://www.amazon.com/*"],
        "js": ["content.js"]
      }
    ]
  }
  