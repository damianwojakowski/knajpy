const red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const blue = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

export default class MarkerIconPicker {

    static getIcon(marker) {
        if (true) {
            return  { url: red };
        } else {
            return { url: blue };
        }
    }

    static getNewMarkerIcon() {
        return red;
    }

}