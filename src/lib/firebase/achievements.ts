import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";

export interface Achievement {
  id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  date?: string; // ISO or human readable
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
  updatedBy?: string;
}

export const getAchievements = async (): Promise<Achievement[]> => {
  try {
    const q = query(collection(db, "achievements"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Achievement[];
  } catch (error) {
    console.error("Error fetching achievements:", error);
    throw error;
  }
};

const uploadImage = async (file: File): Promise<string> => {
  const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const storageReference = storageRef(storage, `achievements/${filename}`);
  // Use uploadBytes which returns a Promise
  await uploadBytes(storageReference, file);
  const url = await getDownloadURL(storageReference);
  return url;
};

export const createAchievement = async (
  payload: Omit<Achievement, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"> & { imageFile?: File | null },
  userId?: string
): Promise<string> => {
  try {
    let imageUrl = payload.imageUrl || undefined;
    if (payload.imageFile) {
      imageUrl = await uploadImage(payload.imageFile as File);
    }

    const docRef = await addDoc(collection(db, "achievements"), {
      title: payload.title,
      description: payload.description || "",
      imageUrl: imageUrl || "",
      date: payload.date || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: userId || null,
      updatedBy: userId || null,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating achievement:", error);
    throw error;
  }
};

export const updateAchievement = async (
  achievementId: string,
  updates: Partial<Achievement> & { imageFile?: File | null },
  userId?: string
) => {
  try {
    const docRef = doc(db, "achievements", achievementId);
    const updateData: any = {
      ...updates,
      updatedAt: serverTimestamp(),
      updatedBy: userId || null,
    };

    if (updates.imageFile) {
      const imageUrl = await uploadImage(updates.imageFile as File);
      updateData.imageUrl = imageUrl;
    }

    // Remove potential undefined keys
    Object.keys(updateData).forEach((k) => updateData[k] === undefined && delete updateData[k]);

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating achievement:", error);
    throw error;
  }
};

export const deleteAchievement = async (achievementId: string) => {
  try {
    await deleteDoc(doc(db, "achievements", achievementId));
  } catch (error) {
    console.error("Error deleting achievement:", error);
    throw error;
  }
};
