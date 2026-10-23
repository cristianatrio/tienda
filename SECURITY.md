# Seguridad

## Protección implementada

- Se reemplazó Create React App y se eliminaron dependencias sin uso.
- Se retiró la configuración del Firebase histórico del código activo.
- Demo predeterminada sin conexión, datos personales ni pagos.
- Función callable con Authentication y App Check obligatorios.
- Validación de comprador, IDs, cantidades enteras, límites y duplicados.
- Precios y stock obtenidos por el servidor; el cliente no determina importes.
- Transacción para pedido y descuento de stock, con ID de solicitud idempotente.
- Reglas que permiten leer catálogo pero deniegan acceso directo a pedidos y escritura de productos.
- Persistencia local limitada a IDs y cantidades, con validación al restaurar.
- Sin registros de datos personales; archivos de entorno excluidos de Git.

La dependencia transitiva @grpc/grpc-js usa una versión corregida compatible de la serie 1.x mediante overrides, porque Firebase fijaba una versión afectada.

## Verificación

Análisis estático, pruebas del cliente y de la lógica del servidor, compilación y recorridos con Playwright y axe. npm audit del cliente y servidor: 0 vulnerabilidades conocidas al revisar el 23/10/2026. Este resultado puede cambiar con nuevos avisos y no certifica ausencia de fallos.

## Límites

Las reglas y la función están versionadas pero **no se desplegaron al Firebase histórico**. No se inspeccionaron sus reglas activas. Authentication, App Check y transacciones deben validarse en un proyecto de prueba antes de activar Firebase. No se realizó una prueba de penetración.

App Check reduce abuso, pero no reemplaza cuotas, alertas de facturación ni controles comerciales. Una sesión anónima no demuestra identidad. Los pedidos descuentan stock sin pago: definir cobros, cancelaciones, protección contra abuso y devolución de reservas antes de operar comercialmente. La idempotencia cubre reintentos en la misma pantalla; una recarga inicia otra solicitud.

La configuración web Firebase es pública por diseño. Ver la [documentación de claves](https://firebase.google.com/docs/projects/api-keys) y la [guía de seguridad](https://firebase.google.com/support/guides/security-checklist).

## Reportar un problema

Contactar al mantenedor por un canal privado disponible en su perfil de GitHub. No publicar datos de compradores, credenciales ni detalles de explotación de la base real en un issue público.
