export function getCountryListMarkUp(countryList) {
    return countryList.map(it => getListItemMarkUp(it)).join('');
  }
  
  function getListItemMarkUp(item) {
    const {
      name: { official },
      flags: { svg },
    } = item;
  
    return `
    <li><img src="${svg}" width='30'> ${official}</li>
    `;
  }