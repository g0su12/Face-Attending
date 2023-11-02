import React, {useContext, useEffect, useState} from "react";
import {auth} from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {getDatabase, ref, child, get} from "firebase/database";
import {toast} from "react-toastify";

const AuthContext = React.createContext(undefined);

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [personalInfo, setPersonalInfo] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const {user} = userCredential;
      })
      .catch((error) => {
        console.log(error);
        toast.warn('Your email or password is not correct!');
        navigate("/login");
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

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser({user});
      setLoading(false);
    });
  }, [])

  const value = {
    currentUser,
    personalInfo,
    isAdmin,
    setIsAdmin,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}