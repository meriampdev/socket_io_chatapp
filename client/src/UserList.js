import React, { Component } from 'react';

class UserList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { users, onClickUser } = this.props
    return (
      <div className='online-users'>
        <div>Online Users</div>
        <ol className="chat">
          {
            users.map((user, i)=>{
              let photo = `https://graph.facebook.com/${user.id}/picture?type=square`
              return (<li className="other" key={'user'+i}
                        onClick={onClickUser.bind(this, user)}
                      > 
                        {
                          user.newMessage ? 
                            <div className='notification'></div>
                          : null
                        }
                        <div className="avatar">
                          <img src={photo} alt={user.name} draggable="false"/>
                        </div>
                        <div className="msg">
                          <p>{user.name}</p>
                        </div>
                      </li>)
            })
          }
        </ol>
      </div>)
  }
}

export default UserList