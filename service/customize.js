const TOKEN = {
  address: ["Adresse"],
  charges: ["Charges", "€"],
  hasCharges: ["Charges comprises"],
  hasFurniture: ["Est meublé"],
  price: ["Prix", "€"],
  roomCount: ["Nombre de pièces"],
  surface: ["Surface", "m²"],
  yearBuilt: ["Année de construction"],
  dateRange: ["Année de construction"],
  isHouse: ["Type"],
  neighborhood: ["Quartier"],
  max: ["Prix maximum au mètre carré", "€"],
  min: ["Prix minimum au mètre carré", "€"],
  maxAuthorized: ["Prix maximum estimé (hors charges)", "€"],
  promoPercentage: ["Écart avec le prix de l'annonce", "%"],
  isLegal: ["Est conforme"],
  true: "Oui",
  false: "Non",
};
class CustomizeService {
  constructor() {
    this.cptDescriptionHelper = 0;
    this.adFlag = null;
    this.adFlagListener = null;
    this.firstDescriptionHelper = null;
  }

  decorate(currentAd) {
    this.customizeAd(currentAd);

    this.firstDescriptionHelper = this.addDescriptionHelper(
      "Cliquez sur le badge pour plus d'informations ⤴",
      currentAd.isLegal
    );
  }

  resetCustomization() {
    if (this.adFlag) {
      this.cptDescriptionHelper -= 1;
      this.adFlag.remove();
    }

    if (this.firstDescriptionHelper) {
      this.cptDescriptionHelper -= 1;
      this.firstDescriptionHelper.remove();
    }

    this.adFlagListener && this.adFlagListener();
  }

