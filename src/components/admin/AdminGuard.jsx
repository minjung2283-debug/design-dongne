import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) nav("/admin/login");
      setReady(true);
    });
    return () => unsub();
  }, [nav]);

  if (!ready) return null;
  return children;
}