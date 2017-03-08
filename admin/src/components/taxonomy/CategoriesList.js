import React from "react";
import CategoryMenuItem from "./CategoryMenuItem";

export default class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const categories = this.props.categories;
        return (
            <div>
                <div className="data-table-toolbar">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="btn-toolbar" role="toolbar">
                                <div className="btn-group">
                                    <div className="rows-check-cont">
                                        <div className="icheckbox_square-aero" aria-checked="false"
                                             aria-disabled="false"
                                             >
                                            <input type="checkbox" className="rows-check"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-group">
                                    <a className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-tag"/>
                                        <span className="caret"/>
                                    </a>
                                </div>
                                <div className="btn-group hidden-xs">
                                    <a data-toggle="tooltip" title="" className="btn btn-primary"
                                       data-original-title="Move to Archive">
                                        <i className="fa fa-inbox"/>
                                    </a>
                                    <a data-toggle="tooltip" title="" className="btn btn-primary"
                                       data-original-title="Mark spam">
                                        <i className="fa fa-exclamation-circle"/>
                                    </a>
                                    <a data-toggle="tooltip" title="" className="btn btn-primary"
                                       data-original-title="Move to Trash">
                                        <i className="fa fa-trash-o"/>
                                    </a>
                                </div>
                                <div className="btn-group hidden-xs">
                                    <a data-toggle="tooltip" title="" className="btn btn-primary"
                                       data-original-title="Refresh"><i
                                        className="fa fa-undo"/></a>
                                </div>
                                <div className="btn-group">
                                    <a data-toggle="tooltip" title="" className="btn btn-primary"
                                       data-original-title="Move to folder">
                                        <i className="fa fa-folder"/>
                                        <span className="caret"/>
                                    </a>
                                </div>
                                <div className="btn-group">
                                    <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">More
                                        <span className="caret"/>
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#fakelink">Mark all as <b>Read</b></a></li>
                                        <li><a href="#fakelink">Mark all as <b>Unread</b></a></li>
                                        <li><a href="#fakelink">Move all to Archive</a></li>
                                        <li className="divider"/>
                                        <li><a href="#fakelink">Move all to Trash</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 hidden-xs">
                            <div className="pull-right">
                                <span className="paging-status">20 of 250</span>
                                <div className="btn-group">
                                    <a className="btn btn-default"><i className="fa fa-chevron-left"/></a>
                                    <a className="btn btn-default"><i className="fa fa-chevron-right"/></a>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-expanded="false">
                                        <i className="fa fa-cog"/>
                                    </button>
                                    <ul className="dropdown-menu pull-right" role="menu">
                                        <li><a href="#fakelink">Action</a></li>
                                        <li><a href="#fakelink">Another action</a></li>
                                        <li><a href="#fakelink">Something else here</a></li>
                                        <li className="divider"/>
                                        <li><a href="#fakelink">Separated link</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mail-list">
                    <div className="table-responsive">
                        <table className="table table-hover table-message">
                            <tbody>
                            {categories.map((value, index) => {
                                return (<CategoryMenuItem key={index} category={value}/>)
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

