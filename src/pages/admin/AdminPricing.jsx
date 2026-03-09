import { useEffect, useState } from "react";
import Seo from "../../seo/Seo";
import ImageUploader from "../../components/admin/ImageUploader";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function AdminPricing() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [pc, setPc] = useState("");
  const [mob, setMob] = useState("");
  const [altPc, setAltPc] = useState("");
  const [altMob, setAltMob] = useState("");
  const [summary, setSummary] = useState("명함: 개당 200원~\n포스터: A3 3,000원~\n재질/후가공에 따라 변동");

  const load = async () => {
    const snap = await getDoc(doc(db, "pricing_sheet", "current"));
    if (!snap.exists()) return;

    const v = snap.data();
    setData(v);
    setTitle(v.title || "");
    setPc(v.imageUrlPc || "");
    setMob(v.imageUrlMobile || "");
    setAltPc(v.altTextPc || "");
    setAltMob(v.altTextMobile || "");
    setSummary(Array.isArray(v.summaryText) ? v.summaryText.join("\n") : "");
  };

  useEffect(() => {
    load();
  }, []);

  const onSave = async () => {
    await setDoc(
      doc(db, "pricing_sheet", "current"),
      {
        title,
        imageUrlPc: pc,
        imageUrlMobile: mob,
        altTextPc: altPc,
        altTextMobile: altMob,
        summaryText: summary
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    await load();
    alert("저장 완료");
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <Seo title="관리자-단가표(이미지)" />
      <h1>단가표(이미지) 관리</h1>

      <label style={{ display: "grid", gap: 6, marginTop: 12 }}>
        <div>제목</div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 2026년 3월 단가표" />
      </label>

      <div style={{ marginTop: 14, padding: 12, border: "1px solid #ddd", borderRadius: 12 }}>
        <h3>PC용 단가표 이미지</h3>
        <ImageUploader pathPrefix="pricing" onUploaded={setPc} />
        {pc ? <img src={pc} alt="PC 단가표 미리보기" style={{ width: "100%", marginTop: 10, borderRadius: 12 }} /> : null}
        <label style={{ display: "grid", gap: 6, marginTop: 10 }}>
          <div>alt 텍스트(PC)</div>
          <input value={altPc} onChange={(e) => setAltPc(e.target.value)} placeholder="예: 디자인 동네 단가표(PC용)" />
        </label>
      </div>

      <div style={{ marginTop: 14, padding: 12, border: "1px solid #ddd", borderRadius: 12 }}>
        <h3>모바일용 단가표 이미지(선택)</h3>
        <ImageUploader pathPrefix="pricing" onUploaded={setMob} />
        {mob ? <img src={mob} alt="모바일 단가표 미리보기" style={{ width: "100%", marginTop: 10, borderRadius: 12 }} /> : null}
        <label style={{ display: "grid", gap: 6, marginTop: 10 }}>
          <div>alt 텍스트(모바일)</div>
          <input value={altMob} onChange={(e) => setAltMob(e.target.value)} placeholder="예: 디자인 동네 단가표(모바일용)" />
        </label>
      </div>

      <label style={{ display: "grid", gap: 6, marginTop: 14 }}>
        <div>대표 단가 요약(검색/접근성 보완용) — 줄바꿈으로 입력</div>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={5} />
      </label>

      <button style={{ marginTop: 14 }} onClick={onSave}>
        저장
      </button>

      {data?.updatedAt ? (
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
          마지막 업데이트: (Firestore Timestamp)
        </div>
      ) : null}
    </div>
  );
}