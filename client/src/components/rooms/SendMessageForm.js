import React from 'react';
import {socketConnect} from 'socket.io-react';
import {storeConstants} from '../../storeConstants';
import {connect} from 'react-redux';
import store from 'store';

class SendMessageForm extends React.Component {
    constructor() {
        super();
        this._sendMessage = this._sendMessage.bind(this);
        this.handleMessageState = this.handleMessageState.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.state = {message: ''};
    }

    handleMessageState(data) {
        this.setState({message: data.target.value});
    }
    handleKeyUp(e) {
        if ((e.keyCode || e.which) == 13) {
            e.preventDefault();
            this._sendMessage(e);
            return false;
        }
    }

    _sendMessage(e) {
        e.preventDefault();
        let currentRoomId = store.get(storeConstants.CURRENT_ROOM);
        try {
            if (!currentRoomId) {
                throw new Error('Room is not selected');
            }
            if (this.state.message == '') {
                throw new Error('Empty message');
            }
            this.props.socket.emit('chatmessage', {_chatroomid: currentRoomId, message: this.state.message});
            this.setState({message: ''});
        } catch (e) {
            alert(e.message);
            return false;
        }
    }

    render() {
        return (
            <div className="clients_chat_body_message_write">
                <form onSubmit={this._sendMessage}>
                    <div className="write_message_for">
                        <textarea name="write_message" value={this.state.message} data-chat-container="message-textarea"
                                  placeholder="Написать сообщение клиенту..." onKeyUp={this.handleKeyUp} onChange={this.handleMessageState}>
                        </textarea>
                    </div>
                    <button className="write_message_btn">
                        <svg viewBox="0 0 16.94 14.938">
                            <path
                                d="M-0.009,7.454 C0.011,7.812 0.243,8.113 0.579,8.216 L6.791,10.141 L7.019,14.530 C7.029,14.704 7.144,14.856 7.306,14.913 C7.351,14.931 7.400,14.938 7.444,14.938 C7.566,14.938 7.680,14.888 7.763,14.793 L9.959,12.300 L13.072,14.509 C13.210,14.608 13.373,14.661 13.542,14.661 C13.933,14.661 14.272,14.378 14.355,13.981 L16.939,0.484 C16.970,0.328 16.911,0.165 16.794,0.066 C16.673,-0.037 16.510,-0.062 16.365,-0.002 L0.489,6.621 C0.167,6.770 -0.030,7.096 -0.009,7.454 Z"/>
                        </svg>
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default socketConnect(connect(mapStateToProps)(SendMessageForm));