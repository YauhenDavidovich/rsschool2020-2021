import chartView from '../views/chartView';
import {allStatisticsTable} from '../views/allStatisticsTable';

let selectedCountryISO2 = 'all';

function highlightCountry(country) {
	document.querySelectorAll('.global__country .country__row').forEach((countryRow) => {
		if(countryRow.getAttribute('value') === country){
			countryRow.classList.add("country__highlight");
			countryRow.scrollIntoView();}
		else
		countryRow.classList.remove("country__highlight");
	})
}

export function countrySelectionHandler(countryISO2) {
	selectedCountryISO2 = selectedCountryISO2 !== countryISO2 ? countryISO2 : 'all'
	chartView.changeCountry(selectedCountryISO2);
	highlightCountry(selectedCountryISO2);
	allStatisticsTable.selectCountryStatChoose(selectedCountryISO2);
}

export default countrySelectionHandler