// prisma/seed.ts

// npx prisma db seed 
// Vacía las tablas, reinicia los IDs en 1

// npx prisma migrate reset 
// Borra las tablas de datos entera, 
// vuelve a correr las migraciones y 
// ejecuta el seed automáticamente

// libroId: 5 → Libro agotado (stock: 0, error 400).
// socioId: 2 → Socio con 3 préstamos activos (error 400).
// socioId: 4 → Socio inactivo (error 404).
// prestamoId: 1 → Préstamo vencido.
// prestamoId: 2 → Préstamo ya devuelto (error 400 al intentar devolverlo otra vez).


import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(' Reiniciando tablas e IDs desde 1...');
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "prestamos", "libros", "socios", "autores", "categorias" RESTART IDENTITY CASCADE;',
  );

  console.log(' Creando categorías...');
  const catNovela = await prisma.categoria.create({ data: { nombre: 'Novela' } });
  const catCienciaFiccion = await prisma.categoria.create({ data: { nombre: 'Ciencia Ficción' } });
  const catProgramacion = await prisma.categoria.create({ data: { nombre: 'Programación' } });
  const catHistoria = await prisma.categoria.create({ data: { nombre: 'Historia' } });

  console.log(' Creando autores...');
  const autorGabo = await prisma.autor.create({
    data: { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana' },
  });
  const autorVargasLlosa = await prisma.autor.create({
    data: { nombre: 'Mario Vargas Llosa', nacionalidad: 'Peruana' },
  });
  const autorAsimov = await prisma.autor.create({
    data: { nombre: 'Isaac Asimov', nacionalidad: 'Ruso-estadounidense' },
  });
  const autorMartin = await prisma.autor.create({
    data: { nombre: 'Robert C. Martin', nacionalidad: 'Estadounidense' },
  });

  console.log(' Creando libros...');
  const libroCienAnios = await prisma.libro.create({
    data: {
      titulo: 'Cien años de soledad',
      isbn: '978-0307474728',
      anioPublicacion: 1967,
      stock: 4,
      autorId: autorGabo.id,
      categoriaId: catNovela.id,
    },
  });

  const libroCiudadPerros = await prisma.libro.create({
    data: {
      titulo: 'La ciudad y los perros',
      isbn: '978-8420412146',
      anioPublicacion: 1963,
      stock: 2,
      autorId: autorVargasLlosa.id,
      categoriaId: catNovela.id,
    },
  });

  const libroFundacion = await prisma.libro.create({
    data: {
      titulo: 'Fundación',
      isbn: '978-8497599245',
      anioPublicacion: 1951,
      stock: 3,
      autorId: autorAsimov.id,
      categoriaId: catCienciaFiccion.id,
    },
  });

  const libroCleanCode = await prisma.libro.create({
    data: {
      titulo: 'Clean Code',
      isbn: '978-0132350884',
      anioPublicacion: 2008,
      stock: 1,
      autorId: autorMartin.id,
      categoriaId: catProgramacion.id,
    },
  });

  // Libro con stock = 0 para probar que POST /prestamos devuelva 400
  const libroAgotado = await prisma.libro.create({
    data: {
      titulo: 'El amor en los tiempos del cólera',
      isbn: '978-0307389732',
      anioPublicacion: 1985,
      stock: 0,
      autorId: autorGabo.id,
      categoriaId: catNovela.id,
    },
  });

  console.log(' Creando socios...');
  const socioAna = await prisma.socio.create({
    data: { nombre: 'Ana Pérez', email: 'ana@biblioteca.com', activo: true },
  });

  const socioCarlos = await prisma.socio.create({
    data: { nombre: 'Carlos Mendoza', email: 'carlos@biblioteca.com', activo: true },
  });

  const socioMaria = await prisma.socio.create({
    data: { nombre: 'María Quispe', email: 'maria@biblioteca.com', activo: true },
  });

  // Socio inactivo (borrado lógico) para probar que GET /socios lo oculta y prestarle da 404
  const socioInactivo = await prisma.socio.create({
    data: { nombre: 'Jorge Salas (Inactivo)', email: 'jorge@biblioteca.com', activo: false },
  });

  console.log(' Creando préstamos de prueba...');
  const hoy = new Date();

  const hace15Dias = new Date(hoy);
  hace15Dias.setDate(hoy.getDate() - 15);

  const hace3Dias = new Date(hoy);
  hace3Dias.setDate(hoy.getDate() - 3);

  const en10Dias = new Date(hoy);
  en10Dias.setDate(hoy.getDate() + 10);

  // 1. Préstamo VENCIDO (Ana Pérez, sin devolver y fechaLimite hace 3 días)
  await prisma.prestamo.create({
    data: {
      libroId: libroFundacion.id,
      socioId: socioAna.id,
      fechaPrestamo: hace15Dias,
      fechaLimite: hace3Dias,
      fechaDevolucion: null,
    },
  });

  // 2. Préstamo YA DEVUELTO (Ana Pérez, para probar error 400 si se intenta devolver de nuevo)
  await prisma.prestamo.create({
    data: {
      libroId: libroCiudadPerros.id,
      socioId: socioAna.id,
      fechaPrestamo: hace15Dias,
      fechaLimite: en10Dias,
      fechaDevolucion: hace3Dias,
    },
  });

  // 3. Tres préstamos ACTIVOS para Carlos Mendoza (tope máximo = 3, el 4º debe dar 400)
  await prisma.prestamo.createMany({
    data: [
      { libroId: libroCienAnios.id, socioId: socioCarlos.id, fechaLimite: en10Dias },
      { libroId: libroCiudadPerros.id, socioId: socioCarlos.id, fechaLimite: en10Dias },
      { libroId: libroCleanCode.id, socioId: socioCarlos.id, fechaLimite: en10Dias },
    ],
  });

  console.log(' ¡Seed ejecutado correctamente!');
  console.table({
    categorias: 4,
    autores: 4,
    libros: 5,
    socios: 4,
    prestamos: 5,
    idLibroAgotado: libroAgotado.id,
    idSocioAlLimite: socioCarlos.id,
    idSocioInactivo: socioInactivo.id,
  });
}

main()
  .catch((e) => {
    console.error('> Error al ejecutar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
