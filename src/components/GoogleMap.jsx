import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../components/Marker";
import Config from "../Config";

const styles = require("../google-map-aubergine.json");

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.config = new Config();
    this.state = {
      center: {
        lat:
          props.lat != null && props.lng != null
            ? props.lat
            : this.config.DEFAULT_GOOGLE_MAP_LAT,
        lng:
          props.lat != null && props.lng != null
            ? props.lng
            : this.config.DEFAULT_GOOGLE_MAP_LNG,
      },
      zoom:
        props.zoom != null ? props.zoom : this.config.DEFAULT_GOOGLE_MAP_ZOOM,
      showInfoWindow: {
        show: false,
        index: null,
      },
    };
  }

  createMapOptions = () => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      styles: styles,
    };
  };

  onChange = () => {
    console.log("onChange: ");
  };

  onChildClick = (key) => {
    console.log("onChildClick: " + key);
    this.setState({
      showInfoWindow: { show: !this.state.showInfoWindow.show, index: key },
    });
    this.props.clickHandler(key, this._map);
  };

  onChildMouseEnter = (key) => {
    console.log("onChildMouseEnter: " + key);
  };

  onChildMouseLeave = (key) => {
    console.log("onChildMouseLeave: " + key);
  };

  onClick = () => {
    console.log("onClick: ");
    this.setState({ showInfoWindow: { show: false } });
  };

  render() {
    return (
      <div style={{ width: `100%`, height: `100vh` }}>
        <GoogleMapReact
          ref={(map) => (this._map = map)}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.props.onLoad(map, maps)}
          onChange={this.onChange}
          onChildClick={this.onChildClick}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          onClick={this.onClick}
          options={this.createMapOptions}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {this.props.markers.map((marker, index) => (
            <Marker
              key={marker.countryCode}
              lat={marker.lat}
              lng={marker.lng}
              covidData={marker.covidData}
              showInfoWindow={this.state.showInfoWindow}
              text={marker.text}
            ></Marker>
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
