import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { getRole } from "@/utils/storage";
import { isAuthenticated } from "./utils/isTokenValid";

import Layout from "./components/global/Layout";
import StoreAdminRoute from "./utils/StoreAdminRoute";

import TerminosYCondiciones from "./pages/TerminosYCondiciones";
import EliminacionCuenta from "./pages/EliminacionCuenta";
import LoginPage from "./components/login/LoginPage";
import PoliticaDePrivacidad from "./components/legal/PoliticaDePrivacidad";
import NotFound from "./pages/NotFound";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminStoresPage from "./pages/admin/AdminStoresPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyStoresPage from "./pages/store_admin/MyStoresPage";
import StoreEmployeesPage from "./pages/store_admin/StoreEmployeesPage";
import TestPage from "./pages/TestPage";
import EmployeesPage from "./pages/store_admin/EmployeesPage";
import ProductsPage from "./pages/ProductAndCategory/ProductsPage";
import CategoriesPage from "./pages/ProductAndCategory/CategoriesPage";
import SalesPage from "./pages/sales/SalesPage";
import OrdersPage from "./pages/order/OrderPage";
// TestPage ya no se usa en rutas (puedes conservarla como página de depuración)

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

const getDashboardPath = (role: string | null): string => {
  switch (role) {
    case "SUPER_ADMIN":
      return "/dashboard_super_admin";
    case "USER":
      return "/dashboard";
    default:
      return "/";
  }
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const role = getRole();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return <>{children}</>;
};

const SUPER_ADMIN = ["SUPER_ADMIN"];
const USER = ["USER"];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Autenticación: sin Layout */}
          <Route path="/" element={<LoginPage />} />

          {/* ---------- USER: sus locales ---------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <TestPage />
                </Layout>
              </ProtectedRoute>
            }
          />
           <Route
            path="/mi-local"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <MyStoresPage />
                </Layout>
              </ProtectedRoute>
            }
          />
         <Route
            path="/empleados"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <EmployeesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
         <Route
            path="/productos"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <ProductsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
           <Route
            path="/categorias"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <CategoriesPage />
                </Layout>
              </ProtectedRoute>
            }
          />

           <Route
            path="/ventas"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <SalesPage />
                </Layout>
              </ProtectedRoute>
            }
          />


          {/* Solo si es STORE_ADMIN activo de :storeId */}
          <Route
            path="/tienda/:storeId/empleados"
            element={
              <ProtectedRoute roles={USER}>
                <StoreAdminRoute>
                  <Layout>
                    <StoreEmployeesPage />
                  </Layout>
                </StoreAdminRoute>
              </ProtectedRoute>
            }
          />
          {/* ---------- Empleado ---------- */}
           <Route
             path="/pos"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <OrdersPage/>
                </Layout>
              </ProtectedRoute>
            }
          />



          {/* ---------- SUPER_ADMIN ---------- */}
          <Route
            path="/dashboard_super_admin"
            element={
              <ProtectedRoute roles={SUPER_ADMIN}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

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
