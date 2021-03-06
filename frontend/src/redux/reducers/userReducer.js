const userReducer = (state = { user: false }, action) => {
  switch (action.type) {
    case "LOG_INTO_SYSTEM":
      return { ...state, user: { ...action.payload } }
    case "LOG_OUT":
      return { ...state, user: false }
    case "VERIFY_CODE":
      return {
        ...state,
        user: { ...state.user, verified: action.payload.verified },
      }
    default:
      return state
  }
}

export default userReducer
