import React, {Component} from 'react'
import moment from 'moment'

class ChatRoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  onChangeText(name, event) {
    this.setState({ [name]: event.target.value })
  }

  onKeyDown(event) {
    if(event.keyCode === 13) {
      const { onSend, UserData, type } = this.props
      const { text } = this.state
      let user_data = {
        id: UserData.id,
        name: UserData.name,
        photo: `https://graph.facebook.com/${UserData.id}/picture?type=square`
      }
      onSend(user_data, text, type)

      this.setState({ text: '' })
    }
  }

  render() {
    const { header, chat, type, UserData, pm_userdata, back } = this.props
    const { text } = this.state
    return(<div className='chat-room' style={{float: 'left', maxWidth: '80%'}}>
            {
              type !== 'common' ?
                <div>
                  <button onClick={back.bind(this)}>Back to Common Room</button></div>
              : null
            }
            {
              type === 'common' ?
                header
              : <div className="avatar">
                  <img src={`https://graph.facebook.com/${UserData.id}/picture?type=square`} draggable="false"/>
                  <img src={`https://graph.facebook.com/${pm_userdata.id}/picture?type=square`} draggable="false"/>
                </div>
            }
            <ol className="chat">
              {
                chat.map((message, i)=>{
                    return (<li className="other" key={'chat'+i}>
                              <div className="avatar">
                                <img src={message.user_data.photo} alt={message.user_data.name} draggable="false"/>
                                <div className='chatter_name'>{message.user_data.name}</div>
                              </div>
                              <div className="msg">
                                <p>{message.message}</p>
                                <time>{moment(message.time).format('h hh')}</time>
                              </div>
                            </li>)
                  })
              }        
            </ol>
            <input
              className="textarea"
              type="text"
              placeholder="Type here!"
              onChange = {this.onChangeText.bind(this, 'text')}
              onKeyDown={this.onKeyDown.bind(this)}
              value={text}
            />
            {
              <div className="emojis"></div>
            }
          </div>)
  }
}

export default ChatRoom