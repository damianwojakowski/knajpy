import {Component} from 'react';
import {GoogleMap, useLoadScript, LoadScript} from '@react-google-maps/api';
import mapStyles from '../../config/mapStyles.js';
import React from 'react';
import uuid from 'react-uuid';
import Markers from '../Markers/Markers.js';
import DetailsWindow from '../DetailsWindow/DetailsWindow.js';

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

        this.mapContainerStyle = {
            with: '100vw',
            height: '100vh'
        };

        this.options = {
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true
        };

        this.center = {
            lat: 51.107883,
            lng: 17.038538
        };

        this.state = {
            markers: []
        };

        //
        // const [selected, setSelected] = React.useState(null);
        // const [markers, setMarkers] = React.useState([]);
        // const [center, setCenter] = React.useState({
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
                        mapContainerStyle={this.mapContainerStyle}
                        zoom={12}
                        center={this.center}
                        options={this.options}
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
