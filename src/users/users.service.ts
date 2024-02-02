import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'Since@123.biz', role: 'INTERN' },
    { id: 2, name: 'Jane Doe', email: 'Shanem@123.com', role: 'INTERN' },
    { id: 3, name: 'Shane Doe', email: 'shane@123.com', role: 'ENGINEER' },
    { id: 4, name: 'Shane Bush', email: 'bush@123.com', role: 'ADMIN' },
    { id: 5, name: 'Shee Bush', email: 'test@q13.com`', role: 'ADMIN' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArrary =  this.users.filter((user) => user.role === role);
      if (rolesArrary.length === 0) {
        throw new NotFoundException(`User with role ${role} not found`);
      }
      return rolesArrary;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = { id: usersByHighestId[0].id + 1, ...createUserDTO };
    this.users.push(newUser);
    return { newUser };
  }

  update(id: number, userUpdateDTO: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdateDTO };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return { id };
  }
}
