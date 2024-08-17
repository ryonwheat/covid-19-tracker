import React, { Component } from "react";
import styled from "styled-components";

const StyledPanel = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #fefefe;
  border-right: 1px solid #aeaeae;
  border-left: 1px solid #aeaeae;

  .bold {
    font-weight: 700;
  }

  .fw-300 {
    font-weight: 300;
  }

  .header-wrap {
    background-color: #cecece;
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid #9e9e9e;
  }

  .header {
    font-size: 1.8em;
    font-weight: 700;
    padding: 0 0 20px 0;
  }

  .sub-header {
    font-size: 0.9em;
    // font-weight: 300;
    padding: 0 0 12px 0;
  }

  a,
  a:visited {
    color: #2e7eae;
    font-weight: 500;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .global-stats-wrap {
    display: flex;
    font-size: 0.8em;
  }

  .global-label {
    flex-basis: 50%;
  }

  .global-stats {
    flex-basis: 50%;
    font-family: "Roboto Mono", monospace;
    font-weight: 300;
    text-align: right;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    color: #5e5e5e;
    margin: 0;
    padding: 20px 0;
    list-style-position: inside;
    list-style-type: none;
    border-bottom: 1px solid #dedede;
  }

  li:hover {
    background-color: #aeaeae;
    color: #fefefe;
  }

  .item-wrap {
    display: flex;
    font-weight: 300;
    padding: 0px 20px;
  }

  .item-name {
    flex-basis: 50%;
  }

  .item-stats {
    flex-basis: 50%;
    font-family: "Roboto Mono", monospace;
    font-size: 0.8em;
    font-weight: 300;
    text-align: right;
  }
`;

class CovidPanel extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    console.log(
      "CovidPanel: \n\t covidData: " +
        JSON.stringify(this.props.covidData.length) +
        "\n\t countries: " +
        JSON.stringify(this.props.countries.length) +
        "\n\t Object.entries(this.props.covidData): " +
        Object.entries(this.props.covidData)
    );

    Object.entries(this.props.covidData).map(([key, value], index) => {
      return console.log(JSON.stringify(value));
    });
  }

  onSelect(key) {
    console.log("onSelect: " + key);
    this.props.clickHandler(key);
  }

  render() {
    console.log(
      "render: Covid Data: " +
        this.props.covidData.length +
        " : " +
        JSON.stringify(this.props.covidData)
    );

    const { Global, Countries } = this.props.covidData;

    const nf = new Intl.NumberFormat("en-US");
    const covidList =
      Countries &&
      Object.entries(Countries).map(([key, value], index) => (
        <li key={value.CountryCode} onClick={() => this.onSelect(value.CountryCode)}>
          <div className="item-wrap">
            <div className="item-name">{value.Country}</div>
            <div className="item-stats">{nf.format(value.TotalConfirmed)}</div>
          </div>
        </li>
      ));

    return (
      <StyledPanel>
        <div>
          <div className="header-wrap">
            <div className="header">COVID-19 Tracker</div>
            <div className="sub-header bold">
              Thank you for visiting this site. Due to lack of data, apis are no longer supported
              and we have discontinued use of this site.
            </div>
            <div className="sub-header fw-300">
              Built by{" "}
              <a
                href="https://github.com/ryonwheat/covid-19-tracker"
                target="_blank"
                rel="noreferrer"
              >
                Ryan Heath
              </a>
            </div>
            <div className="sub-header fw-300">
              Data is sourced from{" "}
              <a href="https://covid19api.com/" target="_blank" rel="noreferrer">
                COVID 19 API
              </a>
              .
            </div>
            <div className="global-stats-wrap">
              <div className="global-label">Confirmed</div>
              <div className="global-stats">{Global && nf.format(Global.TotalConfirmed)}</div>
            </div>
            <div className="global-stats-wrap">
              <div className="global-label">Deaths</div>
              <div className="global-stats">{Global && nf.format(Global.TotalDeaths)}</div>
            </div>
            <div className="global-stats-wrap">
              <div className="global-label">Recovered</div>
              <div className="global-stats">{Global && nf.format(Global.TotalRecovered)}</div>
            </div>
          </div>
          <ul className="item-list">
          </ul>
          {/* <ul className="item-list">{covidList}</ul> */}
        </div>
      </StyledPanel>
    );
  }
}

export default CovidPanel;
