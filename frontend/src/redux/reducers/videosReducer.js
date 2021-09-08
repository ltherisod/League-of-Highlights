const userReducer = (state = { userVideos: [] }, action) => {
	switch (action.type) {
		case "GET_VIDEOS_USER":
			return {...state, userVideos: action.payload}

		case "ADD_VIDEO": 
			let addVideo = state.userVideos.push(action.payload)
			return {...state, userVideos: addVideo }
		
		case "DELETE_VIDEO":
			let deleteVideos = state.userVideos.find((video) => video._id !== action.payload)
			return {...state, userVideos: deleteVideos}

		default:
			return state
	}
}