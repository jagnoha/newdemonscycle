import React from 'react'
import ReactDOM from 'react-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { 
    BrowserRouter  
} from "react-router-dom"

import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker'

//import Products from './components/Products/Products'

TimeAgo.addDefaultLocale(en)


ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    , 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
