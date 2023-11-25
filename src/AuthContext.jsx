import React, { useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { child, get, getDatabase, ref } from 'firebase/database';

const AuthContext = React.createContext(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loginInfo, setLoginInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dbRef = ref(getDatabase());

  async function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (loginInfo) {
          await login(loginInfo.email, loginInfo.password);
        }
        return user.uid;
      })
      .catch((error) => {});
  }

  async function login(email, password) {
    try {
      setLoginInfo({ email: email, password: password });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await get(child(dbRef, `Users/` + userCredential.user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          setPersonalInfo(snapshot.val());
        }
      });
    } catch (error) {
      toast.warn('Your email or password is not correct!');
      navigate('/login');
    }
  }

  async function logout() {
    try {
      await auth.signOut();
      // Signed in
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser({ user });
      setLoading(false);
    });
  }, []);

  const value = {
    loginInfo,
    currentUser,
    personalInfo,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
