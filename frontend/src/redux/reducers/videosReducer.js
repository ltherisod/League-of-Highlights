const videosReducer = (state = { userVideos: [] }, action) => {
	switch (action.type) {
		case "GET_VIDEOS_USER":
			return {...state, userVideos: action.payload}
		case "ADD_VIDEO": 
			return {...state, userVideos: [action.payload, ...state.userVideos]}
		case "DELETE_VIDEO":
			let deleteVideos = state.userVideos.filter((video) => video._id !== action.payload)
			return {...state, userVideos: deleteVideos}
		default:
			return state
	}
}