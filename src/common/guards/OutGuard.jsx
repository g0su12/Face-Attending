import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";
import {getDatabase, ref, child, get} from "firebase/database";
import {toast} from "react-toastify";

export function OutGuard({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  }, [currentUser, navigate]);

  return !currentUser ? children : navigate("/")
}