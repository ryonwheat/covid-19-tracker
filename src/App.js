import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import CountryService from "./services/CountryService";
import CovidService from "./services/CovidService";
import CovidPanel from "./components/CovidPanel";
import GoogleMap from "./components/GoogleMap";
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;

  .panel {
    flex-basis: 25%;
    overflow: scroll;
  }

  .map {
    flex-basis: 75%;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.countryService = new CountryService();
    this.covidService = new CovidService();
    this.state = {
      map: null,
      countries: [],
      covidData: [],
      markers: [],
    };
  }

  componentDidMount() {
    this.getCountries();
    this.getCovidData();

    console.log("COVID Countries: " + this.state.covidData);
  }

  getCountries() {
    let promise = this.countryService.getCountries();

    promise.then((countries) => {
      this.setState({ countries: countries }, () => {
        console.log("State.countries: " + this.state.countries);
      });
    });
  }

  getCovidData() {
    this.covidService.getCovidData().then((covidData) => {
      this.setState({ covidData: covidData }, () => {
        console.log("State.covid: " + this.state.covidData);
        console.log("State.countries: " + this.state.countries);

        let markers = [];
        let countries = this.state.countries;

        this.state.covidData["Countries"].sort(function(a,b){
            return parseInt(b.TotalConfirmed) - parseInt(a.TotalConfirmed);
        })
        this.state.covidData["Countries"].map(function (value, index) {
          let geoCountry = countries[value.CountryCode];
          if (geoCountry != null) {
            markers.push({
              geoCountry: geoCountry,
              covidData: value,
              lat: geoCountry.latitude,
              lng: geoCountry.longitude,
              countryCode: value.CountryCode,
              text: "Total Confirmed: ",
            });
          }
          return markers;
        });

        this.setState({ markers: markers });
      });
    });
  }

  onGoogleMapLoad = (map, maps) => {
    console.log("onGoogleMapLoad: ");
    this.setState({ map: map });
  };

  handleCovid = (key) => {
    console.log("handleCovid: " + key);
    let countryGeo = this.state.countries[key];
    this.state.map.panTo({
      lat: Number(countryGeo.latitude),
      lng: Number(countryGeo.longitude),
    });
  };

  handleMarkerClick = (key) => {
    console.log(
      "handleMarkerClick: " +
        key +
        "\n\t countries: " +
        JSON.stringify(this.state.countries)
    );
    let countryGeo = this.state.countries[key];
    this.state.map.panTo({
      lat: Number(countryGeo.latitude),
      lng: Number(countryGeo.longitude),
    });
  };

  render() {
    return (
      <div className="">
        <StyledApp>
          <div className="panel">
            <CovidPanel
              covidData={this.state.covidData}
              countries={this.state.countries}
              clickHandler={this.handleCovid}
            ></CovidPanel>
          </div>
          <div className="map">
            <GoogleMap
            //   lat={39}
            //   lng={-104}
              zoom={3}
              markers={this.state.markers}
              onLoad={this.onGoogleMapLoad}
              clickHandler={this.handleMarkerClick}
            ></GoogleMap>
          </div>
        </StyledApp>
      </div>
    );
  }
}

export default App;
