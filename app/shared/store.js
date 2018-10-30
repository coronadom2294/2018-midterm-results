/**
 * Global store.  This should have at least the same
 * data as the SSR store.  See buildStoreOptions in
 * /data.js
 */

// Dependencies
import { Store } from 'svelte/store.js';
import { feature as topojsonFeature } from 'topojson';

// Data
import supplement from '../../assets/data/supplement.json';

// Define store
const store = new Store({
  supplement
});

// Get some data
window
  .fetch('./assets/data/mncounties.json')
  .then(response => {
    return response.json();
  })
  .then(parsed => {
    store.set({
      mnStateGeo: topojsonFeature(parsed, parsed.objects.state).features,
      mnCountiesGeo: topojsonFeature(parsed, parsed.objects.counties).features,
      mnCitiesGeo: topojsonFeature(parsed, parsed.objects.cities).features,
      mnRoadsGeo: topojsonFeature(parsed, parsed.objects.roads).features
    });
  })
  .catch(e => {
    console.error(e);
  });

export default store;
