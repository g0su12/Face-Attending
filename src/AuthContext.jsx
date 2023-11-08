import React, {useContext, useEffect, useState} from "react";
import {auth} from "./firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const AuthContext = React.createContext(undefined);

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loginInfo, setLoginInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function signup(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await login(auth, loginInfo.email, loginInfo.password);
        return user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoginInfo({"email": email, "password": password});
      })
      .catch((error) => {
        if (!loginInfo) {
          toast.warn('Your email or password is not correct!');
          navigate("/login");
        }
      });
  }

  function logout() {
    return auth.signOut()
      .then(() => {
        // Signed in
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser({user});
      setLoading(false);
    });
  }, [])

  const value = {
    loginInfo,
    currentUser,
    personalInfo,
    login,
    signup,
    logout,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}