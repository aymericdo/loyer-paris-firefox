const getIdFromLeboncoinUrl = () => {
    const url = window.location.toString()
    const match = url.match(/\d+(?=.htm)/g)
    return match ? match[0] : null
}

const leboncoinScraping = () => {
    const titles = [...document.querySelectorAll('[data-qa-id=adview_title] h1, [data-qa-id=adview_title] h3')]
    const prices = [...document.querySelectorAll('[data-qa-id=adview_price]')].map(node => node.firstChild)

    return [titles, prices]
}

const getDataFromLeboncoinDOM = () => {
    const subject = document.querySelector('[data-qa-id=adview_title] > h1')
    const body = document.querySelector('[data-qa-id=adview_description_container] > div > span')
    const price = document.querySelector('[data-qa-id=adview_price] > div > span')
    const surface = document.querySelector('[data-qa-id=criteria_item_square] > div > div:last-child')
    const rooms = document.querySelector('[data-qa-id=criteria_item_rooms] > div > div:last-child')
    const furnished = document.querySelector('[data-qa-id=criteria_item_furnished] > div > div:last-child')
    const cityLabel = document.querySelector('[data-qa-id=adview_location_informations] > span')
    const renter = document.querySelector('[data-qa-id=adview_contact_container] [data-qa-id=storebox_title], [data-qa-id=adview_contact_container] [data-reactid="391"]')

    if (!subject) {
        return null
    }

    return {
        id: getIdFromLeboncoinUrl(),
        body: body && body.textContent,
        cityLabel: cityLabel && cityLabel.textContent,
        furnished: furnished && furnished.textContent,
        price: price && price.textContent,
        renter: renter && renter.textContent,
        rooms: rooms && rooms.textContent,
        subject: subject && subject.textContent,
        surface: surface && surface.textContent,
    }
}