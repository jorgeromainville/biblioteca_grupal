
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLibroDto } from './dto/create-libro.dto.js';
import { UpdateLibroDto } from './dto/update-libro.dto.js';

@Injectable()
export class LibroService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLibroDto) {
    const autor = await this.prisma.autor.findUnique({
      where: { id: data.autorId },
    });
    if (!autor) {
      throw new NotFoundException(`El autor ${data.autorId} no existe`);
    }

    // FIX LIB-01:
    // Antes se utilizaba data.autorId para buscar la categoría.
    // Se corrige a data.categoriaId para validar la categoría
    // que realmente fue enviada en la solicitud.
    const categoria = await this.prisma.categoria.findUnique({
      where: { id: data.categoriaId },
    });
    if (!categoria) {
      throw new NotFoundException(`La categoría ${data.categoriaId} no existe`);
    }

    const repetido = await this.prisma.libro.findUnique({
      where: { isbn: data.isbn },
    });
    if (repetido) {
      throw new ConflictException(`Ya existe un libro con ISBN ${data.isbn}`);
    }

    return this.prisma.libro.create({ data });
  }

  findAll(categoriaId?: number) {
    // FIX LIB-02:
    // Antes se utilizaba prisma.libros, que no corresponde
    // al delegate generado por Prisma para el modelo Libro.
    // Se corrige a prisma.libro.
    return this.prisma.libro.findMany({
      where: { categoriaId },
      orderBy: { titulo: 'asc' },
      include: { autor: true, categoria: true },
    });
  }

  async findOne(id: number) {
    const libro = await this.prisma.libro.findUnique({
      where: { id },
      include: { autor: true, categoria: true },
    });
    if (!libro) {
      throw new NotFoundException(`El libro ${id} no existe`);
    }
    return libro;
  }

  async update(id: number, data: UpdateLibroDto) {
    await this.findOne(id);
    return this.prisma.libro.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.libro.delete({ where: { id } });
  }
}
