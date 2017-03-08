'use strict';
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { router } from "./router.js";
import {store} from "./store.js";
import {IntlProvider} from 'react-intl';


// render the main component
ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale="en">
            {router}
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
