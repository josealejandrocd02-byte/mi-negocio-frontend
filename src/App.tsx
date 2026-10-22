import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
=======

>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { getRole } from "@/utils/storage";
import { isAuthenticated } from "./utils/isTokenValid";

<<<<<<< HEAD
=======
import Layout from "./components/global/Layout";
import StoreAdminRoute from "./utils/StoreAdminRoute";

>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
import TerminosYCondiciones from "./pages/TerminosYCondiciones";
import EliminacionCuenta from "./pages/EliminacionCuenta";
import LoginPage from "./components/login/LoginPage";
import PoliticaDePrivacidad from "./components/legal/PoliticaDePrivacidad";
<<<<<<< HEAD
import TestPage from "./pages/TestPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* 🔐 RUTA PROTEGIDA: exige sesión válida y, opcionalmente, un rol de plataforma */
const ProtectedRoute = ({ children, roles }: { children: ReactNode; roles?: string[] }) => {
=======
import NotFound from "./pages/NotFound";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminStoresPage from "./pages/admin/AdminStoresPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyStoresPage from "./pages/store_admin/MyStoresPage";
import StoreEmployeesPage from "./pages/store_admin/StoreEmployeesPage";
import TestPage from "./pages/TestPage";
import EmployeesPage from "./pages/store_admin/EmployeesPage";
import ProductsPage from "./pages/store_admin/ProductsPage";
import CategoriesPage from "./pages/store_admin/CategoriesPage";
import SalesPage from "./pages/store_admin/SalesPage";
import OrderPage from "./pages/employyer/OrderPage";
import NewOrderPage from "./pages/employyer/NewOrderPage";
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
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const role = getRole();

<<<<<<< HEAD
  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/dashboard" replace />;
=======
  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
  }

  return <>{children}</>;
};

<<<<<<< HEAD
=======
const SUPER_ADMIN = ["SUPER_ADMIN"];
const USER = ["USER"];

>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          {/* 🔐 AUTH */}
          <Route path="/" element={<LoginPage />} />

          {/* 🧪 PÁGINA DE PRUEBA (usuario con sesión iniciada) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TestPage />
=======
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
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
              </ProtectedRoute>
            }
          />

<<<<<<< HEAD
          {/* LEGAL */}
=======
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
          {/* ---------- VENDEDOR ISRA ---------- */}
           <Route
            path="/pos"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <NewOrderPage />
                </Layout>
              </ProtectedRoute>
            }
          />

           <Route
            path="/mis-ventas"
            element={
              <ProtectedRoute roles={USER}>
                <Layout>
                  <OrderPage />
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
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
          <Route path="/politica-privacidad" element={<PoliticaDePrivacidad />} />
          <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
          <Route path="/eliminacion-de-cuenta" element={<EliminacionCuenta />} />

<<<<<<< HEAD
          {/* ❌ */}
=======
          {/* Página no encontrada */}
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
