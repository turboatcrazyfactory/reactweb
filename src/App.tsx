import * as React from 'react';

import Component from 'components/Component';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='content-wrapper'>
        <p>Display</p>
        <Component />
      </div>
    );
  }
}

export default App;
