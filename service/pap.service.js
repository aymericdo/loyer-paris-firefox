const getIdFromPapUrl = () => {
    const url = window.location.toString()
    // I need to replace the regex lookbehinds that chrome accept to something more dirty
    const match1 = url.split('-')
    const match2 = match1 && match1[match1.length - 1][0] === 'r' && match1[match1.length - 1].match(/\d+/g)
    return match2 ? `r${match2[0]}` : null
}

const papScraping = () => {
    const titles = [...document.querySelectorAll('h1.item-title')]
    const prices = [...document.querySelectorAll('h1.item-title > span.item-price')]

    return [titles, prices]
}

const getDataFromPapDOM = () => {
    const title = document.querySelector('h1.item-title')
    const description = document.querySelector('.item-description > div > p')
    const price = document.querySelector('h1.item-title > span.item-price')
    const cityLabel = document.querySelector('div.item-description > h2')
    const itemTags = [...document.querySelectorAll('.item-tags > li > strong')]
    const stations = [...document.querySelectorAll('ul.item-transports > li > span.label')]

    let surface = null
    let rooms = null

    itemTags.forEach(tag => {
        if (tag.textContent.match(/m²/g)) {
            surface = tag
        } else if (tag.textContent.match(/pièce/g)) {
            rooms = tag
        }
    })

    if (!title) {
        return null
    }

    return {
        id: getIdFromPapUrl(),
        cityLabel: cityLabel && cityLabel.textContent,
        description: description && description.textContent,
        price: price && price.textContent,
        rooms: rooms && rooms.textContent,
        stations: stations && stations.map(station => station.textContent),
        surface: surface && surface.textContent,
        title: title && title.textContent,
    }
}
