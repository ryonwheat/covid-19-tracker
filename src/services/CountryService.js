import Config from "../Config";

class CountryService {
  constructor() {
    this.config = new Config();
    this.countries = [];
  }

  async getCountries() {
    return fetch(this.config.COUNTRY_NAMES_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(
          "response: " + response + "stringify: " + JSON.stringify(response)
        );
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then((json) => {
        console.log(
          "Object.entries(json): " + JSON.stringify(Object.entries(json))
        );
        this.countries = json;
        return this.countries;
      })
      .catch((error) => {
        console.log("ERROR - getCountries: " + error.message);
      });
  }

  handleResponseError(response) {
    throw new Error(
      "HTTP Error, status = " +
        response.status +
        ", statusText = " +
        response.statusText
    );
  }
}

export default CountryService;
