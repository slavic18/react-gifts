import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import AddCategory from "./components/taxonomy/AddCategory";
import EditCategory from "./components/taxonomy/EditCategory";
import Categories from "./components/taxonomy/Categories";
import Form from "./components/post_types/EditForm";
import AddGift from "./components/post_types/AddGift";
import EditGift from "./components/post_types/EditGift";
import GiftsList from "./components/post_types/GiftsList";
function fixRedirect(nextState, replace) {
    return false;
}
// build the router
const router = (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="categories" component={Categories}/>
            <Route path="categories/add_new" component={AddCategory}/>
            <Route path="categories(/:category_id)" component={EditCategory} onEnter={fixRedirect}/>
            <Route path="gifts/add_new" component={AddGift}/>
            <Route path="gifts" component={GiftsList}/>
            <Route path="gifts(/:gift_id)" component={EditGift}/>
        </Route>
        <Route path='*' component={Home}/>
    </Router>
);

// export
export {router};
