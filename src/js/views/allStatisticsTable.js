import apiCommunicator from "../logic/apiCommunicator";
import { sortTableByColumn } from "../logic/sorting";
import formatInt from "../logic/format";
import Slider from "./slider";
import addDisplayOnFullScreen from "../logic/addDisplayOnFullScreen";
import countrySelectionHandler from "../logic/countrySelectionHandler";

export const allStatisticsTable = {
  properties: {
    data: null,
    worldCases: 0,
    worldDeaths: 0,
    worldRecovered: 0,
    tabsTableData: [
      {
        tabName: "Cumulative",
        rows: [
          {
            name: "Cases",
            value: (x) => x.cases,
          },
          {
            name: "Deaths",
            value: (x) => x.deaths,
          },
          {
            name: "Recovered",
            value: (x) => x.recovered,
          },
        ],
      },
      {
        tabName: "Daily Data",
        rows: [
          {
            name: "Cases",
            value: (x) => x.todayCases,
          },
          {
            name: "Deaths",
            value: (x) => x.todayDeaths,
          },
          {
            name: "Recovered",
            value: (x) => x.todayRecovered,
          },
        ],
      },
      {
        tabName: "Cumulative per 100 th",
        rows: [
          {
            name: "Cases",
            value: (x) => x.casesPerOneMillion / 10,
          },
          {
            name: "Deaths",
            value: (x) => x.deathsPerOneMillion / 10,
          },
          {
            name: "Recovered",
            value: (x) => x.recoveredPerOneMillion / 10,
          },
        ],
      },
      {
        tabName: "Daily per 100 th",
        rows: [
          {
            name: "Cases",
            value: (x) => (x.todayCases / x.population) * 100000,
          },
          {
            name: "Deaths",
            value: (x) => (x.todayDeaths / x.population) * 100000,
          },
          {
            name: "Recovered",
            value: (x) => (x.todayRecovered / x.population) * 100000,
          },
        ],
      },
    ],
    tabIndex: 0,
    slider: null,
  },
  UIControls: {
    basicWorld: null,
    tbodyWorldTotal: null,
    tableCountryDetails: null,
    tableBodyCountryDetails: null,
    tableSwitcher: null,
    cases: null,
    deaths: null,
    recovered: null,
    tableContainer: null,
  },

  async init() {
    this.getElements();
    await this.getDataFromAPI();
    this.createTableWorldCases();
    this.fillDataTableWorldCases();
    this.addTabsSwitcher();
    this.drawTableAccordingSwitch();
    addDisplayOnFullScreen(".data__lives");
  },

  drawTable() {
    this.drawHeaderTable();
    this.drawBodyTable();
    this.addSorting();
    this.addCountrySelectionHandler();
  },

  addTabsSwitcher() {
    this.properties.slider = new Slider(this.UIControls.tableSwitcher);
    this.properties.slider.init();
    this.properties.slider.leftButton.addEventListener("click", () =>
      this.drawTableAccordingSwitch(-1)
    );
    this.properties.slider.rightButton.addEventListener("click", () =>
      this.drawTableAccordingSwitch(+1)
    );
  },

  drawTableAccordingSwitch(delta = 0) {
    this.properties.tabIndex += delta;

    if (this.properties.tabIndex === -1)
      this.properties.tabIndex = this.properties.tabsTableData.length - 1;
    else if (this.properties.tabIndex === this.properties.tabsTableData.length)
      this.properties.tabIndex = 0;

    this.drawTable();
    this.properties.slider.description.innerText = this.properties.tabsTableData[
      this.properties.tabIndex
    ].tabName;
  },

  async forceUpdateDataAndTime() {
    await this.getDataFromAPI();
    this.fillDataTableWorldCases();
    this.drawTable();
  },

  getElements() {
    this.UIControls.tableContainer = document.querySelector(".data__lives");
    this.UIControls.basicWorld = this.UIControls.tableContainer.querySelector(
      ".data__basic__world"
    );
    this.UIControls.tableCountryDetails = this.UIControls.tableContainer.querySelector(
      ".data__countries__info"
    );
    this.UIControls.tableSwitcher = this.UIControls.tableContainer.querySelector(
      ".slider__wrapper"
    );
  },

  async getDataFromAPI() {
    this.properties.data = await apiCommunicator.loadGeneralData();
  },

  createTableWorldCases() {
    const tableWorld = `<table class='table__world'>
            <thead>    
                <tr>
                    <th rowspan='2'>Global</th>
                    <th valueType='number'>Cases</th>
                    <th valueType='number'>Deaths</th>
                    <th valueType='number'>Recovered</th>
                </tr>
                <tbody>
                <tr>
                    <td >World</td>
                    <td class='total__cases'></td>
                    <td class='total__deaths'></td>
                    <td class='total__recovered'></td>
                </tr>
                </tbody>
            </table>`;
    this.UIControls.basicWorld.innerHTML = tableWorld;
  },

  fillDataTableWorldCases() {
    this.properties.worldCases = 0;
    for (let i = 0; i < this.properties.data.length; i++) {
      this.properties.worldCases += this.properties.data[i].cases;
    }
    this.UIControls.cases = document.querySelector(".total__cases");
    this.UIControls.cases.innerHTML = formatInt(this.properties.worldCases);

    this.properties.worldDeaths = 0;
    for (let j = 0; j < this.properties.data.length; j++) {
      this.properties.worldDeaths += this.properties.data[j].deaths;
    }

    this.UIControls.deaths = document.querySelector(".total__deaths");
    this.UIControls.deaths.innerHTML = formatInt(this.properties.worldDeaths);

    this.properties.worldRecovered = 0;
    for (let z = 0; z < this.properties.data.length; z++) {
      this.properties.worldRecovered += this.properties.data[z].recovered;
    }

    this.UIControls.recovered = document.querySelector(".total__recovered");
    this.UIControls.recovered.innerHTML = formatInt(
      this.properties.worldRecovered
    );
  },

  drawHeaderTable() {
    const childElements = [...this.UIControls.tableCountryDetails.children];
    childElements.forEach((element) => element.remove());

    let tableHeader = `<table class='table__twelve'>
            <thead>    
                <tr>
                <th>Country</th>`;

    for (
      let i = 0;
      i < this.properties.tabsTableData[this.properties.tabIndex].rows.length;
      i++
    ) {
      tableHeader += `<th valueType='number'>${
        this.properties.tabsTableData[this.properties.tabIndex].rows[i].name
      }</th>`;
    }

    tableHeader += `
                </tr>
                </thead>
            <tbody></tbody>
            </table>`;
    this.UIControls.tableCountryDetails.innerHTML = tableHeader;
    this.UIControls.tableBodyCountryDetails = document.querySelector(
      ".table__twelve tbody"
    );
  },

  drawBodyTable() {
    let body = "";
    for (let i = 0; i < this.properties.data.length; i++) {
      body += `<tr iso2='${this.properties.data[i].countryInfo.iso2}' class='allstat__country_row'> 
            <td><img src= '${this.properties.data[i].countryInfo.flag}'>${this.properties.data[i].country}</td>`;
      for (
        let y = 0;
        y < this.properties.tabsTableData[this.properties.tabIndex].rows.length;
        y++
      ) {
        body += `<td> ${formatInt(
          this.properties.tabsTableData[this.properties.tabIndex].rows[y].value(
            this.properties.data[i]
          )
        )}</td>`;
      }
      body += "</tr>";
    }
    this.UIControls.tableBodyCountryDetails.innerHTML = body;
  },

  addSorting() {
    const headerList = document.querySelectorAll(".table__twelve th");
    headerList.forEach((headerCell) => {
      headerCell.addEventListener("click", () => {
        const tableElement =
          headerCell.parentElement.parentElement.parentElement;
        const columnIndex = Array.prototype.indexOf.call(
          headerCell.parentElement.children,
          headerCell
        );
        const isAscending = headerCell.classList.contains("sort-asc");
        sortTableByColumn(
          tableElement,
          columnIndex,
          !isAscending,
          headerCell.getAttribute("valueType")
        );
      });
    });
    headerList[1].click();
    headerList[1].click();
  },

  selectCountryStatChoose(iso) {
    this.UIControls.tableBodyCountryDetails
      .querySelectorAll("tr")
      .forEach((countryRow) => {
        if (countryRow.getAttribute("iso2") === iso) {
          countryRow.classList.add("country__highlight");
          countryRow.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        } else {
          countryRow.classList.remove("country__highlight");
        }
      });
  },

  addCountrySelectionHandler() {
    const tmp = Array.from(this.UIControls.tableBodyCountryDetails.children);
    tmp.forEach((countryRow) => {
      countryRow.addEventListener(
        "click",
        () => {
          countrySelectionHandler(countryRow.getAttribute("iso2"));
        },
        true
      );
    });
  },
};

export default allStatisticsTable;
