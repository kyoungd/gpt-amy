import React from 'react';
import axios from 'axios';
// import { setMilliseconds } from 'date-fns';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  try {
    switch (action.type) {
      case 'LOGIN_FAILURE':
        return { ...state };
      case 'LOGIN_SUCCESS':
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('jwt', action.payload.jwt);
        return { ...state, isAuthenticated: true, ...action.payload };
      case 'SIGN_OUT_SUCCESS':
        localStorage.removeItem('user');
        localStorage.removeItem('jwt', '');
        return { ...state, isAuthenticated: false };
      case 'SETTINGS':
        return { ...state, settings: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }  
  }
  catch (error) {
    console.log(error);
  }
}

function setStatusAfterSubscription() {
  let user = getCookieUser();
  user.is_subscription = 'true';
  localStorage.setItem('user', JSON.stringify(user));
}

function getCookieUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return {};
  }
}

// function getLocalStorageJsonArray(name) {
//   try {
//     const item = localStorage.getItem(name);
//     if (typeof item === 'string')
//       return JSON.parse(item)
//     return item
//   } catch {
//     return [];
//   }
// }

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem('jwt'),
    jwt: localStorage.getItem('jwt'),
    user: getCookieUser(),
    settings: {}
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

// ###########################################################

function loginSuccess(dispatch, navigate, user, jwt) {
  console.log('loginSuccess():', user);
  dispatch({ type: 'LOGIN_SUCCESS', payload: { user, jwt } });
  navigate('/', { replace: true });
}

function loginUser(dispatch, login, password, navigate, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  const url = process.env.REACT_APP_SERVER_LOGIN || 'http://localhost:1337/api/auth/local';
  return axios
    .post(url, {
      identifier: login,
      password
    })
    .then((response) => {
      // Handle success.
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      // localStorage.setItem('id_token', response.data.jwt);
      setError(null);
      setIsLoading(false);
      // dispatch({ type: 'LOGIN_SUCCESS', payload: {user: response.data.user, jwt: response.data.jwt} });
      return response.data;
    })
    .catch((error) => {
      dispatch({ type: 'LOGIN_FAILURE' });
      setError('*** LOGIN FAILED. Check username and password.');
      setIsLoading(false);
        // Handle error.
      console.log('An error occurred:', error.response);
      throw error;
    });
}

function registerUser(dispatch, navigate, name, email, password, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const url =
    process.env.REACT_APP_SERVER_REGISTER || 'http://localhost:1337/api/auth/local/register';
  if (!!name && !!email && !!password) {
    axios
      .post(url, {
        username: name,
        email,
        password
      })
      .then((response) => {
        // Handle success.
        // console.log('User profile', response.data.user);
        // console.log('User token', response.data.jwt);
        // localStorage.setItem('id_token', response.data.jwt);
        setError(null);
        setIsLoading(false);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data.user, jwt: response.data.jwt } });
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      })
      .catch((error) => {
        // Handle error.
        setIsLoading(false);
        setError(error);
        console.log('An error occurred:', error.response);
      });
  } else {
    setError('Registration failed.  Missing username, email or password.');
    setIsLoading(false);
  }
}

function signOut(dispatch) {
  // localStorage.removeItem('id_token');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  loginSuccess,
  signOut,
  registerUser,
  setStatusAfterSubscription
};
