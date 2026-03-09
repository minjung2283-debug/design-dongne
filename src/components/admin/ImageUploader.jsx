import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase";

export default function ImageUploader({ pathPrefix = "uploads", onUploaded }) {
  const [busy, setBusy] = useState(false);

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBusy(true);
    try {
      const filePath = `${pathPrefix}/${Date.now()}_${file.name}`;
      const r = ref(storage, filePath);
      await uploadBytes(r, file);
      const url = await getDownloadURL(r);
      onUploaded?.(url);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onPick} disabled={busy} />
      {busy ? <div style={{ fontSize: 12, opacity: 0.7 }}>업로드 중...</div> : null}
    </div>
  );
}