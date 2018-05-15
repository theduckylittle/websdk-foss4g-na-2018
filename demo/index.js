import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import { addSource, addOsmSource, addLayer } from '@boundlessgeo/sdk/actions/map';

const store = createStore(combineReducers({
  map: SdkMapReducer,
}));

class App extends React.Component {
  componentDidMount() {
    store.dispatch(addOsmSource('osm'));
    store.dispatch(addLayer({
      id: 'osm',
      source: 'osm',
    }));

    store.dispatch(addSource('counties', {
      type: 'geojson',
      data: './mo_counties.geojson',
    }));

    store.dispatch(addLayer({
      id: 'counties',
      source: 'counties',
      type: 'line',
      paint: {
        'line-width': 2,
        'line-color': '#000000',
      },
    }));
  }
  render() {
    return (
      <div>
        <h1>Mapping with React!</h1>
        <Provider store={store}>
          <SdkMap />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
