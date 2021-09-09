const videosReducer = (state = { userVideos: [] }, action) => {
  switch (action.type) {
    case "GET_VIDEOS_USER":
      return { ...state, userVideos: action.payload }

    case "ADD_VIDEO":
      return { ...state, userVideos: [action.payload, ...state.userVideos] }

    case "DELETE_VIDEO":
      return {
        ...state,
        userVideos: state.userVideos.filter(
          (video) => video._id !== action.payload._id
        ),
      }
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
    case "ADD_COMMENT":
      return {
        ...state,
        userVideos: state.userVideos.map((video) => {
          if (video._id === action.payload._id) {
            return { ...video, comments: [...action.payload.comments] }
          }
          return video
        }),
      }
    case "DELETE_COMMENT":
      return {
        ...state,
        userVideos: state.userVideos.map((video) => {
          if (video._id === action.payload.videoId) {
            return {
              ...video,
              comments: video.comments.filter(
                (comment) => comment._id !== action.payload.commentId
              ),
            }
          }
          return video
        }),
      }
    case "UPDATE_COMMENT":
      return {
        ...state,
        userVideos: state.userVideos.map((video) => {
          if (video._id === action.payload._id) {
            return {
              ...video,
              comments: video.comments.map((comment) => {
                if (comment._id === action.payload.commentId) {
                  return { ...comment, content: action.payload.newContent }
                }
                return comment
              }),
            }
          }
          return video
        }),
      }
    case "TOGGLE_LIKE":
      return {
        ...state,
        userVideos: state.userVideos.map((video) => {
          if (video._id === action.payload.videoId) {
            return {
              ...video,
              likes: video.likes.includes(action.payload.userId)
                ? video.likes.filter((uid) => uid !== action.payload.userId)
                : [...video.likes, action.payload.userId],
            }
          }
          return video
        }),
      }
    default:
      return state
  }
}

export default videosReducer
