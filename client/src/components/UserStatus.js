import React from 'react';
import {socketConnect} from 'socket.io-react';
import { connect } from "react-redux";
import store from 'store';
import {storeConstants} from './../storeConstants';

class UserStatus extends React.Component {
    constructor() {
        super();
        this._updateUserStatus = this._updateUserStatus.bind(this);
        // console.log(this);
    }
    _updateUserStatus(data){
        var status = data.target.checked ? 'online' : 'offline';
        if (data.target.checked) {
            store.set(storeConstants.CURRENT_STATE, 'new');
        }
        this.props.socket.emit('updateStatus', {'status': status});
        this.props.dispatch({type: 'UPDATE_USER_STATUS', status: data.target.checked});
    }
    render() {
        return (
            <div className="clients_chat_search ">
                <div className="text-right">
                    <span className="pull-left">Включить чат</span>
                    <span className="toggle_module_venyoo darken">
                        <input className="input_venyoo_checkbox checkbox_module_venyoo email-permissions-chkbx"
                               type="checkbox" value="on" checked={this.props.userStatus} onChange={this._updateUserStatus}
                        />
                        <span className="box_module_venyoo">
                            <i className="fa fa-times inpt_checked" aria-hidden="true"> </i>
                            <i className="fa fa-check inpt_not_checked" aria-hidden="true"> </i>
                            <span className="check_module_venyoo"> </span>
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}

// export the connected class
function mapStateToProps(state) {
    return {
        userStatus: state.chat.userStatus || false,
    };
}

export default socketConnect(connect(mapStateToProps)(UserStatus));