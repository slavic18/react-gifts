import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import {history} from "./store.js";
// admin components
import AdminApp from "./components/admin/AdminApp";
import Home from "./components/admin/Home";
import AddCategory from "./components/admin/taxonomy/AddCategory";
import EditCategory from "./components/admin/taxonomy/EditCategory";
import CategoriesList from "./components/admin/taxonomy/CategoriesList";
import AddGift from "./components/admin/post_types/AddGift";
import EditGift from "./components/admin/post_types/EditGift";
import GiftsList from "./components/admin/post_types/GiftsList";
// client components
import App from "./components/client/App";
import Category from "./components/client/Category";
import NotFound from "./components/client/NotFound";



function fixRedirect(nextState, replace) {
    return false;
}
// build the router
const router = (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <Route path="/" component={App}>
            <Route path="category(/:category_id)" component={Category}/>
            <Route path="about" component={NotFound}/>
        </Route>
        <Route path="/admin" component={AdminApp}>
            <IndexRoute component={Home}/>
            <Route path="categories" component={CategoriesList}/>
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
