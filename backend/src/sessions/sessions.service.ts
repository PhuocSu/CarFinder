import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>
    ) {}

    //Tạo session khi user đăng nhập
    async create(user: User, refreshToken: string, userAgent?: string, ipAddress?: string): Promise<Session> {
        const session = this.sessionRepository.create({
          user,
          refreshToken,
          expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          userAgent,
          ipAddress,
        });
        return this.sessionRepository.save(session);
    }

    //Tìm session khi cần xác thực bằng refresh token.
    async findByToken(refreshToken: string): Promise<Session | null> {
        return this.sessionRepository.findOne({
          where: { refreshToken },
          relations: ['user'],
        });
    }

    //Xoá session khi user logout hoặc khi hết hạn
    async remove(session: Session): Promise<void> {
        await this.sessionRepository.remove(session);
    }

    //Dọn dẹp session cũ để giữ DB sạch
    async removeAllForUser(userId: string): Promise<void> {
        await this.sessionRepository
          .createQueryBuilder()
          .delete()
          .from(Session)
          .where('userId = :userId', { userId })
          .execute();
    }

    //Xoá session hết hạn
    async removeExpiredSessions(): Promise<void> {
        await this.sessionRepository
          .createQueryBuilder()
          .delete()
          .from(Session)
          .where('expireAt < :now', { now: new Date() })
          .execute();
    }

}
