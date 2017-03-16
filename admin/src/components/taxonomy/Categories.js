import React from "react";
import CategoriesList from "./CategoriesList";

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Categories</h2>
                <CategoriesList />
            </div>
        );
    }
}
