import {combineReducers} from 'redux'
import userReducer from './userReducer'
import videosReducer from './videosReducer'

const rootReducer = combineReducers({
	user: userReducer,
	video: videosReducer
})

export default rootReducer