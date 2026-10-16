import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { getRole } from "@/utils/storage";
import { isAuthenticated } from "./utils/isTokenValid";

import TerminosYCondiciones from "./pages/TerminosYCondiciones";
import EliminacionCuenta from "./pages/EliminacionCuenta";
import LoginPage from "./components/login/LoginPage";
import PoliticaDePrivacidad from "./components/legal/PoliticaDePrivacidad";
import TestPage from "./pages/TestPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* 🔐 RUTA PROTEGIDA: exige sesión válida y, opcionalmente, un rol de plataforma */
const ProtectedRoute = ({ children, roles }: { children: ReactNode; roles?: string[] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const role = getRole();

  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* 🔐 AUTH */}
          <Route path="/" element={<LoginPage />} />

          {/* 🧪 PÁGINA DE PRUEBA (usuario con sesión iniciada) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />

          {/* LEGAL */}
          <Route path="/politica-privacidad" element={<PoliticaDePrivacidad />} />
          <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
          <Route path="/eliminacion-de-cuenta" element={<EliminacionCuenta />} />

          {/* ❌ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
