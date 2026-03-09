import Header from "../components/layout/Header";
import DotNav from "../components/layout/DotNav";
import WorksSection from "../components/layout/WorksSection";
import ContactSection from "../components/layout/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#f6f3ef] text-[#141414]">
      <Header />

      <DotNav
        items={[
          { id: "home", label: "Home" },
          { id: "works", label: "Works" },
          { id: "contact", label: "Contact" },
        ]}
      />

      {/* 1) HOME: 로고/메뉴/도트는 Header+DotNav, 본문은 미니멀 타이포만 */}
      <section id="home" className="min-h-screen scroll-mt-24 flex items-center">
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <p className="text-xs tracking-[0.35em] text-black/50">DESIGN DONGNE</p>

          <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
            PRINT &amp; DESIGN
          </h1>

          <p className="mt-6 text-black/60 max-w-md text-sm md:text-base leading-relaxed">
            명함, 포스터, 스티커, 배너 등 다양한 인쇄 디자인 작업을 진행합니다.
          </p>
        </div>
      </section>

      {/* 2) WORKS */}
      <section id="works" className="scroll-mt-24">
        <WorksSection />
      </section>

      {/* 3) CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>

      <div className="h-16" />
    </div>
  );
}