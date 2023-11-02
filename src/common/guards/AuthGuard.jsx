import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";
import {getDatabase, ref, child, get} from "firebase/database";
import {toast} from "react-toastify";

export function PrivateRoute({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (currentUser) {
        const dbRef = ref(getDatabase());
        try {
          const personalInfoSnapshot = await get(child(dbRef, `Users/${currentUser.user.uid}`));
          const personalInfo = personalInfoSnapshot.val();

          if (personalInfo.role !== 'admin') {
            toast.warn('Your email or password is not correct!');
            await logout();
          }
        } catch (error) {
          navigate('/login');
        }
      }
    };

    fetchPersonalInfo().then(r => {});
  }, [currentUser, navigate]);

  return currentUser ? children : navigate("/login")
}