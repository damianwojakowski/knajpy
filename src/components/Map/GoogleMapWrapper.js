import {Component} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import React from 'react';
import uuid from 'react-uuid';
import Markers from '../Markers/Markers.js';
import DetailsWindow from '../DetailsWindow/DetailsWindow.js';
import MapConfiguration from '../../config/mapConfiguration.js';

export default class GoogleMapWrapper extends Component{


    constructor(props) {
        super(props);

        this.onMapClick = this.onMapClick.bind(this);

        // const {isLoaded, loadError} = useLoadScript({
        //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        // });

        // this.mapRef = React.useRef();
        // this.onMapLoad = React.useCallback((map) => {
        //     this.mapRef.current = map;
        // }, []);

        // this.panTo = React.useCallback((lat, lng) => {
        //     this.mapRef.current.panTo({lat, lng});
        // }, []);

        this.state = {
            markers: []
        };

        //
        // const [selected, setSelected] = React.useState(null);
        // const [markers, setMarkers] = React.useState([]);
        // const [CENTER, setCenter] = React.useState({
        //     lat: 51.107883,
        //     lng: 17.038538
        // });
        //
    }

    onMapClick(event) {
        // this.panTo(event.latLng.lat(), event.latLng.lng());

        this.setState((state, props) => {
            return {
                markers: [...state.markers, {
                    lng: event.latLng.lng(),
                    lat: event.latLng.lat(),
                    id: uuid()
                }]
            }
        });

    }

    render() {
        // if (loadError) {
        //     return "Error loading maps";
        // }
        //
        // if (!isLoaded) {
        //     return "Loading Maps...";
        // }

        return (
            <div>
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={MapConfiguration.CONTAINER_STYLE}
                        zoom={MapConfiguration.ZOOM}
                        center={MapConfiguration.CENTER}
                        options={MapConfiguration.OPTIONS}
                        onClick={this.onMapClick}
                        // onLoad={this.onMapLoad}
                    >
                        <Markers markers={this.state.markers}/>
                        <DetailsWindow />
                    </GoogleMap>
                </LoadScript>
            </div>
        )
    }
}
