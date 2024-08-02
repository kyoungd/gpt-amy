import React from 'react';
import axios from 'axios';
// import { setMilliseconds } from 'date-fns';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  settings: {},
  // add other initial state properties as needed
};

function userReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case 'LOGIN_FAILURE':
        return { ...state };

      case 'LOGIN_SUCCESS':
        // Ensure action.payload is an object
        if (typeof action.payload !== 'object') {
          throw new Error('Payload for LOGIN_SUCCESS must be an object');
        }
        return { ...state, isAuthenticated: true, ...action.payload };

      case 'SIGN_OUT_SUCCESS':
        return { ...state, isAuthenticated: false };

      case 'SETTINGS':
        // Ensure action.payload is an object
        if (typeof action.payload !== 'object') {
          throw new Error('Payload for SETTINGS must be an object');
        }
        return { ...state, settings: action.payload };

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  } catch (error) {
    console.error('Reducer error:', error);
    // Optionally, set an error state here
    return { ...state, error: error.message };
  }
}

function setStatusAfterSubscription() {
  let user = getCookieUser();
  user.is_subscription = 'true';
}

function getCookieUser() {
  return {};
}

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: false,
    jwt: "",
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
