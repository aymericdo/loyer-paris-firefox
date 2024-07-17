const customizeService = new CustomizeService()
const fetcherService = new FetcherService(customizeService);

const watch = () => {
  customizeService.resetCustomization()

  const websiteService = WebsiteService.getCurrentWebsite();
  fetcherService.setWebsiteService(websiteService)

  if (websiteService.isValidPage()) {
    waitForElm(websiteService.fireKeyword).then(async () => {
      await fetcherService.fetchData()
    });
  }
}

watch()

// best workaround until firefox support window.navigation.addEventListener("navigate", callback)
// https://developer.mozilla.org/en-US/docs/Web/API/Window/navigation
const elements = document.getElementsByTagName('a');
for (let i = 0, len = elements.length; i < len; i++) {
  elements[i].onclick = function () {
    setTimeout(() => {
      watch()
    }, 1000)
  }
}