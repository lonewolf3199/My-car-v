import { Body, 
    Controller, 
    Post, 
    Get,
    Patch, 
    Param, 
    Query, 
    Delete, 
    NotFoundException, 
    UseInterceptors, 
    ClassSerializerInterceptor } from '@nestjs/common';
import { createUSerDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('auth')
export class UsersController {
    constructor(private usersservice: UsersService){}
    @Post('/signup')
    createUser(@Body() body: createUSerDto){
        this.usersservice.create(body.email, body.password);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.usersservice.findOne(parseInt(id))
        if(!user){
            throw new NotFoundException('No user Found By The Provided ID!')
        }
        return user;
    }

    @Get()
    findAllUser(@Query('email') email: string){
        return this.usersservice.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.usersservice.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUSer(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.usersservice.update(parseInt(id), body)
    }
}
