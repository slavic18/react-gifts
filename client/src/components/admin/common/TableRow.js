import React from "react";
import {Link} from "react-router";
import {FormattedDate} from "react-intl";

export default class TableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {item, isChecked, checkListItem, path} = this.props;
        let thumbnailSrc = '//markmusto.com/wp-content/themes/equilibrium/images/layout/no-thumb.gif';
        let categoryName = !!item._category ? item._category.title : '';
        if (!item.description) {
            item.description = '';
        }
        let description = item.description.length > 150 ? item.description.substr(0, 150) + ' ...' : item.description,
            dateComponent = '';
        if (!!item.updated_at) {
            dateComponent = <FormattedDate value={item.updated_at} day="numeric" month="numeric" year="numeric"/>;
        }
        if (!!item._thumbnail) {
            thumbnailSrc = '//localhost:9000/' + item._thumbnail.path
        }


        return (
            <tr className="unread" key={item._id}>
                <td style={{width: 20}}>
                    <div>
                        <input type="checkbox" id={'item_id_' + item._id}
                               data-key={item._id}
                               className="regular-checkbox"
                               checked={isChecked}
                               onChange={checkListItem}/>
                        <label htmlFor={'item_id_' + item._id}/>
                    </div>
                </td>
                <td style={{width: 40}} className="table-thumbnail">
                    <img src={thumbnailSrc}/>
                </td>
                <td>
                    <Link to={ '/admin/' + path + '/' + item._id}>
                        {item.title}
                    </Link>
                </td>
                <td>
                    <Link to={ '/admin/' + path + '/' + item._id}>
                        {description}
                    </Link>
                </td>
                <td>
                    <Link to={ '/admin/' + path + '/' + item._id}>
                        {categoryName}
                    </Link>
                </td>
                <td>
                    {dateComponent}
                </td>
            </tr>
        )
    }
}