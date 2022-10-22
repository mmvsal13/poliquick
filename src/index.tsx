import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// ****** Redux/Reducer Components *********
import { createStore } from 'redux'; //  import the needed things from Redux and React-Redux
import { Provider } from 'react-redux';

import poliquickReducer from './redux/reducers/reducer'


let store = createStore(poliquickReducer); // create the Redux store


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();

