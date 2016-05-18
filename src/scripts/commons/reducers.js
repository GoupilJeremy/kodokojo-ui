import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/auth.reducer.js'
import signup from '../components/signup/signup.reducer'
import login from '../components/login/login.reducer'
import prefs from '../components/app/app.reducer'
import projectConfig from '../components/projectConfig/projectConfig.reducer'
import users from '../components/user/user.reducer'

const rootReducer = combineReducers({
  auth,
  signup,
  login,
  prefs,
  projectConfig,
  users,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer