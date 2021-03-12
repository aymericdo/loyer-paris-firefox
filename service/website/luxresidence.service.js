class LuxResidenceWebsite extends WebsiteService {
  constructor() {
    super();
    this.fireKeyword = '.city';
    this.currentDomain = WebsiteService.getDomain();
  }

  getId() {
    const url = window.location.toString();
    const match = url.match(/(?<=location\/appartement(.)+\/)[A-Z0-9\-]+/g);
    return match ? match[match.length - 1] : null;
  }
}
