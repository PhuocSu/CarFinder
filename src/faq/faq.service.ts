import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
    constructor(
        @InjectRepository(Faq)
        private faqRepository: Repository<Faq>,
    ) { }

    create(dto: CreateFaqDto) {
        const faq = this.faqRepository.create(dto);
        return this.faqRepository.save(faq);
    }

    async findAll(category?: Category, search?: string, page = 1, limit = 10) {
        const query = this.faqRepository.createQueryBuilder('faq'); //alias trong database 

        //search theo title => trả về toàn bộ
        if (search) {
            query.where('faq.title Like :search', { search: `%${search}%` })
        } else {
            // không search -> cho phép lọc theo category
            if (category && category !== Category.ALL) {
                query.where('faq.category = :category', { category })
            }
        }

        query
            .skip((page - 1) * limit) //skip bản ghi đầu tiên
            .take(limit); //lấy tối đa limit

        const [data, total] = await query.getManyAndCount()
        return {
            items: data, //data
            total, //current total for current enum
            page, //current page for curent enum
            limit, //limit each page
            totalPages: Math.ceil(total / limit) //totalPages
        }

    }

    findOne(id: number) {
        return this.faqRepository.findOne({
            where: { id }
        })
    }

    async update(id: number, dto: UpdateFaqDto) {
        await this.faqRepository.update(id, dto);
        return this.findOne(id);
    }

    remove(id: number) {
        return this.faqRepository.delete(id);
    }
}
