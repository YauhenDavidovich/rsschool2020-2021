import { chartView } from "./js/views/chartView";
import { Map } from "./js/views/map";
import { initTable } from "./js/views/countryListTable.js";
import globalCases from "./js/views/global_cases.js";
import { allStatisticsTable } from "./js/views/allStatisticsTable";

const map = new Map("map");
map.init();
const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", (e) => {
    document.querySelectorAll('.tabs_btn').forEach(el => el === e.target ?
         el.classList.add('active') : (el.classList.remove('active')))
    map.refreshMapArea(e.target.dataset.type)
});

initTable();
globalCases();
allStatisticsTable.init();
chartView.init();


