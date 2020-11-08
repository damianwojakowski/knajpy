import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import mapStyles from '../Config/mapStyles.js';
import React from 'react';
import uuid from 'react-uuid';

export default function GoogleMapWrapper() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const mapContainerStyle = {
        with: '100vw',
        height: '100vh'
    };

    const center = {
        lat: 51.107883,
        lng: 17.038538
    };

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    };

    const [markers, setMarkers] = React.useState([]);

    const onMapClick = React.useCallback((event) => {
        setMarkers((current) => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            id: uuid()
        }
        ]);
    }, []);

    if (loadError) {
        return "Error loading maps";
    }

    if (!isLoaded) {
        return "Loading Maps...";
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onClick={onMapClick}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={{lat: marker.lat, lng: marker.lng}}
                    />))}

            </GoogleMap>
        </div>
    );
}
