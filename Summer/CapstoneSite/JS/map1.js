mapboxgl.accessToken = 'pk.eyJ1IjoiYWNkbTEiLCJhIjoiY2toMmY5cmw0MDEyMDJ1bzR5eXZzam5paCJ9.Whiar4FcVdqRUV6VEG93Ig';
const map = new mapboxgl.Map({
  container: 'map',
  // style: 'mapbox://styles/mapbox/light-v10',
  style: 'mapbox://styles/acdm1/cksgelag53qq718qxrlr0qezs',
  center: [-122.50, 47.210],
  zoom: 11.5,
  pitch: 60,
  bearing: 0,
  antialias: true
});

map.on('load', () => {
  map.addSource('parks', {
    type: 'geojson',
    data: 'DATA/park.geojson'
  });

  map.addLayer({
    'id': 'fill-in',
    'type': 'fill',
    'source': 'parks',
    'layout': {},
    'paint': {
      'fill-color': 'green',
      'fill-opacity': 0.5
    }
  });

  map.addLayer({
    'id': 'outline',
    'type': 'line',
    'source': 'parks',
    'layout': {},
    'paint': {
      'line-color': 'yellow',
      'line-width': 3
    }
  });
});

map.on('load', () => {
  map.addSource('points', {
    type: 'geojson',
    data: 'DATA//parkaudio.geojson'
  });

map.addLayer({
  'id': 'points',
  // 'type': 'symbol',
  'type': 'circle',
  'source': 'points',
  'paint': {
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-color': 'orange',
    'circle-stroke-color': 'purple'
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

map.on('click', 'points', (e) => {

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
.addTo(map);
});

map.on('mouseenter', 'points', () => {
map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'points', () => {
map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());
