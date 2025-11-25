// Firebase Firestore operations for Projects
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
  QueryConstraint,
} from "firebase/firestore";
import { db, storage } from "./config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export type ProjectStatus = "upcoming" | "ongoing" | "completed" | "on-hold";

export interface Project {
  id?: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: ProjectStatus;
  area: string;
  timeline: string;
  images: string[];
  progress: number;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  updatedBy: string;
}

export interface ProjectTask {
  id?: string;
  projectId: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  assignedTo?: string;
  notes: string[];
  createdAt: any;
  updatedAt: any;
  completedAt?: any;
  createdBy: string;
}

export interface TaskNote {
  content: string;
  createdAt: any;
  createdBy: string;
}

// Get all projects
export const getProjects = async (filters?: {
  status?: ProjectStatus;
  category?: string;
}): Promise<Project[]> => {
  try {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    
    if (filters?.status) {
      constraints.push(where("status", "==", filters.status));
    }
    
    if (filters?.category) {
      constraints.push(where("category", "==", filters.category));
    }
    
    const q = query(collection(db, "projects"), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
};

// Get single project
export const getProject = async (projectId: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Project;
    }
    return null;
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
};

// Create project
export const createProject = async (
  project: Omit<Project, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy">,
  userId: string
): Promise<string> => {
  try {
    const projectData: Omit<Project, "id"> = {
      ...project,
      progress: 0,
      images: project.images || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: userId,
      updatedBy: userId,
    };
    
    const docRef = await addDoc(collection(db, "projects"), projectData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// Update project
export const updateProject = async (
  projectId: string,
  updates: Partial<Omit<Project, "id" | "createdAt" | "createdBy">>,
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
      updatedBy: userId,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    // Delete associated images from Storage
    const project = await getProject(projectId);
    if (project?.images) {
      for (const imageUrl of project.images) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.warn("Error deleting image:", error);
        }
      }
    }
    
    // Delete project tasks
    const tasks = await getProjectTasks(projectId);
    for (const task of tasks) {
      if (task.id) {
        await deleteTask(projectId, task.id);
      }
    }
    
    // Delete project document
    await deleteDoc(doc(db, "projects", projectId));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Upload project image
export const uploadProjectImage = async (
  file: File,
  projectId: string
): Promise<string> => {
  try {
    const timestamp = Date.now();
    const fileName = `projects/${projectId}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Delete project image
export const deleteProjectImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Get project tasks
export const getProjectTasks = async (projectId: string): Promise<ProjectTask[]> => {
  try {
    const q = query(
      collection(db, "projects", projectId, "tasks"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProjectTask[];
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

// Create task
export const createTask = async (
  projectId: string,
  task: Omit<ProjectTask, "id" | "projectId" | "createdAt" | "updatedAt" | "createdBy">,
  userId: string
): Promise<string> => {
  try {
    const taskData: Omit<ProjectTask, "id"> = {
      ...task,
      projectId,
      notes: task.notes || [],
      status: task.status || "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: userId,
    };
    
    const docRef = await addDoc(
      collection(db, "projects", projectId, "tasks"),
      taskData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update task
export const updateTask = async (
  projectId: string,
  taskId: string,
  updates: Partial<Omit<ProjectTask, "id" | "projectId" | "createdAt" | "createdBy">>,
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, "projects", projectId, "tasks", taskId);
    const updateData: any = {
      ...updates,
      updatedAt: serverTimestamp(),
    };
    
    // If marking as completed, set completedAt
    if (updates.status === "completed" && !updates.completedAt) {
      updateData.completedAt = serverTimestamp();
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (projectId: string, taskId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "projects", projectId, "tasks", taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// Add note to task
export const addTaskNote = async (
  projectId: string,
  taskId: string,
  note: string,
  userId: string
): Promise<void> => {
  try {
    const task = await getDoc(doc(db, "projects", projectId, "tasks", taskId));
    if (!task.exists()) {
      throw new Error("Task not found");
    }
    
    const taskData = task.data() as ProjectTask;
    const newNote: TaskNote = {
      content: note,
      createdAt: serverTimestamp(),
      createdBy: userId,
    };
    
    await updateDoc(doc(db, "projects", projectId, "tasks", taskId), {
      notes: [...(taskData.notes || []), newNote],
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding task note:", error);
    throw error;
  }
};

