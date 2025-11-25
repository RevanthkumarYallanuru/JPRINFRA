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
import { db } from "./config";

export type ProjectStatus = "upcoming" | "ongoing" | "completed" | "on-hold";

export interface Project {
  id?: string;
  name: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: ProjectStatus;
  area: string;
  squareFeet: number;
  timeline: string;
  images: string[];
  progress: number;
  percentage?: number;
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
      squareFeet: project.squareFeet || 0,
      percentage: project.percentage || project.progress || 0,
      progress: project.progress || 0,
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
    const updateData: any = {
      ...updates,
      updatedAt: serverTimestamp(),
      updatedBy: userId,
    };
    
    // Sync percentage with progress
    if (updates.progress !== undefined) {
      updateData.percentage = updates.progress;
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
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
