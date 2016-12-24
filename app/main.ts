import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
const map = L.map('map').setView([33.858631, -118.279602], 7);
L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`).addTo(map);

let quakes: Observable<any> = Observable.create((observer: Observer<any>) => {
    let req = new XMLHttpRequest();
    req.open('GET', QUAKE_URL);
    req.onload = () => {
        return observer.next(req.response)
    }
    req.onerror = (err) => {
        return observer.error(err)
    }
    req.send()
})
    .mergeMap((res: any): Observable<any> => Observable.from(JSON.parse(res).features))
    .map(({geometry:{coordinates:[x, y]}, properties:{mag, type, place, code}}) => {
        return {
            mag,
            type,
            place,
            code,
            point: L.circle([y, x], mag * 10000)
        }
    })

quakes.subscribe(({point}) => {
    point.addTo(map);
})


// Observable.fromEvent(document,'mouseenter').map ... filter
// Observable.fromEvent(document,'mouseleave').