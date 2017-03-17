import React from "react";
import {Pagination} from "react-bootstrap";

export default class ListActions extends React.Component {
    render() {
        return (
            <div className="data-table-toolbar">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="btn-toolbar" role="toolbar">
                            <div className="btn-group">
                                <div>
                                    <input type="checkbox" id="select-all" onChange={this.props.selectAllItems}
                                           className="regular-checkbox"/>
                                    <label htmlFor="select-all"/>
                                </div>
                            </div>

                            <div className="btn-group hidden-xs">
                                <a className="btn btn-primary" onClick={this.props.removeItems}>
                                    <i className="fa fa-trash-o"/>
                                </a>
                            </div>
                            <div className="btn-group hidden-xs">
                                <a onClick={() => {
                                    window.location.reload()
                                }} className="btn btn-primary">
                                    <i className="fa fa-undo"/>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-4 hidden-xs">
                        <div className="pull-right">
                            <Pagination className="users-pagination no-margin" bsSize="medium" maxButtons={10} first
                                        last next
                                        prev boundaryLinks items={this.props.pages} activePage={this.props.page}
                                        onSelect={this.props.changePage}/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}