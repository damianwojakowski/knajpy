const red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const blue = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

export default class MarkerIconPicker {

    static getIcon(marker) {
        if (this.isWorkingHours(marker.openFrom, marker.openTo)) {
            return  { url: red };
        } else {
            return { url: blue };
        }
    }

    static getNewMarkerIcon() {
        return red;
    }

    static isWorkingHours(openingHour, closingHour) {
        return this.isAfterOpenning(openingHour) &&  this.isBeforeClosing(closingHour);
    }

    static isAfterOpenning(openingHour) {
        let fromHour = parseInt(openingHour.substring(0,2));
        let fromMinutes = parseInt(openingHour.substring(3,5));
        let currentHour = parseInt(new Date().toLocaleTimeString().substring(0,2));
        let currentMinutes = parseInt(new Date().toLocaleTimeString().substring(3,5));

        return (currentHour > fromHour || (currentHour === fromHour && currentMinutes >= fromMinutes));
    }

    static isBeforeClosing(closingHour) {
        let toHour = parseInt(closingHour.substring(0,2));
        let toMinutes = parseInt(closingHour.substring(3,5));
        let currentHour = parseInt(new Date().toLocaleTimeString().substring(0,2));
        let currentMinutes = parseInt(new Date().toLocaleTimeString().substring(3,5));

        return (currentHour < toHour || (currentHour === toHour && currentMinutes <= toMinutes));
    }

}