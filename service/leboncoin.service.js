const getIdFromLeboncoinUrl = () => {
    const url = window.location.toString()
    // I need to replace the regex lookbehinds that chrome accept to something more dirty
    const match1 = url.split('locations/')
    const match1bis = url.split('vi/')
    const match2 = match1.length > 1 && match1[1].split('.htm/') || match1bis.length > 1 && match1bis[1].split('.htm/')
    return match2 ? match2[0] : null
}

const leboncoinFireKeywords = () => ['trackable']

const leboncoinScraping = () => {
    const titles = [...document.querySelectorAll('[data-qa-id=adview_title]')]
    const prices = [...document.querySelectorAll('[data-qa-id=adview_price]')].map(node => node.firstChild)

    return [titles, prices]
}

const getDataFromLeboncoinDOM = () => {
    const subject = document.querySelector('[data-qa-id=adview_title] > p')
    const body = document.querySelector('[data-qa-id=adview_description_container] > div > span')
    const price = document.querySelector('[data-qa-id=adview_price] > div > div > span')
    const hasCharges = document.querySelector('#grid > div.CNb8s > div._2l6Au > div._1exwr > div:nth-child(2) > div > div > div > div > div._2KqHw')
    const renter = document.querySelector('#aside > div > div.RMz-l._2AAuw > div > div > div:nth-child(1) > div._1esQz > a > div._29p90 > div.TVCmz > div')
    const isPro = document.querySelector('[data-qa-id=adview_contact_container] [data-qa-id=storebox_siret], [data-qa-id=adview_contact_container] > div:first-child > div:last-child > div:last-child')
    
    const sections = document.querySelectorAll('#grid > div.CNb8s > div._3JOrc._3k87M.FUcqi._1_1QY._1qvhT')
    
    let surface = null
    let rooms = null
    let furnished = null
    let cityLabel = null
    sections.forEach((s, index) => {
        const current = s.querySelector('h2')
        if (!current) return
        if (current.textContent === "Critères") {
            surface = document.querySelector('div > div > div:nth-child(3) > div:nth-child(2) > p._3eNLO._137P-.P4PEa._35DXM')
            rooms = document.querySelector('div > div > div:nth-child(4) > div:nth-child(2) > p._3eNLO._137P-.P4PEa._35DXM')
            furnished = document.querySelector('div > div > div:nth-child(2) > div:nth-child(2) > p._3eNLO._137P-.P4PEa._35DXM')
        }

        if (index === sections.length - 1) {
            cityLabel = current.textContent;
        }
    })
    

    if (!subject && !body && !price && !cityLabel) {
        return null
    }

    return {
        id: getIdFromLeboncoinUrl(),
        body: body && body.innerHTML,
        hasCharges: hasCharges && hasCharges.textContent,
        cityLabel: cityLabel && cityLabel.textContent,
        furnished: furnished && furnished.textContent,
        price: price && price.textContent,
        renter: (renter && isPro && (!!isPro.textContent.toLowerCase().includes('siren') || !!isPro.textContent.toLowerCase().includes('siret'))) ? renter.textContent : null,
        rooms: rooms && rooms.textContent,
        subject: subject && subject.textContent,
        surface: surface && surface.textContent,
    }
}
