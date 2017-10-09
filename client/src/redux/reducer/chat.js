let InitialState = {
  messages: [],
  log_in_data: null,
  online_users: [],
  personalMessage: {},
  privateRoom: {}
}

export default (state = InitialState, action) => {
  switch(action.type){
    case 'message':
      // console.log('action', action)
      // return Object.assign({}, {message:action.data, type: action.type});
      let { messages } = state
      messages = messages.concat(action.data)
      return { ...state, messages: messages }
    case 'personal_message': {
      let { privateRoom, online_users } = state
      // console.log('personalMessage', action.data)
      const userData = action.data.user_data
      const message = {
        message: action.data.message,
        time: action.data.time,
        user_data: userData
      }
      if (privateRoom[action.data.user_data.room]) {
        privateRoom[action.data.user_data.room].messages = privateRoom[action.data.user_data.room].messages.concat(message)
      } else {
        privateRoom[action.data.user_data.room] = { messages: [message] }
      }

      let online = online_users.slice()
      online = online_users.map((user)=>{
        if(user.socket_id === action.data.socket_id) {
          user = { ...user, newMessage: true }
        }
        return user
      })

      return { ...state, privateRoom: privateRoom, online_users: online }
    }
    case 'private_room_created': {
      let { online_users, privateRoom } = state
      let online = online_users.slice()
      // online_users = online_users.concat(action.data)
      // console.log('private_room_created', action.data)
      online = online_users.map((user)=>{
        if(user.socket_id === action.data.from) {
          user = { ...user, room: action.data.room }
        }

        return user
      })

      privateRoom[action.data.room] = { messages: [] }
      return { ...state, online_users: online, privateRoom: privateRoom }
    }
    case 'login':
      return { ...state, log_in_data: action.data }
    case 'seen': {
      // console.log('seen', action.data)
      let { online_users } = state
      let online = online_users.slice()
      online = online_users.map((user)=>{
        if(user.id === action.data.id) {
          user = { ...user, newMessage: false }
        }
        return user
      })

      return { ...state, online_users: online }
    }
    case 'join':
      // console.log('someone joined')
      let { online_users } = state
      online_users = online_users.concat(action.data)
      return { ...state, online_users: online_users }
    default:
      return state;
  }
}