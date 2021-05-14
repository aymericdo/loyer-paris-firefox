class FacebookWebsite extends WebsiteService {
  constructor() {
    super();
    this.currentDomain = WebsiteService.getDomain();
  }

  getId() {
    const url = window.location.toString();
    const match = url.match(/(?<=marketplace\/item\/)\d+/g);
    return match ? match[0] : null;
  }

  getData() {
    const body = document.querySelector("html [id^=mount_]");

    if (!body) return null;

    return JSON.stringify(body.outerHTML);
  }
}
