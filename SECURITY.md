# Seguridad

## Revisión del 23 de octubre de 2026
Se corrigió la eliminación del carrito ante fallos de escritura y se quitó el registro de datos del comprador en consola.
Se añadieron límites de longitud, campos requeridos, confirmación de email y bloqueo de envíos simultáneos.

## Límites pendientes
- Las reglas activas de Firestore no están en este repositorio y no se verificaron. No se puede afirmar que los pedidos estén protegidos.
- El navegador proporciona cantidades y precios. Para venta real, validar productos, stock y totales en un backend confiable.
- El bloqueo del formulario no sustituye la idempotencia del servidor.
- Restringir lectura de pedidos para impedir exposición de datos personales; no usar reglas públicas de lectura/escritura.
- Revisar restricciones de API, dominios y App Check en Firebase.
- Actualizar las dependencias históricas y migrar el sistema de compilación después de verificar compatibilidad.
- La configuración de Firebase en el frontend no es una credencial administrativa. Nunca incluir cuentas de servicio o claves privadas.

## Comprobación
Ejecutar npm audit y revisar los avisos vigentes. Esta revisión estática no es una prueba de penetración ni una certificación de seguridad.

Resultado de npm audit: original 118 avisos (9 críticos); después de actualizaciones compatibles, 101 (1 crítico, 68 altos, 29 moderados, 3 bajos). Los conteos incluyen herramientas de desarrollo. Persisten vulnerabilidades; no desplegar como tienda comercial sin resolverlas.
