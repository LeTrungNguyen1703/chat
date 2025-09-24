import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const saltRounds = 10;
      createUserDto.password_hash = await bcrypt.hash(
        createUserDto.password_hash,
        saltRounds,
      );
      return await this.prisma.users.create({
        data: createUserDto,
        omit: {
          password_hash: true,
        },
      });
    } catch (error) {
      this.handleUsernameOrEmailConflict(error);
      throw error;
    }
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: number) {
    try {
      return await this.prisma.users.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      this.handleIdNotFound(error);
      throw error;
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.prisma.users.findUniqueOrThrow({ where: { username } });
    } catch (error) {
      this.handleIdNotFound(error);
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleUsernameOrEmailConflict(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException(`${error.meta?.target} already exists`);
      }
    }
  }

  private handleIdNotFound(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`${error.meta?.cause}`);
      }
    }
  }
}
