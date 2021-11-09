import { useState, useRef, useCallback, useEffect } from "react";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

// added the following 6 lines.
import mapboxgl from "mapbox-gl";
import axios from "axios";

import { MapStyled } from "./styles/MapStyled";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
/* eslint-disable */
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
/* eslint-enable */

const Map = ({ property }) => {
  const { street, city, state, zip } = property;
  const formatted_address = `${street}, ${city}, ${state} ${zip}`;

  const [propertyCoords, setPropertyCoords] = useState({ lat: 0, lng: 0 });

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 39.8355,
    longitude: -99.0909,
    zoom: 16,
  });

  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  useEffect(() => {
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: formatted_address,
          key: process.env.REACT_APP_MAPS_API_KEY,
        },
      })
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry.location;
        setPropertyCoords({ lat, lng });
        handleGeocoderViewportChange({
          latitude: lat,
          longitude: lng,
          zoom: 16,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MapStyled style={{ height: "50vh", position: "relative" }}>
      <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
      />
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Marker
          className="the-place"
          latitude={propertyCoords.lat}
          longitude={propertyCoords.lng}
        >
          <img
            src="/images/home.png"
            alt={formatted_address}
            title={formatted_address}
          />
          <p>The&nbsp;place</p>
        </Marker>
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          marker={true}
          inputValue={formatted_address}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </MapStyled>
  );
};

export default Map;
