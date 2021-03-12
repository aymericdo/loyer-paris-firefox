class OrpiWebsite extends WebsiteService {
  getId() {
    const url = window.location.toString();
    const match = url.match(/(?<=annonce-location-appartement.*)b-.*(?=\/)/g);
    return match ? match[0] : null;
  }
}
