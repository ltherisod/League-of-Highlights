const userReducer = (state = { user: false }, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...state, user: action.payload }
    case "LOG_IN":
      return {}

    default:
      return state
  }
}

export default userReducer
