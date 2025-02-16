import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    private users = [];

    @Get()
    findAll() {
        return this.users;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.users.find(user => user.id === id);
    }

    @Post()
    create(@Body() user) {
        this.users.push(user);
        return user;
    }
}
