<<<<<<< HEAD
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  User,
  Store,
  FileText,
  CreditCard,
  MapPin,
  Clock,
  Users,
  Lock,
  Database,
  Mail,
  Smartphone,
  Monitor,
  Globe,
  AlertCircle,
  CheckCircle,
  Info,
  Eye,
  Building,
  Camera,
  Navigation,
  Radio,
  Instagram,
  Facebook,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";

const PoliticaDePrivacidad = () => {
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
              <Shield className="h-7 w-7" />
            </div>

            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Política de Privacidad
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                TapTap Bolivia · Versión 5.0 ·{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Aviso legal */}
          <div className="mt-6 rounded-lg border border-yellow-200/50 bg-yellow-50/50 p-4 text-sm dark:border-yellow-900/30 dark:bg-yellow-900/10">
            <p className="flex items-start gap-2 text-yellow-800 dark:text-yellow-200">
              <span className="mt-0.5 text-lg">⚖️</span>
              <span>
                <strong>Aviso importante:</strong> Este documento es un borrador
                jurídico-tecnológico de trabajo. <strong>No constituye asesoramiento legal definitivo</strong> y
                debe ser revisado por un abogado boliviano matriculado antes de su
                publicación como versión final.
              </span>
            </p>
          </div>

          {/* Cambios principales */}
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="mb-2 flex items-center gap-2 font-medium text-primary">
              <Info className="h-4 w-4" />
              Cambios principales respecto de la versión 4.0:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Camera className="mt-0.5 h-3.5 w-3.5 text-orange-500" />
                <span>La app móvil ahora solicita permiso de <strong>cámara</strong> (fotos de productos y de la tienda)</span>
              </li>
              <li className="flex items-start gap-2">
                <Navigation className="mt-0.5 h-3.5 w-3.5 text-cyan-500" />
                <span>Permiso de <strong>ubicación</strong> solo al crear una tienda (capturar coordenadas del negocio)</span>
              </li>
              <li className="flex items-start gap-2">
                <Radio className="mt-0.5 h-3.5 w-3.5 text-red-500" />
                <span>Se agregó <strong>TikTok</strong> e indicador <strong>"estoy en vivo"</strong> al perfil de tienda</span>
              </li>
              <li className="flex items-start gap-2">
                <Monitor className="mt-0.5 h-3.5 w-3.5 text-blue-500" />
                <span>La plataforma web pasó a ser de <strong>uso exclusivo para vendedores y administradores</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Smartphone className="mt-0.5 h-3.5 w-3.5 text-emerald-500" />
                <span>La creación de cuenta y solicitud de tienda <strong>solo están disponibles desde la app móvil</strong></span>
              </li>
            </ul>
          </div>

          {/* Índice rápido */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: User, label: "Responsable", href: "#responsable" },
              { icon: Smartphone, label: "Plataformas", href: "#plataformas" },
              { icon: Database, label: "Datos recopilados", href: "#datos" },
              { icon: Lock, label: "Permisos", href: "#permisos" },
              { icon: Clock, label: "Conservación", href: "#conservacion" },
              { icon: Users, label: "Derechos", href: "#derechos" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm transition-all hover:border-primary hover:bg-accent hover:shadow-sm"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Contenido */}
          <div className="mt-10 space-y-12">
            {/* Sección 1: Identidad del responsable */}
            <section
              id="responsable"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  1. Identidad del responsable y contacto
                </h2>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  TapTap Bolivia ("TapTap") es un proyecto tecnológico administrado
                  actualmente, como persona natural responsable de su operación, por{" "}
                  <strong>José Alejandro Cruz Delgado</strong>. TapTap no está, a la
                  fecha, constituida como sociedad comercial, por lo que no cuenta con
                  NIT propio, razón social ni domicilio empresarial distintos a los de
                  su administrador.
                </p>
                <div className="mt-3 rounded-lg bg-muted p-4">
                  <p className="flex items-start gap-2 text-sm">
                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <span>
                      <strong>Canal de contacto:</strong> TapTap actualmente no cuenta
                      con un correo electrónico oficial. El canal de contacto para
                      consultas sobre esta Política y para ejercer los derechos
                      descritos en la Sección 10 es el{" "}
                      <strong>WhatsApp oficial de TapTap</strong> y su{" "}
                      <strong>cuenta oficial de Instagram</strong>.
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 2: Alcance y plataformas - ACTUALIZADO */}
            <section
              id="plataformas"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                  <Globe className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  2. Alcance y plataformas
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Esta Política aplica al tratamiento de datos personales de
                  compradores, de tiendas, y de terceros cuyos datos puedan quedar
                  involucrados en el funcionamiento de la plataforma, dentro del
                  territorio boliviano, principalmente en la ciudad de Tarija.
                </p>

                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="mb-3 flex items-center gap-2 font-medium text-primary">
                    <Info className="h-4 w-4" />
                    TapTap opera actualmente en dos plataformas con funciones distintas:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-background p-3">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-emerald-500" />
                        <strong className="text-sm">Aplicación móvil</strong>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Especializada en el comprador. <strong>Única vía</strong> para crear una cuenta (de comprador o tienda) y solicitar conversión a vendedor. Permite publicar productos con fotos tomadas con la cámara.
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-blue-500" />
                        <strong className="text-sm">Plataforma web</strong>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        De <strong>uso exclusivo para vendedores y administradores</strong> ya habilitados. Panel de control. <strong>No permite crear cuentas ni iniciar solicitud de tienda, ni tiene funciones de comprador.</strong>
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Esta Política aplica a ambas plataformas; cuando un tratamiento sea específico de una de ellas (por ejemplo, los permisos del dispositivo, que solo aplican a la aplicación móvil), se indica expresamente.
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-green-50/50 p-4 dark:bg-green-900/10">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <CheckCircle className="mr-2 inline h-4 w-4" />
                    Ninguna verificación, suspensión, moderación o decisión descrita en
                    esta Política es tomada mediante un sistema automatizado o de
                    inteligencia artificial: todas son decisiones humanas del
                    administrador.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 3: Datos recopilados */}
            <section
              id="datos"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">3. Datos que se recopilan</h2>
              </div>
              <div className="space-y-6">
                {/* 3.1 Registro de compradores - ACTUALIZADO */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">
                      3.1 Registro y datos de compradores
                    </h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      ACTUALIZADO
                    </span>
                  </div>
                  <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <p className="text-sm text-primary">
                        <Smartphone className="mr-2 inline h-4 w-4" />
                        <strong>La creación de una cuenta de comprador solo está disponible actualmente a través de la aplicación móvil.</strong>
                      </p>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <strong className="text-sm">Correo y contraseña</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          El usuario ingresa manualmente todos los datos: nombre completo, nombre de usuario, correo, WhatsApp, zona de envío, dirección y referencia opcional.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-500" />
                          <strong className="text-sm">Google Sign-In</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          TapTap obtiene <strong>únicamente nombre, apellido y correo</strong>. No accede a fotos, contactos, calendario, Drive ni otros datos. El resto se completa manualmente.
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <AlertCircle className="mr-2 inline h-4 w-4" />
                        <strong>Importante:</strong> TapTap no envía códigos de verificación al correo, no verifica la identidad del comprador mediante carnet, no verifica el número de WhatsApp, ni verifica documentalmente su edad.
                      </p>
                    </div>

                    {/* Zona de envío */}
                    <div className="mt-3 rounded-lg bg-purple-50/50 p-3 dark:bg-purple-900/10">
                      <p className="flex items-center gap-2 font-medium text-purple-700 dark:text-purple-300">
                        <MapPin className="h-4 w-4" />
                        Zona de envío (áreas geográficas)
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Las zonas son definidas por TapTap mediante áreas geográficas delimitadas (polígonos) dentro de la ciudad de Tarija. <strong>La selección sigue siendo manual</strong>, sin que la aplicación acceda a la ubicación real del dispositivo del comprador para esta función. Esto es distinto del uso del permiso de ubicación durante la creación de una tienda (Secciones 3.2 y 3.9).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3.2 Tiendas - ACTUALIZADO */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">3.2 Datos de tiendas</h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      ACTUALIZADO
                    </span>
                  </div>
                  <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <p className="text-sm text-primary">
                        <Smartphone className="mr-2 inline h-4 w-4" />
                        <strong>La solicitud para crear una tienda solo puede iniciarse desde la aplicación móvil</strong>, a partir de una cuenta de comprador ya existente.
                      </p>
                    </div>

                    <p className="mt-3">
                      Al solicitar la creación de una tienda, se recopilan: nombre de la tienda, identidad del titular, número de WhatsApp oficial, código QR bancario, nombre completo del titular de la cuenta bancaria asociada al QR, logo, banner, productos, y demás información necesaria para publicar la tienda, incluyendo:
                    </p>

                    <div className="mt-3 space-y-2">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-cyan-500" />
                          <strong className="text-sm">Ubicación física (si corresponde)</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Si la tienda cuenta con establecimiento físico, su ubicación se captura mediante el <strong>permiso de ubicación (GPS)</strong> durante la solicitud. Queda asociada al perfil y se muestra a compradores en Google Maps.
                        </p>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-orange-500" />
                          <strong className="text-sm">Fotografías de la tienda</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          La app permite tomar fotografías directamente con la <strong>cámara</strong> del dispositivo (por ejemplo, del local o fachada), además de poder seleccionar imágenes existentes mediante el selector nativo.
                        </p>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-500" />
                          <Facebook className="h-4 w-4 text-blue-500" />
                          <Radio className="h-4 w-4 text-red-500" />
                          <strong className="text-sm">Redes sociales y estado "estoy en vivo"</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Instagram, Facebook y <strong>TikTok</strong> (opcionales). El dueño puede activar/desactivar manualmente el indicador "estoy en vivo" para señalar a compradores que transmite en vivo en TikTok (ver Sección 4). <strong>TapTap no verifica que la transmisión esté ocurriendo.</strong>
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                      Esta información, salvo el QR bancario, es visible públicamente. La tienda puede modificar su enlace de TikTok y el estado "estoy en vivo" en cualquier momento (Sección 16).
                    </p>
                  </div>
                </div>

                {/* 3.3 Verificación */}
                <div className="border-t pt-4">
                  <h3 className="mb-2 text-lg font-medium">
                    3.3 Datos para verificación de tiendas y QR
                  </h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p>
                      TapTap realiza un proceso de verificación manual que puede
                      incluir:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>• Exhibición o fotocopia del carnet de identidad del titular</li>
                      <li>• Documentación del titular del QR si es persona distinta</li>
                      <li>• Escaneo personal del QR para verificar su legitimidad</li>
                    </ul>
                    <div className="mt-3 rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/10">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Tratamiento especial:</strong> La fotocopia del carnet de
                        identidad <strong>no se almacena</strong> en los sistemas
                        digitales. Se conserva físicamente, fuera de la plataforma, bajo
                        custodia exclusiva del administrador.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3.5 Comprobantes */}
                <div className="border-t pt-4">
                  <h3 className="mb-2 text-lg font-medium">
                    3.5 Comprobantes de pago
                  </h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p>
                      El comprador sube una imagen del comprobante de pago por cada
                      orden, mediante el <strong>selector nativo de archivos/fotos</strong> (no usa el permiso de cámara). Es visible únicamente para el comprador y la tienda involucrada.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <strong>Almacenamiento:</strong> Los archivos se almacenan mediante{" "}
                      <strong>Cloudinary</strong>. No se extraen datos automáticamente
                      mediante OCR. El usuario puede solicitar manualmente su eliminación.
                    </p>
                  </div>
                </div>

                {/* 3.6 Fotografías de productos - NUEVO */}
                <div className="border-t border-primary/20 bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">3.6 Fotografías de productos</h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      NUEVO
                    </span>
                  </div>
                  <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
                    <p>
                      Al publicar o editar un producto, la tienda puede agregar fotografías tomadas directamente con la <strong>cámara</strong> del dispositivo, o seleccionadas mediante el selector nativo. Estas imágenes son públicas, como parte de la ficha del producto (Sección 4).
                    </p>
                  </div>
                </div>

                {/* 3.7-3.8 */}
                <div className="border-t pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">3.7 Historial de pedidos</strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Se conserva completo. Sin eliminación automática; puede solicitarse manualmente.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">3.8 Comunicaciones</strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        TapTap <strong>no almacena</strong> las conversaciones entre comprador y tienda. Solo muestra el WhatsApp oficial.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 3.9: Permisos - ACTUALIZADO */}
            <section
              id="permisos"
              className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <Lock className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-primary">
                  3.9 Permisos del dispositivo (aplicación móvil)
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>La aplicación móvil solicita los siguientes permisos, cada uno limitado a su finalidad:</p>

                <div className="mt-3 space-y-3">
                  <div className="rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-orange-500" />
                      <strong>Cámara</strong>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Para tomar fotografías directamente desde la app, utilizadas (a) al publicar o editar fotos de productos (Sección 3.6), y (b) durante el proceso de solicitud de creación de una tienda, para fotografiar el negocio (Sección 3.2).
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      En las pantallas donde aplica, el usuario también puede optar por seleccionar una imagen ya existente mediante el selector nativo del sistema operativo en lugar de tomar una foto nueva.
                    </p>
                  </div>

                  <div className="rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-cyan-500" />
                      <strong>Ubicación (GPS)</strong>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Se solicita <strong>únicamente durante el proceso de solicitud de creación de una tienda</strong>, para capturar las coordenadas de la ubicación física del negocio (Sección 3.2).
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>✗ No se usa para la selección de zona de envío del comprador (que sigue siendo manual)</li>
                      <li>✗ No se usa para rastrear la ubicación de ningún usuario de forma continua</li>
                      <li>✗ No se activa en segundo plano</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <CheckCircle className="mr-2 inline h-4 w-4" />
                    La aplicación <strong>no solicita permisos de micrófono, contactos, ni acceso general o continuo a la galería de fotos</strong> (fuera del selector nativo).
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <AlertCircle className="mr-2 inline h-4 w-4" />
                    <strong>Nota:</strong> Esta sección reemplaza lo indicado en versiones anteriores de esta Política, que describían a la aplicación como una que no solicitaba ningún permiso del dispositivo; eso ya no es exacto desde la incorporación de las funciones descritas arriba.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 3.10: Datos técnicos */}
            <section className="rounded-xl border bg-card p-5">
              <h3 className="mb-2 text-lg font-medium">3.10 Datos técnicos</h3>
              <p className="text-sm text-muted-foreground">
                TapTap no ha diseñado un sistema específico para recopilar direcciones IP, modelo del dispositivo u otros datos técnicos. <strong>No utiliza</strong> cookies de rastreo, rastreo de ubicación en segundo plano, notificaciones push, analítica de comportamiento ni inteligencia artificial.
              </p>
            </section>

            {/* Sección 4: Info pública - ACTUALIZADO */}
            <section className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                  <Eye className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  4. Información visible públicamente
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Los compradores pueden ver la información que cada tienda proporcionó voluntariamente: nombre, descripción, productos (con sus fotografías), ubicación, logo, banner, número de WhatsApp, y enlaces a <strong>Instagram, Facebook y TikTok</strong>.
                </p>
                <div className="mt-3 rounded-lg bg-red-50/50 p-3 dark:bg-red-900/10">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <Radio className="mr-2 inline h-4 w-4" />
                    <strong>Indicador "estoy en vivo":</strong> Cuando la tienda lo activa, se muestra públicamente señalando que está transmitiendo en vivo en TikTok. Lo activa y desactiva manualmente el dueño de la tienda, y <strong>no implica ninguna verificación por parte de TapTap</strong> de que la transmisión esté realmente ocurriendo.
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  La ubicación de la tienda puede abrirse en Google Maps utilizando las coordenadas capturadas durante la creación. <strong>TapTap no rastrea ni publica la ubicación GPS del comprador.</strong>
                </p>
              </div>
            </section>

            {/* Secciones 5-9: Resumen */}
            <section className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Store,
                  title: "5. Información que ve la tienda",
                  content:
                    "La tienda ve únicamente los datos necesarios para completar el envío: zona, dirección, referencia, departamento y WhatsApp del comprador.",
                },
                {
                  icon: FileText,
                  title: "6. Finalidades del tratamiento",
                  content:
                    "Crear cuentas, publicar productos con fotografías, procesar órdenes, verificar tiendas, capturar ubicación física de tiendas, mostrar redes sociales y estado 'en vivo', y permitir calificaciones.",
                },
                {
                  icon: Clock,
                  title: "7. Conservación de datos",
                  content:
                    "La información se conserva mientras la cuenta esté activa. La eliminación de tiendas sigue un proceso de 30 días. Fotografías de productos se conservan mientras el producto o la tienda estén activos.",
                },
                {
                  icon: Lock,
                  title: "8. Seguridad",
                  content:
                    "Se adoptan medidas técnicas y organizativas razonables. La documentación física se conserva bajo custodia exclusiva del administrador.",
                },
                {
                  icon: Users,
                  title: "9. Acceso a los datos",
                  content:
                    "Acceden: el titular, la tienda correspondiente a la orden, el administrador (en app y panel web), Cloudinary como proveedor de infraestructura, y Google solo si el usuario usa Google Sign-In.",
                },
                {
                  icon: AlertCircle,
                  title: "3.4 Datos de pedidos y órdenes",
                  content:
                    "Se recopila la información generada por cada orden: producto, variante, cantidad, modalidad de entrega, estado, fecha y hora.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              ))}
            </section>

            {/* Sección 10: Derechos - ACTUALIZADO */}
            <section
              id="derechos"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  10. Derechos del titular de los datos
                </h2>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Conforme al{" "}
                  <strong>Artículo 130 de la Constitución Política del Estado</strong>,
                  toda persona tiene derecho a:
                </p>
                <ul className="mt-2 space-y-2">
                  <li>✓ Conocer qué datos personales suyos conserva TapTap</li>
                  <li>✓ Solicitar la corrección de datos inexactos</li>
                  <li>✓ Solicitar información sobre las finalidades del tratamiento</li>
                  <li>
                    ✓ Solicitar la eliminación manual de sus datos, incluyendo{" "}
                    <strong>comprobantes de pago, fotografías de productos e historial de pedidos</strong>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  Estas solicitudes pueden dirigirse al canal de contacto indicado en
                  la Sección 1.
                </p>
              </div>
            </section>

            {/* Sección 11-14 */}
            <section className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Database,
                  title: "11. Cloudinary y otros proveedores",
                  content:
                    "Cloudinary almacena imágenes de comprobantes y de productos, sin usarlas para fines propios. Google Sign-In actúa como proveedor de identidad limitado a nombre, apellido y correo.",
                },
                {
                  icon: MapPin,
                  title: "12. Google Maps",
                  content:
                    "La ubicación de tiendas se muestra en Google Maps usando las coordenadas capturadas por GPS durante su creación. TapTap no usa Google Maps ni el permiso de ubicación para rastrear al comprador ni a la tienda de forma continua.",
                },
                {
                  icon: Store,
                  title: "13. Comunicaciones con terceros",
                  content:
                    "Las conversaciones entre comprador y tienda ocurren fuera de TapTap (WhatsApp). TapTap no controla ni almacena estas conversaciones.",
                },
                {
                  icon: Users,
                  title: "14. Menores de edad",
                  content:
                    "TapTap está destinada exclusivamente a personas mayores de 18 años. No se recopilan deliberadamente datos de menores.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              ))}
            </section>

            {/* Secciones 15-21 */}
            <section className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="mb-4 text-xl font-semibold">
                15-21. Disposiciones adicionales
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">15. Conservación excepcional</h4>
                  <p className="text-muted-foreground">
                    La información puede conservarse frente a solicitud de eliminación
                    cuando existan órdenes en curso, indicios de fraude, disputas o
                    obligaciones legales.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">16. Modificación de datos</h4>
                  <p className="text-muted-foreground">
                    El usuario puede modificar nombre, WhatsApp, dirección y zona. La tienda puede modificar sus enlaces a Instagram, Facebook y TikTok, y activar/desactivar el indicador "estoy en vivo" en cualquier momento. El correo debe solicitarse por el canal de contacto.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">17-18. Eliminación de cuentas</h4>
                  <p className="text-muted-foreground">
                    Compradores y tiendas pueden solicitar la eliminación de sus cuentas a través del canal de contacto. Aplica sin importar si la cuenta fue creada por correo o por Google Sign-In.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">19-21. Cambios, jurisdicción y transferencias</h4>
                  <p className="text-muted-foreground">
                    Los cambios sustanciales serán comunicados. Jurisdicción en Tarija, Bolivia. El uso de Cloudinary y Google Sign-In puede implicar procesamiento en servidores internacionales.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 22: Funcionalidades futuras - ACTUALIZADO */}
            <section className="rounded-xl border border-dashed bg-muted/30 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500/10 text-slate-500">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  22. Funcionalidades futuras (no vigentes)
                </h2>
              </div>
              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Verificación por correo
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Modificación de correo desde la cuenta
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Autoeliminación de comprobantes
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Recuperación de contraseña
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Verificación documental de edad
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Permisos de micrófono o contactos
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Ubicación para fines distintos de crear tienda
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Notificaciones push
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Analítica de comportamiento
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Inteligencia artificial
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Extracción OCR de comprobantes
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Registro o solicitud de tienda desde web
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Funciones de comprador en la web
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Verificación de "estoy en vivo"
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Cobro por suscripción
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Correo oficial de TapTap
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Cuando TapTap implemente alguna de estas funcionalidades, esta Política
                será actualizada antes de su puesta en funcionamiento.
              </p>
            </section>

            {/* Anexo: Google Play Data Safety - ACTUALIZADO */}
            <section className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Building className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  Anexo — Resumen para la Sección de Seguridad de Datos de Google Play
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">
                        Categoría de dato (Play Console)
                      </th>
                      <th className="pb-2 font-medium">¿Se recopila?</th>
                      <th className="pb-2 font-medium">Detalle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2">Ubicación (aproximada o precisa)</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Sí, limitado
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Ubicación precisa (GPS), solicitada únicamente durante la creación de una tienda, para fijar las coordenadas del negocio. No se recopila la ubicación del comprador ni se rastrea de forma continua (Secciones 3.2, 3.9, 12).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Fotos o videos</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Sí, limitado
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Fotografías de productos y de la tienda, tomadas con la cámara o seleccionadas mediante el selector nativo; imagen del comprobante de pago subida vía selector nativo (Secciones 3.5, 3.6, 3.9).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Información personal</td>
                      <td className="py-2">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Sí
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Nombre y correo, del usuario o de Google Sign-In (Sección 3.1).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Números de teléfono</td>
                      <td className="py-2">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Sí
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Número de WhatsApp/teléfono, proporcionado por el usuario.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Dirección</td>
                      <td className="py-2">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Sí
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Dirección de domicilio y zona de envío del comprador (manuales), y ubicación física de la tienda (capturada por GPS durante su creación).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Archivos y documentos</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Sí, limitado
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Imágenes de comprobantes de pago y de productos/tienda.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Identificadores del dispositivo</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Sin recolección de IP, modelo ni perfilamiento.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Contactos</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        No se solicita ni accede a la lista de contactos.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Micrófono / audio</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        No se solicita este permiso.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Actividad en la app / analítica</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Sin herramientas de analítica de comportamiento.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Datos financieros</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Parcial
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        No se procesan pagos ni datos de tarjetas; solo la imagen del comprobante.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">
                    <strong>Terceros con acceso a datos:</strong> Cloudinary
                    (almacenamiento de imágenes) y Google (solo si el usuario usa Google
                    Sign-In, limitado a nombre, apellido y correo).
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">
                    <strong>Eliminación de cuenta:</strong> disponible mediante
                    solicitud manual al canal de contacto de la Sección 1, conforme a
                    las Secciones 17 y 18.
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                *Quien complete el formulario de Data Safety en Google Play Console debe
                verificar esta tabla contra la implementación técnica real vigente al
                momento de la publicación —en particular, los permisos de cámara y
                ubicación declarados en el manifiesto de la app deben coincidir
                exactamente con los usos aquí descritos.
              </p>
            </section>

            {/* Cambios v5.0 */}
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">
                Cambios en esta versión (v5.0)
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Camera className="mt-0.5 h-4 w-4 text-orange-500" />
                  <span>
                    <strong>Permisos de cámara y ubicación:</strong> Se reemplazó la
                    declaración de que la app "no solicita ningún permiso sensible" por
                    una descripción acotada de los dos permisos ahora solicitados
                    (Secciones 3.1, 3.2, 3.6, 3.9, 12).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Radio className="mt-0.5 h-4 w-4 text-red-500" />
                  <span>
                    <strong>TikTok y "estoy en vivo":</strong> Se agregaron al perfil
                    de tienda, con aclaración de que TapTap no verifica el indicador
                    (Secciones 3.2, 4, 16, 22).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Monitor className="mt-0.5 h-4 w-4 text-blue-500" />
                  <span>
                    <strong>Web exclusiva para vendedores/administradores:</strong> Se
                    precisó que no permite registro ni contiene funciones de comprador
                    (Sección 2).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>
                    <strong>Registro y solicitud de tienda solo desde app móvil:</strong>{" "}
                    Se agregó en Secciones 2, 3.1 y 3.2, y como ítem en Sección 22.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-4 w-4 text-purple-500" />
                  <span>
                    <strong>Renumeración:</strong> Se incorporó "Fotografías de
                    productos" (3.6) y "Permisos del dispositivo" pasó a 3.9.
                  </span>
                </li>
              </ul>
            </section>

            {/* Nota final */}
            <div className="rounded-lg border border-yellow-200/50 bg-yellow-50/50 p-4 text-sm text-muted-foreground dark:border-yellow-900/30 dark:bg-yellow-900/10">
              <p className="flex items-start gap-2">
                <span className="mt-0.5 text-yellow-600">ℹ️</span>
                <span>
                  <strong>Puntos a confirmar:</strong> Verificar que el manifiesto de la app declare exactamente los permisos de cámara y ubicación aquí descritos; confirmar si el permiso de ubicación se solicita como "mientras se usa la app"; y evaluar registrar historial de activación/desactivación del indicador "estoy en vivo".
                </span>
              </p>
            </div>

            {/* Contacto final */}
            <section
              id="contacto"
              className="rounded-xl border bg-primary/5 p-6 text-center"
            >
              <Mail className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="text-lg font-semibold">
                ¿Tienes preguntas sobre esta política?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Contáctanos a través del WhatsApp oficial o Instagram de TapTap
              </p>
              <Link
                to="/contacto"
                className="mt-3 inline-block rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Ir a contacto
              </Link>
            </section>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

