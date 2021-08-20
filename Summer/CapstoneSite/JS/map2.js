mapboxgl.accessToken = 'pk.eyJ1IjoiYWNkbTEiLCJhIjoiY2toMmY5cmw0MDEyMDJ1bzR5eXZzam5paCJ9.Whiar4FcVdqRUV6VEG93Ig';

const map2 = new mapboxgl.Map({
  container: 'map2',
  // style: 'mapbox://styles/mapbox/light-v10',
  style: 'mapbox://styles/acdm1/cksgelag53qq718qxrlr0qezs',
  center: [-122.595, 47.175],
  zoom: 14.5,
  // pitch: 60,
  bearing: 0,
  antialias: true
});

map2.on('load', () => {
  map2.addSource('parks', {
    type: 'geojson',
    data: 'DATA/park.geojson'
  });

  map2.addLayer({
    'id': 'fill-in',
    'type': 'fill',
    'source': 'parks',
    'layout': {},
    'paint': {
      'fill-color': '#1E8500',
      'fill-opacity': 0.5
    }
  });

  map2.addLayer({
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

map2.on('load', () => {
  map2.addSource('points', {
    type: 'geojson',
    data: 'DATA//parkaudio.geojson'
  });

map2.addLayer({
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

map2.on('click', 'points', (e) => {

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
.addTo(map2);
});

map2.on('mouseenter', 'points', () => {
map2.getCanvas().style.cursor = 'pointer';
});

map2.on('mouseleave', 'points', () => {
map2.getCanvas().style.cursor = '';
});

map2.addControl(new mapboxgl.NavigationControl());
