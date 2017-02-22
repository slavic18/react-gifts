import React from 'react';
import {socketConnect} from 'socket.io-react';
import {connect} from 'react-redux';
import MessagesList from './MessagesList';
import SendMessageForm from './SendMessageForm';
class OpenedRoom extends React.Component {
    constructor() {
        super();
        this._openRoom = this._openRoom.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('getOpenRoomState', this._openRoom);
    }

    _openRoom(data) {
        this.props.dispatch({type: 'GET_OPEN_ROOM_STATE', data})
    }

    render() {
        return (
            <div>
                <MessagesList/>
                <SendMessageForm/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}

export default socketConnect(connect(mapStateToProps)(OpenedRoom));