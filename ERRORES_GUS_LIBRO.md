# Auditoría de errores — Módulo Libro

**Responsable:** Gus
**Proyecto:** Biblioteca API
**Rama:** gus-fixes-libro

## LIB-01 — Identificador incorrecto al validar categoría

- **Archivo:** src/libro/libro.service.ts
- **Tipo:** Lógica
- **Estado:** Pendiente

**Problema:**
Se utiliza autorId para buscar la categoría en lugar de categoriaId.

**Detección:** Inspección del código.

**Corrección:** Pendiente.

**Verificación:** Pendiente.

---

## LIB-02 — Delegate incorrecto de Prisma

- **Archivo:** src/libro/libro.service.ts
- **Tipo:** Typo
- **Estado:** Pendiente

**Problema:**
Se utiliza prisma.libros en lugar de prisma.libro.

**Detección:** Inspección del código.

**Corrección:** Pendiente.

**Verificación:** Pendiente.

---

## LIB-03 — Incompatibilidad de tipos en findOne

- **Archivo:** src/libro/libro.controller.ts
- **Tipo:** Tipos
- **Estado:** Pendiente

**Problema:**
El Controller recibe id como string, pero el Service espera number.

**Detección:** Comparación de las firmas de Controller y Service.

**Corrección:** Pendiente.

**Verificación:** Pendiente.

---

## LIB-04 — Validación insuficiente de año de publicación

- **Archivo:** src/libro/dto/create-libro.dto.ts
- **Tipo:** Validación / Lógica
- **Estado:** Pendiente

**Problema:**
anioPublicacion no valida que sea entero ni que esté entre 1450 y 2100.

**Regla de negocio:**
- Entero.
- Mínimo 1450.
- Máximo 2100.

**Detección:** Comparación del DTO con el README.

**Corrección:** Pendiente.

**Verificación:** Pendiente.

---

## INVESTIGACIÓN-01 — Filtro por categoría

- **Archivo:** src/libro/libro.controller.ts
- **Estado:** Investigación pendiente

Investigar el comportamiento de GET /libros cuando no se proporciona categoriaId y cuando se proporciona un ID válido.

No considerar confirmado hasta realizar pruebas.

---

## Registro de pruebas

| ID | Prueba | Resultado |
|---|---|---|
| LIB-01 | Pendiente | Pendiente |
| LIB-02 | Pendiente | Pendiente |
| LIB-03 | Pendiente | Pendiente |
| LIB-04 | Pendiente | Pendiente |