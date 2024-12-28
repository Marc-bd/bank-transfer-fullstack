import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TransferStatus} from "../enums/transfer.enum";
import {DecimalColumnTransformer} from "../shared/transformer";

@Entity('transfers')
export class Transfer {

    @PrimaryGeneratedColumn('uuid')
    externalId: string;


    @Column('decimal', { precision: 10, scale: 2, transformer: new DecimalColumnTransformer() })
    amount: number;

    @Column('date')
    expectedOn: string;

    @Column('date', { nullable: true })
    dueDate: string | null;

    @Column({
                type: 'enum',
                enum: TransferStatus,
                default: TransferStatus.PENDING,
            })
    status: TransferStatus;

    @Column('text', { nullable: false})
    observation: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

}