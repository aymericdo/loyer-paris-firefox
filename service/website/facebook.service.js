class FacebookWebsite extends WebsiteService {
  constructor() {
    super();
    // this.fireKeyword = "div[data-pagelet=root]";
    this.currentDomain = WebsiteService.getDomain();
  }

  getId() {
    const url = window.location.toString();
    const match = url.match(/(?<=marketplace\/item\/)\d+/g);
    return match ? match[0] : null;
  }

  getData() {
    const body = document.querySelector("html div[data-pagelet=root]");

    if (!body) return null;

    return {
      data: JSON.stringify(body.outerHTML),
    };
  }
}
