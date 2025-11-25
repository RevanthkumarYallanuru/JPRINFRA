// Firebase Authentication service
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export type UserRole = "admin" | "manager" | "viewer";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: any;
  updatedAt: any;
}

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user profile from Firestore
    const userProfile = await getUserProfile(user.uid);
    
    if (!userProfile) {
      throw new Error("User profile not found. Please contact administrator.");
    }
    
    return { user, profile: userProfile };
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in");
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign out");
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

// Create user with role
export const createUser = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole = "viewer"
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, { displayName });
    
    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      displayName,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(doc(db, "users", user.uid), userProfile);
    
    return { user, profile: userProfile };
  } catch (error: any) {
    throw new Error(error.message || "Failed to create user");
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || "Failed to send password reset email");
  }
};

// Check if user has required role
export const hasRole = (userProfile: UserProfile | null, requiredRole: UserRole): boolean => {
  if (!userProfile) return false;
  
  const roleHierarchy: Record<UserRole, number> = {
    viewer: 1,
    manager: 2,
    admin: 3,
  };
  
  return roleHierarchy[userProfile.role] >= roleHierarchy[requiredRole];
};

