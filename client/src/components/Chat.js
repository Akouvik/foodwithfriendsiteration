import { connect } from 'react-redux';
import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const mapStateToProps = store => ({
  username: store.friends.username,
  cuisine: store.friends.cuisine
}); 

class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      socket: openSocket(`http://localhost:3000/${this.props.cuisine}`),
      message: '',
      messages: []
    };
    this.subscribeToMessages();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  subscribeToMessages(){
    this.state.socket.on('broadcast', message => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    })
  }

  handleOnChange(event){
    this.setState({ message: event.target.value })
  }

  handleOnClick(){
    const { username } = this.props;
    const { message } = this.state;
    const newMessage = { username, message };
    this.setState({
      message: '',
      messages: [...this.state.messages, newMessage ]
    }, () => {
      this.state.socket.emit('chat message', newMessage)
    })
  }

  render() {
    const messages = this.state.messages.map((msg, i) => <li key={i}>{msg.username.toUpperCase()}: {msg.message}</li>)
    return (
      <div>
        <ul className="msg-box" id="messages">
        { messages }
        </ul>
        <form className="msg-box-form" action="">
          <input className="msg-inbox" id="m" autoComplete="off" onChange={event => this.handleOnChange(event)} />
            <button type="button" id="msg-btn-enter" onClick={() => this.handleOnClick()} className="button msg-btn bg-green">Send</button>
        </form>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Chat);