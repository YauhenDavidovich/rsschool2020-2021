import  createElement from "../logic/basic";
import { apiCommunicator } from "../logic/apiCommunicator";
import {Slider} from './slider';
import addDisplayFullScreen from '../logic/addDisplayOnFullScreen';

const Chart = require("chart.js");

export const chartView = {
  properties: {
    dataFromAPI: null,
    legendArray: [
      { name: "Total Cases", value: "confirmed", color: "rgb(255, 165, 0)" },
      { name: "Total Deaths", value: "deaths", color: "rgb(255, 0, 0)" },
      { name: "Total Recovered", value: "recovered", color: "rgb(73, 178, 9)" },
      { name: "Active cases", value: "active", color: "rgb(255, 165, 0)" },
      { name: "New Deaths", value: "new_deaths", color: "rgb(255, 0, 0)" },
      {
        name: "New Recovered",
        value: "new_recovered",
        color: "rgb(73, 178, 9)",
      },
    ],
    index: 0,
    countryISO: "all",
    slider: null
  },

  UIControls: {
    slider: null,
    canvas: null,
    chart: null,
  },

  async init() {
    await this.getData();
    this.createMainUI();
    this.updateChartData();
    addDisplayFullScreen('.data__graph');
  },

  async getData() {
    this.properties.dataFromAPI =
      this.properties.countryISO === "all"
        ? await apiCommunicator.getDataForWorldByDays()
        : await apiCommunicator.getDataForCountryByDays(
            this.properties.countryISO
          );
  },

  async changeCountry(countryISO) {
    this.properties.countryISO = countryISO;
    await this.getData();
    this.updateChartData();
  },

  createMainUI() {
    const parentElement = document.querySelector(".data__graph");
    const chartWrapper = createElement("div", parentElement, "chart__wrapper");
    this.UIControls.canvas = createElement("canvas", chartWrapper);
    const sliderWrapper = createElement(
      "div",
      parentElement,
      "slider__wrapper"
    );
    this.properties.slider = new Slider(sliderWrapper, this.properties.legendArray[0].name);
    this.properties.slider.init();
    this.properties.slider.leftButton.addEventListener('click', () => {
        this.changeDisplayInfo(-1,this.properties.slider.description);
    })

    this.properties.slider.rightButton.addEventListener('click', () => {
        this.changeDisplayInfo(1,this.properties.slider.description);
    })
  },

  changeDisplayInfo(movement, element){
      if (this.properties.index + movement === -1)
        this.properties.index = this.properties.legendArray.length -1;
      else if (this.properties.index + movement === this.properties.legendArray.length)
        this.properties.index = 0;
      else this.properties.index += movement;
     // eslint-disable-next-line no-param-reassign
     element.innerText = this.properties.legendArray[this.properties.index].name;

     this.updateChartData();     
  },

  updateChartData() {
    if (this.UIControls.chart) this.UIControls.chart.destroy();

    const charType = "line";


    this.UIControls.chart = new Chart(this.UIControls.canvas.getContext("2d"), {
      type: charType,
      data: {
        labels: "",
        datasets: [
          {
            label: this.properties.legendArray[this.properties.index].name,
            fill: false,
            data: this.createDataSet(),
            backgroundColor: this.properties.legendArray[this.properties.index]
              .color,
            borderColor: this.properties.legendArray[this.properties.index]
              .color,
            borderWidth: 2,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: this.getTitle(),
        },

        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          text: this.properties.legendArray[this.properties.index].name,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMin: 0,
              },
              distribution: "linear",
            },
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                autoSkipPadding: 15,
                maxRotation: 0,
              },
              type: "time",
              time: {
                unit: "day",
              },
              distribution: "linear",
              source: "auto",
            },
          ],
        },
      },
    });
    this.UIControls.chart.update();
  },

  getTitle() {
    return this.properties.countryISO === "all"
      ? "Whole world"
      : this.properties.dataFromAPI.data.name;
  },

  createDataSet() {
    const dataSet = [];

    const timeline =
      this.properties.countryISO === "all"
        ? this.properties.dataFromAPI.data
        : this.properties.dataFromAPI.data.timeline;

    timeline.forEach((element) => {
      dataSet.push({
        t: new Date(element.updated_at),
        y: element[this.properties.legendArray[this.properties.index].value],
      });
    });

    return dataSet;
  },
};

export default chartView;