=======
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  User,
  Store,
  FileText,
  CreditCard,
  MapPin,
  Clock,
  Users,
  Lock,
  Database,
  Mail,
  Smartphone,
  Monitor,
  Globe,
  AlertCircle,
  CheckCircle,
  Info,
  Eye,
  Building,
  Camera,
  Navigation,
  Radio,
  Instagram,
  Facebook,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";

const PoliticaDePrivacidad = () => {
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
              <Shield className="h-7 w-7" />
            </div>

            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Política de Privacidad
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                TapTap Bolivia · Versión 5.0 ·{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Aviso legal */}
          <div className="mt-6 rounded-lg border border-yellow-200/50 bg-yellow-50/50 p-4 text-sm dark:border-yellow-900/30 dark:bg-yellow-900/10">
            <p className="flex items-start gap-2 text-yellow-800 dark:text-yellow-200">
              <span className="mt-0.5 text-lg">⚖️</span>
              <span>
                <strong>Aviso importante:</strong> Este documento es un borrador
                jurídico-tecnológico de trabajo. <strong>No constituye asesoramiento legal definitivo</strong> y
                debe ser revisado por un abogado boliviano matriculado antes de su
                publicación como versión final.
              </span>
            </p>
          </div>

          {/* Cambios principales */}
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="mb-2 flex items-center gap-2 font-medium text-primary">
              <Info className="h-4 w-4" />
              Cambios principales respecto de la versión 4.0:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Camera className="mt-0.5 h-3.5 w-3.5 text-orange-500" />
                <span>La app móvil ahora solicita permiso de <strong>cámara</strong> (fotos de productos y de la tienda)</span>
              </li>
              <li className="flex items-start gap-2">
                <Navigation className="mt-0.5 h-3.5 w-3.5 text-cyan-500" />
                <span>Permiso de <strong>ubicación</strong> solo al crear una tienda (capturar coordenadas del negocio)</span>
              </li>
              <li className="flex items-start gap-2">
                <Radio className="mt-0.5 h-3.5 w-3.5 text-red-500" />
                <span>Se agregó <strong>TikTok</strong> e indicador <strong>"estoy en vivo"</strong> al perfil de tienda</span>
              </li>
              <li className="flex items-start gap-2">
                <Monitor className="mt-0.5 h-3.5 w-3.5 text-blue-500" />
                <span>La plataforma web pasó a ser de <strong>uso exclusivo para vendedores y administradores</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Smartphone className="mt-0.5 h-3.5 w-3.5 text-emerald-500" />
                <span>La creación de cuenta y solicitud de tienda <strong>solo están disponibles desde la app móvil</strong></span>
              </li>
            </ul>
          </div>

          {/* Índice rápido */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: User, label: "Responsable", href: "#responsable" },
              { icon: Smartphone, label: "Plataformas", href: "#plataformas" },
              { icon: Database, label: "Datos recopilados", href: "#datos" },
              { icon: Lock, label: "Permisos", href: "#permisos" },
              { icon: Clock, label: "Conservación", href: "#conservacion" },
              { icon: Users, label: "Derechos", href: "#derechos" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm transition-all hover:border-primary hover:bg-accent hover:shadow-sm"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Contenido */}
          <div className="mt-10 space-y-12">
            {/* Sección 1: Identidad del responsable */}
            <section
              id="responsable"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  1. Identidad del responsable y contacto
                </h2>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  TapTap Bolivia ("TapTap") es un proyecto tecnológico administrado
                  actualmente, como persona natural responsable de su operación, por{" "}
                  <strong>José Alejandro Cruz Delgado</strong>. TapTap no está, a la
                  fecha, constituida como sociedad comercial, por lo que no cuenta con
                  NIT propio, razón social ni domicilio empresarial distintos a los de
                  su administrador.
                </p>
                <div className="mt-3 rounded-lg bg-muted p-4">
                  <p className="flex items-start gap-2 text-sm">
                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <span>
                      <strong>Canal de contacto:</strong> TapTap actualmente no cuenta
                      con un correo electrónico oficial. El canal de contacto para
                      consultas sobre esta Política y para ejercer los derechos
                      descritos en la Sección 10 es el{" "}
                      <strong>WhatsApp oficial de TapTap</strong> y su{" "}
                      <strong>cuenta oficial de Instagram</strong>.
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 2: Alcance y plataformas - ACTUALIZADO */}
            <section
              id="plataformas"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                  <Globe className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  2. Alcance y plataformas
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Esta Política aplica al tratamiento de datos personales de
                  compradores, de tiendas, y de terceros cuyos datos puedan quedar
                  involucrados en el funcionamiento de la plataforma, dentro del
                  territorio boliviano, principalmente en la ciudad de Tarija.
                </p>

                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="mb-3 flex items-center gap-2 font-medium text-primary">
                    <Info className="h-4 w-4" />
                    TapTap opera actualmente en dos plataformas con funciones distintas:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-background p-3">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-emerald-500" />
                        <strong className="text-sm">Aplicación móvil</strong>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Especializada en el comprador. <strong>Única vía</strong> para crear una cuenta (de comprador o tienda) y solicitar conversión a vendedor. Permite publicar productos con fotos tomadas con la cámara.
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-blue-500" />
                        <strong className="text-sm">Plataforma web</strong>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        De <strong>uso exclusivo para vendedores y administradores</strong> ya habilitados. Panel de control. <strong>No permite crear cuentas ni iniciar solicitud de tienda, ni tiene funciones de comprador.</strong>
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Esta Política aplica a ambas plataformas; cuando un tratamiento sea específico de una de ellas (por ejemplo, los permisos del dispositivo, que solo aplican a la aplicación móvil), se indica expresamente.
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-green-50/50 p-4 dark:bg-green-900/10">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <CheckCircle className="mr-2 inline h-4 w-4" />
                    Ninguna verificación, suspensión, moderación o decisión descrita en
                    esta Política es tomada mediante un sistema automatizado o de
                    inteligencia artificial: todas son decisiones humanas del
                    administrador.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 3: Datos recopilados */}
            <section
              id="datos"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">3. Datos que se recopilan</h2>
              </div>
              <div className="space-y-6">
                {/* 3.1 Registro de compradores - ACTUALIZADO */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">
                      3.1 Registro y datos de compradores
                    </h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      ACTUALIZADO
                    </span>
                  </div>
                  <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <p className="text-sm text-primary">
                        <Smartphone className="mr-2 inline h-4 w-4" />
                        <strong>La creación de una cuenta de comprador solo está disponible actualmente a través de la aplicación móvil.</strong>
                      </p>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <strong className="text-sm">Correo y contraseña</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          El usuario ingresa manualmente todos los datos: nombre completo, nombre de usuario, correo, WhatsApp, zona de envío, dirección y referencia opcional.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-500" />
                          <strong className="text-sm">Google Sign-In</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          TapTap obtiene <strong>únicamente nombre, apellido y correo</strong>. No accede a fotos, contactos, calendario, Drive ni otros datos. El resto se completa manualmente.
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <AlertCircle className="mr-2 inline h-4 w-4" />
                        <strong>Importante:</strong> TapTap no envía códigos de verificación al correo, no verifica la identidad del comprador mediante carnet, no verifica el número de WhatsApp, ni verifica documentalmente su edad.
                      </p>
                    </div>

                    {/* Zona de envío */}
                    <div className="mt-3 rounded-lg bg-purple-50/50 p-3 dark:bg-purple-900/10">
                      <p className="flex items-center gap-2 font-medium text-purple-700 dark:text-purple-300">
                        <MapPin className="h-4 w-4" />
                        Zona de envío (áreas geográficas)
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Las zonas son definidas por TapTap mediante áreas geográficas delimitadas (polígonos) dentro de la ciudad de Tarija. <strong>La selección sigue siendo manual</strong>, sin que la aplicación acceda a la ubicación real del dispositivo del comprador para esta función. Esto es distinto del uso del permiso de ubicación durante la creación de una tienda (Secciones 3.2 y 3.9).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3.2 Tiendas - ACTUALIZADO */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">3.2 Datos de tiendas</h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      ACTUALIZADO
                    </span>
                  </div>
                  <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <p className="text-sm text-primary">
                        <Smartphone className="mr-2 inline h-4 w-4" />
                        <strong>La solicitud para crear una tienda solo puede iniciarse desde la aplicación móvil</strong>, a partir de una cuenta de comprador ya existente.
                      </p>
                    </div>

                    <p className="mt-3">
                      Al solicitar la creación de una tienda, se recopilan: nombre de la tienda, identidad del titular, número de WhatsApp oficial, código QR bancario, nombre completo del titular de la cuenta bancaria asociada al QR, logo, banner, productos, y demás información necesaria para publicar la tienda, incluyendo:
                    </p>

                    <div className="mt-3 space-y-2">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-cyan-500" />
                          <strong className="text-sm">Ubicación física (si corresponde)</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Si la tienda cuenta con establecimiento físico, su ubicación se captura mediante el <strong>permiso de ubicación (GPS)</strong> durante la solicitud. Queda asociada al perfil y se muestra a compradores en Google Maps.
                        </p>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-orange-500" />
                          <strong className="text-sm">Fotografías de la tienda</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          La app permite tomar fotografías directamente con la <strong>cámara</strong> del dispositivo (por ejemplo, del local o fachada), además de poder seleccionar imágenes existentes mediante el selector nativo.
                        </p>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-500" />
                          <Facebook className="h-4 w-4 text-blue-500" />
                          <Radio className="h-4 w-4 text-red-500" />
                          <strong className="text-sm">Redes sociales y estado "estoy en vivo"</strong>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Instagram, Facebook y <strong>TikTok</strong> (opcionales). El dueño puede activar/desactivar manualmente el indicador "estoy en vivo" para señalar a compradores que transmite en vivo en TikTok (ver Sección 4). <strong>TapTap no verifica que la transmisión esté ocurriendo.</strong>
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                      Esta información, salvo el QR bancario, es visible públicamente. La tienda puede modificar su enlace de TikTok y el estado "estoy en vivo" en cualquier momento (Sección 16).
                    </p>
                  </div>
                </div>

                {/* 3.3 Verificación */}
                <div className="border-t pt-4">
                  <h3 className="mb-2 text-lg font-medium">
                    3.3 Datos para verificación de tiendas y QR
                  </h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p>
                      TapTap realiza un proceso de verificación manual que puede
                      incluir:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>• Exhibición o fotocopia del carnet de identidad del titular</li>
                      <li>• Documentación del titular del QR si es persona distinta</li>
                      <li>• Escaneo personal del QR para verificar su legitimidad</li>
                    </ul>
                    <div className="mt-3 rounded-lg bg-amber-50/50 p-4 dark:bg-amber-900/10">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Tratamiento especial:</strong> La fotocopia del carnet de
                        identidad <strong>no se almacena</strong> en los sistemas
                        digitales. Se conserva físicamente, fuera de la plataforma, bajo
                        custodia exclusiva del administrador.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3.5 Comprobantes */}
                <div className="border-t pt-4">
                  <h3 className="mb-2 text-lg font-medium">
                    3.5 Comprobantes de pago
                  </h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p>
                      El comprador sube una imagen del comprobante de pago por cada
                      orden, mediante el <strong>selector nativo de archivos/fotos</strong> (no usa el permiso de cámara). Es visible únicamente para el comprador y la tienda involucrada.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <strong>Almacenamiento:</strong> Los archivos se almacenan mediante{" "}
                      <strong>Cloudinary</strong>. No se extraen datos automáticamente
                      mediante OCR. El usuario puede solicitar manualmente su eliminación.
                    </p>
                  </div>
                </div>

                {/* 3.6 Fotografías de productos - NUEVO */}
                <div className="border-t border-primary/20 bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">3.6 Fotografías de productos</h3>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      NUEVO
                    </span>
                  </div>
                  <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
                    <p>
                      Al publicar o editar un producto, la tienda puede agregar fotografías tomadas directamente con la <strong>cámara</strong> del dispositivo, o seleccionadas mediante el selector nativo. Estas imágenes son públicas, como parte de la ficha del producto (Sección 4).
                    </p>
                  </div>
                </div>

                {/* 3.7-3.8 */}
                <div className="border-t pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">3.7 Historial de pedidos</strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Se conserva completo. Sin eliminación automática; puede solicitarse manualmente.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <strong className="text-sm">3.8 Comunicaciones</strong>
                      <p className="mt-1 text-xs text-muted-foreground">
                        TapTap <strong>no almacena</strong> las conversaciones entre comprador y tienda. Solo muestra el WhatsApp oficial.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 3.9: Permisos - ACTUALIZADO */}
            <section
              id="permisos"
              className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <Lock className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-primary">
                  3.9 Permisos del dispositivo (aplicación móvil)
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>La aplicación móvil solicita los siguientes permisos, cada uno limitado a su finalidad:</p>

                <div className="mt-3 space-y-3">
                  <div className="rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-orange-500" />
                      <strong>Cámara</strong>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Para tomar fotografías directamente desde la app, utilizadas (a) al publicar o editar fotos de productos (Sección 3.6), y (b) durante el proceso de solicitud de creación de una tienda, para fotografiar el negocio (Sección 3.2).
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      En las pantallas donde aplica, el usuario también puede optar por seleccionar una imagen ya existente mediante el selector nativo del sistema operativo en lugar de tomar una foto nueva.
                    </p>
                  </div>

                  <div className="rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-cyan-500" />
                      <strong>Ubicación (GPS)</strong>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Se solicita <strong>únicamente durante el proceso de solicitud de creación de una tienda</strong>, para capturar las coordenadas de la ubicación física del negocio (Sección 3.2).
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>✗ No se usa para la selección de zona de envío del comprador (que sigue siendo manual)</li>
                      <li>✗ No se usa para rastrear la ubicación de ningún usuario de forma continua</li>
                      <li>✗ No se activa en segundo plano</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <CheckCircle className="mr-2 inline h-4 w-4" />
                    La aplicación <strong>no solicita permisos de micrófono, contactos, ni acceso general o continuo a la galería de fotos</strong> (fuera del selector nativo).
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <AlertCircle className="mr-2 inline h-4 w-4" />
                    <strong>Nota:</strong> Esta sección reemplaza lo indicado en versiones anteriores de esta Política, que describían a la aplicación como una que no solicitaba ningún permiso del dispositivo; eso ya no es exacto desde la incorporación de las funciones descritas arriba.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 3.10: Datos técnicos */}
            <section className="rounded-xl border bg-card p-5">
              <h3 className="mb-2 text-lg font-medium">3.10 Datos técnicos</h3>
              <p className="text-sm text-muted-foreground">
                TapTap no ha diseñado un sistema específico para recopilar direcciones IP, modelo del dispositivo u otros datos técnicos. <strong>No utiliza</strong> cookies de rastreo, rastreo de ubicación en segundo plano, notificaciones push, analítica de comportamiento ni inteligencia artificial.
              </p>
            </section>

            {/* Sección 4: Info pública - ACTUALIZADO */}
            <section className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                  <Eye className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  4. Información visible públicamente
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Los compradores pueden ver la información que cada tienda proporcionó voluntariamente: nombre, descripción, productos (con sus fotografías), ubicación, logo, banner, número de WhatsApp, y enlaces a <strong>Instagram, Facebook y TikTok</strong>.
                </p>
                <div className="mt-3 rounded-lg bg-red-50/50 p-3 dark:bg-red-900/10">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <Radio className="mr-2 inline h-4 w-4" />
                    <strong>Indicador "estoy en vivo":</strong> Cuando la tienda lo activa, se muestra públicamente señalando que está transmitiendo en vivo en TikTok. Lo activa y desactiva manualmente el dueño de la tienda, y <strong>no implica ninguna verificación por parte de TapTap</strong> de que la transmisión esté realmente ocurriendo.
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  La ubicación de la tienda puede abrirse en Google Maps utilizando las coordenadas capturadas durante la creación. <strong>TapTap no rastrea ni publica la ubicación GPS del comprador.</strong>
                </p>
              </div>
            </section>

            {/* Secciones 5-9: Resumen */}
            <section className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Store,
                  title: "5. Información que ve la tienda",
                  content:
                    "La tienda ve únicamente los datos necesarios para completar el envío: zona, dirección, referencia, departamento y WhatsApp del comprador.",
                },
                {
                  icon: FileText,
                  title: "6. Finalidades del tratamiento",
                  content:
                    "Crear cuentas, publicar productos con fotografías, procesar órdenes, verificar tiendas, capturar ubicación física de tiendas, mostrar redes sociales y estado 'en vivo', y permitir calificaciones.",
                },
                {
                  icon: Clock,
                  title: "7. Conservación de datos",
                  content:
                    "La información se conserva mientras la cuenta esté activa. La eliminación de tiendas sigue un proceso de 30 días. Fotografías de productos se conservan mientras el producto o la tienda estén activos.",
                },
                {
                  icon: Lock,
                  title: "8. Seguridad",
                  content:
                    "Se adoptan medidas técnicas y organizativas razonables. La documentación física se conserva bajo custodia exclusiva del administrador.",
                },
                {
                  icon: Users,
                  title: "9. Acceso a los datos",
                  content:
                    "Acceden: el titular, la tienda correspondiente a la orden, el administrador (en app y panel web), Cloudinary como proveedor de infraestructura, y Google solo si el usuario usa Google Sign-In.",
                },
                {
                  icon: AlertCircle,
                  title: "3.4 Datos de pedidos y órdenes",
                  content:
                    "Se recopila la información generada por cada orden: producto, variante, cantidad, modalidad de entrega, estado, fecha y hora.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              ))}
            </section>

            {/* Sección 10: Derechos - ACTUALIZADO */}
            <section
              id="derechos"
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  10. Derechos del titular de los datos
                </h2>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Conforme al{" "}
                  <strong>Artículo 130 de la Constitución Política del Estado</strong>,
                  toda persona tiene derecho a:
                </p>
                <ul className="mt-2 space-y-2">
                  <li>✓ Conocer qué datos personales suyos conserva TapTap</li>
                  <li>✓ Solicitar la corrección de datos inexactos</li>
                  <li>✓ Solicitar información sobre las finalidades del tratamiento</li>
                  <li>
                    ✓ Solicitar la eliminación manual de sus datos, incluyendo{" "}
                    <strong>comprobantes de pago, fotografías de productos e historial de pedidos</strong>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  Estas solicitudes pueden dirigirse al canal de contacto indicado en
                  la Sección 1.
                </p>
              </div>
            </section>

            {/* Sección 11-14 */}
            <section className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Database,
                  title: "11. Cloudinary y otros proveedores",
                  content:
                    "Cloudinary almacena imágenes de comprobantes y de productos, sin usarlas para fines propios. Google Sign-In actúa como proveedor de identidad limitado a nombre, apellido y correo.",
                },
                {
                  icon: MapPin,
                  title: "12. Google Maps",
                  content:
                    "La ubicación de tiendas se muestra en Google Maps usando las coordenadas capturadas por GPS durante su creación. TapTap no usa Google Maps ni el permiso de ubicación para rastrear al comprador ni a la tienda de forma continua.",
                },
                {
                  icon: Store,
                  title: "13. Comunicaciones con terceros",
                  content:
                    "Las conversaciones entre comprador y tienda ocurren fuera de TapTap (WhatsApp). TapTap no controla ni almacena estas conversaciones.",
                },
                {
                  icon: Users,
                  title: "14. Menores de edad",
                  content:
                    "TapTap está destinada exclusivamente a personas mayores de 18 años. No se recopilan deliberadamente datos de menores.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              ))}
            </section>

            {/* Secciones 15-21 */}
            <section className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="mb-4 text-xl font-semibold">
                15-21. Disposiciones adicionales
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">15. Conservación excepcional</h4>
                  <p className="text-muted-foreground">
                    La información puede conservarse frente a solicitud de eliminación
                    cuando existan órdenes en curso, indicios de fraude, disputas o
                    obligaciones legales.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">16. Modificación de datos</h4>
                  <p className="text-muted-foreground">
                    El usuario puede modificar nombre, WhatsApp, dirección y zona. La tienda puede modificar sus enlaces a Instagram, Facebook y TikTok, y activar/desactivar el indicador "estoy en vivo" en cualquier momento. El correo debe solicitarse por el canal de contacto.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">17-18. Eliminación de cuentas</h4>
                  <p className="text-muted-foreground">
                    Compradores y tiendas pueden solicitar la eliminación de sus cuentas a través del canal de contacto. Aplica sin importar si la cuenta fue creada por correo o por Google Sign-In.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">19-21. Cambios, jurisdicción y transferencias</h4>
                  <p className="text-muted-foreground">
                    Los cambios sustanciales serán comunicados. Jurisdicción en Tarija, Bolivia. El uso de Cloudinary y Google Sign-In puede implicar procesamiento en servidores internacionales.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 22: Funcionalidades futuras - ACTUALIZADO */}
            <section className="rounded-xl border border-dashed bg-muted/30 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500/10 text-slate-500">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  22. Funcionalidades futuras (no vigentes)
                </h2>
              </div>
              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Verificación por correo
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Modificación de correo desde la cuenta
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Autoeliminación de comprobantes
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Recuperación de contraseña
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Verificación documental de edad
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Permisos de micrófono o contactos
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Ubicación para fines distintos de crear tienda
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Notificaciones push
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Analítica de comportamiento
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Inteligencia artificial
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Extracción OCR de comprobantes
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Registro o solicitud de tienda desde web
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Funciones de comprador en la web
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Verificación de "estoy en vivo"
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Cobro por suscripción
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Correo oficial de TapTap
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Cuando TapTap implemente alguna de estas funcionalidades, esta Política
                será actualizada antes de su puesta en funcionamiento.
              </p>
            </section>

            {/* Anexo: Google Play Data Safety - ACTUALIZADO */}
            <section className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Building className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">
                  Anexo — Resumen para la Sección de Seguridad de Datos de Google Play
                </h2>
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  ACTUALIZADO
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 font-medium">
                        Categoría de dato (Play Console)
                      </th>
                      <th className="pb-2 font-medium">¿Se recopila?</th>
                      <th className="pb-2 font-medium">Detalle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2">Ubicación (aproximada o precisa)</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Sí, limitado
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Ubicación precisa (GPS), solicitada únicamente durante la creación de una tienda, para fijar las coordenadas del negocio. No se recopila la ubicación del comprador ni se rastrea de forma continua (Secciones 3.2, 3.9, 12).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Fotos o videos</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Sí, limitado
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Fotografías de productos y de la tienda, tomadas con la cámara o seleccionadas mediante el selector nativo; imagen del comprobante de pago subida vía selector nativo (Secciones 3.5, 3.6, 3.9).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Información personal</td>
                      <td className="py-2">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Sí
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Nombre y correo, del usuario o de Google Sign-In (Sección 3.1).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Números de teléfono</td>
                      <td className="py-2">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Sí
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Número de WhatsApp/teléfono, proporcionado por el usuario.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Dirección</td>
                      <td className="py-2">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Sí
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Dirección de domicilio y zona de envío del comprador (manuales), y ubicación física de la tienda (capturada por GPS durante su creación).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Archivos y documentos</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Sí, limitado
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Imágenes de comprobantes de pago y de productos/tienda.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Identificadores del dispositivo</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Sin recolección de IP, modelo ni perfilamiento.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Contactos</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        No se solicita ni accede a la lista de contactos.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Micrófono / audio</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        No se solicita este permiso.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Actividad en la app / analítica</td>
                      <td className="py-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          No
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        Sin herramientas de analítica de comportamiento.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Datos financieros</td>
                      <td className="py-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Parcial
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        No se procesan pagos ni datos de tarjetas; solo la imagen del comprobante.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">
                    <strong>Terceros con acceso a datos:</strong> Cloudinary
                    (almacenamiento de imágenes) y Google (solo si el usuario usa Google
                    Sign-In, limitado a nombre, apellido y correo).
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">
                    <strong>Eliminación de cuenta:</strong> disponible mediante
                    solicitud manual al canal de contacto de la Sección 1, conforme a
                    las Secciones 17 y 18.
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                *Quien complete el formulario de Data Safety en Google Play Console debe
                verificar esta tabla contra la implementación técnica real vigente al
                momento de la publicación —en particular, los permisos de cámara y
                ubicación declarados en el manifiesto de la app deben coincidir
                exactamente con los usos aquí descritos.
              </p>
            </section>

            {/* Cambios v5.0 */}
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">
                Cambios en esta versión (v5.0)
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Camera className="mt-0.5 h-4 w-4 text-orange-500" />
                  <span>
                    <strong>Permisos de cámara y ubicación:</strong> Se reemplazó la
                    declaración de que la app "no solicita ningún permiso sensible" por
                    una descripción acotada de los dos permisos ahora solicitados
                    (Secciones 3.1, 3.2, 3.6, 3.9, 12).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Radio className="mt-0.5 h-4 w-4 text-red-500" />
                  <span>
                    <strong>TikTok y "estoy en vivo":</strong> Se agregaron al perfil
                    de tienda, con aclaración de que TapTap no verifica el indicador
                    (Secciones 3.2, 4, 16, 22).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Monitor className="mt-0.5 h-4 w-4 text-blue-500" />
                  <span>
                    <strong>Web exclusiva para vendedores/administradores:</strong> Se
                    precisó que no permite registro ni contiene funciones de comprador
                    (Sección 2).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>
                    <strong>Registro y solicitud de tienda solo desde app móvil:</strong>{" "}
                    Se agregó en Secciones 2, 3.1 y 3.2, y como ítem en Sección 22.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-4 w-4 text-purple-500" />
                  <span>
                    <strong>Renumeración:</strong> Se incorporó "Fotografías de
                    productos" (3.6) y "Permisos del dispositivo" pasó a 3.9.
                  </span>
                </li>
              </ul>
            </section>

            {/* Nota final */}
            <div className="rounded-lg border border-yellow-200/50 bg-yellow-50/50 p-4 text-sm text-muted-foreground dark:border-yellow-900/30 dark:bg-yellow-900/10">
              <p className="flex items-start gap-2">
                <span className="mt-0.5 text-yellow-600">ℹ️</span>
                <span>
                  <strong>Puntos a confirmar:</strong> Verificar que el manifiesto de la app declare exactamente los permisos de cámara y ubicación aquí descritos; confirmar si el permiso de ubicación se solicita como "mientras se usa la app"; y evaluar registrar historial de activación/desactivación del indicador "estoy en vivo".
                </span>
              </p>
            </div>

            {/* Contacto final */}
            <section
              id="contacto"
              className="rounded-xl border bg-primary/5 p-6 text-center"
            >
              <Mail className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="text-lg font-semibold">
                ¿Tienes preguntas sobre esta política?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Contáctanos a través del WhatsApp oficial o Instagram de TapTap
              </p>
              <Link
                to="/contacto"
                className="mt-3 inline-block rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Ir a contacto
              </Link>
            </section>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
export default PoliticaDePrivacidad;