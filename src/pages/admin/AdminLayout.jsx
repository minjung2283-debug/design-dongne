import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const s = ({ isActive }) => ({
    padding: "8px 10px",
    borderRadius: 10,
    textDecoration: "none",
    color: isActive ? "white" : "#ddd",
    background: isActive ? "#333" : "transparent",
  });

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <aside style={{ padding: 16, background: "#111", color: "white" }}>
        <div style={{ fontWeight: 800, marginBottom: 12 }}>Admin</div>
        <nav style={{ display: "grid", gap: 6 }}>
          <NavLink to="/admin" end style={s}>대시보드</NavLink>
          <NavLink to="/admin/company" style={s}>회사정보</NavLink>
          <NavLink to="/admin/portfolio" style={s}>실적물</NavLink>
          <NavLink to="/admin/pricing" style={s}>단가표</NavLink>
        </nav>
      </aside>
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}