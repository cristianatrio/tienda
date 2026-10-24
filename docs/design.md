# Dirección visual de AirKids

La tienda vive en un dormitorio infantil: de día con la luz prendida y de noche con la luz apagada. El gesto principal es ese cambio. El movimiento acompaña la lectura y responde a lo que hace la persona, sin tapar el contenido.

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

Curvas: `--out` (salida suave) para entradas y `--spring` (pequeño rebote) para lo que se agrega o confirma.

- Portada: el titular sube palabra por palabra desde una máscara, la foto se descubre de abajo hacia arriba y se asienta, y las estrellas aparecen una por una. Con el cursor, las estrellas más grandes se desplazan más, como si estuvieran más cerca.
- Lectura: títulos, textos y listas aparecen una sola vez al entrar en pantalla. Las fotos del catálogo se abren como una cortina, columna por columna.
- Fotos: las fichas se inclinan hacia el cursor y reciben un reflejo; de noche, el reflejo es una linterna cálida. Nunca se escalan por encima de su resolución.
- Luz: la noche se extiende en un círculo desde el interruptor presionado. De noche, las estrellas titilan, la lámpara respira y cruza una estrella fugaz.
- Navegación: el encabezado queda fijo y la pantalla se desliza. La foto de la ficha abierta viaja hasta el detalle y de ahí al carrito.
- Acciones: el pijama vuela en arco hasta el contador, que lo recibe con un pulso. Al filtrar, ordenar o quitar del carrito, los elementos se reacomodan en lugar de saltar.
- Pantallas de aviso: una luna que dormita en las páginas sin salida y una ronda de estrellas al completar el pedido.
- Encabezado: sombra al bajar y una línea manteca que marca cuánto se leyó.
- Con movimiento reducido, todo aparece en su lugar sin animación. Las animaciones continuas se detienen con el botón de pausa de la cinta, que se recuerda entre visitas.

## Fotografía

- Portada de ambiente generada con IA, identificada en la propia imagen; no representa un artículo disponible.
- Fotos originales de producto completas, con `object-fit: scale-down`: nunca se amplían por encima de su resolución.

## Texto

Frases en sentido de oración, sin etiquetas en mayúsculas sobre los títulos. Cada acción conserva su nombre en todo el recorrido. Errores que explican qué pasó y cómo seguir.
