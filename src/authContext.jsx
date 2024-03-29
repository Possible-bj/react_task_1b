import React, { useReducer } from 'react'
import MkdSDK from './utils/MkdSDK'

export const AuthContext = React.createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //TODO
      localStorage.setItem('user', JSON.stringify(action.payload))
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        role: action.payload.role,
        token: action.payload.token,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      }
    default:
      return state
  }
}

let sdk = new MkdSDK()

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem('role')
  if (errorMessage === 'TOKEN_EXPIRED') {
    dispatch({
      type: 'Logout',
    })
    window.location.href = '/' + role + '/login'
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  React.useEffect(() => {
    //TODO
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
