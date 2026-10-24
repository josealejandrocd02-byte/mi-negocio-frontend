import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, User, Store, Clock, ShieldAlert, MessageCircle } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";

const EliminacionCuenta = () => {

    const whatsappNumber = "59175114642";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola%20TAP%20TAP%2C%20necesito%20ayuda%20con...`;
  return (
    <div className="min-h-screen bg-background">
      <PageContainer className="py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Trash2 className="h-6 w-6" />
            </div>

            <div>
              <h1 className="font-display text-3xl font-bold">
                Eliminación de cuenta
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                TAP TAP Bolivia
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            {/* Solicitar eliminación */}
            <section>
              <h2 className="font-display text-xl font-semibold">
                Solicitar eliminación de cuenta
              </h2>

              <p className="mt-3 text-muted-foreground">
                TapTap todavía cuenta con una función dentro de la
                aplicación para solicitar la eliminacion de tu cuenta. Para
                solicitarla ingresa a la app movil y solicitala con el boton de accion correspondiente o 
                escríbenos por el canal de contacto indicado al
                final de esta página, indicando el nombre de usuario o el
                número de WhatsApp con el que te registraste. El proceso
                varía según si tienes una cuenta de comprador o una tienda.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <User className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-semibold">
                      Si tienes una cuenta de comprador
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Puedes solicitar la eliminación de tu cuenta en cualquier
                    momento. El administrador atenderá tu solicitud de forma
                    manual y en un plazo razonable, salvo que existan
                    situaciones que justifiquen conservar parte de tu
                    información por más tiempo (ver &ldquo;¿Qué información
                    se elimina y qué se conserva?&rdquo; abajo).
                  </p>
                </div>

                <div className="rounded-xl border border-border p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Store className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-semibold">
                      Si administras una tienda
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Una tienda no puede eliminarse a sí misma desde la
                    aplicación; el retiro debe solicitarse al administrador.
                    El proceso tiene tres pasos: (1) la tienda se suspende y
                    deja de ser visible públicamente; (2) se revisa que no
                    existan órdenes pendientes ni asuntos por resolver; (3)
                    transcurridos aproximadamente 30 días, se elimina la
                    cuenta de forma definitiva.
                  </p>
                </div>
              </div>
            </section>

            {/* Qué se elimina */}
            <section>
              <h2 className="font-display text-xl font-semibold">
                ¿Qué información se elimina y qué se conserva?
              </h2>

              <p className="mt-3 text-muted-foreground">
                Al eliminar tu cuenta, TapTap retira tu perfil y tus datos de
                contacto del uso activo de la plataforma. Sin embargo, por
                razones de seguridad, prevención de fraude y para poder
                resolver disputas relacionadas con órdenes ya realizadas,
                algunos datos no se eliminan de inmediato:
              </p>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">
                      Historial de pedidos y comprobantes de pago:
                    </strong>{" "}
                    se conservan aun después de eliminar la cuenta, en la
                    medida necesaria para resolver reclamos entre compradores
                    y tiendas. Puedes solicitar la eliminación manual de un
                    comprobante específico a través del canal de contacto;
                    TapTap evaluará la solicitud caso por caso.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">
                      Documento de identidad de verificación (solo tiendas):
                    </strong>{" "}
                    la fotocopia de carnet usada para verificar una tienda no
                    se sube nunca a nuestros sistemas; se conserva físicamente
                    fuera de la plataforma. Puedes pedir su devolución en
                    cualquier momento, incluso durante el proceso de baja. Si
                    no la solicitas, se destruye de forma segura dentro de
                    los 90 días posteriores a la eliminación definitiva de la
                    tienda, salvo que exista una disputa o fraude en curso.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">
                      Órdenes en curso o recientes:
                    </strong>{" "}
                    si tienes una orden pendiente o recién completada en la
                    que la otra parte (comprador o tienda) tiene un interés
                    legítimo vigente, esa información se conserva hasta que
                    la situación quede resuelta.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">
                      Indicios de fraude o disputas en trámite:
                    </strong>{" "}
                    si tu cuenta está vinculada a una investigación de fraude
                    o a un reclamo sin resolver, esa información se conserva
                    mientras dure esa situación.
                  </span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-muted-foreground">
                En cualquiera de estos casos, te informaremos el motivo por
                el que no podemos eliminar cierta información de forma
                inmediata. Para más detalle sobre qué datos recopilamos y
                cómo los tratamos, consulta nuestra{" "}
                <Link to="/politica-de-privacidad" className="underline underline-offset-2 hover:text-foreground">
                  Política de Privacidad
                </Link>.
              </p>
            </section>

            {/* Plazos */}
            <section>
              <h2 className="font-display text-xl font-semibold">
                Plazos del proceso
              </h2>

              <div className="mt-4 space-y-4">
                <div className="flex gap-4 rounded-xl border border-border p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold">
                      Cuentas de comprador
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      No existe un plazo automático: al ser un proceso
                      manual, la solicitud se atiende en un plazo razonable
                      desde que la recibimos por el canal de contacto.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-border p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold">
                      Cuentas de tienda
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Suspensión inmediata al recibir la solicitud, seguida
                      de una revisión de asuntos pendientes, con eliminación
                      definitiva a los ~30 días. Este plazo es distinto de
                      cualquier suspensión preventiva por cambio de datos
                      críticos (QR, WhatsApp, ubicación), que no tiene
                      relación con una baja de cuenta.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <p>
                  Eliminar tu cuenta no elimina automáticamente las
                  calificaciones, órdenes u otra información que, conforme a
                  lo descrito arriba, deba conservarse por razones de
                  seguridad o legales.
                </p>
              </div>
            </section>

            {/* Ayuda */}
            <section>
              <h2 className="font-display text-xl font-semibold">
                ¿Necesitas ayuda?
              </h2>

              <p className="mt-3 text-muted-foreground">
                TapTap todavía no cuenta con un correo electrónico oficial.
                Si tienes alguna dificultad con el proceso de eliminación o
                quieres consultar el estado de tu solicitud, escríbenos por
                nuestros canales oficiales:
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp oficial de TapTap
                  {/* TODO: reemplazar "#" por el enlace/número de WhatsApp oficial */}
                </a>

                <a
                  href="https://www.instagram.com/tap_tap_bolivia"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Instagram oficial de TapTap
                  {/* TODO: reemplazar "#" por el enlace de Instagram oficial */}
                </a>
              </div>
            </section>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default EliminacionCuenta;
