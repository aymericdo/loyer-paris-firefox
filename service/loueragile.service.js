const getIdFromLoueragileUrl = () => {
    const url = window.location.toString()
    // I need to replace the regex lookbehinds that chrome accept to something more dirty
    const match1 = url.split('ad=')
    const match2 = match1.length > 1 && match1[1].match(/\d+/g)
    return match2 ? match2[0] : null
}

const loueragileScraping = () => {
    const titles = [...document.querySelectorAll('.h2-like')]
    return [titles, []]
}
