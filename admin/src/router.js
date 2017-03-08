import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import AddCategory from "./components/taxonomy/AddCategory";
import Category from "./components/taxonomy/Category";
import Categories from "./components/taxonomy/Categories";
import AddGift from "./components/post_types/AddGift";
import Gift from "./components/post_types/Gift";
import Gifts from "./components/post_types/Gifts";

// build the router
const router = (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="categories" component={Categories}/>
            <Route path="categories/add_new" component={AddCategory}/>
            <Route path="categories(/:category_id)" component={Category}/>
            <Route path="gifts/add_new" component={AddGift}/>
            <Route path="gifts" component={Gifts}/>
            <Route path="gifts(/:gift_id)" component={Gift}/>
        </Route>
    </Router>
);

// export
export {router};
