import { combineReducers } from "redux"
import userReducer from "./userReducer"
import videosReducer from "./videosReducer"

const rootReducer = combineReducers({
  user: userReducer,
  videos: videosReducer,
})

export default rootReducer
