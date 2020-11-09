import {Component} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import React from 'react';
import uuid from 'react-uuid';
import Markers from '../Markers/Markers.js';
import DetailsWindow from '../DetailsWindow/DetailsWindow.js';
import MapConfiguration from '../../config/mapConfiguration.js';

export default class GoogleMapWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
        };

        this.onMapClick = this.onMapClick.bind(this);
    }

    onMapClick(event) {
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
