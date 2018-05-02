import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import Drawing from './Drawing';

class App extends Component {
  render() {
    return <Drawing />;
  }
}

export default hot(module)(App);
