/*eslint-disable no-undef*/

import React, { Component } from 'react';
import moment from 'moment'
import Login from './Login'
import UserList from './UserList'
import ChatRoom from './ChatRoom'
import './chat.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  SendMessage, LogIn,
  CreateRoom,
  Seen,
  SendPM
} from './redux/action/chat'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      username: '',
      type: 'common',
      header: 'Common Room'
    }
  }  

  onSend(userdata, text, type) {
    const { SendMessage, SendPM } = this.props
    if (type === 'pm') {
      const { pm_userdata } = this.state
      let user_data = {
        id: pm_userdata.id,
        room: pm_userdata.room,
        name: userdata.name,
        photo: `https://graph.facebook.com/${userdata.id}/picture?type=square`
      }
      SendPM(user_data, text)
    } else {
      SendMessage(userdata, text)
    }
  }

  onClickUser(userdata) {
    const { chatty, CreateRoom, Seen } = this.props

    if (!userdata.room) {
      const room = chatty.chat.log_in_data.id + userdata.id 
      userdata.room = room
      CreateRoom({
        room,
        to: userdata.socket_id,
        from: chatty.chat.log_in_data.socket_id
      })
    }

    if (userdata.newMessage) {
      Seen(userdata)
    }

    this.setState({
      type: 'pm',
      pm_userdata: userdata,
      header: `${chatty.chat.log_in_data.name} + ${userdata.name}`
    })
  }

  back() {
    this.setState({ type: 'common', header: 'Common Room' })
  }

  render() {
    const { text, header, type, pm_userdata } = this.state
    const { chatty, LogIn } = this.props

    let chat = []
    if (type === 'common') {
      chat = chatty.chat.messages
    } else {
      chat = chatty.chat.privateRoom[pm_userdata.room] ? 
        chatty.chat.privateRoom[pm_userdata.room].messages : []
    }

    return (
      <div>
      {
        chatty.chat.log_in_data ? 
          <ChatRoom
            header={header}
            type={type}
            chat={chat}
            UserData={chatty.chat.log_in_data}
            pm_userdata={pm_userdata}
            onSend = {this.onSend.bind(this)}
            back = {this.back.bind(this)}
          />
        : <Login LogIn={LogIn} />
      }
      {
        type === 'common' ? 
          <UserList
            users={chatty.chat.online_users}
            onClickUser={this.onClickUser.bind(this)}
          />
        : null
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatty: state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  SendMessage,
  SendPM, CreateRoom,
  Seen,
  LogIn
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
