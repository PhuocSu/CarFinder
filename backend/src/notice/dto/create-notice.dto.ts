import { IsNotEmpty, IsOptional } from "class-validator";
import { Column } from "typeorm";

export class CreateNoticeDto {
    @Column()
    @IsNotEmpty()
    title: string;

    @Column({ nullable: true })
    @IsOptional()
    fileAttachment?: string;

    @Column('varchar', { length: 500 })
    @IsNotEmpty()
    content: string;

    @Column({ default: false })
    @IsOptional()
    isTemporarySave?: boolean;
}

