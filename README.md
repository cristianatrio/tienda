# AirKids · Tienda en React

Proyecto educativo de e-commerce desarrollado por Cristian Atrio para Coderhouse.
Catálogo de productos, navegación por categorías, detalle, carrito global y registro de pedidos en Firebase Firestore.

## Ejecutar
Requiere Node.js y npm.

    npm ci --legacy-peer-deps
    npm start

    npm test -- --watchAll=false
    npm run build

## Organización
- src/components: catálogo, detalle, selector de cantidad y checkout.
- src/context: estado compartido del carrito.
- src/services: conexión a Firestore.
- src/routes: navegación con React Router.
- public/images: imágenes del catálogo.

## Tecnologías
React maneja la interfaz; React Router la navegación; Firebase persiste catálogo y pedidos.
Bootstrap y React Bootstrap aportan estilos y componentes; React Icons los iconos y React Hot Toast las notificaciones.
El proyecto conserva Create React App y dependencias históricas: consultar SECURITY.md antes de desplegar.

## Compra
El checkout valida campos obligatorios y repetición de email, evita envíos simultáneos y conserva el carrito si Firestore rechaza el pedido. Las órdenes incluyen fecha del servidor y estado inicial.

## Alcance
Es una demostración académica, sin cobro real ni backend que valide precios.
La configuración web de Firebase es pública por diseño: la protección efectiva depende de las reglas de Firestore.
No introducir datos personales reales hasta revisar esas reglas.
