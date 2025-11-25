import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export interface ContactLeadPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface QuotationRequestPayload {
  projectType: string;
  area: number;
  floors: number;
  location: string;
  quality: string;
  estimate: number;
}

export const saveContactLead = async (payload: ContactLeadPayload) => {
  await addDoc(collection(db, "contactLeads"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};

export const saveQuotationRequest = async (payload: QuotationRequestPayload) => {
  await addDoc(collection(db, "quotationRequests"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};

