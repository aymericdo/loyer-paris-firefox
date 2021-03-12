class FnaimWebsite extends WebsiteService {
  constructor() {
    super();
    this.fireKeyword = '[itemprop=name]';
    this.currentDomain = WebsiteService.getDomain();
  }

  getId() {
    const url = window.location.toString();
    const match = url.match(/(?<=annonce-immobiliere\/)\d+(?=\/(.)+.htm)/g)
    return match ? match[0] : null;
  }
}
