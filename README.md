# AirKids · Pequeñas aventuras, grandes sueños

Tienda de pijamas creada por **Cristian Atrio**, a partir de su proyecto final de React para Coderhouse. Catálogo, categorías, carrito persistente y checkout, con una interfaz adaptable a escritorio y celular.

> Inicia en **modo demo**: funciona sin credenciales, no envía datos personales, no registra pedidos reales y no realiza cobros. Conserva los tres diseños y precios ilustrativos del catálogo original.

![AirKids en escritorio](docs/desktop.png)

## Probar en tu equipo

Requiere Node.js 22.12 o superior; recomendado: última versión de Node 22.

    npm ci
    npm run dev

Abrí la dirección indicada en la terminal. Buscá un personaje, filtrá por temporada y agregalo al carrito. Completá el checkout con datos ficticios para obtener una referencia DEMO.

    npm run check
    npx playwright install chromium
    npx playwright test
    npm ci --prefix functions
    npm test --prefix functions
    npm audit
    npm audit --prefix functions

## Funcionalidades

- Búsqueda, categorías y orden por precio.
- Detalle y cantidades limitadas por stock.
- Carrito persistente: guarda solo IDs y cantidades, nunca datos del comprador.
- Estados de carga, error, catálogo vacío, producto inexistente y página 404.
- Navegación por teclado, etiquetas de formulario y foco visible.
- Confirmación de email, bloqueo de doble envío y recuperación de errores.
- Firebase opcional: validación de precios en servidor y descuento transaccional de stock.
- CI y actualización de dependencias.

## Decisiones técnicas

| Herramienta                                                                          | Motivo                                                          |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| [React](https://react.dev/)                                                          | Componentes y estado de la experiencia de compra.               |
| [React Router](https://reactrouter.com/)                                             | Navegación sin recargas y URLs directas.                        |
| [Vite](https://vite.dev/)                                                            | Reemplaza Create React App con una base mantenida.              |
| [Firebase](https://firebase.google.com/docs)                                         | Catálogo, autenticación anónima y función protegida de pedidos. |
| [Vitest](https://vitest.dev/) y [Testing Library](https://testing-library.com/)      | Pruebas de comportamiento.                                      |
| [Playwright](https://playwright.dev/) y [axe](https://github.com/dequelabs/axe-core) | Recorridos completos y accesibilidad automática.                |

CSS propio, fuentes del sistema y fotografías originales. La demo no depende de servicios externos.

## Estructura

- src/App.jsx: rutas, catálogo, detalle, carrito y checkout.
- src/data.js: catálogo demo y validaciones.
- src/services.js: adaptador demo/Firebase con carga bajo demanda.
- src/styles.css: diseño adaptable.
- functions/: pedidos validados en servidor.
- e2e/: pruebas en escritorio y celular.
- firestore.rules: política de acceso.

## Conectar Firebase

La demo está lista para publicarse. El modo Firebase necesita un proyecto configurado; no se modificó la base histórica.

1. Crear un proyecto con Firestore, Authentication anónima, Functions y App Check con reCAPTCHA v3. Functions puede requerir facturación.
2. Cargar documentos en productos con nombre, descripcion, tipo, precio, cantidad e imagen. Tipos: Cortos, MediaEstacion o Largos. Imagen: nombre de archivo en public/images. Precio y stock numéricos; también se aceptan cadenas del catálogo histórico.
3. Instalar dependencias de functions. Con Firebase CLI autenticado, desplegar explícitamente al proyecto elegido:

       firebase deploy --project TU_PROYECTO --only firestore:rules,functions

4. Copiar .env.example a .env.local, establecer VITE_DATA_MODE=firebase y completar configuración web y clave de sitio de App Check. Registrar el dominio en Firebase y reCAPTCHA.
5. Compilar de nuevo. En un proyecto de prueba, verificar una orden, descuento de stock, rechazo de acceso directo y reintento con el mismo ID.

La función usa us-central1. El navegador envía IDs y cantidades; el servidor consulta precios y stock y guarda todo en una transacción. Solo el servidor accede a datos del comprador. El mismo ID de solicitud devuelve el mismo pedido.

**No incluye pagos, envíos, cancelaciones ni devolución automática de stock.** En Firebase, confirmar una orden descuenta unidades aunque no haya pago. Definir esos procesos antes de operar comercialmente. Las pruebas locales no certifican la configuración externa.

## Publicación

npm run build genera dist/. netlify.toml configura compilación, rutas SPA y encabezados. firebase.json incluye una alternativa con Firebase Hosting. Sin variables se publica la demo. Nunca incluir claves privadas en variables VITE_*.

## Seguridad y créditos

Ver [SECURITY.md](SECURITY.md). Las imágenes y nombres de personajes se conservan como material académico original; no se afirma tener derechos comerciales sobre ellos. No se agregó una licencia a recursos de terceros.

La portada de ambiente fue generada con IA. Las fotos de producto siguen siendo las originales; se presentan completas y sin ampliación excesiva. Tipografías locales: Manrope y DM Sans mediante Fontsource. Ver [dirección visual](docs/design.md).
