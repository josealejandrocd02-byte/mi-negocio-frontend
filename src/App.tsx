import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { getRole } from "@/utils/storage";
import { isAuthenticated } from "./utils/isTokenValid";

import Layout from "./components/global/Layout";

import TerminosYCondiciones from "./pages/TerminosYCondiciones";
import EliminacionCuenta from "./pages/EliminacionCuenta";
import LoginPage from "./components/login/LoginPage";
import PoliticaDePrivacidad from "./components/legal/PoliticaDePrivacidad";
import TestPage from "./pages/TestPage";
import NotFound from "./pages/NotFound";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminStoresPage from "./pages/admin/AdminStoresPage";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const role = getRole();

  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const SUPER_ADMIN = ["SUPER_ADMIN"];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Autenticación: sin Layout */}
          <Route path="/" element={<LoginPage />} />

          {/* Área privada: con Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <TestPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Solo SUPER_ADMIN */}
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute roles={SUPER_ADMIN}>
                <Layout>
                  <AdminUsersPage />
                </Layout>
              </ProtectedRoute>
            }
          />

                    <Route
            path="/locales"
            element={
              <ProtectedRoute roles={SUPER_ADMIN}>
                <Layout>
                  <AdminStoresPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Páginas legales: sin Layout */}
          <Route path="/politica-privacidad" element={<PoliticaDePrivacidad />} />
          <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
          <Route path="/eliminacion-de-cuenta" element={<EliminacionCuenta />} />

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
