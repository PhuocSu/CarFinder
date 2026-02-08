import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RecentSearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((user) => User, (user) => user.recentSearchHistories)
  user: User;

  @Column({ type: 'json' })
  filters: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
