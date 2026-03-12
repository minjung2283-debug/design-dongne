import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition",
        scrolled
          ? "bg-[#f6f3ef]/85 backdrop-blur border-b border-black/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <button
          onClick={goHome}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-[0.25em] hover:bg-black/5 transition"
          aria-label="홈으로"
        >
          디자인 동네
        </button>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => go("works")}
            className="rounded-full px-4 py-2 text-sm bg-black/5 hover:bg-black/10 transition"
          >
            Works
          </button>

          <button
            onClick={() => go("contact")}
            className="rounded-full px-4 py-2 text-sm bg-black/5 hover:bg-black/10 transition"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );QA
}