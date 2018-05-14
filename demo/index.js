import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import { addOsmSource, addLayer } from '@boundlessgeo/sdk/actions/map';

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
