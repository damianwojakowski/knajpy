import { Component } from 'react';
import GoogleMapWrapper from './Map/GoogleMapWrapper.js';

export default class App extends Component {

    render() {
        return (
            <div style={{width: "100vw", height: "100vh"}}>
                <GoogleMapWrapper />
            </div>
        );
    }

}
