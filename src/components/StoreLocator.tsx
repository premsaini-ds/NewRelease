import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  getUserLocation, // New
} from "@yext/search-ui-react";
import { useEffect, useState } from "react"; // New
import { BiLoaderAlt } from "react-icons/bi"; // New
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState, // New
} from "@yext/search-headless-react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "./LocationCard";
import MapPin from "./MapPin";


export const clusterStyles = {
  styles: [
    {
      textColor: "black",
      url: MapPin,
      height: 40,
      width: 40,
    },
  ],
};

type InitialSearchState = "not started" | "started" | "complete";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();
  // new code starts here...
  const [initialSearchState, setInitialSearchState] = useState<InitialSearchState>("not started");
  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);
  const locationData = useSearchState((state) => state.vertical.results) || [];
  const [selectedMarker, setSelectedMarker] = useState(null);


  useEffect(() => {
    getUserLocation()
      .then((location) => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "Current Location",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
                radius: 40233.6, // equivalent to 25 miles
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .catch(() => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "New York City, New York, NY",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: 40.7128,
                lng: -74.006,
                radius: 40233.6, // equivalent to 25 miles
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .then(() => {
        searchActions.executeVerticalQuery();
        setInitialSearchState("started");
      });
  }, []);

  useEffect(() => {
    if (!searchLoading && initialSearchState === "started") {
      setInitialSearchState("complete");
    }
  }, [searchLoading]);
  // ...and ends here

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 21.7679,
    lng: 78.8718,
  };

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };

  const mapboxApi = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";

console.log("locationData",locationData);

  return (
    <>
      {/* new JSX starts here... */}
      <div className="relative flex h-[calc(100vh-210px)] border ">
        {initialSearchState !== "complete" && (
          <div className="absolute z-20 flex h-full w-full items-center justify-center bg-white opacity-70">
            <BiLoaderAlt className="animate-spin " size={64} />
          </div>
        )}
        {/* ...and ends here */}
        <div className="w-1/3 flex flex-col">
          <FilterSearch
            onSelect={handleFilterSelect}
            placeholder="Find Locations Near You"
            searchFields={[
              {
                entityType: "location",
                fieldApiName: "name",
              },
            ]}
          />
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
            CardComponent={LocationCard}
          />
        </div>
        <div className="w-2/3">
          {/* <MapboxMap
            mapboxAccessToken={"pk.eyJ1IjoiYXBhdmxpY2siLCJhIjoiY2t5NHJkODFvMGV3ZDJ0bzRnNDI1ZTNtZiJ9.VA2eTvz6Cf9jX_MG2r6u0g"}
            PinComponent={MapPin}
          /> */}
          <LoadScript googleMapsApiKey="AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={4}
            >
             <MarkerClusterer options={options}>
              {(clusterer) =>
              locationData?.map((location: any, index: number) => (
                <Marker key={index} 
                position={{
                  lat: location.rawData.yextDisplayCoordinate.latitude,
                  lng: location.rawData.yextDisplayCoordinate.longitude,
                }}
                clusterer={clusterer} 
                onClick={() => setSelectedMarker(location)}
                icon={MapPin}
                />
                ))
            }
      </MarkerClusterer>
      {selectedMarker && ( 
        <InfoWindow
          anchor="top"
          position={{
            lat: selectedMarker?.rawData.yextDisplayCoordinate.latitude,
            lng: selectedMarker?.rawData.yextDisplayCoordinate.longitude,
          }}
          onCloseClick={()=>setSelectedMarker(null)}
        >
            <div>
              <h2>{selectedMarker.name}</h2>
            </div>
          </InfoWindow>
        )}
           
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
};

export default StoreLocator;
