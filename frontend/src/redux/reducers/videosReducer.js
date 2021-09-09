const videosReducer = (state = { userVideos: [] }, action) => {
  switch (action.type) {
    case "GET_VIDEOS_USER":
      return { ...state, userVideos: action.payload }

    case "ADD_VIDEO":
      return { ...state, userVideos: [action.payload, ...state.userVideos] }

    case "DELETE_VIDEO":
      let deleteVideos = state.userVideos.filter(
        (video) => video._id !== action.payload
      )
      return { ...state, userVideos: deleteVideos }
    case "ON_COMMENT_ACTION":
      return {
        ...state,
        userVideos: state.userVideos.map((video) => {
          if (video._id === action.payload._id) {
            video.comments = action.payload.comments
          }
          return video
        }),
      }
    // case 'DELETE_COMMENT':
    //   return {
    //     ...state,
    //     userVideos: state.userVideos.map(video => {
    //       if (video._id === action.payload._id) {
    //         video.comments = video.comments.filter(comment => comment._id !== action.payload.commentId)
    //       }
    //       return video
    //     })
    //   }
    // case 'UPDATE_COMMENT':
    //   return {
    //     ...state,
    //     userVideos: state.userVideos.map(video => {
    //       if (video._id === action.payload._id) {
    //         video.comments =
    //       }
    //       return video
    //     })
    //   }
    default:
      return state
  }
}

export default videosReducer
