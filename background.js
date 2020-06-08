let currentAd = null

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'activateIcon') {
        browser.pageAction.show(sender.tab.id)
        currentAd = request.ad
    } else if (request.message === 'deactivateIcon') {
        browser.pageAction.hide(sender.tab.id)
    } else if (request.message === 'openingPopup' && !!currentAd) {
        browser.runtime.sendMessage({ message: 'sendingAd', ad: { ...currentAd } })
    }
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (tabs.length) {
            browser.tabs.sendMessage(tabs[0].id, { message: 'urlHasChanged' })
        }
    })
})
