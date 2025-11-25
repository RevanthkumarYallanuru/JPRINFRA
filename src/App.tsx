// Main application component with routing and providers
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import ScrollAnimator from "@/components/ScrollAnimator";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Quotation from "./pages/Quotation";
import NotFound from "./pages/NotFound";
// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import ProjectForm from "./pages/admin/ProjectForm";
import ProjectTasks from "./pages/admin/ProjectTasks";
import AdminSetup from "./pages/admin/Setup.tsx";

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

const enableAdminSetup = import.meta.env.VITE_ENABLE_ADMIN_SETUP === "true";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Loader />
        <ScrollAnimator />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:id" element={<ProjectDetail />} />
                      <Route path="/quotation" element={<Quotation />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />

            {/* Admin Routes */}
            {enableAdminSetup && (
              <Route path="/admin/setup" element={<AdminSetup />} />
            )}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="viewer">
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route
                        path="projects"
                        element={
                          <ProtectedRoute requiredRole="viewer">
                            <AdminProjects />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="projects/new"
                        element={
                          <ProtectedRoute requiredRole="manager">
                            <ProjectForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="projects/:id/edit"
                        element={
                          <ProtectedRoute requiredRole="manager">
                            <ProjectForm />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="projects/:id/tasks"
                        element={
                          <ProtectedRoute requiredRole="viewer">
                            <ProjectTasks />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;