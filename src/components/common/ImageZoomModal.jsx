import { useEffect } from "react";

export default function ImageZoomModal({ open, src, alt, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    // 배경 스크롤 잠금
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1100px, 100%)",
          maxHeight: "85vh",
          background: "#111",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.15)",
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        {/* 상단 바 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            background: "rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            color: "white",
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.9 }}>{alt || "이미지 확대"}</div>
          <button
            onClick={onClose}
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              fontSize: 13,
            }}
          >
            닫기 (Esc)
          </button>
        </div>

        {/* 이미지 영역: 휠/트랙패드로 브라우저 기본 줌 대신, 내부 스크롤로 상세 확인 */}
        <div
          style={{
            overflow: "auto",
            background: "#000",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* 
            실제 “줌”은 브라우저 확대/축소보다 사용자가 원하는 경우가 많아서,
            여기서는 “큰 원본 + 스크롤” 방식으로 제공.
            필요하면 아래에 CSS transform 기반 줌(+, -)도 추가 가능.
          */}
          <img
            src={src}
            alt={alt || "확대 이미지"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}