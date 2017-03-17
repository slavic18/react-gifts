import React from "react";
import CategoryMenuItem from "./CategoryMenuItem";

export default class CategoriesList extends React.Component {
    render() {
        const categories = this.props.categories;
        return (
            <ul className="menu">
                {categories.map((value, index) => {
                    return (<CategoryMenuItem key={index} category={value}/>)
                })}

            </ul>
        )
    }
}