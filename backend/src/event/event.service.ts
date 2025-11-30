import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) { }

    async create(dto: CreateEventDto) {
        const event = this.eventRepository.create(dto);
        return await this.eventRepository.save(event);
    }

    async findAll(
        search?: string,
        page = 1,
        limit = 8
    ) {
        const query = this.eventRepository.createQueryBuilder('event');

        if (search) {
            query.where('event.title Like :search', { search: `%${search}%` })
        }

        query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('event.createdAt', 'DESC')

        const [data, total] = await query.getManyAndCount()
        return {
            items: data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }

    async findOne(id: number) {
        return await this.eventRepository.findOne({ where: { id } });
    }

    async update(id: number, dto: UpdateEventDto) {
        return await this.eventRepository.update(id, dto);
    }

    async remove(id: number) {
        return await this.eventRepository.delete(id);
    }
}
