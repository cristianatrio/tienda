# Dirección visual de AirKids

La tienda vive en un dormitorio infantil: de día con la luz prendida y de noche con la luz apagada. El único gesto llamativo es ese cambio. El resto se mantiene quieto y ordenado.

## Paleta

| Token          | Día       | Noche     | Uso                                    |
| -------------- | --------- | --------- | -------------------------------------- |
| Tinta noche    | `#1b2550` | `#eef1fb` | Texto, botones primarios de día.       |
| Pared chambray | `#dfe7f6` | `#18214a` | Fondo de la portada.                   |
| Sábana         | `#f7f8fc` | `#121a3a` | Fondo de página.                       |
| Manteca        | `#f7d774` | `#f7d774` | Contador del carrito, botón de noche.  |
| Fosforito      | `#eaf0c4` | `#e4f3a0` | Estrellas del techo; brillan de noche. |

Los tonos de las fichas de producto se mantienen claros en ambos temas porque las fotos originales tienen fondo blanco y se integran con `mix-blend-mode: multiply`. El contraste se revisa por separado en cada tema con axe.

## Tipografía

Recursive, una sola familia variable. Títulos con el eje casual al máximo (trazo de cuento, peso 800–900); textos e interfaz con el eje lineal. Escala: 14, 16, 18, 21, 24, 36 y 48 px, con titulares de portada de hasta 84 px.

## Composición

- Portada como pared del dormitorio: titular en dos frases, acciones, y la foto de ambiente recortada en arco como una cabecera de cama.
- Estrellas tipo sticker en el techo: pálidas de día, con resplandor escalonado al apagar la luz. Son decorativas y están ocultas para lectores de pantalla.
- Catálogo sin bordes ni sombras: la foto sobre un panel de color por categoría es la ficha. Tres columnas en escritorio, filas horizontales en celular.
- El detalle repite el arco de la portada.
- Radios con jerarquía: 36 px la pared, 28 px los paneles, 12 px los campos, píldora para acciones.

## Movimiento

- Apagar o prender la luz: fundido de 0,55 s mediante View Transitions donde el navegador lo admite, y encendido escalonado de las estrellas.
- Contador del carrito: pulso breve al agregar.
- Con movimiento reducido, todo cambia sin animación.

## Fotografía

- Portada de ambiente generada con IA, identificada en la propia imagen; no representa un artículo disponible.
- Fotos originales de producto completas, con `object-fit: scale-down`: nunca se amplían por encima de su resolución.

## Texto

Frases en sentido de oración, sin etiquetas en mayúsculas sobre los títulos. Cada acción conserva su nombre en todo el recorrido. Errores que explican qué pasó y cómo seguir.
