class JinkaWebsite extends WebsiteService {
  constructor() {
    super();
    this.fireKeyword = "._alert_result > div";
    this.currentDomain = WebsiteService.getDomain();
  }

  getId() {
    const url = window.location.toString();
    const match = url.match(/(?<=ad=)\d+/g);
    return match ? match[0] : null;
  }
}
