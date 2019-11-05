document.addEventListener("DOMContentLoaded", () => {
    const detectedInfo = document.getElementById('detected-info')
    const computedInfo = document.getElementById('computed-info')

    const token = {
        address: ['Adresse'],
        hasFurniture: ['Est meublé'],
        price: ['Prix', '€'],
        roomCount: ['Nombre de pièces'],
        surface: ['Surface', 'm²'],
        yearBuilt: ['Année de construction'],
        dateRange: ['Année de construction'],
        neighborhood: ['Quartier'],
        max: ['Prix maximum au mètre carré', '€'],
        min: ['Prix minimum au mètre carré', '€'],
        maxAuthorized: ['Prix maximum autorisé', '€'],
        promoPercentage: ['Promo', '%'],
        isLegal: ['Est legal'],
        true: 'Oui',
        false: 'Non',
    }

    const createList = (ulElement, data) => {
        Object.keys(data).sort((a, b) => data[a].order - data[b].order)
            .forEach(infoKey => {
                if (data[infoKey].value) {
                    const li = document.createElement('li')
                    const spanKey = document.createElement('span')
                    const spanValue = document.createElement('span')
                    const value = typeof data[infoKey].value === 'boolean' ? token[data[infoKey].value] : data[infoKey].value
                    spanKey.textContent = token[infoKey][0]
                    spanKey.classList.add('key')
                    spanValue.textContent = `${value}${token[infoKey][1] ? token[infoKey][1] : ''}`
                    spanValue.classList.add('value')
                    li.appendChild(spanKey)
                    li.appendChild(spanValue)
                    ulElement.appendChild(li)
                }
            })
    }

    browser.storage.sync.get('ad', (data) => {
        createList(detectedInfo, data.ad.detectedInfo)
        createList(computedInfo, {
            ...data.ad.computedInfo,
            isLegal: data.ad.isLegal,
        })
    })
})