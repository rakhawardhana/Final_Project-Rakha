// import React from 'react';
// import ReactDOM from 'react-dom';
// //import {Provider} from 'react-redux'
// //import { createStore, applyMiddleware, compose} from 'redux'
// //import thunk from 'redux-thunk'
// //import logger from 'redux-logger'
// import 'bootstrap/dist/css/bootstrap.css'
// // import './index.css';


// //import reducers from './reducers'
// import App from './components/App';

// //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// //const data_store = createStore(reducers, composeEnhancers(applyMiddleware(logger, thunk)))
// //store = {data_store}>

// ReactDOM.render(
//     //<Provider>
//         <App />,
//     //</Provider>, 
//     document.getElementById('root')
// );

import React from 'react' 
import ReactDOM from 'react-dom'
import  'bootstrap/dist/css/bootstrap.min.css'

import App from './components/App'

ReactDOM.render(<App/>, document.getElementById('root'))

