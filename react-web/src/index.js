import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RouterConfig from './router/AppRouter';

ReactDOM.render(
    <RouterConfig />
    , document.getElementById('root'));
registerServiceWorker();