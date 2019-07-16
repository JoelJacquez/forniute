import React, {Component} from 'react';
import Header from './layout/header/Header';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <div className="wrapper">
          Hi
        </div>
      </div>
    );
  }
}

export default App;
