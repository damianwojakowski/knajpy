import {Component} from 'react';
import {Marker} from '@react-google-maps/api';
import IconPicker from '../Utilities/IconPicker.js';

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
                    icon={IconPicker.getIcon(marker)}
                />
            ))
         }
        </div>
    }
}
