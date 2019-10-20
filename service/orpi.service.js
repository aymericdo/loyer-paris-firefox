const getIdFromOrpiUrl = () => {
    const url = window.location.toString()
    // I need to replace the regex lookbehinds that chrome accept to something more dirty
    const match1 = url.split('annonce-location-appartement')
    const match2 = match1 && match1[1].split('/')
    const match3 = match2 && match2[0].split('-')
    return match3 ? match3.slice(-2).join('-') : null
}

const orpiScraping = () => {
    const titles = [...document.querySelectorAll('h1 > span.u-text-xl')]
    const prices = [...document.querySelectorAll('span.u-h1')]

    return [titles, prices]
}

const getDataFromOrpiDOM = () => {
    const dataDOM = document.querySelector('[data-component=estate-bookmark]')
    const data = JSON.parse(dataDOM.dataset.eulerianAction)
    const description = document.querySelector('div.o-container > p')

    return {
        id: data.prdref,
        cityLabel: data.nomVille,
        coord: {
            lng: data.longitude,
            lat: data.latitude,
        },
        description: description && description.textContent,
        furnished: !!data.meuble,
        postalCode: data.codePostal,
        price: data.prdamount,
        renter: data.agenceNom,
        rooms: data.nbPieces,
        surface: data.surfaceBien,
        title: data.prdname.replace(/-/g, ' '),
        yearBuilt: data.anneeConstruction,
    }
}
