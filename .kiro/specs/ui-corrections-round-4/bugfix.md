# Bugfix Requirements Document

## Introduction

Cuarta ronda de correcciones de UI para el sitio web de Guardería Winnie Pooh. Este documento cubre 8 defectos visuales y de comportamiento identificados en los componentes Hero, Nosotros, Contacto, Servicios y las páginas de slug de sedes. Las correcciones abarcan: la transición entre secciones Nosotros→Sedes, los fondos de las cajas de contacto, el título y descripción de las páginas de sede, el carrusel de medios de las sedes, las tarjetas de servicios y los stickers de estadísticas del Hero.

---

## Bug Analysis

### Current Behavior (Defect)

**Bug 1 – Transición Nosotros→Sedes**

1.1 WHEN el usuario hace scroll desde la sección Nosotros hacia la sección Sedes THEN el sistema muestra un elemento de transición con una imagen de fondo cuya máscara va de `transparent 0%` a `black 30%` a `black 70%` a `transparent 100%`, produciendo un corte visible o artefacto borroso en lugar de un fundido limpio hacia arriba.

**Bug 2 – Contacto: fondos de cajas de información**

2.1 WHEN el usuario visualiza las cajas de información en la sección Contacto THEN el sistema aplica un fondo con tinte pastel de ~6% de opacidad (`rgba(79,240,132,0.06)`, `rgba(122,192,255,0.06)`, `rgba(255,120,147,0.06)`, `rgba(255,252,1,0.06)`) que resulta prácticamente invisible y no diferencia visualmente cada caja por su color de servicio.

**Bug 3 – Sedes slug: título sin AuroraText + SparklesText**

3.1 WHEN el usuario visita una página de sede (`/sedes/jardin`, `/sedes/babys`, `/sedes/after-class`) THEN el sistema muestra el subtítulo de la sede con `SparklesText` envolviendo `AuroraText`, pero el orden de anidamiento no replica exactamente el estilo del Hero (SparklesText exterior, AuroraText interior) y los colores de la aurora no usan la paleta completa del sitio.

**Bug 4 – Sedes slug: descripción sin negrita negra ni resaltado de color**

4.1 WHEN el usuario visualiza el párrafo de descripción en una página de sede THEN el sistema muestra el texto con `font-weight` extrabold (`font-extrabold`) y color `text-slate-500`, en lugar de negrita negra (`font-weight: 700`, color `#1e293b`), y el componente `HighLight` aplica un subrayado con color semitransparente (`#00c3ff56`) en lugar de un color sólido y vívido que coincida con el color temático de la sede.

**Bug 5 – Sedes slug: carrusel no es cuadrado, Baby's usa reproductor personalizado, no hay lightbox**

5.1 WHEN el usuario visita la sede `babys` THEN el sistema muestra un componente `BabysVideoPlayer` con controles personalizados (play/pause, barra de progreso, volumen) en lugar del elemento nativo `<video controls>`.

5.2 WHEN el usuario visita las sedes `jardin` o `after-class` THEN el sistema muestra un carrusel con `aspect-square` en móvil pero `lg:aspect-auto` en escritorio, perdiendo la proporción cuadrada 1:1 en pantallas grandes.

5.3 WHEN el usuario hace clic en un elemento del carrusel de cualquier sede THEN el sistema no abre ningún lightbox; la imagen o video simplemente no responde al clic.

5.4 WHEN la sede `babys` tiene un video en su lista de medios THEN el sistema usa una rama de código completamente separada (`slug === "babys"`) en lugar del carrusel unificado.

**Bug 6 – Servicios: marco de imagen con espacio vacío visible**

6.1 WHEN el usuario visualiza las tarjetas de servicio en la sección Servicios THEN el sistema muestra un contenedor de imagen con `border: 2px solid ${color}` y `borderRadius: 12px` que deja espacio vacío visible entre el borde y la imagen, ya que la imagen usa `object-contain` con padding interno.

**Bug 7 – Servicios: borde NeonGradientCard delgado**

7.1 WHEN el usuario visualiza las tarjetas de servicio en la sección Servicios THEN el sistema aplica `borderSize={2}` en cada `NeonGradientCard`, produciendo un borde visiblemente más delgado que el de las tarjetas de Nosotros (Propósito y Calendario) que usan `borderSize={4}`.

**Bug 8 – Hero stats: stickers de índice 0 y 1 demasiado pequeños**

8.1 WHEN el usuario visualiza los stickers de estadísticas en el Hero THEN el sistema renderiza los stickers de índice 0 ("30 años de experiencia") y 1 ("3 sedes Medellín") con un contenedor de `90×90px`, que es aproximadamente un 10% más pequeño que el tamaño deseado, mientras que el sticker de índice 2 ya tiene el tamaño correcto (`70×70px` por diseño diferente).

---

### Expected Behavior (Correct)

**Bug 1 – Transición Nosotros→Sedes**

2.1 WHEN el usuario hace scroll desde la sección Nosotros hacia la sección Sedes THEN el sistema SHALL mostrar un elemento de transición cuya máscara de imagen va de `transparent` en la parte superior a `black` (opaco) en la parte inferior (`linear-gradient(to top, black 0%, transparent 100%)`), produciendo un fundido que se disuelve hacia arriba sin cortes, artefactos borrosos ni bordes visibles de imagen.

**Bug 2 – Contacto: fondos de cajas de información**

