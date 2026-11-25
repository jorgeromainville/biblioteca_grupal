# Errores encontrados — Proyecto Biblioteca

**Proyecto:** Biblioteca API  
**Fecha:** ____________________  
**Objetivo:** Identificar, documentar, corregir y verificar los errores encontrados durante la auditoría del proyecto.

### Tipos de errores

- `Typo`: nombres mal escritos, propiedades o delegates incorrectos.
- `Sintaxis`: errores en la estructura o escritura del código.
- `Tipos`: incompatibilidad entre tipos de datos.
- `Terminal`: errores detectados durante compilación, Prisma, arranque, endpoints o tests.
- `Lógica`: errores en el comportamiento o incumplimiento de las reglas de negocio.

---

# Gus

**Módulo asignado:** Libro

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|
| `src/main.ts` | Pendiente | Sintaxis | Cierre incorrecto de `app.useGlobalPipes()`, impidiendo una estructura sintácticamente válida. | Inspección del código fuente. | Pendiente |
| `src/libro/libro.service.ts` | Pendiente | Typo | Se utiliza `this.prisma.libros` en lugar del delegate correspondiente al modelo `Libro`. | Inspección del código y comparación con el modelo Prisma. | Pendiente |
| `src/libro/libro.controller.ts` | Pendiente | Tipos | El parámetro `id` de `findOne` se recibe como `string`, pero el servicio espera `number`. | Inspección de las firmas del Controller y Service. | Pendiente |
| `src/libro/libro.service.ts` | Pendiente | Lógica | La consulta de categoría utiliza `data.autorId` en lugar de `data.categoriaId`. | Inspección de la lógica de creación y comparación con las relaciones del DTO. | Pendiente |
| `src/libro/dto/create-libro.dto.ts` | Pendiente | Lógica | `anioPublicacion` no cuenta con validaciones para exigir un entero entre 1450 y 2100. | Comparación del DTO con las reglas de negocio del README. | Pendiente |

### Espacio para nuevos hallazgos de Gus

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

# Jorge

**Módulos asignados:** Autor y Categoría

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|
| | || | | |
| | || | | |
| | || || |
| | || || |
| | || || |

### Espacio para nuevos hallazgos de Jorge

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|
| | || | | |
| | || || |
| | || || |

---

# Esdras

**Módulo asignado:** Socio

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|
| | || || |
| | || || |
| | || || |
| | || || |
| | || || |

### Espacio para nuevos hallazgos de Esdras

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|
| | || || |
| | || || |
| | || || |

---

# Jesús

**Módulo asignado:** Préstamo

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|---|
| | || || |
| | || || |
| | || || |
| | || || |
| | || || |

### Espacio para nuevos hallazgos de Jesús

| Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
|---|---|---|---|---|
| | || || |
| | || || |
| | || || |

---

# Reflexión final del equipo

Cada integrante deberá responder:

1. ¿Qué tipo de error te costó más encontrar y por qué?
2. ¿Qué herramienta te ayudó más (editor, terminal, Swagger/Postman, tests)?
3. ¿Qué harías para evitar este tipo de errores en tus propios proyectos?

## Reflexión de Gus

**1. ¿Qué tipo de error me costó más encontrar y por qué?**

Respuesta:

**2. ¿Qué herramienta me ayudó más?**

Respuesta:

**3. ¿Qué haría para evitar este tipo de errores en mis propios proyectos?**

Respuesta:

---

> Los errores deben documentarse conforme se identifican. La solución deberá registrarse después de corregir el problema y verificar que el comportamiento sea el esperado. No se deben modificar las reglas de negocio ni los tests para ocultar errores del proyecto.
