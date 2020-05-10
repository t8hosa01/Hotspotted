import React, { useState, useEffect, useContext } from "react";

export const GoogleAPIContext = React.createContext();

export const useGoogleAPI = () => useContext(GoogleAPIContext);

export const GoogleAPIProvider = ({children}) => {
    const [ storedLocation, setStoredLocation ] = useState();

    const [ foundSuggestions, setFoundSuggestions ] = useState();

    const [ foundDetailedSuggestionInfo, setFoundDetailedSuggestionInfo] = useState();

    const google = window.google = window.google ? window.google : {}

    const storeLocation = (lng, lat) => {
        setStoredLocation({
            longitude: lng,
            latitude: lat
        })
    }

    const findNearbyPlaces = async () => {
        //console.log(storedLocation.longitude)

        const location = new google.maps.LatLng(storedLocation.latitude, storedLocation.longitude)
        console.log(location)

        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15
        });

        const request = {
            location: location,
            radius: '30',
            type: ['point_of_interest']
        };
        
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, foundSearchCallback);
    }

    const foundSearchCallback = (results, status) => {
        console.log(results)
        if (status == "OK") {
            setFoundSuggestions(results)
        }
    }

    const findDetails = async (placeId) => {
        const location = new google.maps.LatLng(storedLocation.latitude, storedLocation.longitude)

        const map = new google.maps.Map(document.getElementById('map'), {
            center:location, 
            zoom:15
        });

        const request = {
            placeId: placeId,
            fields: ['address_component', 'name', 'place_id', 'vicinity']
        }

        const service = new google.maps.places.PlacesService(map);
        service.getDetails(request, foundDetailsCallback);
    }

    const foundDetailsCallback = (results, status) => {
        console.log(results)
        if (status == "OK") {
            let streetName = '';
            let streetNumber = '';
            let cityName = '';
            let zipCode = '';
            let country = '';
            if (results.address_components) {
                results.address_components.forEach((addressItem, listIndex) => {

                    for (let i = 0; i < addressItem.types.length; i++) {
                        if (addressItem.types[i] == "street_number") {
                            streetNumber = addressItem.long_name;
                        }
                        if (addressItem.types[i] == "route") {
                            streetName = addressItem.long_name;
                        }
                        if (addressItem.types[i] == "locality") {
                            cityName = addressItem.long_name;
                        }
                        if (addressItem.types[i] == "postal_code") {
                            zipCode = addressItem.long_name;
                        }
                        if (addressItem.types[i] == "country") {
                            country = addressItem.long_name;
                        }
                    }

                })
            }
            const name = results.name;
            const address = streetName + ' ' + streetNumber;

            const formattedResults = {
                name: name,
                address: address,
                city: cityName,
                zip: zipCode,
                country: country
            }
            setFoundDetailedSuggestionInfo(formattedResults)
        }
    }

    return (
      <GoogleAPIContext.Provider
        value={{
            storeLocation,
            findNearbyPlaces,
            foundSuggestions,
            findDetails,
            foundDetailedSuggestionInfo
        }}
      >
      {children}
      </GoogleAPIContext.Provider>  
    );
  }