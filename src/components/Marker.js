import React, { Component } from "react";
import styled from "styled-components";

const StyledMarker = styled.div`
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;

  .marker {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #f00;
    border: 2px solid #fff;
    border-radius: 100%;
    opacity: 0.5;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .info-window {
    border: 5px solid #fff;
    border-radius: 10px;
    background-color: #fff;
    color: #000;
    padding: 10px 10px 0 10px;
    width: 150px;
    z-index: 100;
  }

  .info-window-header {
    font-weight: 700;
    padding: 0 0 10px 0;
  }

  .info-window-content {
      display: flex;
      padding: 0 0 10px 0;
  }

  .info-window-label {
      flex-basis: 50%;
  }

  .info-window-stat {
      flex-basis: 50%;
      text-align: right;
  }
`;

class Marker extends Component {
  render() {
    const size = Math.sqrt(Number(this.props.covidData.TotalConfirmed)) / 50;
    const nf = Intl.NumberFormat("en-US");

    return (
      <StyledMarker>
        <div className="marker" style={{ width: size, height: size }}>
        </div>
        {this.props.showInfoWindow.show &&
          this.props.showInfoWindow.index ===
            this.props.covidData.CountryCode && (
            <div className="info-window">
              <div className="info-window-header">
                {this.props.covidData.Country}
              </div>
              <div className="info-window-content">
                <div className="info-window-label">Confirmed</div>
                <div className="info-window-stat">{nf.format(this.props.covidData.TotalConfirmed)}</div>
              </div>
              <div className="info-window-content">
                <div className="info-window-label">Deaths</div> 
                <div className="info-window-stat">{nf.format(this.props.covidData.TotalDeaths)}</div>
              </div>
              <div className="info-window-content">
                <div className="info-window-label">Recovered</div> 
                <div className="info-window-stat">{nf.format(this.props.covidData.TotalRecovered)}</div>
              </div>
            </div>
          )}
      </StyledMarker>
    );
  }
}

export default Marker;
