import React from "react";
import "whatwg-fetch";
import {connect} from "react-redux";
import Gift from "./Gift";
class Category extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="alert alert-info" role="alert">
                    Category:
                    {this.props.activeCategory.title}
                </div>
                <div className="row">
                    {this.props.gifts.map((item) => {
                        return (<Gift key={item._id} item={item}/>);
                    })}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        gifts: state.gifts.categoryGifts || [],
        activeCategory: state.category.selectedCategory || []
    }
}
export default connect(mapStateToProps)(Category);