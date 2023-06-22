import * as React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: 'unset',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)