mapboxgl.accessToken = 'pk.eyJ1IjoiYWNkbTEiLCJhIjoiY2toMmY5cmw0MDEyMDJ1bzR5eXZzam5paCJ9.Whiar4FcVdqRUV6VEG93Ig';

const map4 = new mapboxgl.Map({
  container: 'map4',
  // style: 'mapbox://styles/mapbox/light-v10',
  style: 'mapbox://styles/acdm1/cksgelag53qq718qxrlr0qezs',
  center: [-122.495, 47.295],
  zoom: 12.3,
  // pitch: 60,
  bearing: 0,
  antialias: true
});

map4.on('load', () => {
  map4.addSource('parks', {
    type: 'geojson',
    data: 'DATA/park.geojson'
  });

  map4.addLayer({
    'id': 'fill-in',
    'type': 'fill',
    'source': 'parks',
    'layout': {},
    'paint': {
      'fill-color': '#1E8500',
      'fill-opacity': 0.5
    }
  });

  map4.addLayer({
    'id': 'outline',
    'type': 'line',
    'source': 'parks',
    'layout': {},
    'paint': {
      'line-color': '#FF0000',
      'line-width': 1.5
    }
  });
});

map4.on('load', () => {
  map4.addSource('points', {
    type: 'geojson',
    data: 'DATA//parkaudio.geojson'
  });

map4.addLayer({
  'id': 'points',
  // 'type': 'symbol',
  'type': 'circle',
  'source': 'points',
  'paint': {
    'circle-radius': 15,
    'circle-stroke-width': 5,
    'circle-color': '#0000FF',
    'circle-stroke-color': '#FFF900'
  // 'layout': {
  //   'icon-image': 'custom-marker',
  //   'text-field': ['get', 'title'],
  //   'text-font': [
  //     'Open Sans Semibold',
  //     'Arial Unicode MS Bold'
  //   ],
  //   'text-offset': [0, 1.25],
  //   'text-anchor': 'top'
  }
});
});

map4.on('click', 'points', (e) => {

const coordinates = e.features[0].geometry.coordinates.slice();
const name = e.features[0].properties.name;
const html = e.features[0].properties.html;
const description = e.features[0].properties.description;
const picture = e.features[0].properties.picture;

while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML(name+html+description+picture)
.addTo(map4);
});

map4.on('mouseenter', 'points', () => {
map4.getCanvas().style.cursor = 'pointer';
});

map4.on('mouseleave', 'points', () => {
map4.getCanvas().style.cursor = '';
});

map4.addControl(new mapboxgl.NavigationControl());
