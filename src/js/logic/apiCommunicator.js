export const apiCommunicator = {
  /**
   * Returns general data about pandemic for all counties on the
   */
  async loadGeneralData() {
    return this.executeRequest(
      "https://corona.lmao.ninja/v3/covid-19/countries"
    );
  },
  /**
   * Returns data for country from beginning of the pandemic
   * @param {iso-3 code of the country} iso_3
   */
  async getDataForCountryByDays(iso3) {
    return await this.executeRequest(
      `https://corona-api.com/countries/${iso3}`
    );
  },

  async getDataForWorldByDays() {
    return await this.executeRequest("https://corona-api.com/timeline");
  },

  async executeRequest(url) {
    return fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        return [];
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(
          `There has been a problem with your fetch operation: ${error.message}`
        );
      });
  },
};

export default apiCommunicator;
