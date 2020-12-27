import apiCommunicator from "../logic/apiCommunicator";
import addDisplayFullScreen from '../logic/addDisplayOnFullScreen';

export class Map {
  constructor(target, type = "cases") {
    this.map;
    this.data;
    this.target = target;
    this.type = type;
  }

  init(type) {
    this.drawMap();
    this.drawMarker(type);
    addDisplayFullScreen('.map__wrapper');
  }

  drawMap() {
    this.map = L.map(String(this.target)).setView([0, 0], 2);
    L.tileLayer(
      "https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=YiCfIvMazTU2jUOUizTP",
      {
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        crossOrigin: true,
        minZoom: 2,
      }
    ).addTo(this.map);
  }

  setSizeToIcon(parameter) {
    if (parameter >= 1000000) {
      return "map_marker--large";
    }
    if (parameter > 500000 && parameter < 1000000) {
      return "map_marker--medium";
    }
    return "map_marker--small";
  }

  checkContentToPopup(data, type = null) {
    const { country, cases, deaths, recovered, active } = data;
    return `<p class="popup_country-name">${country}</p>
                <p class="popup_description">cases: <span class="popup_value popup_value--cases">${cases}</span></p>
                <p class="popup_description">deaths: <span class="popup_value popup_value--deaths">${deaths}</span></p>
                <p class="popup_description">recovered: <span class="popup_value popup_value--recoverd">${recovered}</span></p>
                <p class="popup_description">active: <span class="popup_value popup_value--active">${active}</span></p>`;
  }

  async drawMarker(type='cases') {
    this.data = await apiCommunicator.loadGeneralData();
    console.log(this.data);
    this.data.forEach((element) => {
      const { lat, long } = element.countryInfo;
      const popup = L.popup({
        className: "map_popup map-popup",
      });
      const className = this.setSizeToIcon(element[this.type]);
      const iconMarker = L.divIcon({
        className: `map_marker ${className} map_marker--${type}`,
      });
      const marker = L.marker([lat, long], {
        icon: iconMarker,
      }).addTo(this.map);
      marker.bindPopup(this.checkContentToPopup(element)).openPopup;
    });
  }

  refreshMapArea(type) {
    if (this.map) {
      this.map.remove();
    }
    this.init(type);
  }
}

export default Map;
