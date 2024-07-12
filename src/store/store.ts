import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { chefReducer } from "./reducers/chef.reducer"
import { userReducer } from "./reducers/user.reducer"
import { systemReducer } from './reducers/system.reducer'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        gStore: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    chefModule: chefReducer,
    userModule: userReducer,
    systemModule: systemReducer
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
