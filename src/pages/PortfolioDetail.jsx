import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Header from "../components/layout/Header";
import DotNav from "../components/layout/DotNav";

const navItems = [
  { id: "portfolio-hero", label: "소개" },
  { id: "portfolio-card", label: "명함" },
  { id: "portfolio-banner", label: "배너" },
  { id: "portfolio-poster", label: "포스터" },
];

const sections = [
  {
    id: "portfolio-card",
    title: "명함",
    desc: "기본 명함부터 고급 후가공 명함까지 다양한 작업물을 정리하는 영역입니다.",
    items: [
      { id: 1, title: "명함 작업물 01" },
      { id: 2, title: "명함 작업물 02" },
      { id: 3, title: "명함 작업물 03" },
    ],
  },
  {
    id: "portfolio-banner",
    title: "배너 · 현수막",
    desc: "실내외 배너, 현수막, 홍보용 출력물을 모아보는 영역입니다.",
    items: [
      { id: 1, title: "배너 작업물 01" },
      { id: 2, title: "배너 작업물 02" },
      { id: 3, title: "배너 작업물 03" },
    ],
  },
  {
    id: "portfolio-poster",
    title: "포스터 · 전단",
    desc: "포스터, 전단, 홍보 인쇄물 작업물을 보여주는 영역입니다.",
    items: [
      { id: 1, title: "포스터 작업물 01" },
      { id: 2, title: "포스터 작업물 02" },
      { id: 3, title: "포스터 작업물 03" },
    ],
  },
];

function formatCount(n) {
  return String(n).padStart(2, "0");
}

function ImageModal({ open, item, onClose }) {
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/82 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-[101] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        aria-label="모달 닫기"
      >
        <X size={20} />
      </button>

      <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#111] shadow-2xl">
          <div className="relative aspect-[16/10] w-full bg-white/5">
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white/40 md:text-base">
              {item.title} 확대 이미지 영역
            </div>

            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] tracking-[0.18em] text-white/90 backdrop-blur">
              {item.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioSection({ id, title, desc, items, onOpenModal }) {
  const scrollRef = useRef(null);
  const trackRef = useRef(null);

  const [current, setCurrent] = useState(0);

  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const total = items.length;

  const updateCurrentIndex = () => {
    const el = scrollRef.current;
    if (!el) return;

    const children = Array.from(el.children);
    if (!children.length) return;

    const scrollLeft = el.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrent(closestIndex);
  };

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;

    const children = Array.from(el.children);
    const target = children[index];
    if (!target) return;

    el.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
  };

  const scroll = (dir) => {
    const next =
      dir === "left"
        ? Math.max(current - 1, 0)
        : Math.min(current + 1, total - 1);

    scrollToIndex(next);
  };

  useEffect(() => {
    updateCurrentIndex();

    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateCurrentIndex();
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;

    dragRef.current.isDown = true;
    dragRef.current.startX = e.pageX;
    dragRef.current.scrollLeft = el.scrollLeft;
    dragRef.current.moved = false;
  };

  const handleMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el || !dragRef.current.isDown) return;

    const x = e.pageX;
    const walk = x - dragRef.current.startX;

    if (Math.abs(walk) > 4) {
      dragRef.current.moved = true;
    }

    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    dragRef.current.isDown = false;
  };

  const handleMouseLeave = () => {
    dragRef.current.isDown = false;
  };

  const handleTouchStart = (e) => {
    const el = scrollRef.current;
    if (!el) return;

    dragRef.current.startX = e.touches[0].clientX;
    dragRef.current.scrollLeft = el.scrollLeft;
    dragRef.current.moved = false;
  };

  const handleTouchMove = (e) => {
    const el = scrollRef.current;
    if (!el) return;

    const x = e.touches[0].clientX;
    const walk = x - dragRef.current.startX;

    if (Math.abs(walk) > 4) {
      dragRef.current.moved = true;
    }

    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const handleCardClick = (item) => {
    if (dragRef.current.moved) return;
    onOpenModal(item);
  };

  const canGoPrev = current > 0;
  const canGoNext = current < total - 1;

  return (
    <section id={id} className="scroll-mt-24 border-t border-black/10">
      <div className="mx-auto max-w-6xl px-6 py-32 md:py-40">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60 md:text-base">
              {desc}
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="text-sm tabular-nums text-black/45">
              {formatCount(current + 1)} / {formatCount(total)}
            </div>
          </div>
        </div>

        <div ref={trackRef} className="group relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canGoPrev}
            className={[
              "absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/20 bg-black/45 text-white backdrop-blur transition",
              "opacity-0 md:flex group-hover:opacity-100",
              canGoPrev ? "hover:bg-black/65" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-label={`${title} 이전 이미지`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canGoNext}
            className={[
              "absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/20 bg-black/45 text-white backdrop-blur transition",
              "opacity-0 md:flex group-hover:opacity-100",
              canGoNext ? "hover:bg-black/65" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-label={`${title} 다음 이미지`}
          >
            <ChevronRight size={20} />
          </button>

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
            {items.map((item) => (
              <article key={item.id} className="w-full shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => handleCardClick(item)}
                  className="block w-full text-left"
                >
                  <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm transition duration-500 group-hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-black/30 md:text-base">
                        {item.title} 이미지 영역
                      </div>

                      <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] tracking-[0.18em] text-white/90 backdrop-blur md:left-6 md:top-6">
                        WORK {formatCount(item.id)}
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between md:hidden">
            <div className="text-sm tabular-nums text-black/45">
              {formatCount(current + 1)} / {formatCount(total)}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canGoPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition disabled:opacity-30"
                aria-label={`${title} 이전 이미지`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canGoNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition disabled:opacity-30"
                aria-label={`${title} 다음 이미지`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioDetail() {
  const [modalItem, setModalItem] = useState(null);

  const closeModal = () => setModalItem(null);

  return (
    <main className="min-h-screen bg-[#f6f3ef] text-black">
      <Header />

      <section id="portfolio-hero" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-black/35">
            Portfolio
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            디자인동네 실적물
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
            작업 종류에 따라 실적물을 나누어 볼 수 있도록 구성한 페이지입니다.
            각 섹션에서 이미지를 크게 넘기며 확인할 수 있도록 레이아웃을 구성했습니다.
          </p>
        </div>
      </section>

      {sections.map((section) => (
        <PortfolioSection
          key={section.id}
          id={section.id}
          title={section.title}
          desc={section.desc}
          items={section.items}
          onOpenModal={setModalItem}
        />
      ))}

      <DotNav items={navItems} />

      <ImageModal
        open={!!modalItem}
        item={modalItem}
        onClose={closeModal}
      />
    </main>
  );
}