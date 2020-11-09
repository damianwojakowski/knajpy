import React, {Component} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import uuid from 'react-uuid';
import Markers from '../Markers/Markers.js';
import DetailsWindow from '../DetailsWindow/DetailsWindow.js';
import MapConfiguration from '../../config/mapConfiguration.js';
import {connect} from 'react-redux';
import {addMarker} from '../../common/actions/markerActions.js';

class MapWrapper extends Component {
    constructor(props) {
        super(props);
        this.onMapClick = this.onMapClick.bind(this);
    }

    onMapClick(event) {
        this.props.addMarker({
            lng: event.latLng.lng(),
            lat: event.latLng.lat(),
            id: uuid()
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
                    >
                        <Markers />
                        <DetailsWindow />
                    </GoogleMap>
                </LoadScript>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMarker: marker => dispatch(addMarker(marker))
    };
};

const GoogleMapWrapper = connect(
    null,
    mapDispatchToProps
)(MapWrapper);

export default GoogleMapWrapper
