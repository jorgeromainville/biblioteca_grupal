# Errores encontrados

**Nombre:**
**Fecha:**

> Tipos válidos: `Typo` (editor en rojo) · `Sintaxis` · `Terminal` (prisma / arranque / endpoint / tests) · `Lógica`

| #   | Archivo                          | Línea | Tipo | ¿Qué estaba mal?                                                                             | ¿Cómo lo detectaste?                                           | ¿Cómo lo solucionaste?         |
| --- | -------------------------------- | ----- | ---- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------ |
| 0   | `src/ejemplo/ejemplo.service.ts` | 10    | Typo | _(fila de ejemplo, bórrala) se llamaba `this.prisma.usuaro` en vez de `this.prisma.usuario`_ | _VS Code lo marcó en rojo: "Property 'usuaro' does not exist"_ | _corregí el nombre del modelo_ |
| 1   |                                  |       |      |                                                                                              |                                                                |                                |
| 2   |                                  |       |      |                                                                                              |                                                                |                                |
| 3   |                                  |       |      |                                                                                              |                                                                |                                |
| 4   |                                  |       |      |                                                                                              |                                                                |                                |
| 5   |                                  |       |      |                                                                                              |                                                                |                                |

<!-- Agrega todas las filas que necesites -->

## Reflexión final

1. ¿Qué tipo de error te costó más encontrar y por qué?
2. ¿Qué herramienta te ayudó más (editor, terminal, Swagger/Postman, tests)?
3. ¿Qué harías para evitar este tipo de errores en tus propios proyectos?

## errores que encontre (Jorge )

prisma\schema.prisma

- linea 12 error de escritura "Strng"
- linea 62 error de escritura "ID" debia estar en miniscula

src/categoria/categoria.service.ts

- una coma que faltaba en la linea 26

src/categoria/categoria.module.ts

- faltaba importar CategoriaService en Providers

prisma/prisma.service.ts
un "t" que faltaba en la linea en la linea 6 "PrismaClient"

src/autor.controller.ts
en la linea 24 era "GET" no "GETT"

categoria/dto/create-autor.dto.ts
solo era un palabara mal escrita en la linea "IsOptional" 11
