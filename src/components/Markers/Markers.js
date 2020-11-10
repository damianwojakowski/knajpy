import React, {Component} from 'react';
import {Marker} from '@react-google-maps/api';
import MarkerIconPicker from '../../services/MarkerIconPicker.js';
import {connect} from 'react-redux';
import {previewExistingMarker} from '../../common/actions/markerActions.js';

class Markers extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick(marker) {
        this.props.previewExistingMarker(marker);
    }

    render() {
        return <div>
            {this.props.markers.map(marker => (
                <Marker
                    key={marker.id}
                    position={{lat: marker.lat, lng: marker.lng}}
                    onClick={() => {
                        this.onMarkerClick(marker);
                    }}
                    icon={MarkerIconPicker.getIcon(marker)}
                />
            ))
            }
            {this.props.isBeingPrepared && <Marker
                key={this.props.newMarkerPosition.id}
                position={{lat: this.props.newMarkerPosition.lat, lng: this.props.newMarkerPosition.lng}}
                icon={MarkerIconPicker.getNewMarkerIcon()}
            />}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        markers: state.markers.markers,
        isBeingPrepared: state.markers.isBeingPrepared,
        newMarkerPosition: state.markers.newMarkerPosition
    };
};

const mapDispatchToProps = dispatch => {
    return {
        previewExistingMarker: marker => dispatch(previewExistingMarker(marker))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Markers);
