import * as React from 'react';

import Component from 'components/Component';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'assets/css/bootstrap-override.css';

class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='container'>
                <div className='block-content'>
                    <div className='col-xs-12'>
                        <article className='module'>
                            <div className='hero-image-title'>
                                <h1 className='col-xs-9 visible-xs ucase page-title'>NEW APPLIED NOW</h1>
                            </div>
                        </article>
                    </div>
                </div>
                <Component/>
            </div>
        );
    }
}

export default App;
