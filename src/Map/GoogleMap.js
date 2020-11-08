import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';

export default function GoogleMapWrapper() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyA7EpfKixpL5f19J_IcZ7UuJyKxg6yj5mg'
    });

    if (loadError) {
        return "Error loading maps";
    }

    if (!isLoaded) {
        return "Loading Maps...";
    }

    return <div>map</div>;
}
