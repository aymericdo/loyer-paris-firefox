browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'activateIcon') {
        browser.pageAction.show(sender.tab.id)
    } else if (request.message === 'deactivateIcon') {
        browser.pageAction.hide(sender.tab.id)
    }
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { message: 'urlHasChanged' })
    })
})
