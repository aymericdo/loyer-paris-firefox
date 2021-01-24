const getIdFromLoueragileUrl = () => {
    const url = window.location.toString()
    // I need to replace the regex lookbehinds that chrome accept to something more dirty
    const match1 = url.split('ad=')
    const match2 = match1.length > 1 && match1[1].match(/\d+/g)
    return match2 ? match2[0] : null
}

const loueragileScraping = () => {
    const titles = [...document.querySelectorAll("#root > div._alert_result.sc-bdVaJa.eyCtMk > div > div.sc-bdVaJa.dRoUBI > div.sc-bdVaJa.deoPit > div.sc-bdVaJa.blRsro > div > h2")]
    const prices = [document.querySelector("#root > div._alert_result.sc-bdVaJa.eyCtMk > div > div.sc-bdVaJa.dRoUBI > div.sc-bdVaJa.deoPit > div.sc-bdVaJa.blRsro > p"),
        document.querySelector("#root > div._alert_result.sc-bdVaJa.eyCtMk > div > div.sc-bdVaJa.dRoUBI > div.sc-bdVaJa.deoPit > div.sc-bdVaJa.blRsro > div > div > span")]
    return [titles, prices]
}

const loueragileFireKeywords = () => ['_alert_result']
