import { useEffect, useState } from "react";
import { getContactInfo } from "../../api/siteApi";

export default function ContactSection() {
  const [contact, setContact] = useState({
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getContactInfo();
        if (!mounted) return;

        setContact(data);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError("문의 정보를 불러오지 못했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-32 md:py-40 border-t border-black/10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2>

      {loading ? (
        <div className="mt-16 text-sm text-black/50">불러오는 중...</div>
      ) : error ? (
        <div className="mt-16 text-sm text-red-500">{error}</div>
      ) : (
        <div className="mt-16 grid md:grid-cols-3 gap-10 text-sm">
          <div>
            <p className="text-xs tracking-[0.2em] text-black/40">ADDRESS</p>
            <p className="mt-3 leading-relaxed">
              {contact.address || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-black/40">PHONE</p>
            {contact.phone ? (
              <a
                className="mt-3 inline-block hover:opacity-60"
                href={`tel:${contact.phone}`}
              >
                {contact.phone}
              </a>
            ) : (
              <p className="mt-3">-</p>
            )}
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-black/40">EMAIL</p>
            {contact.email ? (
              <a
                className="mt-3 inline-block hover:opacity-60"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            ) : (
              <p className="mt-3">-</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}