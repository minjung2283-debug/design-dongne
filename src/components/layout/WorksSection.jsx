const works = [
  {
    title: "대표 실적 01",
    desc: "마우스를 올리면 설명이 나오는 스타일",
    img: "/works/01.jpg",
  },
  {
    title: "대표 실적 02",
    desc: "재질/후가공/납기 등 포인트 요약",
    img: "/works/02.jpg",
  },
  {
    title: "대표 실적 03",
    desc: "명함/포스터/배너 등 대표 작업 소개",
    img: "/works/03.jpg",
  },
];

export default function WorksSection() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32 md:py-40">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Works</h2>
        <p className="text-sm text-black/55">대표 실적 3개</p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-7">
        {works.map((w) => (
          <article key={w.title} className="group">
            <div className="relative overflow-hidden rounded-[28px] bg-black/5 border border-black/10 shadow-sm hover:shadow-lg transition">
              <img
                src={w.img}
                alt={w.title}
                className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* overlay 부드럽게 */}
              <div className="absolute inset-0 bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100" />

              {/* text */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-white text-lg font-semibold">{w.title}</h3>

                <p className="mt-2 text-white/85 text-sm opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {w.desc}
                </p>
              </div>
            </div>

            {/* 모바일 fallback */}
            <p className="mt-3 text-sm text-black/60 md:hidden">{w.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}