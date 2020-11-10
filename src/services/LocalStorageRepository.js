const MARKERS_KEY = 'markers';

export default class LocalStorageRepository {
    static loadMarkers() {
        let markers = JSON.parse(localStorage.getItem(MARKERS_KEY));

        return markers ? markers : [];
    }

    static overwriteMarkers(markers) {
        localStorage.setItem(MARKERS_KEY, JSON.stringify(markers));
    }
}