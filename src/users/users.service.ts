import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { "id": 1, "name": 'John Doe', "email": 'Since@123.biz', "role": 'INTERN' },
    { "id": 2, "name": 'Jane Doe', "email": 'Shanem@123.com', "role": 'INTERN' },
    { "id": 3,"name": 'Shane Doe', "email": 'shane@123.com', "role": 'ENGINEER' },
    { "id": 4, "name": 'Shane Bush', "email": 'bush@123.com', "role": 'ADMIN'},
    { "id": 5, "name": 'Shee Bush', "email": 'test@q13.com`', "role": 'ADMIN'}
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if(role) {
        return this.users.filter(user => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(user: {name:string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id); 
    const newUser = {id: usersByHighestId[0].id + 1, ...user};  
    this.users.push(newUser);
    return {newUser};
    }

   update(id: number, userUpdate: {name?:string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return { ...user, ...userUpdate };
            }
            return user;
        })
        return this.findOne(id);
    }

    delete(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return { id };
    }
}   
