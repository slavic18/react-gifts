import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {FormattedDate} from "react-intl";

class CategoriesMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.setState({
            isChecked: true
        })
    }

    render() {
        const {category, isChecked, checkListItem} = this.props;

        if (typeof category.description == 'undefined') {
            category.description = '';
        }
        let description = category.description.length > 150 ? category.description.substr(0, 150) + ' ...' : category.description,
            dateComponent = '';
        if (typeof category.updated_at !== 'undefined') {
            dateComponent = <FormattedDate value={category.updated_at} day="numeric" month="numeric" year="numeric"/>;
        }
        let thumbnailSrc = '//markmusto.com/wp-content/themes/equilibrium/images/layout/no-thumb.gif';
        if (!!category._thumbnail) {
            thumbnailSrc = '//localhost:9000/' + category._thumbnail.path
        }

        return (
            <tr className="unread" key={category._id}>
                <td style={{width: 20}}>
                    <div>
                        <input type="checkbox" id={'category_id_' + category._id}
                               data-key={category._id}
                               className="regular-checkbox"
                               checked={isChecked}
                               onChange={checkListItem}/>
                        <label htmlFor={'category_id_' + category._id}/>
                    </div>
                </td>
                <td style={{width: 40}} className="table-thumbnail">
                    <img src={thumbnailSrc}/>
                </td>
                <td>
                    <Link to={ '/categories/' + category._id}>
                        {category.title}
                    </Link>
                </td>
                <td>
                    <Link to={ '/categories/' + category._id}>
                        {description}
                    </Link>
                </td>
                <td>
                    {dateComponent}
                </td>
            </tr>
        )
    }
}

// export the connected class
function mapStateToProps(state) {
    return {
        // categories: state.category.categories || []
        activeCategory: state.category.activeCategory || []
    }
}

export default connect(mapStateToProps)(CategoriesMenuItem);