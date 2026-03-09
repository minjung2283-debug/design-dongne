import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import Seo from "../../seo/Seo";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const onLogin = async () => {
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      nav("/admin");
    } catch (e) {
      setErr("로그인 실패");
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <Seo title="관리자 로그인" />
      <h1>관리자 로그인</h1>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <button onClick={onLogin}>로그인</button>
      {err ? <div style={{ color: "crimson", marginTop: 8 }}>{err}</div> : null}
    </div>
  );
}