import mapStyles from './mapStyles.js';

export default {
    CONTAINER_STYLE: {
        with: '100vw',
        height: '100vh'
    },
    OPTIONS: {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    },
    CENTER: {
        lat: 51.107883,
        lng: 17.038538
    },
    ZOOM: 12
}