2.2 WHEN el usuario visualiza las cajas de información en la sección Contacto THEN el sistema SHALL aplicar un fondo pastel sólido y claramente visible a cada caja: verde para WhatsApp, azul para Correo, rosa para Instagram, amarillo para Google Reseñas; con una opacidad suficiente para ser inmediatamente perceptible (similar a las tarjetas de Sedes), manteniendo el texto negro completamente legible.

**Bug 3 – Sedes slug: título con AuroraText + SparklesText**

2.3 WHEN el usuario visita una página de sede THEN el sistema SHALL mostrar el subtítulo de la sede usando `SparklesText` como envoltorio exterior y `AuroraText` como envoltorio interior, con los colores de la paleta completa del sitio (`[sede.color, "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]`), replicando exactamente el estilo del encabezado del Hero.

**Bug 4 – Sedes slug: descripción con negrita negra y resaltado de color sólido**

2.4 WHEN el usuario visualiza el párrafo de descripción en una página de sede THEN el sistema SHALL mostrar el texto con `font-weight: 700` y color `#1e293b` (negro oscuro), y el componente `HighLight` SHALL aplicar un color sólido y vívido que coincida con el color temático de la sede (con opacidad suficiente para ser notorio) sobre las palabras o frases clave del campo `resaltado`, usando el tipo `underline` para el énfasis.

**Bug 5 – Sedes slug: carrusel unificado cuadrado con lightbox y video nativo**

2.5 WHEN el usuario visita cualquier sede (jardin, babys, after-class) THEN el sistema SHALL mostrar un único componente de carrusel unificado con contenedor de relación de aspecto 1:1 (cuadrado) en todos los tamaños de pantalla, compatible con medios mixtos (imágenes y videos).

2.6 WHEN el usuario hace clic en cualquier elemento del carrusel THEN el sistema SHALL abrir un lightbox idéntico en comportamiento al de la página de Galería (usando `yet-another-react-lightbox` con el plugin `Video`), mostrando el elemento en pantalla completa.

2.7 WHEN un elemento del carrusel es un video THEN el sistema SHALL renderizarlo usando el elemento HTML5 nativo `<video>` con el atributo `controls`, sin ningún control personalizado de play/pause, barra de progreso ni volumen.

2.8 WHEN el sistema renderiza el carrusel para la sede `babys` THEN el sistema SHALL usar el mismo carrusel unificado que las demás sedes, eliminando el componente `BabysVideoPlayer` y la rama condicional `slug === "babys"`.

**Bug 6 – Servicios: imagen sin marco con espacio vacío**

2.9 WHEN el usuario visualiza las tarjetas de servicio THEN el sistema SHALL mostrar las imágenes sin el contenedor con borde que deja espacio vacío; la imagen SHALL ocupar su área de contenedor de forma más natural, con un borde redondeado sutil aplicado directamente al elemento imagen o su envoltorio inmediato, sin espacio vacío visible entre el borde y la imagen.

**Bug 7 – Servicios: borde NeonGradientCard más grueso**

2.10 WHEN el usuario visualiza las tarjetas de servicio THEN el sistema SHALL aplicar `borderSize={4}` en cada `NeonGradientCard` de servicio, produciendo un borde visualmente consistente con las tarjetas de Nosotros.

**Bug 8 – Hero stats: stickers de índice 0 y 1 más grandes**

2.11 WHEN el usuario visualiza los stickers de estadísticas en el Hero THEN el sistema SHALL renderizar los stickers de índice 0 y 1 con un contenedor de aproximadamente `100×100px` (incremento de ~10% respecto a los `90×90px` actuales), manteniendo el sticker de índice 2 completamente sin cambios.

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN el usuario visualiza la sección Nosotros THEN el sistema SHALL CONTINUE TO mostrar el contenido, layout y z-index de la sección sin ningún cambio.

3.2 WHEN el usuario visualiza la sección Sedes THEN el sistema SHALL CONTINUE TO mostrar el contenido, layout y z-index de la sección sin ningún cambio.

3.3 WHEN el usuario visualiza las cajas de información en Contacto THEN el sistema SHALL CONTINUE TO mostrar el mismo texto, iconos, enlaces y propiedades de layout sin ningún cambio.

3.4 WHEN el usuario visualiza el título de una página de sede THEN el sistema SHALL CONTINUE TO mostrar el título con el mismo tamaño grande y prominente (`text-6xl md:text-8xl`).

3.5 WHEN el usuario visualiza el contenido de una página de sede THEN el sistema SHALL CONTINUE TO mostrar la tarjeta de información (edades, servicios, dirección, botón WhatsApp), el mapa y el footer sin ningún cambio.

3.6 WHEN el usuario navega por el carrusel de una sede THEN el sistema SHALL CONTINUE TO mostrar los botones de flecha prev/next existentes y los indicadores de puntos de navegación.

3.7 WHEN el usuario visualiza las tarjetas de servicio THEN el sistema SHALL CONTINUE TO mostrar el efecto Lens de hover/zoom completamente funcional, así como el título, descripción y highlights de texto de cada tarjeta sin cambios.

3.8 WHEN el usuario visualiza el Hero THEN el sistema SHALL CONTINUE TO mostrar las dimensiones del contenedor de la tarjeta stat (fondo, número, etiqueta) sin cambios para los tres stickers, y el sticker de índice 2 SHALL CONTINUE TO tener exactamente `70×70px`.

3.9 WHEN el usuario visualiza la sección Contacto (columna derecha) THEN el sistema SHALL CONTINUE TO mostrar el panel de ubicaciones y horarios sin ningún cambio.

3.10 WHEN el usuario visualiza la página de Galería THEN el sistema SHALL CONTINUE TO funcionar exactamente igual que antes, sin ninguna modificación.