  customizeAd(currentAd) {
    this.resetCustomization();
    this.cptDescriptionHelper += 1;

    // Badge
    this.adFlag = document.createElement("div");
    this.adFlag.classList.add("-flag");
    if (!currentAd.isLegal) {
      this.adFlag.textContent = "Non conforme";
      this.adFlag.classList.add("-illegal");
    } else {
      this.adFlag.textContent = "Conforme";
    }

    if (!currentAd.isLegal) {
      // price flag
      const adFlagPrice = document.createElement("span");
      adFlagPrice.classList.add("-flag-price");
      adFlagPrice.textContent = `Prix max estimé ${currentAd.computedInfo.maxAuthorized.value}€`;
      this.adFlag.appendChild(adFlagPrice);
    }

    document.body.appendChild(this.adFlag);
    this.moveDescriptionBanner();
    this.adFlagListener = dragElement(this.adFlag);

    const faviconIconUrl = browser.runtime.getURL("images/favicon-128x128.png");
    document.documentElement.style.setProperty(
      "--faviconIconUrl",
      `url(${faviconIconUrl})`
    );
    const strokeInfoIconUrl = browser.runtime.getURL("images/stroke-info.svg");
    document.documentElement.style.setProperty(
      "--strokeInfoIconUrl",
      `url(${strokeInfoIconUrl})`
    );
    const instagramIconUrl = browser.runtime.getURL(
      "images/instagram-logo.png"
    );
    document.documentElement.style.setProperty(
      "--instagramIconUrl",
      `url(${instagramIconUrl})`
    );
    const facebookIconUrl = browser.runtime.getURL("images/facebook-logo.png");
    document.documentElement.style.setProperty(
      "--facebookIconUrl",
      `url(${facebookIconUrl})`
    );
    const twitterIconUrl = browser.runtime.getURL("images/twitter-logo.png");
    document.documentElement.style.setProperty(
      "--twitterIconUrl",
      `url(${twitterIconUrl})`
    );

    // Build description (new popup)
    const adDescription = document.createElement("div");
    adDescription.style.display = "none";

    const h1 = document.createElement("h1");
    h1.textContent = "Encadrement";
    h1.classList.add("title");
    const h2First = document.createElement("h2");
    h2First.classList.add("subtitle");
    h2First.textContent = "Informations présentes dans l'annonce";
    const detectedInfo = document.createElement("ul");
    const h2Second = document.createElement("h2");
    h2Second.textContent = "Calcul du montant estimé du loyer";
    h2Second.classList.add("subtitle");
    const computedInfo = document.createElement("ul");
    const pInfo = document.createElement("p");
    pInfo.classList.add("-info");
    const bInfo = document.createElement("b");
    bInfo.textContent = "Informations";
    pInfo.appendChild(bInfo);
    pInfo.innerHTML += `Plus d\'info dans la popup de config de l\'extension ou sur notre site : <a href="https://encadrement-loyers.fr/" target="_blank">https://encadrement-loyers.fr/</a></br>`;
    const socialNetInfo = document.createElement("div");
    socialNetInfo.classList.add("social-networks");
    socialNetInfo.innerHTML += `<a href="https://www.instagram.com/encadrementloyers/" target="_blank"><i class="instagram-logo"></i></a>`;
    socialNetInfo.innerHTML += `<a href="https://twitter.com/_encadrement" target="_blank"><i class="twitter-logo"></i></a>`;
    socialNetInfo.innerHTML += `<a href="https://www.facebook.com/encadrementloyers" target="_blank"><i class="facebook-logo"></i></a>`;
    pInfo.appendChild(socialNetInfo);

    this.createList(detectedInfo, currentAd.detectedInfo);
    this.createList(computedInfo, {
      ...currentAd.computedInfo,
      isLegal: {
        order: Object.keys(currentAd.computedInfo).length,
        value: currentAd.isLegal,
      },
    });

    const adDescriptionSectionInset = document.createElement("div");
    adDescriptionSectionInset.classList.add("inset");
    adDescriptionSectionInset.appendChild(h1);
    adDescriptionSectionInset.appendChild(h2First);
    adDescriptionSectionInset.appendChild(detectedInfo);
    adDescriptionSectionInset.appendChild(h2Second);
    adDescriptionSectionInset.appendChild(computedInfo);
    adDescriptionSectionInset.appendChild(pInfo);

    const adDescriptionSection = document.createElement("section");
    adDescriptionSection.appendChild(adDescriptionSectionInset);
    adDescription.appendChild(adDescriptionSection);

    adDescription.classList.add("-flag-description");
    this.adFlag.appendChild(adDescription);

    // Toggle description opening
    let x = 0;
    let y = 0;
    this.adFlag.addEventListener("mousedown", (event) => {
      x = event.clientX;
      y = event.clientY;
    });

    this.adFlag.addEventListener("mouseup", (event) => {
      const stillStatic = x === event.clientX && y === event.clientY;
      if (stillStatic) {
        if (adDescription.classList.contains("-open")) {
          adDescription.classList.remove("-open");
          this.adFlag.classList.remove("-clicked");
          setTimeout(() => {
            adDescription.style.display = "none";
          }, 200);
        } else {
          adDescription.style.display = "block";
          adDescription.classList.add("-open");
          this.adFlag.classList.add("-clicked");
        }
      }
    });
  }

  createList(ulElement, data) {
    Object.keys(data)
      .sort((a, b) => data[a].order - data[b].order)
      .forEach((infoKey) => {
        if (
          data[infoKey] &&
          (data[infoKey].value || data[infoKey].value === false)
        ) {
          const li = document.createElement("li");
          const spanKey = document.createElement("span");
          const spanValue = document.createElement("span");
          const value =
            typeof data[infoKey].value === "boolean"
              ? TOKEN[data[infoKey].value]
              : data[infoKey].value;
          spanKey.textContent = TOKEN[infoKey][0];
          spanKey.classList.add("key");
          spanValue.textContent =
            TOKEN[infoKey][0] === "Adresse"
              ? `${value.charAt(0).toUpperCase() + value.slice(1)}`
              : `${value}${TOKEN[infoKey][1] ? TOKEN[infoKey][1] : ""}`;
          spanValue.classList.add("value");
          li.appendChild(spanKey);
          li.appendChild(spanValue);
          ulElement.appendChild(li);
        }
      });
  }

