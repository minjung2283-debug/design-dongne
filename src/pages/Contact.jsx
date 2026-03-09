import { useDoc } from "../hooks/useDoc";

export default function Home() {
  const { data: company, loading } = useDoc("company", "info");

  return (
    <section style={{ marginTop: 26 }}>
      <h2>연락처</h2>
      <div style={{ display: "grid", gap: 8, padding: 12, border: "1px solid #eee", borderRadius: 12 }}>
        {loading ? (
          <div>불러오는 중...</div>
        ) : company ? (
          <>
            <div>이메일: {company.email || "-"}</div>
            <div>전화번호: {company.phone || "-"}</div>
            <div>주소: {company.address || "-"}</div>
          </>
        ) : (
          <div>회사 정보가 없습니다.</div>
        )}
      </div>
    </section>
  );
}