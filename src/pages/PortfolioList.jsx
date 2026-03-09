import Seo from "../seo/Seo";
import { useCollection } from "../hooks/useCollection";

export default function PortfolioList() {
  const { data, loading } = useCollection("portfolio_items", { visibleOnly: true });

  return (
    <div>
      <Seo title="실적물" description="디자인 동네의 작업 실적물을 확인하세요." />
      <h1>실적물</h1>

      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {data.map((x) => (
            <div key={x.id} style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
              {x.thumbUrl ? (
                <img src={x.thumbUrl} alt={x.title || "실적물"} style={{ width: "100%", height: 160, objectFit: "cover" }} loading="lazy" />
              ) : (
                <div style={{ height: 160, background: "#f5f5f5" }} />
              )}
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 700 }}>{x.title || "-"}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{x.category || ""}</div>
              </div>
            </div>
          ))}
          {!data.length ? <div>실적물이 아직 없어요.</div> : null}
        </div>
      )}
    </div>
  );
}