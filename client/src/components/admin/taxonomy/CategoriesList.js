import React from "react";
import {connect} from "react-redux";
import {Pagination} from "react-bootstrap";
import {push} from "react-router-redux";
import TableRow from "../common/TableRow";
import ListActions from "../common/ListActions";

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
        };

        this.selectAllItems = this.selectAllItems.bind(this);
        this.updateSelectedItems = this.updateSelectedItems.bind(this);
        this.removeItems = this.removeItems.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_CATEGORIES'});
    }

    selectAllItems(e) {
        let selectedItems = [];
        if (e.target.checked) {
            this.props.items.map((item) => {
                selectedItems.push(item['_id']);
            });
        }
        this.setState({selectedItems});
    }

    updateSelectedItems(e) {
        let selectedItems = this.state.selectedItems;
        if (e.target.checked) {
            selectedItems.push(e.target.dataset.key);
        } else {
            selectedItems = selectedItems.filter(value => String(value) != String(e.target.dataset.key));
        }
        this.setState({selectedItems});
    }


    removeItems() {
        this.props.dispatch({type: 'REMOVE_CATEGORIES', items: this.state.selectedItems});
    }

    changePage(page) {
        this.props.dispatch(push(window.location.pathname + '?page=' + page));
    }


    render() {
        const items = this.props.items;
        const {page} = this.props;
        const perPage = 20;
        const startOffset = (page - 1) * perPage;
        let pages = Math.ceil(items.length / perPage),
            startCount = 0;

        return (
            <div>
                <h2>Categories</h2>

                <ListActions selectAllItems={this.selectAllItems}
                             removeItems={this.removeItems}
                             pages={pages}
                             page={page}
                             changePage={this.changePage}
                />
                <div className="mail-list">
                    <div className="table-responsive">
                        <table className="table table-hover table-message">
                            <tbody>
                            {items.map((value, index) => {
                                if (index >= startOffset && startCount < perPage) {
                                    startCount++;
                                    let isChecked = false;
                                    let activeItems = this.state.selectedItems.filter(item => {
                                        return String(item) == String(value._id)
                                    });
                                    if (activeItems.length) {
                                        isChecked = true;
                                    }

                                    return (
                                        <TableRow
                                            key={index}
                                            item={value}
                                            checkListItem={this.updateSelectedItems}
                                            isChecked={isChecked}
                                            path="categories"
                                        />
                                    )
                                }
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <Pagination className="users-pagination " bsSize="medium" maxButtons={10} first last next
                                    prev boundaryLinks items={pages} activePage={page} onSelect={this.changePage}/>
                    </div>

                </div>
            </div>
        )
    }
}


// export the connected class
function mapStateToProps(state) {
    return {
        items: state.category.categories || [],
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
    };
}
export default connect(mapStateToProps)(CategoriesList);


