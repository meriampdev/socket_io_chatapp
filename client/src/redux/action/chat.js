export const SendMessage = (user_data, message) => {
  return {
    type: 'server/hello',
    data: { user_data, message }
  }
}

export const SendPM = (user_data, message) => {
  return {
    type: 'server/pm',
    data: {user_data, message}
  }
}

export const CreateRoom = (data) => {
  return {
    type: 'server/CreateRoom',
    data: {data}
  }
}

export const Seen = (data) => {
  return {
    type: 'seen',
    data: data
  }
}

export const LogIn = (data) => {
  return {
    type: 'server/login',
    data: data
  }
}