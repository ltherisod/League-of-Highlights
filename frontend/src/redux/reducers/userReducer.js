const userReducer = (state = { user: false }, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...state, user: action.payload }
    case "LOG_IN": //son los dos iguales, hacer uno = ?
      return {... state, user: action.payload}

    default:
      return state
  }
}

export default userReducer
