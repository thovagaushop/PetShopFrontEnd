import React, { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

// const reducerHandler = {
//   INITIALIZE: (state, action) => {
//     const { isAuthenticated, user } = action.payload;

//     return {
//       ...state,
//       isAuthenticated,
//       isInitialized: true,
//       user
//     }
//   },
//   LOGIN: (state, action) => {
//     const { user } = action.payload;

//     return {
//       ...state,
//       isAuthenticated: true,
//       user
//     }
//   },

//   LOGOUT: (state, action) => {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null
//     }
//   }
// }

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, user: null };

    case "INIT":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const initialState = {
    isAuthenticated: !!storedToken,
    user: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
  //   } else {
  //     try {
  //       const user = await
  //     } catch (error) {

  //     }
  //   }
  // }, [dispatch]);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
