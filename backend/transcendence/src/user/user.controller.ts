import {  Controller, 
          Get, 
          Post,
          Patch,
          Param, 
          Body,
          Delete} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
@Controller('user') 
export class UserController {
  constructor(private readonly userService: UserService){}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto:CreateUserDto){
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto:UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

}
