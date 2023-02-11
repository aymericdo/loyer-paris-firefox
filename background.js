try {
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "activateIcon") {
      browser.pageAction.show(sender.tab.id);
      load();
    } else if (request.message === "redirectSettings") {
      browser.tabs.create({ 'url': 'about:addons' });
    }
  });
} catch (err) {
  console.log(err);
}

function load() {
  try {
    browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') {
        browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          if (tabs.length) {
            browser.tabs.sendMessage(tabs[0].id, { message: "urlHasChanged" });
          }
        });
      }
    });
  } catch (err) {
    console.log(err)
  }
}