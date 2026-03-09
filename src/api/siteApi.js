import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export async function getContactInfo() {

  const ref = doc(db, "company", "info");  
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return {
      address: "",
      phone: "",
      email: ""
    };
  }

  const data = snap.data();

  return {
    address: data.address ?? "",
    phone: data.phone ?? "",
    email: data.email ?? ""
  };
}