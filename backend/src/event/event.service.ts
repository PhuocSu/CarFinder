import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto) {
    const event = this.eventRepository.create(dto);
    return await this.eventRepository.save(event);
  }

  async findAll(search?: string, page = 1, limit = 8) {
    const query = this.eventRepository.createQueryBuilder('event');

    if (search) {
      query.where('event.title Like :search', { search: `%${search}%` });
    }

    query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('event.isTemporarySave', 'DESC')
      .addOrderBy('event.createdAt', 'DESC');

    const [data, total] = await query.getManyAndCount();
    return {
      items: data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

async findOne(id: number) {
  const currentEvent = await this.eventRepository.findOne({ where: { id } });
  if (!currentEvent) return null;

  // lấy danh sách như findAll
  const allEvents = await this.eventRepository
    .createQueryBuilder('event')
    .orderBy('event.isTemporarySave', 'DESC')
    .addOrderBy('event.createdAt', 'DESC')
    .getMany();

  // tìm vị trí hiện tại
  const currentIndex = allEvents.findIndex(event => event.id === id);
  
  // lấy prev và next
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  return {
    ...currentEvent,
    prevEventId: prevEvent?.id || null,
    nextEventId: nextEvent?.id || null,
  };
}

  async update(id: number, dto: UpdateEventDto) {
    await this.eventRepository.update(id, dto);
    return await this.eventRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.eventRepository.delete(id);
  }
}
