# Guía de Configuración - Google Search Console

## 📋 ¿Qué es Google Search Console?

Google Search Console es una herramienta gratuita de Google que te permite:
- ✅ Monitorear cómo Google ve tu sitio web
- ✅ Ver qué búsquedas llevan usuarios a tu sitio
- ✅ Detectar y solucionar problemas de indexación
- ✅ Mejorar el posicionamiento en Google (SEO)
- ✅ Ver estadísticas de rendimiento

---

## 🚀 Paso 1: Acceder a Google Search Console

1. Ve a: https://search.google.com/search-console
2. Inicia sesión con la cuenta de Google del jardín: **wpjardininfantil@hotmail.com**
3. Si es la primera vez, haz clic en **"Empezar ahora"**

---

## 🔗 Paso 2: Agregar tu Propiedad (Dominio)

### Opción A: Verificación por Dominio (Recomendada)

1. En Search Console, haz clic en **"Agregar propiedad"**
2. Selecciona **"Dominio"**
3. Ingresa: `winniepoohjardininfantil.com`
4. Haz clic en **"Continuar"**

### Verificación DNS en Hostinger:

Google te dará un código TXT que debes agregar en Hostinger:

1. Inicia sesión en **Hostinger** (https://hostinger.com)
2. Ve a **"Dominios"** → Selecciona `winniepoohjardininfantil.com`
3. Haz clic en **"DNS / Nameservers"**
4. Busca la sección **"Agregar registro"**
5. Selecciona tipo: **TXT**
6. En **"Nombre"**: deja en blanco o pon `@`
7. En **"Valor"**: pega el código que te dio Google (algo como `google-site-verification=XXXXXXXXX`)
8. Haz clic en **"Agregar registro"**
9. Vuelve a Google Search Console y haz clic en **"Verificar"**

⏱️ **Nota**: La verificación puede tardar hasta 48 horas, pero generalmente es instantánea.

---

### Opción B: Verificación por Prefijo de URL (Más Rápida)

Si la opción A es complicada, usa esta:

1. En Search Console, selecciona **"Prefijo de URL"**
2. Ingresa: `https://winniepoohjardininfantil.com`
3. Haz clic en **"Continuar"**

Google te dará varias opciones de verificación. La más fácil es:

#### Método: Etiqueta HTML

1. Google te dará un código como:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXX" />
   ```

2. **Copia ese código completo**

3. Contacta a **SerStack** para que agregue ese código en el `<head>` del sitio

4. Una vez agregado, vuelve a Google Search Console y haz clic en **"Verificar"**

---

## 📊 Paso 3: Enviar el Sitemap

Una vez verificado el sitio:

1. En el menú lateral de Search Console, ve a **"Sitemaps"**
2. En el campo **"Agregar un sitemap nuevo"**, ingresa: `sitemap.xml`
3. Haz clic en **"Enviar"**

✅ **Resultado esperado**: Google empezará a rastrear tu sitio automáticamente.

---

## 🔍 Paso 4: Solicitar Indexación de Páginas Importantes

Para que Google indexe tus páginas más rápido:

1. En el menú lateral, ve a **"Inspección de URLs"**
2. Ingresa cada una de estas URLs y haz clic en **"Solicitar indexación"**:
   - `https://winniepoohjardininfantil.com`
   - `https://winniepoohjardininfantil.com/galeria`
   - `https://winniepoohjardininfantil.com/sedes/jardin`
   - `https://winniepoohjardininfantil.com/sedes/babys`
   - `https://winniepoohjardininfantil.com/sedes/after-class`

⏱️ **Nota**: La indexación puede tardar de 1 a 7 días.

---

## 📈 Paso 5: Monitorear el Rendimiento

Después de 2-3 días, podrás ver estadísticas en:

### **Rendimiento** (menú lateral)
- Clics totales
- Impresiones
- CTR (tasa de clics)
- Posición promedio en Google
- Consultas de búsqueda que llevan usuarios a tu sitio

### **Cobertura** (menú lateral)
- Páginas indexadas correctamente
- Páginas con errores
- Páginas excluidas

### **Mejoras** (menú lateral)
- Usabilidad móvil
- Velocidad del sitio
- Datos estructurados

---

## 🎯 Consejos para Mejorar el SEO

### 1. Palabras Clave Importantes
Asegúrate de que estas palabras aparezcan en tu contenido:
- Jardín infantil Medellín
- Guardería Medellín
- Jardín infantil La América
- Jardín infantil Calasanz
- After class Medellín
- Estimulación temprana Medellín
- Método políglota

### 2. Google My Business
Crea o actualiza tu perfil de Google My Business:
- Ve a: https://business.google.com
- Agrega fotos del jardín
- Responde reseñas
- Actualiza horarios y dirección

### 3. Reseñas de Google
Pide a los padres que dejen reseñas en Google. Esto mejora mucho el posicionamiento local.

---

## ⚠️ Problemas Comunes

### "No se pudo verificar la propiedad"
- Espera 24-48 horas después de agregar el registro DNS
- Verifica que el código TXT esté correctamente copiado
- Intenta con el método de etiqueta HTML

### "Sitemap no se puede leer"
- Verifica que el sitio esté en producción en Vercel
- Espera unos minutos y vuelve a intentar
- El sitemap se genera automáticamente en: `https://winniepoohjardininfantil.com/sitemap.xml`

### "Páginas no indexadas"
- Es normal que tome 1-7 días
- Usa "Solicitar indexación" para acelerar el proceso
- Asegúrate de que el sitio esté público (no en modo mantenimiento)

---

## 📞 Soporte

Si tienes problemas con la configuración, contacta a:

**SerStack**
- 📧 serstack.dev@gmail.com
- 📱 +57 312 803 67 25
- 📷 @ser_stack (Instagram)
- 🎵 @serstack (TikTok)

---

## ✅ Checklist Final

- [ ] Cuenta de Google Search Console creada
- [ ] Propiedad verificada (DNS o HTML)
- [ ] Sitemap enviado
- [ ] Páginas principales solicitadas para indexación
- [ ] Google My Business actualizado
- [ ] Monitoreo de rendimiento activado

---

**Última actualización**: Mayo 2026  
**Desarrollado por**: SerStack
