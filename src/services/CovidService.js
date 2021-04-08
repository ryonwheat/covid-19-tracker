import Config from "../Config";

class CovidService {
  constructor() {
    this.config = new Config();
    this.covidList = [{ state: "test" }];
  }

  async getCovidData() {
    return fetch(this.config.COVID_GET_SUMMARY_URL)
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
        console.log("json: " + JSON.stringify(json));
        return json;
      })
      .catch((error) => {
        console.log("ERROR - getCovidData: " + error.message);
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

export default CovidService;
