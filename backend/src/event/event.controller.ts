import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() dto: CreateEventDto) {
        return this.eventService.create(dto);
    }

    @Public()
    @Get()
    findAll(
        @Query('search') search?: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.eventService.findAll(search, page, limit);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.eventService.findOne(id);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
        return this.eventService.update(id, dto);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number) {
        return this.eventService.remove(id);
    }

}
