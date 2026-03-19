import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Header from "../components/layout/Header";
import DotNav from "../components/layout/DotNav";
import Seo from "../seo/Seo";
import { useCollection } from "../hooks/useCollection";

const CATEGORIES = [
  {
    id: "portfolio-card",
    key: "명함",
    title: "명함",
    desc: "기본 명함부터 고급 후가공 명함까지 다양한 작업물을 확인하세요.",
  },
  {
    id: "portfolio-banner",
    key: "배너",
    title: "배너 · 현수막",
    desc: "실내외 배너, 현수막, 홍보용 출력물 작업물입니다.",
  },
  {
    id: "portfolio-poster",
    key: "포스터",
    title: "포스터 · 전단",
    desc: "포스터, 전단, 홍보 인쇄물 작업물입니다.",
  },
];

const navItems = [
  { id: "portfolio-hero", label: "소개" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.title.split(" ")[0] })),
];

function formatCount(n) {
  return String(n).padStart(2, "0");
}

// ─── E) 모달: 같은 카테고리 내 좌우 이동 ───────────────────────────────
function ImageModal({ open, items, index, onNavigate, onClose }) {
  const item = items[index];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onNavigate(index - 1);
      if (e.key === "ArrowRight" && index < items.length - 1) onNavigate(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, index, items.length, onNavigate, onClose]);

  if (!open || !item) return null;

  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 닫기 */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-[101] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        aria-label="모달 닫기"
      >
        <X size={20} />
      </button>

      {/* 이전 */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNavigate(index - 1); }}
        disabled={!canPrev}
        className="absolute left-4 top-1/2 z-[101] -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none"
        aria-label="이전 이미지"
      >
        <ChevronLeft size={22} />
      </button>

      {/* 다음 */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNavigate(index + 1); }}
        disabled={!canNext}
        className="absolute right-4 top-1/2 z-[101] -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none"
        aria-label="다음 이미지"
      >
        <ChevronRight size={22} />
      </button>

      <div
        className="flex h-full w-full items-center justify-center p-4 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#111] shadow-2xl">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title || "포트폴리오 이미지"}
              className="w-full object-contain max-h-[75vh]"
            />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center text-sm text-white/30">
              이미지 없음
            </div>
          )}
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-white/60">{item.title || ""}</span>
            <span className="text-xs tabular-nums text-white/35">
              {formatCount(index + 1)} / {formatCount(items.length)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 섹션 컴포넌트 ──────────────────────────────────────────────────────
function PortfolioSection({ id, title, desc, items, onOpenModal, sectionIndex }) {
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  // 플레이스홀더: 실제 데이터 없으면 빈 카드 1개 표시
  const displayItems = items.length
    ? items
    : [{ id: "__placeholder__", title: null, imageUrl: null }];

  const total = items.length;

  const updateCurrentIndex = () => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    if (!children.length) return;
    let closestIndex = 0, closestDistance = Infinity;
    children.forEach((child, i) => {
      const d = Math.abs(child.offsetLeft - el.scrollLeft);
      if (d < closestDistance) { closestDistance = d; closestIndex = i; }
    });
    setCurrent(closestIndex);
  };

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = Array.from(el.children)[index];
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const scroll = (dir) => {
    const next = dir === "left" ? Math.max(current - 1, 0) : Math.min(current + 1, total - 1);
    scrollToIndex(next);
  };

  useEffect(() => {
    updateCurrentIndex();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateCurrentIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateCurrentIndex);
  }, []);

  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = { isDown: true, startX: e.pageX, scrollLeft: el.scrollLeft, moved: false };
  };
  const handleMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el || !dragRef.current.isDown) return;
    const walk = e.pageX - dragRef.current.startX;
    if (Math.abs(walk) > 4) dragRef.current.moved = true;
    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };
  const handleMouseUp = () => { dragRef.current.isDown = false; };
  const handleMouseLeave = () => { dragRef.current.isDown = false; };

  const handleTouchStart = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = { isDown: false, startX: e.touches[0].clientX, scrollLeft: el.scrollLeft, moved: false };
  };
  const handleTouchMove = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const walk = e.touches[0].clientX - dragRef.current.startX;
    if (Math.abs(walk) > 4) dragRef.current.moved = true;
    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const handleCardClick = (item, idx) => {
    if (dragRef.current.moved) return;
    if (!item.imageUrl && !item.title) return; // 플레이스홀더 클릭 무시
    onOpenModal(items, idx);
  };

  const canGoPrev = current > 0;
  const canGoNext = current < total - 1;

  // C) 번갈아 배경색
  const bg = sectionIndex % 2 === 0 ? "bg-[#f6f3ef]" : "bg-white";

  return (
    <section id={id} className={`scroll-mt-24 border-t border-black/10 ${bg}`}>
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">

        {/* C) 섹션 번호 */}
        <p className="mb-3 text-xs tracking-[0.35em] text-black/30 uppercase">
          {formatCount(sectionIndex + 1)}
        </p>

        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/55 md:text-base">{desc}</p>
          </div>
          {total > 0 && (
            <div className="hidden items-center md:flex">
              <span className="text-sm tabular-nums text-black/40">
                {formatCount(current + 1)} / {formatCount(total)}
              </span>
            </div>
          )}
        </div>

        <div ref={trackRef} className="group relative">
          {/* 이전 버튼 */}
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canGoPrev}
            className={[
              "absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/20 bg-black/45 text-white backdrop-blur transition",
              "opacity-0 md:flex group-hover:opacity-100",
              canGoPrev ? "hover:bg-black/65" : "pointer-events-none !opacity-0",
            ].join(" ")}
            aria-label={`${title} 이전`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* 다음 버튼 */}
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canGoNext}
            className={[
              "absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/20 bg-black/45 text-white backdrop-blur transition",
              "opacity-0 md:flex group-hover:opacity-100",
              canGoNext ? "hover:bg-black/65" : "pointer-events-none !opacity-0",
            ].join(" ")}
            aria-label={`${title} 다음`}
          >
            <ChevronRight size={20} />
          </button>

          {/* 캐러셀 */}
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {displayItems.map((item, idx) => (
              <article key={item.id} className="w-full shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => handleCardClick(item, idx)}
                  className="block w-full text-left"
                >
                  {/* D) hover 오버레이 */}
                  <div className="group/card overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm transition duration-500 hover:shadow-[0_24px_80px_rgba(0,0,0,0.1)]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                      {item.imageUrl ? (
                        <>
                          <img
                            src={item.imageUrl}
                            alt={item.title || `${title} 작업물`}
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
                            loading="lazy"
                          />
                          {/* 호버 오버레이 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition duration-300 group-hover/card:opacity-100" />
                          {item.title && (
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 opacity-0 transition duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                              <p className="text-white font-medium text-sm md:text-base">{item.title}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-black/25">
                          이미지 준비 중
                        </div>
                      )}

                      {/* WORK 번호 뱃지 */}
                      {item.imageUrl && (
                        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] tracking-[0.18em] text-white/90 backdrop-blur md:left-6 md:top-6">
                          WORK {formatCount(idx + 1)}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>

          {/* 모바일 버튼 */}
          {total > 1 && (
            <div className="mt-6 flex items-center justify-between md:hidden">
              <span className="text-sm tabular-nums text-black/40">
                {formatCount(current + 1)} / {formatCount(total)}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={!canGoPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition disabled:opacity-30"
                  aria-label={`${title} 이전`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={!canGoNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition disabled:opacity-30"
                  aria-label={`${title} 다음`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── 페이지 ─────────────────────────────────────────────────────────────
export default function PortfolioDetail() {
  const [modal, setModal] = useState(null); // { items, index }

  const { data, loading } = useCollection("portfolio_items", {
    visibleOnly: true,
    orderBy: "order",
    orderDir: "asc",
  });

  const sections = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: data.filter((item) => item.category === cat.key),
    }));
  }, [data]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#f6f3ef] text-black">
      <Seo title="실적물 | 디자인동네" description="디자인동네의 명함, 배너, 포스터 작업물을 확인하세요." />
      <Header />

      {/* A) 히어로 */}
      <section id="portfolio-hero" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-44 md:pb-28">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/35">
            Portfolio
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            디자인동네 실적물
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-black/55 md:text-lg">
            명함, 배너, 포스터 등 다양한 인쇄 디자인 작업물을 카테고리별로 확인하세요.
          </p>

          {/* A) 카테고리 바로가기 버튼 */}
          <div className="mt-10 flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollTo(cat.id)}
                className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 hover:bg-black hover:text-white hover:border-black"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="mx-auto max-w-6xl px-6 py-32 text-black/35">불러오는 중...</div>
      ) : (
        sections.map((section, i) => (
          <PortfolioSection
            key={section.id}
            id={section.id}
            title={section.title}
            desc={section.desc}
            items={section.items}
            sectionIndex={i}
            onOpenModal={(items, index) => setModal({ items, index })}
          />
        ))
      )}

      <DotNav items={navItems} />

      {/* E) 모달 */}
      <ImageModal
        open={!!modal}
        items={modal?.items ?? []}
        index={modal?.index ?? 0}
        onNavigate={(i) => setModal((m) => ({ ...m, index: i }))}
        onClose={() => setModal(null)}
      />
    </main>
  );
}
