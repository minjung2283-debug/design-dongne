import { Helmet } from "react-helmet-async";

export default function Seo({ title, description }) {
  const t = title ? `${title} | 디자인 동네` : "디자인 동네";
  const d = description || "디자인 동네 - 실적물과 단가표를 확인하고 문의할 수 있어요.";

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}