export const defaultPlaceholder = (service) => {
    let urlPlaceholder = {
        wfs: "e.g. https://mydomain.com/geoserver/wfs",
        wmts: "e.g. https://mydomain.com/geoserver/gwc/service/wmts",
        wms: "e.g. https://mydomain.com/geoserver/wms",
        csw: "e.g. https://mydomain.com/geoserver/csw",
        tms: "e.g. https://mydomain.com/geoserver/gwc/service/tms/1.0.0"
    };
    for ( const [key, value] of Object.entries(urlPlaceholder)) {
        if ( key === service.type) {
            return value;
        }
    }
    return true;
};

export const checkIfUrlMatchesProtocol = (url = '') => {
    const mapstoreUrl = window.location.href;
    if (mapstoreUrl.indexOf('https://') !== -1) {
        return url.indexOf('https://') !== -1;
    }
    return url.indexOf('http://') !== -1;
};