  addDescriptionHelper(text, isLegal, timer = 8000) {
    const adDescriptionHelper = document.createElement("div");
    adDescriptionHelper.classList.add("-description-helper");
    adDescriptionHelper.classList.add("-begin");
    adDescriptionHelper.classList.add(isLegal ? "-legal" : "-illegal");
    adDescriptionHelper.textContent = text;
    document.body.appendChild(adDescriptionHelper);

    setTimeout(() => {
      adDescriptionHelper.classList.remove("-begin");
      adDescriptionHelper.classList.add("-middle");

      const link = adDescriptionHelper.querySelector("a.update-link");
      if (link) {
        link.addEventListener("click", () => {
          browser.runtime.sendMessage({ message: "redirectSettings" });
        });
      }

      this.moveDescriptionBanner();

      this.cptDescriptionHelper += 1;
    });

    setTimeout(() => {
      adDescriptionHelper.classList.remove("-middle");
      adDescriptionHelper.classList.add("-hide");
      this.cptDescriptionHelper -= 1;
      setTimeout(() => {
        this.moveDescriptionBanner(false);
      });
    }, timer);

    return adDescriptionHelper;
  }

  addUpdateBanner() {
    const adDescriptionHelper = document.createElement("div");
    adDescriptionHelper.classList.add("-description-helper");
    adDescriptionHelper.classList.add("-begin");
    adDescriptionHelper.classList.add("-illegal");

    // const updateLink = document.createElement("a");
    // updateLink.classList.add("update-link");
    // updateLink.textContent = "Cliquez ici";
    // updateLink.addEventListener('click', () => {
    //   browser.runtime.sendMessage({ message: "redirectSettings" });
    // });

    const adDescriptionHelperPart1 = document.createElement("span");
    adDescriptionHelperPart1.textContent = `L'extension Encadrement n'est plus à jour. Entrez l'url "about:config" pour avoir la dernière version.`;

    adDescriptionHelper.appendChild(adDescriptionHelperPart1);
    // adDescriptionHelper.appendChild(updateLink);

    document.body.appendChild(adDescriptionHelper);

    setTimeout(() => {
      adDescriptionHelper.classList.remove("-begin");
      adDescriptionHelper.classList.add("-middle");

      this.moveDescriptionBanner();

      this.cptDescriptionHelper += 1;
    });

    setTimeout(() => {
      adDescriptionHelper.classList.remove("-middle");
      adDescriptionHelper.classList.add("-hide");
      this.cptDescriptionHelper -= 1;
      setTimeout(() => {
        this.moveDescriptionBanner(false);
      });
    }, 20000);

    return adDescriptionHelper;
  }

  moveDescriptionBanner(up = true) {
    const adDescriptionHelperList = [
      ...document.querySelectorAll("div.-description-helper.-middle"),
    ];
    adDescriptionHelperList.forEach((adDescriptionHelper, i) => {
      adDescriptionHelper.style.top = `${
        56 *
          (up
            ? this.cptDescriptionHelper - i
            : this.cptDescriptionHelper - i - 1) +
        20 * 2
      }px`;
    });
  }

  addErrorBanner(error) {
    switch (error.error) {
      case "city": {
        this.addDescriptionHelper(
          "La ville de cette annonce n'a pas encore mis en place l'encadrement des loyers.",
          false
        );
        break;
      }
      case "address": {
        this.addDescriptionHelper(
          "Nous n'avons pas trouvé d'adresse pour cette annonce.",
          false
        );
        break;
      }
      case "minimal": {
        this.addDescriptionHelper(
          "Nous n'avons pas trouvé les informations nécessaires pour cette annonce.",
          false
        );
        break;
      }
      case "price": {
        this.addDescriptionHelper(
          "Le prix de l'annonce semble être incohérent.",
          false
        );
        break;
      }
      case "partner": {
        this.addDescriptionHelper(
          "Nous avons rencontré un problème de communication interne.",
          false
        );
        break;
      }
      case "filter": {
        this.addDescriptionHelper(
          "Nous avons pas trouvé de correspondance.",
          false
        );
        break;
      }
      case "outdated": {
        this.addUpdateBanner();
        break;
      }
      case "other": {
        break;
      }
      default: {
        this.addDescriptionHelper(
          error.msg ||
            "Erreur : nous allons résoudre ce problème pour cette annonce sous peu",
          false
        );
        break;
      }
    }
  }
}
