import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';

export type CastMemberModelProps = {
  cast_member_id: string;
  name: string;
  type: CastMemberTypeEnum;
  created_at: Date;
};

@Table({ tableName: 'cast_member', timestamps: false })
export class CastMemberModel extends Model<CastMemberModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare cast_member_id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({
    allowNull: true,
    type: DataType.ENUM(...Object.values(CastMemberTypeEnum)),
  })
  declare type: CastMemberTypeEnum;

  @Column({ allowNull: true, type: DataType.DATE(3) })
  declare created_at: Date;
}
