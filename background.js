browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "activateIcon") {
    browser.pageAction.show(sender.tab.id);
  } else if (request.message === "redirectSettings") {
    browser.tabs.create({ 'url': 'about:addons' });
  }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (tabs.length) {
        browser.tabs.sendMessage(tabs[0].id, { message: "urlHasChanged" });
      }
    });
  }
});
