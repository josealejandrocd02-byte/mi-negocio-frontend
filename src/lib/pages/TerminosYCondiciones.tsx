import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Users, Store } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import TermsContentCreateAccount from "@/components/legal/TermsContentCreateAccount";
import TermsContentCreateStore from "@/components/legal/TermsContentCreateStore";

const TerminosYCondiciones = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <PageContainer className="py-10">
        {/* Botón de retorno */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        {/* Encabezado */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-6 backdrop-blur-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <FileText className="h-7 w-7" />
            </div>

            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Términos y Condiciones
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                TAP TAP Bolivia · Última actualización: {new Date().toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>


          {/* Sección: Términos para Compradores */}
          <div className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Términos para Compradores
                </h2>
                <p className="text-sm text-muted-foreground">
                  Condiciones aplicables a usuarios que realizan compras
                </p>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <TermsContentCreateAccount />
            </div>
          </div>

          {/* Separador decorativo */}
          <div className="my-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Información importante
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>

          {/* Sección: Términos para Vendedores */}
          <div className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Términos para Tiendas
                </h2>
                <p className="text-sm text-muted-foreground">
                  Condiciones aplicables a comercios y vendedores
                </p>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <TermsContentCreateStore />
            </div>
          </div>


        </div>
      </PageContainer>
    </div>
  );
};

export default TerminosYCondiciones;