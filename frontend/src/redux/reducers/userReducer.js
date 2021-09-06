const userReducer = (state = { user: false }, action) => {
  switch (action.type) {
    case "LOG_INTO_SYSTEM":
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export default userReducer
