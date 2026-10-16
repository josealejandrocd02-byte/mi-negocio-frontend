import React from "react";
import {
  Store,
  Shield,
  CreditCard,
  Package,
  Truck,
  AlertCircle,
  Info,
  FileText,
  Clock,
  XCircle,
  CheckCircle,
  Image,
  Mail,
  Smartphone,
  Monitor,
  MapPin,
  Camera,
  Navigation,
  Radio,
  Instagram,
  Facebook,
} from "lucide-react";

const TermsContentCreateStore = () => {
  return (
    <div className="space-y-8">
      {/* B.1 Identificación - ACTUALIZADO */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">B.1 Identificación y naturaleza de la plataforma</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            TapTap Bolivia es administrada actualmente por <strong>José Alejandro Cruz Delgado</strong> como persona natural, sin sociedad comercial constituida.
          </p>

          {/* Dos plataformas - ACTUALIZADO */}
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="mb-3 flex items-center gap-2 font-medium text-primary">
              <Info className="h-4 w-4" />
              La tienda puede publicar y gestionar productos desde dos plataformas:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-background p-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-emerald-500" />
                  <strong className="text-sm">Aplicación móvil</strong>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Publicación rápida y gestión de productos, incluyendo fotos tomadas con la cámara. <strong>Única vía para crear la cuenta y solicitar la tienda.</strong>
                </p>
              </div>
              <div className="rounded-lg bg-background p-3">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-blue-500" />
                  <strong className="text-sm">Plataforma web</strong>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  De <strong>uso exclusivo para vendedores y administradores</strong> ya habilitados, como panel de control: gestión de productos, pedidos e información. <strong>No permite crear cuentas nuevas ni iniciar solicitud de tienda.</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-blue-50/50 p-3 dark:bg-blue-900/10">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <Info className="mr-2 inline h-4 w-4" />
              TapTap no es propietaria de los productos, no participa como compradora ni vendedora, y <strong>no administra, retiene ni controla los fondos</strong> transferidos entre compradores y tiendas.
            </p>
          </div>
        </div>
      </section>

      {/* B.2 Creación - ACTUALIZADO */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <Store className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">B.2 Creación de tienda</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            ACTUALIZADO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="rounded-lg bg-primary/10 p-3">
            <p className="text-sm text-primary">
              <Smartphone className="mr-2 inline h-4 w-4" />
              <strong>La solicitud para crear una tienda solo puede iniciarse desde la aplicación móvil</strong>, a partir de una cuenta de comprador ya existente.
            </p>
          </div>

          <p className="mt-3">Para solicitar la creación de una tienda, el titular debe proporcionar:</p>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            <li>✓ Nombre de la tienda</li>
            <li>✓ Identidad del titular</li>
            <li>✓ Número de WhatsApp oficial</li>
            <li>✓ Código QR bancario</li>
            <li>✓ Nombre del titular de la cuenta bancaria</li>
            <li>✓ Logo y banner</li>
            <li>✓ Productos</li>
            <li className="sm:col-span-2">✓ Información adicional descrita en la Sección B.2.1</li>
          </ul>
        </div>
      </section>

      {/* B.2.1 NUEVO */}
      <section className="space-y-3 border-t border-primary/20 bg-primary/5 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <MapPin className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold text-primary">B.2.1 Ubicación física, fotografías, redes sociales y estado "en vivo"</h3>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            NUEVO
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="mt-3 space-y-3">
            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-cyan-500" />
                <strong className="text-sm">Ubicación física</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Si la tienda cuenta con establecimiento físico, su ubicación se captura mediante el <strong>permiso de ubicación (GPS)</strong> del dispositivo durante el proceso de solicitud (Sección A.2.1). Queda asociada al perfil de la tienda y es la que se muestra a los compradores en Google Maps.
              </p>
            </div>

            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-orange-500" />
                <strong className="text-sm">Fotografías de la tienda</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Durante el proceso de solicitud, la app permite tomar fotografías directamente con la <strong>cámara</strong> del dispositivo (por ejemplo, del local o fachada), además de poder seleccionar imágenes existentes mediante el selector nativo.
              </p>
            </div>

            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-500" />
                <Facebook className="h-4 w-4 text-blue-500" />
                <strong className="text-sm">Redes sociales (incluye TikTok)</strong>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                La tienda puede agregar, de forma opcional, enlaces a <strong>Instagram, Facebook y TikTok</strong>, visibles en su perfil público.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-red-400 bg-red-50/50 p-3 dark:bg-red-900/10">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-red-500" />
                <strong className="text-sm text-red-700 dark:text-red-300">Estado "estoy en vivo"</strong>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                El dueño de la tienda puede activar o desactivar manualmente un indicador visible públicamente que señala a los compradores que la tienda está transmitiendo en vivo en TikTok.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <strong>Importante:</strong> TapTap <strong>no verifica</strong> que la transmisión esté realmente ocurriendo. Es una declaración que hace la propia tienda bajo su responsabilidad.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                El uso engañoso o reiteradamente falso de este indicador puede considerarse información inconsistente o conducta contraria a estos Términos (Sección B.10).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B.3 Verificación */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
            <Shield className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">B.3 Verificación de identidad y del QR bancario</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            TapTap realiza un proceso de <strong>verificación manual</strong> antes de que una tienda sea visible públicamente.
          </p>

          <div className="mt-3 rounded-lg bg-muted p-3">
            <h4 className="font-medium">Documentación requerida:</h4>
            <ul className="mt-1 space-y-1 text-sm">
              <li>• Fotocopia del carnet de identidad del titular de la tienda</li>
              <li>• Documentación adicional razonablemente necesaria</li>
              <li>
                • Cuando el titular del QR sea persona distinta, <strong>documentación de ambas personas</strong>
              </li>
            </ul>
          </div>

          <div className="mt-3 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
            <h4 className="font-medium text-amber-700 dark:text-amber-300">Verificación del QR</h4>
            <p className="text-sm text-muted-foreground">
              El administrador escanea personalmente el QR, comprueba que corresponda a un entorno bancario legítimo, y compara el nombre del titular con el nombre declarado.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <AlertCircle className="mr-1 inline h-3 w-3" />
              TapTap <strong>no realiza transferencias de prueba</strong> ni consultas internas al banco.
            </p>
          </div>

          <div className="mt-3 rounded-lg bg-red-50/50 p-3 dark:bg-red-900/10">
            <h4 className="font-medium text-red-700 dark:text-red-300">Tratamiento del documento de identidad</h4>
            <ul className="mt-1 space-y-1 text-sm">
              <li>✓ <strong>No se sube ni almacena</strong> en sistemas digitales</li>
              <li>✓ Se conserva <strong>físicamente</strong>, fuera de la plataforma</li>
              <li>✓ Bajo custodia exclusiva del administrador</li>
            </ul>
            <div className="mt-2 rounded-lg bg-muted p-2">
              <p className="text-xs text-muted-foreground">
                <strong>Destino final:</strong> Se devuelve a solicitud. Si no se solicita, se <strong>destruye de forma segura dentro de los 90 días</strong> siguientes a la eliminación definitiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B.4 Pérdida temporal */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
            <AlertCircle className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">B.4 Pérdida temporal de la verificación</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Cuando la tienda modifica su <strong>QR bancario, WhatsApp oficial o ubicación</strong>, queda automáticamente fuera de la visibilidad pública y en revisión.
          </p>
          <div className="mt-2 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <AlertCircle className="mr-2 inline h-4 w-4" />
              <strong>Suspensión preventiva de seguridad</strong> — no es una sanción. <strong>No tiene plazo fijo</strong> y no elimina información.
            </p>
          </div>
        </div>
      </section>

      {/* B.5 Órdenes */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-500">
            <CreditCard className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">B.5 Órdenes y pagos</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>El flujo de una orden es:</p>
          <ol className="mt-2 space-y-2">
            <li>
              <strong>1. El comprador genera la orden</strong>
              <span className="block text-sm text-muted-foreground">Se muestra el QR verificado junto con el nombre del titular.</span>
            </li>
            <li>
              <strong>2. El comprador paga y sube el comprobante</strong>
            </li>
            <li>
              <strong>3. La tienda verifica la acreditación</strong>
              <span className="block text-sm text-muted-foreground">
                Es <strong>responsabilidad exclusiva de la tienda</strong> verificar que el dinero haya sido acreditado antes de confirmar.
              </span>
            </li>
            <li>
              <strong>4. La tienda prepara y marca el envío</strong>
            </li>
            <li>
              <strong>5. Recepción o completado</strong>
              <span className="block text-sm text-muted-foreground">
                El comprador confirma, <strong>o bien, transcurridos 7 días desde el envío</strong> sin confirmación, la tienda queda habilitada para marcar como <strong>"completada"</strong>.
              </span>
            </li>
          </ol>

          <div className="mt-3 rounded-lg bg-yellow-50/50 p-3 dark:bg-yellow-900/10">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="mr-2 inline h-4 w-4" />
              <strong>TapTap no procesa pagos, no recibe dinero, y no actúa como entidad financiera, custodio o intermediario de fondos.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* B.6-B.7 */}
      <section className="grid gap-4 sm:grid-cols-2 border-t pt-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium">B.6 Stock</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            La tienda es responsable de mantener actualizado el stock. TapTap <strong>no garantiza</strong> que coincida con el inventario físico.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-cyan-500" />
            <h4 className="font-medium">B.7 Envíos</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            El costo lo establece libremente la tienda. <strong>TapTap no realiza envíos</strong> ni cobra comisión.
          </p>
        </div>
      </section>

      {/* B.8 Publicación - ACTUALIZADO */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <Image className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">B.8 Publicación de productos y contenido</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            La tienda es la <strong>única responsable</strong> del contenido que publique, ya sea desde la app móvil o desde la plataforma web, <strong>incluyendo las fotografías tomadas con la cámara del dispositivo</strong> (Sección B.2.1).
          </p>

          <div className="mt-3 rounded-lg bg-red-50/50 p-3 dark:bg-red-900/10">
            <h4 className="font-medium text-red-700 dark:text-red-300">Contenido prohibido</h4>
            <ul className="mt-1 space-y-1 text-sm">
              <li>✗ Material ilegal</li>
              <li>✗ Pornografía o contenido sexual explícito</li>
              <li>✗ Material de explotación sexual infantil</li>
              <li>✗ Imágenes violentas o perturbadoras</li>
              <li>✗ Contenido gráfico sensible</li>
            </ul>
          </div>

          <div className="mt-3 rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/10">
            <h4 className="font-medium text-amber-700 dark:text-amber-300">Productos prohibidos o restringidos</h4>
            <ul className="mt-1 grid gap-1 text-sm sm:grid-cols-2">
              <li>• Armas y municiones</li>
              <li>• Drogas y sustancias ilícitas</li>
              <li>• Tabaco y cigarrillos electrónicos</li>
              <li>• Bebidas alcohólicas</li>
              <li>• Medicamentos y productos farmacéuticos</li>
              <li>• Alimentos y bebidas para consumo humano</li>
              <li>• Productos sexuales para adultos</li>
              <li>• Servicios (solo productos)</li>
              <li>• Productos robados</li>
            </ul>
          </div>

          <div className="mt-3 rounded-lg bg-muted p-3">
            <h4 className="font-medium">Autenticidad y productos usados</h4>
            <ul className="mt-1 space-y-1 text-sm">
              <li>✓ No se puede afirmar falsamente que un producto es original</li>
              <li>✓ No se puede usar marcas de terceros infringiendo derechos</li>
              <li>
                ✓ <strong>Usados permitidos:</strong> Ropa usada y tecnología/electrónica usada
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* B.9-B.10 */}
      <section className="grid gap-4 sm:grid-cols-2 border-t pt-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <h4 className="font-medium">B.9 Cancelaciones y obligaciones</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap no administra devoluciones. Esto no exime a la tienda de las obligaciones frente al consumidor conforme a la Ley N° 453.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Ver Sección A.3.1 para motivos de cancelación.</p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-500" />
            <h4 className="font-medium">B.10 Suspensión de cuentas</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Aplican las mismas reglas descritas en la Sección A.12, <strong>incluyendo el uso engañoso del indicador "estoy en vivo"</strong> (Sección B.2.1).
          </p>
        </div>
      </section>

      {/* B.11 Retiro - ACTUALIZADO */}
      <section className="space-y-3 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
            <Clock className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-semibold">B.11 Retiro y eliminación de la cuenta de tienda</h3>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Una tienda puede solicitar su retiro <strong>desde la plataforma web o la app móvil</strong>. El proceso es:
          </p>
          <ol className="mt-2 space-y-2">
            <li>
              <strong>1. Suspensión temporal</strong>
              <span className="block text-sm text-muted-foreground">La cuenta deja de estar visible públicamente.</span>
            </li>
            <li>
              <strong>2. Revisión de asuntos pendientes</strong>
              <span className="block text-sm text-muted-foreground">TapTap revisa que no existan órdenes pendientes.</span>
            </li>
            <li>
              <strong>3. Eliminación definitiva</strong>
              <span className="block text-sm text-muted-foreground">
                Transcurridos aproximadamente <strong>30 días</strong>, se procede a la eliminación definitiva, salvo datos que deban conservarse conforme a la Política de Privacidad.
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* B.12-B.14 */}
      <section className="grid gap-4 sm:grid-cols-2 border-t pt-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium">B.12 Futuros modelos comerciales</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            TapTap ofrece actualmente sus funcionalidades a las tiendas sin costo.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-slate-500" />
            <h4 className="font-medium">B.13 Limitación de responsabilidad</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Aplican las mismas reglas de la Sección A.13, incluyendo las <strong>exclusiones sobre GPS impreciso</strong> y el <strong>indicador "estoy en vivo" no verificado</strong>.
          </p>
        </div>

        <div className="rounded-lg border p-4 sm:col-span-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-orange-500" />
            <h4 className="font-medium">B.14 Modificaciones, ley aplicable y contacto</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Aplican las mismas reglas descritas en las Secciones A.15, A.16 y A.17 de los Términos para Compradores.
          </p>
        </div>
      </section>

      {/* Nota de versión */}
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-sm">
        <p className="text-muted-foreground">
          <strong>Versión 6.0</strong> — Actualizado con ubicación GPS, cámara, TikTok, "estoy en vivo" y web exclusiva para vendedores
        </p>
      </div>
    </div>
  );
};

export default TermsContentCreateStore;