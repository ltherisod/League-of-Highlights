import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { applyMiddleware, createStore, compose } from "redux"
import { Provider } from "react-redux"
import rootReducer from "./redux/reducers/rootReducer"
import thunk from "redux-thunk"

const composeEnhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const globalStore = createStore(rootReducer, composeEnhancer)

ReactDOM.render(
  <Provider store={globalStore}>
    <App />
  </Provider>,
  document.getElementById("root")
)
