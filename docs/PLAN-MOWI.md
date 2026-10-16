# Mówi · Plan maestro de la aplicación

> Documento vivo. Cada sección se marca como ✅ hecho, 🔄 en curso o ⏳ pendiente.
> Principio: mejorar lo que ya funciona, nunca borrarlo.

---

## 1. Visión

Mówi es una app para hispanohablantes que quieren aprender polaco (y, más adelante, otros idiomas) de forma inmersiva, práctica y divertida. El objetivo es que el usuario llegue a **hablar con fluidez y entender cuando le hablan**, aprendiendo de los temas de su vida real: trabajo, casa, compras, salud, viajes.

**Diferencial:** la app aprende de lo que el usuario vive. Enseña primero el vocabulario que necesita y lo practica en situaciones reales, sin escritura obligatoria en los primeros niveles.

---

## 2. Identidad visual

| Elemento | Decisión | Estado |
|---|---|---|
| Personaje | Búho Mówi con lazo que cambia de color según la racha (azul sin racha, verde con 7 días, dorado con 30) | ⏳ |
| Sello | La letra **ą** (ogonek polaco) como marca en botones, medallas y logo | ⏳ |
| Color principal | Azul eléctrico `#0284C7` con acentos ámbar `#F59E0B` | 🔄 |
| Tipografía | Redondeada y fuerte para títulos, legible para textos | ⏳ |
| Modo oscuro | Opcional, desde ajustes | ⏳ |
| Tarjetas | Sombra suave y borde de color por tema | 🔄 |
| Animaciones | Entrada de pantallas, confeti al completar módulos | ⏳ |

---

## 3. Avatar y personalización

- **Emojis de perfil** (✅ hecho): 30 opciones.
- **Marcos de avatar** (⏳): el emoji dentro de un marco que se desbloquea con logros.
- **Sello de racha** (⏳): un aro de color que cambia con los días seguidos.

---

## 4. Temas de interés y vida práctica

Al registrarse, el usuario elige temas en tarjetas con emoji. La app organiza el aprendizaje alrededor de ellos.

| Tema | Emoji | Ejemplos de vocabulario | Estado |
|---|---|---|---|
| Compras y mercado | 🛒 | pan, leche, cuánto cuesta, caro, barato | ⏳ |
| Restaurantes y cafés | 🍽️ | cuenta, quisiera, mesa, menú | ⏳ |
| Viajes y transporte | 🚆 | billete, estación, a la izquierda, recto | ⏳ |
| Salud y farmacia | 🏥 | médico, me duele, farmacia, receta | ⏳ |
| Trabajo y oficina | 🏢 | reunión, proyecto, plazo, equipo | ⏳ |
| Casa y vecinos | 🏠 | cocina, alquiler, vecino, llave | ⏳ |
| Música y cultura | 🎵 | libro, concierto, película, me gusta | ⏳ |
| Deporte y aficiones | ⚽ | jugar, equipo, partido, entrenar | ⏳ |
| Amistad y conversación | 💬 | ¿qué tal?, quedar, hablar, gracias | ⏳ |

**Regla:** cada tema agrupa módulos, parejas y diálogos ya existentes. Las frases más usadas del tema aparecen primero.

---

## 5. Diálogos por nivel

| Diálogo | Nivel | Requisito | Estado |
|---|---|---|---|
| En el supermercado | A1 | 2 módulos | ✅ |
| En el médico | A2 | 4 módulos | ✅ |
| Reunión en la oficina | B1 | 3 módulos | ✅ |
| Entrevista de trabajo | B1 | 3 módulos | ✅ |

**Mejoras pendientes:** diálogos por tema (vivienda, compras, trabajo) y turnos con traducción tocable.

---

## 6. Motor de aprendizaje

- **Escucha** con tarjetas a tres velocidades (✅)
- **Parejas** de vocabulario (✅, A1 y A2)
- **Elección** tras escuchar (✅)
- **Ordenar frases** (✅, A1 y A2)
- **Pronunciación** con palabras que se iluminan en vivo (✅)
- **Dictado y escritura** solo en B1 (✅)
- **Repaso espaciado** de frases falladas (✅)
- **Traducción al tocar** cualquier palabra (✅, diccionario propio)
- **Mapa de viaje** por temas (⏳)
- **Escenas de contexto** con emojis (⏳)

---

## 7. Progreso y motivación

- **XP, gemas, vidas, racha** (✅)
- **Medallas** de logros (✅, 12 medallas)
- **Regalo mensual** con 10 días o más de estudio (✅)
- **Desafíos semanales y mensuales** (✅)
- **Progreso por habilidad:** comprensión, velocidad y pronunciación (🔄, la velocidad aún no se alimenta)
- **Liga semanal** con rivales simulados (✅)
- **Torneos** con premios para el top 3 (✅)
- **Amigos por código** (✅)

---

## 8. Mi vocabulario (función propia)

Pantalla donde el usuario pega un texto de su vida real (un correo, una lista, una conversación). La app:

1. detecta las palabras que aún no conoce,
2. las agrupa por tema,
3. crea una lección de vocabulario con ellas.

**Funciona sin servicios de pago**, con el diccionario propio. Estado: ⏳.

---

## 9. Sonido y vibración

- Tonos de acierto, error, celebración y victoria (✅)
- Vibración diferenciada por tipo de evento (✅, solo en móvil)
- Interruptores en el menú flotante (✅)

---

## 10. Plataforma y publicación

- Web en Vercel: `app-idiomas-nine.vercel.app` (✅)
- Instalable en iPhone con icono de búho y pantalla completa (✅)
- Versión Android con APK: ⏳, con EAS Build (cuenta gratuita de Expo, con límites)
- Respaldo del proyecto en GitHub (✅)

---

## 11. Hoja de ruta

**Fase A · Identidad (siguiente)**
1. Logo de Mówi con color según racha
2. Sello ogonek en botones y medallas
3. Marcos de avatar
4. Paleta y tipografía finales

**Fase B · Temas**
5. Pantalla de temas de interés en el registro
6. Filtro de módulos y diálogos por tema
7. Diccionario ampliado por tema

**Fase C · Experiencia**
8. Mapa de viaje
9. Escenas de contexto
10. Animaciones y confeti

**Fase D · Mi vocabulario**
11. Pantalla para pegar textos
12. Creación automática de lecciones

**Fase E · Expansión**
13. Modo oscuro
14. Diálogos por tema
15. Otros idiomas (inglés, francés) con revisión nativa

---

## 12. Reglas del proyecto

- Nunca borrar código que funcione: se mejora o se amplía.
- Todo se entrega en bloques de PowerShell que crean o reemplazan archivos.
- Antes de cada cambio grande, copia de seguridad en `.zip`.
- Un archivo a la vez en cada bloque, para que nada se corte.
- Este documento se actualiza al terminar cada fase.
