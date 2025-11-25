// Dashboard metrics and analytics
import { collection, query, getDocs, where, Timestamp } from "firebase/firestore";
import { db } from "./config";
import { Project, ProjectStatus } from "./projects";

export interface DashboardMetrics {
  totalProjects: number;
  projectsByStatus: Record<ProjectStatus, number>;
  projectsByCategory: Record<string, number>;
  totalTasks: number;
  tasksByStatus: {
    pending: number;
    "in-progress": number;
    completed: number;
  };
  recentProjects: Project[];
  completionRate: number;
}

// Get dashboard metrics
export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    // Get all projects
    const projectsSnapshot = await getDocs(collection(db, "projects"));
    const projects = projectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    
    // Calculate project metrics
    const totalProjects = projects.length;
    const projectsByStatus: Record<ProjectStatus, number> = {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
      "on-hold": 0,
    };
    
    const projectsByCategory: Record<string, number> = {};
    
    projects.forEach((project) => {
      projectsByStatus[project.status] = (projectsByStatus[project.status] || 0) + 1;
      projectsByCategory[project.category] = (projectsByCategory[project.category] || 0) + 1;
    });
    
    // Get all tasks
    let totalTasks = 0;
    const tasksByStatus = {
      pending: 0,
      "in-progress": 0,
      completed: 0,
    };
    
    for (const project of projects) {
      if (project.id) {
        try {
          const tasksSnapshot = await getDocs(
            collection(db, "projects", project.id, "tasks")
          );
          totalTasks += tasksSnapshot.size;
          
          tasksSnapshot.forEach((taskDoc) => {
            const task = taskDoc.data();
            if (task.status === "pending") tasksByStatus.pending++;
            else if (task.status === "in-progress") tasksByStatus["in-progress"]++;
            else if (task.status === "completed") tasksByStatus.completed++;
          });
        } catch (error) {
          console.warn(`Error getting tasks for project ${project.id}:`, error);
        }
      }
    }
    
    // Get recent projects (last 5)
    const recentProjects = projects
      .sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      })
      .slice(0, 5);
    
    // Calculate completion rate
    const completedProjects = projectsByStatus.completed || 0;
    const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
    
    return {
      totalProjects,
      projectsByStatus,
      projectsByCategory,
      totalTasks,
      tasksByStatus,
      recentProjects,
      completionRate: Math.round(completionRate * 100) / 100,
    };
  } catch (error) {
    console.error("Error getting dashboard metrics:", error);
    throw error;
  }
};

