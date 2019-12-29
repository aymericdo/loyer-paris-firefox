const getIdFromLefigaroUrl = () => {
    const url = window.location.toString()
    // I need to replace the regex lookbehinds that chrome accept to something more dirty
    const match1 = url.split('annonces\/annonce-')
    const match2 = match1.length > 1 && match1[1].split('.html')
    return match2 ? match2[0] : null
}

const lefigaroScraping = () => {
    const titles = [...document.querySelectorAll('#contenu > .container-h1 > h1')]
    const prices = [...document.querySelectorAll('div.container-price span.price, .partners-with-price dd')]

    return [titles, prices]
}

const getDataFromLefigaroDOM = () => {
    const title = document.querySelector('#contenu > .container-h1 > h1')
    const description = document.querySelector('div.container-paragraph > p.description')
    const price = document.querySelector('div.container-price span.price')
    const charges = document.querySelector('div.container-price span.charges')
    const hasCharges = document.querySelector('div.container-price [title="Charges comprises"]')
    const cityLabel = document.querySelector('#contenu > .container-h1 > h1 > .informations-localisation')
    const renter = document.querySelector('div.container-agency-infos > span.agency-name')

    const features = [...document.querySelectorAll('div.container-features > ul.list-features > li')]

    const hasMonthlyPriceElement = document.querySelector('div.container-price > span.label')
    const hasMonthlyPrice = hasMonthlyPriceElement && hasMonthlyPriceElement.textContent === 'Prix mensuel'

    let furnished = null
    let surface = null
    let rooms = null

    features.forEach(feature => {
        if (feature.textContent.match(/m²/g)) {
            surface = feature
        } else if (feature.textContent.match(/pièce/g)) {
            rooms = feature
        } else if (feature.textContent.match(/Meublé/g)) {
            furnished = feature
        }
    })

    if (!title || !hasMonthlyPrice) {
        return null
    }

    return {
        id: getIdFromLefigaroUrl(),
        cityLabel: cityLabel && cityLabel.textContent,
        charges: charges && charges.textContent,
        hasCharges: hasCharges && !!hasCharges.textContent,
        description: description && description.textContent,
        furnished: furnished && furnished.textContent,
        price: price && price.textContent,
        renter: renter && renter.textContent,
        rooms: rooms && rooms.textContent,
        surface: surface && surface.textContent,
        title: title && title.textContent,
    }
}
