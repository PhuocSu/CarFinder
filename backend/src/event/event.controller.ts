import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post()
    create(@Body() dto: CreateEventDto) {
        return this.eventService.create(dto);
    }

    @Get()
    findAll(
        @Query('search') search?: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.eventService.findAll(search, page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.eventService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
        return this.eventService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.eventService.remove(id);
    }

}
