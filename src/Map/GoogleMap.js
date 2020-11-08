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
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />))}

                {selected ? (<InfoWindow
                    position={{lat: selected.lat, lng: selected.lng}}
                    onCloseClick={() => setSelected(null)}
                >
                    <div>
                        <h2>Knajpa</h2>
                        <p>Nazwa</p>
                        <p>Opis</p>
                        <p>Godziny otwarcia: </p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    );
}
