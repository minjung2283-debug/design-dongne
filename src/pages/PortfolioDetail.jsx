import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    items: ["작업물 01", "작업물 02", "작업물 03", "작업물 04", "작업물 05"],
  },
  {
    id: "portfolio-banner",
    title: "배너 · 현수막",
    desc: "실내외 배너, 현수막, 홍보용 출력물을 모아보는 영역입니다.",
    items: ["작업물 01", "작업물 02", "작업물 03", "작업물 04"],
  },
  {
    id: "portfolio-poster",
    title: "포스터 · 전단",
    desc: "포스터, 전단, 홍보 인쇄물 작업물을 보여주는 영역입니다.",
    items: ["작업물 01", "작업물 02", "작업물 03", "작업물 04", "작업물 05", "작업물 06"],
  },
];

function PortfolioSection({ id, title, desc, items }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

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

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition hover:bg-black hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition hover:bg-black hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <article
              key={i}
              className="group w-[260px] shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:w-[320px]"
            >
              <div className="flex h-[200px] items-center justify-center bg-black/5 text-sm text-black/30 md:h-[260px]">
                이미지 영역
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-black/35">
                  Portfolio
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-black">
                  {item}
                </h3>
                <p className="mt-2 text-sm leading-6 text-black/55">
                  실제 작업 이미지와 설명이 들어갈 자리입니다.
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex gap-2 md:hidden">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioDetail() {
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
            각 섹션에서 작업물을 가로로 넘기며 확인할 수 있고, 현재는 이미지 없이
            레이아웃부터 먼저 정리한 상태입니다.
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
        />
      ))}

      <DotNav items={navItems} />
    </main>
  );
}