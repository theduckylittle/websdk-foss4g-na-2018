# Boundless SDK

## Who am I?

Dan "Ducky" Little
@theduckylittle

- One of the authors of the library.

## What is this?

- A gentle introduction to mapping with ES6, React, Redux, Babel and Webpack!
- The Boundless SDK is a React+Redux FIRST based mapping library.
- Can use OpenLayers and Mapbox GL as map renderers.


## What is React?

- React is the Facebook "Component" library.
- Specifies the JSX syntax.

```
class MyComponent extends React.Component {
  render() {
    return (
        <div className="my-component">
            Whizz bang component!
        </div>
    );
  }
}
```

## Why React is cool

- It takes a lot of DOM out of the equation.
- Components all have a defineable life-cycle.
- You can compose components together

```
class MyOtherComponent extends React.Component {
  render() {
    return (
      <div>
        <TitleComponent title="Woohoo!" />
        <ListComponent items={this.props.items} />
      </div>
    }
  }
}
```

## What is Redux?

- Redux is a state machine library.
- It contains a "state", "actions", and "reducers"

## A quick example

- Traffic light
- State:

  ```
  {light: "red"}
  ```
  
- Action:

  ```
  {type: LIGHT.CHANGE, color: "green"}
  ```
  
- Reducer:

  ```
  function (state, action) {
    if (action.type === LIGHT.CHANGE) {
      return {light: action.color};
    }
  }
  ```

## Why this is powerful...

- It's very easy to test individual components at 
  very low levels.
- Because reducers are plain functions they are also
  very easy to test.

## Putting it together

- React-Redux is a library that will stimulate the 
  React.Component life-cycle when the state is changed
  in a redux store.
  
## A Traffic Light Component

```
class TrafficLight extends React.Component {
  render() {
    return {
     <div>
      The light color is: { this.props.color }
     </div>
    };
  }
}

function mapState(state) {
  return {
    color: state.light,
  };
}

export default class connect(mapState)(TrafficLight);
```

## You said something about mapping?

- Correct!
- OpenLayers is event based. Not great with React/Redux
- There's no "data model" to represent OpenLayers in Redux.

## Mapbox GL Style Spec

From Mapbox:

  "A Mapbox style is a document that defines the visual appearance of a map:
 what data to draw, the order to draw it in, and how to style the data when 
 drawing it. A style document is a JSON object with specific root level and 
 nested properties."

## Now we have a data model!

- Anything that can be represented in JSON can be represented by redux. 
- This was really the last peice of the puzzle.
 
## What does the SDK provide?
 
- Reducers and Actions that are based on the Mapbox GL Style spec
- Components to render the style spec including:
  - A basic layers catalog
  - Popups
  - Navigation elements (Zoom controls, etc.)
  - The map!

## What does the SDK NOT provide?

- There is no "UI" library.  You're free to use Bootstrap, MUI, Foundation,
  Skeleton, what is your favorite this week!
 
## Let's make a map

We're going to need some stuff.

- We need modern javascript, I <3 [NVM](https://github.com/creationix/nvm).
  Most Distributions have very old Node versions.  Use Node source or nvm
  to install NodeJS 8.1 or newer.
- Ensure that `npx` and `npm` are up to date:

  ```
  npm install -g npm
  npm install -g npx
  ```

- Install the dependencies:

  ```
  npm install --save @boundlessgeo/sdk react react-dom redux react-redux \
    redux-thunk babel-core babel-cli ol ol-mapbox-style webpack webpack-cli \
    style-loader css-loader babel-preset-env babel-preset-react babel-loader
  ```

## What stuff is that?

 - React - The component library.
 - Redux - The base state management library.
 - Redux-Thunk - allows for async actions in redux.
 - OpenLayers!
 - Babel for transforming ES6 to ES5
 - Webpack for bundling the app together.

## A Sample HTML file

```
<html>
<head>
  <title>My first SDK Map</title>
</head>
<body>
<div id="app">
</div>
<script type="text/javascript" src="bundle.js"></script>
</body>
</html>
```

## And a quick script!

First, the dependencies need imported:

```
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import { addOsmSource, addLayer } from '@boundlessgeo/sdk/actions/map';
```

## Quickie, Part 2

And define a store.

```
const store = createStore(combineReducers({
  map: SdkMapReducer,
}));
```

## Quickie, Part 3

Create an "Application" Component:

```
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
```

## Quickie, Part 4

Place the application component in the DOM.

```
ReactDOM.render(<App />, document.getElementById('app'));
```

## Building it

- ES6 needs helpers: Babel and Webpack.
- Babel converts the ES6 into ES5.
- Webpack takes the ES5 code and "bundles" it together.

# A very simple webpack config

```
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'app' : './index.js',
  },
  devtool: 'eval',
  node: {fs: "empty"},
  output: {
    path: __dirname, // Path of output file
    filename: 'build/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
}
```

## Configuring Babel

Babel also needs some configuration, the `.babelrc` file:

```
{
    "presets" : ["env", "react"]
}
```

## Make it happen!

```
npx webpack --config ./webpack.config.js
```

Now we can open index.html in the browser!

## More resources

- Checkout the SDK home page:
  - https://sdk.boundlessgeo.com/
  - Many examples!
- We are open and on GitHub:
  - https://github.com/boundlessgeo/sdk
- Code seen in this presentation can be found here:
  - 

