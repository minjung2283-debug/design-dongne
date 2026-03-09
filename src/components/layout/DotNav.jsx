import { useEffect, useMemo, useState } from "react";

export default function DotNav({ items = [] }) {
  const navItems = useMemo(() => items, [items]);
  const [active, setActive] = useState(null);

  const go = (id) => {
    setActive(id);

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 처음 렌더될 때 현재 화면 기준으로 active 설정
  useEffect(() => {
    if (!navItems.length) return;

    const updateActiveFromViewport = () => {
      const current = navItems.find((it) => {
        const el = document.getElementById(it.id);
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45;
      });

      if (current?.id) {
        setActive(current.id);
      } else if (!active && navItems[0]?.id) {
        setActive(navItems[0].id);
      }
    };

    updateActiveFromViewport();

    const timer = setTimeout(updateActiveFromViewport, 50);
    window.addEventListener("resize", updateActiveFromViewport);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateActiveFromViewport);
    };
  }, [navItems]);

  // 스크롤 시 active 자동 갱신
  useEffect(() => {
    const sections = navItems
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.6, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <>
      {/* desktop */}
      <nav
        aria-label="섹션 이동"
        className="fixed right-10 top-1/2 z-50 hidden -translate-y-1/2 md:flex flex-col items-center gap-10"
      >
        {navItems.map((it) => {
          const isActive = active === it.id;

          return (
            <button
              key={it.id}
              type="button"
              onClick={() => go(it.id)}
              aria-label={it.label}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center justify-center"
              style={{
                width: "12px",
                height: "12px",
                padding: 0,
                margin: 0,
                border: "none",
                background: "transparent",
                borderRadius: "50%",
                appearance: "none",
                WebkitAppearance: "none",
                minWidth: "11px",
                minHeight: "11px",
              }}
            >
              {/* outer ring */}
              <span
                className="absolute inset-0 rounded-full border transition"
                style={{
                  borderColor: isActive
                    ? "rgba(0,0,0,0.5)"
                    : "rgba(0,0,0,0.25)",
                }}
              />

              {/* inner dot */}
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.85)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.2s ease",
                }}
              />

              {/* label */}
              <span className="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100 xl:block">
                {it.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* mobile */}
      <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/10 bg-[#f6f3ef]/90 px-3 py-2 backdrop-blur md:hidden">
        {navItems.map((it) => {
          const isActive = active === it.id;

          return (
            <button
              key={it.id}
              type="button"
              onClick={() => go(it.id)}
              className={[
                "rounded-full px-3 py-1.5 text-xs transition",
                isActive ? "bg-black text-[#f6f3ef]" : "bg-black/5 text-black/70",
              ].join(" ")}
            >
              {it.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}