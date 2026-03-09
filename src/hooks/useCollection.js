import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

export function useCollection(colName, opts = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = collection(db, colName);
    let q = query(base);

    if (opts.visibleOnly) q = query(base, where("visible", "==", true));
    if (opts.orderBy) q = query(q, orderBy(opts.orderBy, opts.orderDir || "asc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, [colName, opts.visibleOnly, opts.orderBy, opts.orderDir]);

  return { data, loading };
}