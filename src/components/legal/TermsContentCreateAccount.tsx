<<<<<<< HEAD
import React from "react";
import {
  User,
  Shield,
  ShoppingCart,
  CreditCard,
  Truck,
  Package,
  Star,
  AlertCircle,
  Info,
  Mail,
  FileText,
  Clock,
  Store,
  CheckCircle,
  XCircle,
  Smartphone,
  Globe,
  Monitor,
  Lock,
  MapPin,
  Users,
  Camera,
  Navigation,
  Radio,
} from "lucide-react";

const TermsContentCreateAccount = () => {
  return (
    <div className="space-y-8">
      {/* A.1 Identificación - ACTUALIZADO */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.1 Identificación y naturaleza de TapTap</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            TapTap Bolivia ("TapTap", "la plataforma") es un proyecto tecnológico administrado actualmente por{" "}
            <strong>José Alejandro Cruz Delgado</strong>, como persona natural responsable de su operación y administración. TapTap actualmente{" "}
            <strong>no está constituida como sociedad comercial</strong>, no cuenta con NIT propio ni con domicilio legal independiente de su administrador.
          </p>

          {/* Dos plataformas - ACTUALIZADO */}
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
                  Especializada en el uso del comprador. Es además la <strong>única vía</strong> para crear una cuenta y para solicitar la conversión de comprador a vendedor.
                </p>
              </div>
              <div className="rounded-lg bg-background p-3">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-blue-500" />
                  <strong className="text-sm">Plataforma web</strong>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  De <strong>uso exclusivo para vendedores y administradores</strong> ya habilitados, como panel de control. <strong>No permite crear cuentas ni tiene funciones de comprador.</strong>
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Estos Términos aplican a ambas plataformas; cuando una regla sea específica de una de ellas, se indica expresamente.
            </p>
          </div>

          <div className="mt-3 rounded-lg bg-blue-50/50 p-3 dark:bg-blue-900/10">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <Info className="mr-2 inline h-4 w-4" />
              TapTap <strong>no es propietaria, compradora ni vendedora</strong> de los productos publicados, no fija precios, no procesa pagos, no recibe dinero, no cobra comisión y no realiza envíos.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Ninguna verificación, suspensión o moderación es realizada mediante un sistema automatizado o de inteligencia artificial: todas son decisiones humanas del administrador.
          </p>
        </div>
      </section>

      {/* A.2 Registro - ACTUALIZADO */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <User className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.2 Registro de cuenta</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="rounded-lg bg-primary/10 p-3">
            <p className="text-sm text-primary">
              <Smartphone className="mr-2 inline h-4 w-4" />
              <strong>La creación de una cuenta solo está disponible actualmente a través de la aplicación móvil.</strong>
            </p>
          </div>

          <p className="mt-3">El usuario puede crear su cuenta de dos maneras:</p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <strong className="text-sm">Correo y contraseña</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Ingresando manualmente: nombre completo, nombre de usuario, correo, WhatsApp, zona de envío, dirección y referencia opcional.
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <strong className="text-sm">Google Sign-In</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                TapTap obtiene <strong>únicamente nombre, apellido y correo</strong>. El resto de los datos debe completarlos el usuario manualmente.
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
              Las zonas son definidas por TapTap mediante áreas geográficas delimitadas (polígonos) dentro de la ciudad de Tarija.{" "}
              <strong>La selección sigue siendo manual</strong>, sin que la aplicación acceda a la ubicación real del dispositivo del comprador para esta función (ver Sección A.2.1).
            </p>
          </div>

          <p className="mt-3 text-sm">
            <strong>Edad mínima:</strong> TapTap está destinada exclusivamente a <strong>personas mayores de 18 años</strong>. No se verifica documentalmente la edad.
          </p>
        </div>
      </section>

      {/* A.2.1 Permisos - ACTUALIZADO */}
      <section className="space-y-3 border-t border-primary/20 bg-primary/5 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <Lock className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-primary">A.2.1 Permisos del dispositivo (aplicación móvil)</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>La aplicación móvil solicita los siguientes permisos, cada uno limitado a su finalidad:</p>

          <div className="mt-3 space-y-3">
            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-orange-500" />
                <strong className="text-sm">Cámara</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Para tomar fotografías directamente desde la app: (a) al publicar o editar fotos de productos, y (b) durante el proceso de solicitud de creación de una tienda, para fotografiar el negocio. El usuario también puede optar por seleccionar una imagen existente mediante el selector nativo del sistema operativo.
              </p>
            </div>

            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-cyan-500" />
                <strong className="text-sm">Ubicación (GPS)</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Se solicita <strong>únicamente durante el proceso de solicitud de creación de una tienda</strong>, para capturar las coordenadas de la ubicación física del negocio. <strong>No se usa para la selección de zona de envío del comprador</strong> (que sigue siendo manual), ni para rastrear a ningún usuario de forma continua o en segundo plano.
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
            <p className="text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="mr-2 inline h-4 w-4" />
              La aplicación <strong>no solicita permisos de micrófono, contactos, ni acceso general o continuo a la galería de fotos</strong> fuera del selector nativo. Para subir el comprobante de pago (Sección A.5), se utiliza el selector nativo sin requerir el permiso de cámara.
            </p>
          </div>
        </div>
      </section>

      {/* A.3 Naturaleza de la orden */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
            <ShoppingCart className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.3 Naturaleza de la orden y flujo de compra</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>El proceso de compra funciona de la siguiente manera:</p>
          <ol className="mt-2 space-y-1">
            <li>1. El usuario selecciona un producto, variante y cantidad</li>
            <li>2. Presiona "Comprar ahora"</li>
            <li>3. Selecciona la modalidad de entrega o retiro</li>
            <li>4. Se genera una orden y el sistema reserva el stock</li>
          </ol>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>Nota:</strong> TapTap no utiliza actualmente un carrito de compras. Cada orden corresponde de forma independiente a un producto/variante/cantidad seleccionados.
          </p>
          <div className="mt-3 rounded-lg bg-muted p-3">
            <p className="text-sm">
              <strong>Cancelación por el comprador:</strong>
            </p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                ✓ <strong>Antes de subir el comprobante:</strong> Puede cancelar directamente desde TapTap
              </li>
              <li>
                ⚠️ <strong>Después de subir el comprobante:</strong> Debe comunicarse con la tienda. La devolución/reembolso corresponde a la relación directa entre comprador y tienda.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* A.3.1 Cancelación por tienda */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <XCircle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.3.1 Cancelación de la orden por parte de la tienda</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>La tienda puede cancelar una orden después de que el comprador haya subido el comprobante, por los siguientes motivos:</p>

          <div className="mt-3 space-y-3">
            <div className="rounded-lg border-l-4 border-red-400 bg-red-50/50 p-3 dark:bg-red-900/10">
              <h4 className="font-medium text-red-700 dark:text-red-300">a) Comprobante falso o manipulado</h4>
              <p className="text-sm text-muted-foreground">
                La tienda puede cancelar si considera que el comprobante es falso, manipulado o no corresponde a una operación real.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <strong>Importante:</strong> El hecho de que una tienda cancele por este motivo no significa, por sí solo, que TapTap determine que existió fraude.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50/50 p-3 dark:bg-amber-900/10">
              <h4 className="font-medium text-amber-700 dark:text-amber-300">b) Monto de pago incorrecto</h4>
              <p className="text-sm text-muted-foreground">
                La tienda puede cancelar cuando el monto pagado no corresponde al total de la orden.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <strong>No debe tratarse automáticamente como fraude</strong> — puede deberse a un error del comprador.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50/50 p-3 dark:bg-blue-900/10">
              <h4 className="font-medium text-blue-700 dark:text-blue-300">c) Otros motivos justificados</h4>
              <p className="text-sm text-muted-foreground">
                Por ejemplo, imposibilidad real de completar la operación (falta de stock físico).
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
            <p className="text-sm">
              <strong>Distinción importante:</strong> Un pago que todavía no aparece acreditado <strong>no debe presumirse como fraude</strong>, ya que TapTap no controla ni supervisa el procesamiento bancario.
            </p>
          </div>
        </div>
      </section>

      {/* A.4 Pagos */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <CreditCard className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.4 Pagos</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            El pago se realiza <strong>directamente entre el comprador y la tienda</strong>, mediante el código QR bancario verificado por TapTap.
          </p>
          <div className="mt-2 rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
            <p className="text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="mr-2 inline h-4 w-4" />
              TapTap muestra al comprador el <strong>nombre del titular de la cuenta bancaria</strong> asociada al QR.
            </p>
          </div>
          <div className="mt-2 rounded-lg bg-yellow-50/50 p-3 dark:bg-yellow-900/10">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="mr-2 inline h-4 w-4" />
              <strong>TapTap no recibe, no custodia, no procesa ni administra el dinero.</strong> No actúa como entidad financiera.
            </p>
          </div>
        </div>
      </section>

      {/* A.5 Comprobante */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.5 Comprobante de pago</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            El comprador debe subir una imagen del comprobante usando el{" "}
            <strong>selector nativo de archivos/fotos del sistema operativo</strong> (Sección A.2.1). Esta imagen:
          </p>
          <ul className="mt-2 space-y-1">
            <li>✓ Queda asociada a la orden y es visible para comprador y tienda</li>
            <li>✓ Se almacena mediante <strong>Cloudinary</strong> (proveedor externo)</li>
            <li>⚠️ <strong>No se extraen datos automáticamente</strong> (OCR) de la imagen</li>
            <li>⚠️ Puede solicitarse su eliminación manual</li>
          </ul>
        </div>
      </section>

      {/* A.6 Tiendas verificadas */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <Store className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.6 Tiendas verificadas y verificación del QR</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>Una tienda solo aparece públicamente luego de que el administrador ha revisado y verificado manualmente:</p>
          <ul className="mt-2 space-y-1">
            <li>• Identidad del titular</li>
            <li>• Titularidad del QR bancario</li>
            <li>• Datos de la tienda</li>
            <li>• Ubicación (si aplica)</li>
            <li>• Número de WhatsApp oficial</li>
          </ul>
          <div className="mt-3 rounded-lg bg-muted p-3">
            <p className="text-sm">
              <strong>El estado de "tienda verificada" significa únicamente</strong> que TapTap realizó estas comprobaciones al momento de la verificación. No garantiza cumplimiento comercial, autenticidad, stock físico, ni éxito de transacciones futuras.
            </p>
          </div>
        </div>
      </section>

      {/* A.7 Cambio de datos críticos */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
            <AlertCircle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.7 Cambio de datos críticos de una tienda</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Cuando una tienda modifica su <strong>QR bancario, WhatsApp oficial o ubicación</strong>, queda automáticamente fuera de la visibilidad pública y pierde temporalmente su verificación.
          </p>
          <div className="mt-2 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <AlertCircle className="mr-2 inline h-4 w-4" />
              <strong>Medida preventiva de seguridad</strong> — no es una declaración de culpabilidad. No tiene plazo fijo y no elimina información.
            </p>
          </div>
        </div>
      </section>

      {/* A.8 Envíos */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-500">
            <Truck className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.8 Envíos y recepción</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>El costo de envío es establecido por cada tienda. El envío es realizado por la propia tienda.</p>

          <div className="mt-3 rounded-lg bg-blue-50/50 p-3 dark:bg-blue-900/10">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">Mecanismo de recepción</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <strong>1. Comprador confirma:</strong>
                <span className="block text-muted-foreground">Puede marcar la orden como recibida en cualquier momento.</span>
              </li>
              <li>
                <strong>2. Si pasan 7 días sin confirmación:</strong>
                <span className="block text-muted-foreground">
                  El sistema <strong>habilita a la tienda</strong> para marcar la orden como <strong>"completada"</strong>.
                </span>
                <span className="block text-xs text-muted-foreground">
                  No implica que TapTap certifique la entrega real.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* A.9-A.12 */}
      <section className="grid gap-4 sm:grid-cols-2 border-t pt-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <h4 className="font-medium">A.9 Stock</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap <strong>no garantiza</strong> que el stock mostrado coincida con el inventario físico real.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <h4 className="font-medium">A.10 Productos prohibidos</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            No se pueden publicar: armas, drogas, tabaco, alcohol, medicamentos, alimentos, productos sexuales, servicios, productos robados, ni que infrinjan propiedad intelectual.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            <strong>Usados permitidos:</strong> Ropa y tecnología/electrónica.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <h4 className="font-medium">A.11 Calificaciones</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Tras marcar como recibido, <strong>o una vez que la orden quede completada</strong>, el comprador puede calificar.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-500" />
            <h4 className="font-medium">A.12 Suspensión de cuentas</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap puede suspender una cuenta ante indicios razonables de fraude, actividad ilícita, incumplimiento, o comportamiento que perjudique a otros usuarios.
          </p>
        </div>
      </section>

      {/* A.13 Limitación - ACTUALIZADO */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-500/10 text-slate-500">
            <AlertCircle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.13 Limitación de responsabilidad</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
            <p className="text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="mr-2 inline h-4 w-4" />
              TapTap responde por el correcto funcionamiento de sus herramientas, por la diligencia en la verificación manual y, cuando corresponda, por la captura correcta de la ubicación de una tienda durante su creación.
            </p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TapTap no responde por:</strong>
          </p>
          <ul className="text-sm text-muted-foreground">
            <li>• Incumplimiento de una tienda de sus obligaciones comerciales</li>
            <li>• Fraudes que hayan burlado razonablemente los controles de verificación</li>
            <li>• Falta de acreditación bancaria de un pago</li>
            <li>• Errores del comprador o de la tienda en la ejecución del pago</li>
            <li>• Daños derivados del producto vendido</li>
            <li>• Interrupciones de proveedores externos (Cloudinary, Google Sign-In, mapas)</li>
            <li>
              <strong>• Inexactitudes en la ubicación de una tienda por GPS impreciso</strong> del dispositivo o falta de actualización
            </li>
            <li>
              <strong>• El contenido de transmisiones en vivo en TikTok</strong> y la veracidad del indicador "estoy en vivo", que es una declaración de la propia tienda no verificada por TapTap
            </li>
          </ul>
        </div>
      </section>

      {/* A.14-A.17 */}
      <section className="grid gap-4 sm:grid-cols-2 border-t pt-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium">A.14 Futuros modelos comerciales</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap es actualmente gratuita. El modelo comercial futuro todavía no está definido.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-500" />
            <h4 className="font-medium">A.15 Modificaciones</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Los cambios sustanciales serán comunicados de forma destacada dentro de la aplicación.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            <h4 className="font-medium">A.16 Ley aplicable y jurisdicción</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Leyes de Bolivia. Jurisdicción en la ciudad de Tarija.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-orange-500" />
            <h4 className="font-medium">A.17 Contacto</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            WhatsApp oficial e Instagram de TapTap. <span className="text-xs">(No hay correo electrónico oficial actualmente)</span>
          </p>
        </div>
      </section>

      {/* Nota de versión */}
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-sm">
        <p className="text-muted-foreground">
          <strong>Versión 6.0</strong> — Actualizado con permisos de cámara y ubicación, web exclusiva para vendedores, y registro solo desde app móvil
        </p>
      </div>
    </div>
  );
};

=======
import React from "react";
import {
  User,
  Shield,
  ShoppingCart,
  CreditCard,
  Truck,
  Package,
  Star,
  AlertCircle,
  Info,
  Mail,
  FileText,
  Clock,
  Store,
  CheckCircle,
  XCircle,
  Smartphone,
  Globe,
  Monitor,
  Lock,
  MapPin,
  Users,
  Camera,
  Navigation,
  Radio,
} from "lucide-react";

const TermsContentCreateAccount = () => {
  return (
    <div className="space-y-8">
      {/* A.1 Identificación - ACTUALIZADO */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.1 Identificación y naturaleza de TapTap</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            TapTap Bolivia ("TapTap", "la plataforma") es un proyecto tecnológico administrado actualmente por{" "}
            <strong>José Alejandro Cruz Delgado</strong>, como persona natural responsable de su operación y administración. TapTap actualmente{" "}
            <strong>no está constituida como sociedad comercial</strong>, no cuenta con NIT propio ni con domicilio legal independiente de su administrador.
          </p>

          {/* Dos plataformas - ACTUALIZADO */}
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
                  Especializada en el uso del comprador. Es además la <strong>única vía</strong> para crear una cuenta y para solicitar la conversión de comprador a vendedor.
                </p>
              </div>
              <div className="rounded-lg bg-background p-3">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-blue-500" />
                  <strong className="text-sm">Plataforma web</strong>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  De <strong>uso exclusivo para vendedores y administradores</strong> ya habilitados, como panel de control. <strong>No permite crear cuentas ni tiene funciones de comprador.</strong>
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Estos Términos aplican a ambas plataformas; cuando una regla sea específica de una de ellas, se indica expresamente.
            </p>
          </div>

          <div className="mt-3 rounded-lg bg-blue-50/50 p-3 dark:bg-blue-900/10">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <Info className="mr-2 inline h-4 w-4" />
              TapTap <strong>no es propietaria, compradora ni vendedora</strong> de los productos publicados, no fija precios, no procesa pagos, no recibe dinero, no cobra comisión y no realiza envíos.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Ninguna verificación, suspensión o moderación es realizada mediante un sistema automatizado o de inteligencia artificial: todas son decisiones humanas del administrador.
          </p>
        </div>
      </section>

      {/* A.2 Registro - ACTUALIZADO */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <User className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.2 Registro de cuenta</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="rounded-lg bg-primary/10 p-3">
            <p className="text-sm text-primary">
              <Smartphone className="mr-2 inline h-4 w-4" />
              <strong>La creación de una cuenta solo está disponible actualmente a través de la aplicación móvil.</strong>
            </p>
          </div>

          <p className="mt-3">El usuario puede crear su cuenta de dos maneras:</p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <strong className="text-sm">Correo y contraseña</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Ingresando manualmente: nombre completo, nombre de usuario, correo, WhatsApp, zona de envío, dirección y referencia opcional.
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <strong className="text-sm">Google Sign-In</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                TapTap obtiene <strong>únicamente nombre, apellido y correo</strong>. El resto de los datos debe completarlos el usuario manualmente.
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
              Las zonas son definidas por TapTap mediante áreas geográficas delimitadas (polígonos) dentro de la ciudad de Tarija.{" "}
              <strong>La selección sigue siendo manual</strong>, sin que la aplicación acceda a la ubicación real del dispositivo del comprador para esta función (ver Sección A.2.1).
            </p>
          </div>

          <p className="mt-3 text-sm">
            <strong>Edad mínima:</strong> TapTap está destinada exclusivamente a <strong>personas mayores de 18 años</strong>. No se verifica documentalmente la edad.
          </p>
        </div>
      </section>

      {/* A.2.1 Permisos - ACTUALIZADO */}
      <section className="space-y-3 border-t border-primary/20 bg-primary/5 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <Lock className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-primary">A.2.1 Permisos del dispositivo (aplicación móvil)</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>La aplicación móvil solicita los siguientes permisos, cada uno limitado a su finalidad:</p>

          <div className="mt-3 space-y-3">
            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-orange-500" />
                <strong className="text-sm">Cámara</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Para tomar fotografías directamente desde la app: (a) al publicar o editar fotos de productos, y (b) durante el proceso de solicitud de creación de una tienda, para fotografiar el negocio. El usuario también puede optar por seleccionar una imagen existente mediante el selector nativo del sistema operativo.
              </p>
            </div>

            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-cyan-500" />
                <strong className="text-sm">Ubicación (GPS)</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Se solicita <strong>únicamente durante el proceso de solicitud de creación de una tienda</strong>, para capturar las coordenadas de la ubicación física del negocio. <strong>No se usa para la selección de zona de envío del comprador</strong> (que sigue siendo manual), ni para rastrear a ningún usuario de forma continua o en segundo plano.
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
            <p className="text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="mr-2 inline h-4 w-4" />
              La aplicación <strong>no solicita permisos de micrófono, contactos, ni acceso general o continuo a la galería de fotos</strong> fuera del selector nativo. Para subir el comprobante de pago (Sección A.5), se utiliza el selector nativo sin requerir el permiso de cámara.
            </p>
          </div>
        </div>
      </section>

      {/* A.3 Naturaleza de la orden */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
            <ShoppingCart className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.3 Naturaleza de la orden y flujo de compra</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>El proceso de compra funciona de la siguiente manera:</p>
          <ol className="mt-2 space-y-1">
            <li>1. El usuario selecciona un producto, variante y cantidad</li>
            <li>2. Presiona "Comprar ahora"</li>
            <li>3. Selecciona la modalidad de entrega o retiro</li>
            <li>4. Se genera una orden y el sistema reserva el stock</li>
          </ol>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>Nota:</strong> TapTap no utiliza actualmente un carrito de compras. Cada orden corresponde de forma independiente a un producto/variante/cantidad seleccionados.
          </p>
          <div className="mt-3 rounded-lg bg-muted p-3">
            <p className="text-sm">
              <strong>Cancelación por el comprador:</strong>
            </p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                ✓ <strong>Antes de subir el comprobante:</strong> Puede cancelar directamente desde TapTap
              </li>
              <li>
                ⚠️ <strong>Después de subir el comprobante:</strong> Debe comunicarse con la tienda. La devolución/reembolso corresponde a la relación directa entre comprador y tienda.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* A.3.1 Cancelación por tienda */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <XCircle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.3.1 Cancelación de la orden por parte de la tienda</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>La tienda puede cancelar una orden después de que el comprador haya subido el comprobante, por los siguientes motivos:</p>

          <div className="mt-3 space-y-3">
            <div className="rounded-lg border-l-4 border-red-400 bg-red-50/50 p-3 dark:bg-red-900/10">
              <h4 className="font-medium text-red-700 dark:text-red-300">a) Comprobante falso o manipulado</h4>
              <p className="text-sm text-muted-foreground">
                La tienda puede cancelar si considera que el comprobante es falso, manipulado o no corresponde a una operación real.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <strong>Importante:</strong> El hecho de que una tienda cancele por este motivo no significa, por sí solo, que TapTap determine que existió fraude.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50/50 p-3 dark:bg-amber-900/10">
              <h4 className="font-medium text-amber-700 dark:text-amber-300">b) Monto de pago incorrecto</h4>
              <p className="text-sm text-muted-foreground">
                La tienda puede cancelar cuando el monto pagado no corresponde al total de la orden.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <strong>No debe tratarse automáticamente como fraude</strong> — puede deberse a un error del comprador.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50/50 p-3 dark:bg-blue-900/10">
              <h4 className="font-medium text-blue-700 dark:text-blue-300">c) Otros motivos justificados</h4>
              <p className="text-sm text-muted-foreground">
                Por ejemplo, imposibilidad real de completar la operación (falta de stock físico).
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
            <p className="text-sm">
              <strong>Distinción importante:</strong> Un pago que todavía no aparece acreditado <strong>no debe presumirse como fraude</strong>, ya que TapTap no controla ni supervisa el procesamiento bancario.
            </p>
          </div>
        </div>
      </section>

      {/* A.4 Pagos */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <CreditCard className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.4 Pagos</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            El pago se realiza <strong>directamente entre el comprador y la tienda</strong>, mediante el código QR bancario verificado por TapTap.
          </p>
          <div className="mt-2 rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
            <p className="text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="mr-2 inline h-4 w-4" />
              TapTap muestra al comprador el <strong>nombre del titular de la cuenta bancaria</strong> asociada al QR.
            </p>
          </div>
          <div className="mt-2 rounded-lg bg-yellow-50/50 p-3 dark:bg-yellow-900/10">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="mr-2 inline h-4 w-4" />
              <strong>TapTap no recibe, no custodia, no procesa ni administra el dinero.</strong> No actúa como entidad financiera.
            </p>
          </div>
        </div>
      </section>

      {/* A.5 Comprobante */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.5 Comprobante de pago</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            El comprador debe subir una imagen del comprobante usando el{" "}
            <strong>selector nativo de archivos/fotos del sistema operativo</strong> (Sección A.2.1). Esta imagen:
          </p>
          <ul className="mt-2 space-y-1">
            <li>✓ Queda asociada a la orden y es visible para comprador y tienda</li>
            <li>✓ Se almacena mediante <strong>Cloudinary</strong> (proveedor externo)</li>
            <li>⚠️ <strong>No se extraen datos automáticamente</strong> (OCR) de la imagen</li>
            <li>⚠️ Puede solicitarse su eliminación manual</li>
          </ul>
        </div>
      </section>

      {/* A.6 Tiendas verificadas */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <Store className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.6 Tiendas verificadas y verificación del QR</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>Una tienda solo aparece públicamente luego de que el administrador ha revisado y verificado manualmente:</p>
          <ul className="mt-2 space-y-1">
            <li>• Identidad del titular</li>
            <li>• Titularidad del QR bancario</li>
            <li>• Datos de la tienda</li>
            <li>• Ubicación (si aplica)</li>
            <li>• Número de WhatsApp oficial</li>
          </ul>
          <div className="mt-3 rounded-lg bg-muted p-3">
            <p className="text-sm">
              <strong>El estado de "tienda verificada" significa únicamente</strong> que TapTap realizó estas comprobaciones al momento de la verificación. No garantiza cumplimiento comercial, autenticidad, stock físico, ni éxito de transacciones futuras.
            </p>
          </div>
        </div>
      </section>

      {/* A.7 Cambio de datos críticos */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
            <AlertCircle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.7 Cambio de datos críticos de una tienda</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Cuando una tienda modifica su <strong>QR bancario, WhatsApp oficial o ubicación</strong>, queda automáticamente fuera de la visibilidad pública y pierde temporalmente su verificación.
          </p>
          <div className="mt-2 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <AlertCircle className="mr-2 inline h-4 w-4" />
              <strong>Medida preventiva de seguridad</strong> — no es una declaración de culpabilidad. No tiene plazo fijo y no elimina información.
            </p>
          </div>
        </div>
      </section>

      {/* A.8 Envíos */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-500">
            <Truck className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.8 Envíos y recepción</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>El costo de envío es establecido por cada tienda. El envío es realizado por la propia tienda.</p>

          <div className="mt-3 rounded-lg bg-blue-50/50 p-3 dark:bg-blue-900/10">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">Mecanismo de recepción</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <strong>1. Comprador confirma:</strong>
                <span className="block text-muted-foreground">Puede marcar la orden como recibida en cualquier momento.</span>
              </li>
              <li>
                <strong>2. Si pasan 7 días sin confirmación:</strong>
                <span className="block text-muted-foreground">
                  El sistema <strong>habilita a la tienda</strong> para marcar la orden como <strong>"completada"</strong>.
                </span>
                <span className="block text-xs text-muted-foreground">
                  No implica que TapTap certifique la entrega real.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* A.9-A.12 */}
      <section className="grid gap-4 sm:grid-cols-2 border-t pt-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <h4 className="font-medium">A.9 Stock</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap <strong>no garantiza</strong> que el stock mostrado coincida con el inventario físico real.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <h4 className="font-medium">A.10 Productos prohibidos</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            No se pueden publicar: armas, drogas, tabaco, alcohol, medicamentos, alimentos, productos sexuales, servicios, productos robados, ni que infrinjan propiedad intelectual.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            <strong>Usados permitidos:</strong> Ropa y tecnología/electrónica.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <h4 className="font-medium">A.11 Calificaciones</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Tras marcar como recibido, <strong>o una vez que la orden quede completada</strong>, el comprador puede calificar.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-500" />
            <h4 className="font-medium">A.12 Suspensión de cuentas</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap puede suspender una cuenta ante indicios razonables de fraude, actividad ilícita, incumplimiento, o comportamiento que perjudique a otros usuarios.
          </p>
        </div>
      </section>

      {/* A.13 Limitación - ACTUALIZADO */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-500/10 text-slate-500">
            <AlertCircle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">A.13 Limitación de responsabilidad</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="rounded-lg bg-green-50/50 p-3 dark:bg-green-900/10">
            <p className="text-sm text-green-800 dark:text-green-200">
              <CheckCircle className="mr-2 inline h-4 w-4" />
              TapTap responde por el correcto funcionamiento de sus herramientas, por la diligencia en la verificación manual y, cuando corresponda, por la captura correcta de la ubicación de una tienda durante su creación.
            </p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong>TapTap no responde por:</strong>
          </p>
          <ul className="text-sm text-muted-foreground">
            <li>• Incumplimiento de una tienda de sus obligaciones comerciales</li>
            <li>• Fraudes que hayan burlado razonablemente los controles de verificación</li>
            <li>• Falta de acreditación bancaria de un pago</li>
            <li>• Errores del comprador o de la tienda en la ejecución del pago</li>
            <li>• Daños derivados del producto vendido</li>
            <li>• Interrupciones de proveedores externos (Cloudinary, Google Sign-In, mapas)</li>
            <li>
              <strong>• Inexactitudes en la ubicación de una tienda por GPS impreciso</strong> del dispositivo o falta de actualización
            </li>
            <li>
              <strong>• El contenido de transmisiones en vivo en TikTok</strong> y la veracidad del indicador "estoy en vivo", que es una declaración de la propia tienda no verificada por TapTap
            </li>
          </ul>
        </div>
      </section>

      {/* A.14-A.17 */}
      <section className="grid gap-4 sm:grid-cols-2 border-t pt-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium">A.14 Futuros modelos comerciales</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap es actualmente gratuita. El modelo comercial futuro todavía no está definido.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-500" />
            <h4 className="font-medium">A.15 Modificaciones</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Los cambios sustanciales serán comunicados de forma destacada dentro de la aplicación.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            <h4 className="font-medium">A.16 Ley aplicable y jurisdicción</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Leyes de Bolivia. Jurisdicción en la ciudad de Tarija.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-orange-500" />
            <h4 className="font-medium">A.17 Contacto</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            WhatsApp oficial e Instagram de TapTap. <span className="text-xs">(No hay correo electrónico oficial actualmente)</span>
          </p>
        </div>
      </section>

      {/* Nota de versión */}
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-sm">
        <p className="text-muted-foreground">
          <strong>Versión 6.0</strong> — Actualizado con permisos de cámara y ubicación, web exclusiva para vendedores, y registro solo desde app móvil
        </p>
      </div>
    </div>
  );
};

>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
export default TermsContentCreateAccount;