import {Component} from 'react';
import {Marker} from '@react-google-maps/api';
import MarkerIconPicker from '../../Utilities/MarkerIconPicker.js';

export default class Markers extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            {this.props.markers.map(marker => (
                <Marker
                    key={marker.id}
                    position={{lat: marker.lat, lng: marker.lng}}
                    onClick={() => {
                        // setSelected(marker);
                    }}
                    icon={MarkerIconPicker.getIcon(marker)}
                />
            ))
         }
        </div>
    }
}
