import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  /**
     GET  /users
     GET  /users:id
        POST /users
        PATCH /users:id
        DELETE /users:id
     */
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }
}
