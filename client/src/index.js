import React from ('react');
import { render } from ('react-dom');
import App from ('./components/app');
import store from ('./components/store');
import { Provider } from ('react-redux');
import styles from './wherever/styles/is';

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('main-app')
)