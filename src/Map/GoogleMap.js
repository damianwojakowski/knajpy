import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import mapStyles from '../Config/mapStyles.js';

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
            />
        </div>
    );
}
