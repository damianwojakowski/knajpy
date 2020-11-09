import {GoogleMap, useLoadScript} from '@react-google-maps/api';
import mapStyles from '../../config/mapStyles.js';
import React from 'react';
import uuid from 'react-uuid';
import Markers from '../Markers/Markers.js';
import DetailsWindow from '../DetailsWindow/DetailsWindow.js';

export default function GoogleMapWrapper() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback((lat, lng) => {
        mapRef.current.panTo({lat, lng});
    }, []);

    const mapContainerStyle = {
        with: '100vw',
        height: '100vh'
    };

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    };

    const [selected, setSelected] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);
    const [center, setCenter] = React.useState({
        lat: 51.107883,
        lng: 17.038538
    });

    const onMapClick = React.useCallback((event) => {
        panTo(event.latLng.lat(), event.latLng.lng());

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
                zoom={12}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <Markers markers={markers}/>
                <DetailsWindow />
            </GoogleMap>
        </div>
    );
}
