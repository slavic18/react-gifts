import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./store.js";
import App from "./components/App";
import NotFound from './components/NotFound';
import Home from './components/Home';
import Category from './components/Category';


// build the router
const router = (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="category(/:category_id)" component={Category}/>
            <Route path="about" component={NotFound}/>
        </Route>
    </Router>
);

// export
export {router};
