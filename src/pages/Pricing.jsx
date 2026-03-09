import Seo from "../seo/Seo";
import { useDoc } from "../hooks/useDoc";

export default function Pricing() {
  const { data, loading } = useDoc("pricing_sheet", "current");

  return (
    <div style={{ maxWidth: 980 }}>
      <Seo title="단가표" description="명함, 포스터 등 항목별 대략 단가를 단가표 이미지로 확인할 수 있어요." />
      <h1>단가표</h1>

      <style>{`
        .sheet { width: 100%; border-radius: 12px; border: 1px solid #eee; }
        .only-pc { display: none; }
        .only-m { display: block; }
        @media (min-width: 768px) {
          .only-pc { display: block; }
          .only-m { display: none; }
        }
        .imgWrap { margin-top: 12px; }
      `}</style>

      {loading ? (
        <div>불러오는 중...</div>
      ) : !data ? (
        <div>pricing_sheet/current 문서가 없어요.</div>
      ) : (
        <>
          {data.imageUrlMobile ? (
            <div className="imgWrap only-m">
              <img
                src={data.imageUrlMobile}
                alt={data.altTextMobile || "디자인 동네 단가표(모바일용)"}
                className="sheet"
                loading="lazy"
              />
            </div>
          ) : null}

          {data.imageUrlPc ? (
            <div className="imgWrap only-pc">
              <img
                src={data.imageUrlPc}
                alt={data.altTextPc || "디자인 동네 단가표(PC용)"}
                className="sheet"
                loading="lazy"
              />
            </div>
          ) : null}

          {Array.isArray(data.summaryText) && data.summaryText.length ? (
            <div style={{ marginTop: 14, padding: 12, border: "1px solid #eee", borderRadius: 12 }}>
              <div style={{ fontWeight: 700 }}>대표 단가 요약</div>
              <ul style={{ marginTop: 8 }}>
                {data.summaryText.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
              <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
                * 표의 금액은 가이드이며, 최종 금액은 상담 후 확정될 수 있어요.
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}