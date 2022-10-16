export function getCountryMarkUp(country) {
    const {
      name: { official, nativeName },
      capital,
      population,
      languages,
      flags: { svg },
    } = country;
  
    return `
    <div>
    <div><img src="${svg}" width='30'> ${official}</div>
      <div>languages:${Object.values(languages).join(', ')}</div>
      <div>Capital: ${capital.join(', ')}</div>
      <div>Population:${population}</div>
      <div>nativeName: ${Object.values(nativeName)
        .map(it => it.common)
        .join(', ')}  </div>
    </div>
    `;
  }