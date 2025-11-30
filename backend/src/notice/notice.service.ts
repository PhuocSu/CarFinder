import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  //Khai báo để inject repository
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) { }

  async create(createNoticeDto: CreateNoticeDto) {
    const notice = this.noticeRepository.create(createNoticeDto);
    return await this.noticeRepository.save(notice);
  }

  async findAll(
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const query = this.noticeRepository.createQueryBuilder('notice');

    if (search) {
      query.where('notice.title LIKE :search', { search: `%${search}%` });
    }

    query.skip((page-1)*limit).take(limit).orderBy('notice.createdAt', 'DESC')

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
    return await this.noticeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto) {
    return await this.noticeRepository.update(id, updateNoticeDto);
  }

  async remove(id: number) {
    return await this.noticeRepository.delete(id);
  }
}
