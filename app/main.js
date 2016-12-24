"use strict";
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/from');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/map');
var QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
var map = L.map('map').setView([33.858631, -118.279602], 7);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
var quakes = Observable_1.Observable.create(function (observer) {
    var req = new XMLHttpRequest();
    req.open('GET', QUAKE_URL);
    req.onload = function () {
        return observer.next(req.response);
    };
    req.onerror = function (err) {
        return observer.error(err);
    };
    req.send();
})
    .mergeMap(function (res) { return Observable_1.Observable.from(JSON.parse(res).features); })
    .map(function (_a) {
    var _b = _a.geometry.coordinates, x = _b[0], y = _b[1], _c = _a.properties, mag = _c.mag, type = _c.type, place = _c.place, code = _c.code;
    return {
        mag: mag,
        type: type,
        place: place,
        code: code,
        point: L.circle([y, x], mag * 10000)
    };
});
quakes.subscribe(function (_a) {
    var point = _a.point;
    point.addTo(map);
});
// Observable.fromEvent(document,'mouseenter').map ... filter
// Observable.fromEvent(document,'mouseleave'). 
