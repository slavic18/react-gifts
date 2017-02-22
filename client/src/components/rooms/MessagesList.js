import React from 'react';
import {socketConnect} from 'socket.io-react';
import {connect} from 'react-redux';
import Message from './Message';
import striptags from 'striptags';
import {storeConstants} from '../../storeConstants';
import store from 'store';

class MessagesList extends React.Component {
    constructor() {
        super();
        this._receivedMessage = this._receivedMessage.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('receivedMessage', this._receivedMessage);
    }

    _receivedMessage(data) {
        let message = data.message || null;
        if (message) {
            message.message = striptags(message.message);
            if (message.message) {
                if (message._chatroomid === store.get(storeConstants.CURRENT_ROOM)) {
                    this.props.dispatch({type: 'RECEIVED_MESSAGE', message});
                }
            }
        }
    }

    render() {
        const messages = this.props.messages;
        return (
            <div className="clients_chat_messages_body">
                <div className="clients_chat_messages_wrapper" data-chat-container="room-messages">
                    {messages.map((message, index) => {
                        return (<Message key={index} message={message}/>)
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messages: state.chat.currentRoomMessages || []
    }
}
export default socketConnect(connect(mapStateToProps)(MessagesList));