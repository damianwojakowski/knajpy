import React, {Component} from 'react';
import {Marker} from '@react-google-maps/api';
import MarkerIconPicker from '../../services/MarkerIconPicker.js';
import {connect} from 'react-redux';
import {selectMarker} from '../../common/actions/markerActions.js';

class Markers extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick(marker) {
        this.props.selectMarker(marker);
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
        </div>
    }
}

const mapStateToProps = state => {
    return {markers: state.markers.markers};
};

const mapDispatchToProps = dispatch => {
    return {
        selectMarker: marker => dispatch(selectMarker(marker))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Markers);
